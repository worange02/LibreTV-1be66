// /netlify/functions/proxy.mjs
// Netlify Function (ES Module)
// 修复版：支持图片二进制代理 + m3u8代理 + SHA256鉴权

import fetch from 'node-fetch';
import { URL } from 'url';
import crypto from 'crypto';


// ===============================
// 配置
// ===============================

const DEBUG_ENABLED = process.env.DEBUG === 'true';

const CACHE_TTL =
    parseInt(process.env.CACHE_TTL || '86400', 10);

const MAX_RECURSION =
    parseInt(process.env.MAX_RECURSION || '5', 10);


// ===============================
// User-Agent
// ===============================

let USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15'
];


try {

    const agents =
        process.env.USER_AGENTS_JSON;


    if (agents) {

        const parsed =
            JSON.parse(agents);


        if (
            Array.isArray(parsed)
            &&
            parsed.length > 0
        ) {

            USER_AGENTS = parsed;

        }

    }

}
catch(e){

    console.error(
        "USER_AGENTS_JSON解析失败",
        e.message
    );

}



function getRandomUserAgent(){

    return USER_AGENTS[
        Math.floor(
            Math.random()*USER_AGENTS.length
        )
    ];

}



function logDebug(msg){

    if(DEBUG_ENABLED){

        console.log(
            "[Proxy]",
            msg
        );

    }

}



// ===============================
// URL处理
// ===============================


function getTargetUrlFromPath(encodedPath){


    if(!encodedPath){

        return null;

    }


    try{

        const url =
            decodeURIComponent(encodedPath);


        if(
            /^https?:\/\/.+/i.test(url)
        ){

            return url;

        }


        return null;


    }
    catch(e){

        return null;

    }

}



function getBaseUrl(urlStr){


    try{

        const url =
            new URL(urlStr);


        const parts =
            url.pathname
            .split('/')
            .filter(Boolean);


        if(parts.length<=1){

            return url.origin+'/';

        }


        parts.pop();


        return (
            url.origin+
            '/'+
            parts.join('/')+
            '/'
        );


    }
    catch(e){

        return '';

    }

}



function resolveUrl(base, relative){


    if(
        /^https?:\/\//i.test(relative)
    ){

        return relative;

    }


    try{

        return new URL(
            relative,
            base
        ).toString();


    }
    catch(e){

        return relative;

    }

}



function rewriteUrlToProxy(url){

    return (
        '/proxy/' +
        encodeURIComponent(url)
    );

}



// ===============================
// 密码鉴权
// ===============================


function validateAuth(event) {

    const params = new URLSearchParams(
        event.queryStringParameters || {}
    );

    const authHash = params.get('auth');
    const timestamp = params.get('t');


    // Netlify 环境变量直接保存 SHA256
    const serverPasswordHash = process.env.PASSWORD;


    if (!serverPasswordHash) {
        console.error(
            '未配置 PASSWORD 环境变量'
        );
        return false;
    }


    if (!authHash) {
        console.warn(
            '缺少 auth 参数'
        );
        return false;
    }


    // 直接比较hash
    if (authHash !== serverPasswordHash) {

        console.warn(
            '密码hash不匹配',
            {
                client: authHash,
                server: serverPasswordHash
            }
        );

        return false;
    }


    // 时间校验
    if (timestamp) {

        const now = Date.now();

        const maxAge =
            10 * 60 * 1000;


        if (
            now -
            Number(timestamp)
            >
            maxAge
        ) {

            console.warn(
                'token过期'
            );

            return false;
        }
    }


    return true;
}



// ===============================
// 核心：抓取目标
// 修复图片读取问题
// ===============================


async function fetchContentWithType(
    targetUrl,
    requestHeaders={}
){


const headers = {

    'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',


    'Accept':
    'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',


    'Accept-Language':
    'zh-CN,zh;q=0.9',


    // 豆瓣需要这个
    'Referer':
    'https://movie.douban.com/',


};



    logDebug(
        "Fetch: "+targetUrl
    );



    const response =
        await fetch(
            targetUrl,
            {
                headers,
                redirect:'follow'
            }
        );



    if(!response.ok){


        const txt =
            await response.text()
            .catch(()=>'');



        const err =
            new Error(
                `HTTP ${response.status}: ${txt.substring(0,100)}`
            );


        err.status =
            response.status;


        throw err;

    }



    const contentType =
        response.headers
        .get('content-type')
        ||
        '';



    let content;



    // 图片必须二进制读取
    if(

        contentType.includes('image')
        ||
        /\.(webp|jpg|jpeg|png|gif)$/i.test(targetUrl)

    ){


        const buffer =
            await response.arrayBuffer();



        content =
            Buffer
            .from(buffer)
            .toString('base64');


    }
    else{


        content =
            await response.text();


    }



    return {

        content,

        contentType,

        responseHeaders:
            response.headers

    };


}

// ===============================
// m3u8处理
// ===============================


function isM3u8Content(content, contentType){


    return (

        contentType.includes(
            'application/vnd.apple.mpegurl'
        )
        ||
        contentType.includes(
            'application/x-mpegurl'
        )
        ||
        (
            typeof content === 'string'
            &&
            content.trim()
            .startsWith('#EXTM3U')
        )

    );

}



function processKeyLine(
    line,
    baseUrl
){

    return line.replace(
        /URI="([^"]+)"/,
        (m,uri)=>{

            const url =
                resolveUrl(
                    baseUrl,
                    uri
                );

            return `URI="${rewriteUrlToProxy(url)}"`;

        }
    );

}



function processMapLine(
    line,
    baseUrl
){

    return line.replace(
        /URI="([^"]+)"/,
        (m,uri)=>{

            const url =
                resolveUrl(
                    baseUrl,
                    uri
                );

            return `URI="${rewriteUrlToProxy(url)}"`;

        }
    );

}



function processMediaPlaylist(
    url,
    content
){


    const base =
        getBaseUrl(url);



    const lines =
        content.split('\n');


    const result=[];



    for(
        const line of lines
    ){


        if(
            line.startsWith('#EXT-X-KEY')
        ){

            result.push(
                processKeyLine(
                    line,
                    base
                )
            );

            continue;

        }



        if(
            line.startsWith('#EXT-X-MAP')
        ){

            result.push(
                processMapLine(
                    line,
                    base
                )
            );

            continue;

        }



        if(
            line
            &&
            !line.startsWith('#')
        ){


            result.push(
                rewriteUrlToProxy(
                    resolveUrl(
                        base,
                        line
                    )
                )
            );


        }
        else{

            result.push(line);

        }


    }



    return result.join('\n');

}




async function processM3u8Content(
    targetUrl,
    content
){

    return processMediaPlaylist(
        targetUrl,
        content
    );

}




// ===============================
// Netlify Handler
// ===============================


export const handler =
async (
    event,
    context
)=>{


    console.log(
        "Proxy request:",
        event.path
    );



    const corsHeaders={


        'Access-Control-Allow-Origin':
            '*',


        'Access-Control-Allow-Methods':
            'GET,HEAD,OPTIONS',


        'Access-Control-Allow-Headers':
            '*'


    };



    if(
        event.httpMethod === 'OPTIONS'
    ){

        return {

            statusCode:204,

            headers:corsHeaders,

            body:''

        };

    }



    // 鉴权

    if(
        !validateAuth(event)
    ){

        return {


            statusCode:401,


            headers:{
                ...corsHeaders,
                'Content-Type':
                    'application/json'
            },


            body:JSON.stringify({

                success:false,

                error:
                '代理访问未授权：请检查密码配置或鉴权参数'

            })


        };

    }




    let encodedUrlPath='';


    if(
        event.path.startsWith('/proxy/')
    ){

        encodedUrlPath =
            event.path.substring(
                7
            );

    }



    const targetUrl =
        getTargetUrlFromPath(
            encodedUrlPath
        );



    if(!targetUrl){


        return {


            statusCode:400,


            headers:corsHeaders,


            body:
            JSON.stringify({

                error:
                'Invalid proxy URL'

            })


        };


    }





    try{


        const {
            content,
            contentType,
            responseHeaders

        } =
        await fetchContentWithType(
            targetUrl,
            event.headers
        );




        // m3u8

        if(
            isM3u8Content(
                content,
                contentType
            )
        ){


            const playlist =
                await processM3u8Content(
                    targetUrl,
                    content
                );



            return {


                statusCode:200,


                headers:{

                    ...corsHeaders,

                    'Content-Type':
                    'application/vnd.apple.mpegurl',

                    'Cache-Control':
                    `public,max-age=${CACHE_TTL}`

                },


                body:playlist


            };


        }




        // 图片 / 文件

        const headers={

            ...corsHeaders,

            'Cache-Control':
            `public,max-age=${CACHE_TTL}`

        };



        if(contentType){

            headers['Content-Type'] =
                contentType;

        }




        return {


            statusCode:200,


            headers,


            body:content,


            // 关键修复：
            // base64图片必须开启

            isBase64Encoded:
            contentType.startsWith(
                'image/'
            )


        };



    }
    catch(error){


        console.error(
            "Proxy error:",
            error
        );



        return {


            statusCode:
                error.status || 500,


            headers:{

                ...corsHeaders,

                'Content-Type':
                'application/json'

            },


            body:
            JSON.stringify({

                success:false,

                error:
                error.message,

                targetUrl

            })


        };


    }



};
