const CUSTOMER_SITES = {
    qiqidys: {
        api: 'https://www.qiqidys.com/api.php/provide/vod/',  // 已经加了/
        name: '七七影视',
    },
    dyttzy: {
        api: 'http://caiji.dyttzyapi.com/api.php/provide/vod/', // 已经加了/
        name: '电影天堂',
    },
    ruyi: {
        api: 'http://cj.rycjapi.com/api.php/provide/vod/',  // 已经加了/
        name: '如意资源',
    },
    bfzy: {
        api: 'https://bfzyapi.com/api.php/provide/vod/',  // 已经加了/
        name: '暴风资源',
    },
    tyyszy: {
        api: 'https://tyyszy.com/api.php/provide/vod/',  // 已经加了/
        name: '天涯资源',
    },
    ffzy: {
        api: 'http://ffzy5.tv/api.php/provide/vod/',  // 已经加了/
        name: '非凡影视',
    },
    zy360: {
        api: 'https://360zy.com/api.php/provide/vod/',  // 已经加了/
        name: '360资源',
    },
    maotaizy: {
        api: 'https://caiji.maotaizy.cc/api.php/provide/vod/',  // 已经加了/
        name: '茅台资源',
    },
    wolong: {
        api: 'https://wolongzyw.com/api.php/provide/vod/',  // 已经加了/
        name: '卧龙资源',
    },
    jisu: {
        api: 'https://jszyapi.com/api.php/provide/vod/',  // 已经加了/
        name: '极速资源',
    },
    dbzy: {
        api: 'https://dbzy.tv/api.php/provide/vod/',  // 已经加了/
        name: '豆瓣资源',
    },
    mozhua: {
        api: 'https://mozhuazy.com/api.php/provide/vod/',  // 已经加了/
        name: '魔爪资源',
    },
    mdzy: {
        api: 'https://www.mdzyapi.com/api.php/provide/vod/',  // 已经加了/
        name: '魔都资源',
    },
    zuid: {
        api: 'https://api.zuidapi.com/api.php/provide/vod/',  // 已经加了/
        name: '最大资源',
    },
    yinghua: {
        api: 'https://m3u8.apiyhzy.com/api.php/provide/vod/',  // 已经加了/
        name: '樱花资源',
    },
    wujin: {
        api: 'https://api.wujinapi.me/api.php/provide/vod/',  // 已经加了/
        name: '无尽资源',
    },
    wwzy: {
        api: 'https://wwzy.tv/api.php/provide/vod/',  // 已经加了/
        name: '旺旺短剧',
    },
    ikun: {
        api: 'https://ikunzyapi.com/api.php/provide/vod/',  // 已经加了/
        name: 'iKun资源',
    },
    lzi: {
        api: 'https://cj.lziapi.com/api.php/provide/vod/',  // 已经加了/
        name: '量子资源',
    },
    bdzy: {
        api: 'https://api.apibdzy.com/api.php/provide/vod/',  // 已经加了/
        name: '百度资源',
    },
    '155api': {
        api: 'https://155api.com/api.php/provide/vod/',  // 已经加了/
        name: 'AV-155资源',
    },
    '360zy': {
        api: 'https://360zy.com/api.php/provide/vod/',  // 已经加了/
        name: 'TV-360资源',
    },
    ckzy: {
        api: 'https://ckzy.me/api.php/provide/vod/',  // 已经加了/
        name: 'TV-CK资源',
    },
    ukuapi: {
        api: 'https://api.ukuapi.com/api.php/provide/vod/',  // 已经加了/
        name: 'TV-U酷资源',
    },
    ukuapi88: {
        api: 'https://api.ukuapi88.com/api.php/provide/vod/',  // 已经加了/
        name: 'TV-U酷资源88',
    },
    ikunzy: {
        api: 'https://ikunzyapi.com/api.php/provide/vod/',  // 已经加了/
        name: 'TV-ikun资源',
    },
    wujinapi_cc: {
        api: 'https://api.wujinapi.cc/api.php/provide/vod/',  // 已经加了/
        name: 'TV-wujinapi无尽',
    },
    yayazy: {
        api: 'https://cj.yayazy.net/api.php/provide/vod/',  // 已经加了/
        name: 'TV-丫丫点播',
    },
    guangsuapi: {
        api: 'https://api.guangsuapi.com/api.php/provide/vod/',  // 已经加了/
        name: 'TV-光速资源',
    },
    wolongzyw: {
        api: 'https://collect.wolongzyw.com/api.php/provide/vod/',  // 已经加了/
        name: 'TV-卧龙点播',
    },
    wolongzy_cc: {
        api: 'https://collect.wolongzy.cc/api.php/provide/vod/',  // 已经加了/
        name: 'TV-卧龙资源',
    },
    wolongzyw_com: {
        api: 'https://wolongzyw.com/api.php/provide/vod/',  // 已经加了/
        name: 'TV-卧龙资源',
    },
    tyyszy: {
        api: 'https://tyyszy.com/api.php/provide/vod/',  // 已经加了/
        name: 'TV-天涯资源',
    },
    rycjapi: {
        api: 'https://cj.rycjapi.com/api.php/provide/vod/',  // 已经加了/
        name: 'TV-如意资源',
    },
    xiaomaomi: {
        api: 'https://zy.xmm.hk/api.php/provide/vod/',  // 已经加了/
        name: 'TV-小猫咪资源',
    },
    xinlangapi: {
        api: 'https://api.xinlangapi.com/xinlangapi.php/provide/vod/',  // 已经加了/
        name: 'TV-新浪点播',
    },
    wujinapi_com: {
        api: 'https://api.wujinapi.com/api.php/provide/vod/',  // 已经加了/
        name: 'TV-无尽资源',
    },
    wujinapi_me: {
        api: 'https://api.wujinapi.me/api.php/provide/vod/',  // 已经加了/
        name: 'TV-无尽资源',
    },
    wujinapi_net: {
        api: 'https://api.wujinapi.net/api.php/provide/vod/',  // 已经加了/
        name: 'TV-无尽资源',
    },
    wwzy: {
        api: 'https://wwzy.tv/api.php/provide/vod/',  // 已经加了/
        name: 'TV-旺旺短剧',
    },
    wwzy_api: {
        api: 'https://api.wwzy.tv/api.php/provide/vod/',  // 已经加了/
        name: 'TV-旺旺资源',
    },
    bfzyapi: {
        api: 'https://bfzyapi.com/api.php/provide/vod/',  // 已经加了/
        name: 'TV-暴风资源',
    },
    zuidazy: {
        api: 'http://zuidazy.me/api.php/provide/vod/',  // 已经加了/
        name: 'TV-最大点播',
    },
    zuidapi: {
        api: 'https://api.zuidapi.com/api.php/provide/vod/',  // 已经加了/
        name: 'TV-最大资源',
    },
    apiyhzy: {
        api: 'https://m3u8.apiyhzy.com/api.php/provide/vod/',  // 已经加了/
        name: 'TV-樱花资源',
    },
    yparse: {
        api: 'https://api.yparse.com/api/json/',  // 已经加了/
        name: 'TV-步步高资源',
    },
    niuniuzy: {
        api: 'https://api.niuniuzy.me/api.php/provide/vod/',  // 已经加了/
        name: 'TV-牛牛点播',
    },
    dyttzyapi: {
        api: 'http://caiji.dyttzyapi.com/api.php/provide/vod/',  // 已经加了/
        name: 'TV-电影天堂资源',
    },
    bwzyz: {
        api: 'https://api.bwzyz.com/api.php/provide/vod/',  // 已经加了/
        name: 'AV-百万资源',
    },
    apibdzy: {
        api: 'https://api.apibdzy.com/api.php/provide/vod/',  // 已经加了/
        name: 'TV-百度云资源',
    },
    '1080zyku_json': {
        api: 'https://api.1080zyku.com/inc/apijson.php/',  // 已经加了/
        name: 'TV-神马云',
    },
    suoniapi: {
        api: 'https://suoniapi.com/api.php/provide/vod/',  // 已经加了/
        name: 'TV-索尼资源',
    },
    hongniuzy2: {
        api: 'https://www.hongniuzy2.com/api.php/provide/vod/',  // 已经加了/
        name: 'TV-红牛资源',
    },
    maotaizy: {
        api: 'https://caiji.maotaizy.cc/api.php/provide/vod/',  // 已经加了/
        name: 'TV-茅台资源',
    },
    huyaapi: {
        api: 'https://www.huyaapi.com/api.php/provide/vod/',  // 已经加了/
        name: 'TV-虎牙资源',
    },
    dbzy_caiji: {
        api: 'https://caiji.dbzy.tv/api.php/provide/vod/',  // 已经加了/
        name: 'TV-豆瓣资源',
    },
    dbzy: {
        api: 'https://dbzy.tv/api.php/provide/vod/',  // 已经加了/
        name: 'TV-豆瓣资源',
    },
    hhzyapi: {
        api: 'https://hhzyapi.com/api.php/provide/vod/',  // 已经加了/
        name: 'TV-豪华资源',
    },
    subocaiji: {
        api: 'https://subocaiji.com/api.php/provide/vod/',  // 已经加了/
        name: 'TV-速博资源',
    },
    lziapi: {
        api: 'https://cj.lziapi.com/api.php/provide/vod/',  // 已经加了/
        name: 'TV-量子资源',
    },
    jinyingzy: {
        api: 'https://jinyingzy.com/api.php/provide/vod/',  // 已经加了/
        name: 'TV-金鹰点播',
    },
    jyzyapi: {
        api: 'https://jyzyapi.com/api.php/provide/vod/',  // 已经加了/
        name: 'TV-金鹰资源',
    },
    sdzyapi: {
        api: 'https://sdzyapi.com/api.php/provide/vod/',  // 已经加了/
        name: 'TV-闪电资源',
    },
    ffzyapi: {
        api: 'https://cj.ffzyapi.com/api.php/provide/vod/',  // 已经加了/
        name: 'TV-非凡资源',
    },
    p2100: {
        api: 'https://p2100.net/api.php/provide/vod/',  // 已经加了/
        name: 'TV-飘零资源',
    },
    mozhuazy: {
        api: 'https://mozhuazy.com/api.php/provide/vod/',  // 已经加了/
        name: 'TV-魔爪资源',
    },
    moduapi: {
        api: 'https://caiji.moduapi.cc/api.php/provide/vod/',  // 已经加了/
        name: 'TV-魔都动漫',
    },
    mdzyapi: {
        api: 'https://www.mdzyapi.com/api.php/provide/vod/',  // 已经加了/
        name: 'TV-魔都资源',
    },
    ffzynew: {
        api: 'https://api.ffzyapi.com/api.php/provide/vod/',  // 已经加了/
        name: '非凡影视new',
    },
    jszyapi: {
        api: 'https://jszyapi.com/api.php/provide/vod/',  // 已经加了/
        name: '极速资源',
    },
    aiduanju: {
        api: 'https://www.aiduanju.cc/',  // 已经加了/
        name: '爱短剧.cc',
    },
    huawei8: {
        api: 'https://huawei8.live/api.php/provide/vod/',  // 已经加了/
        name: '华为吧资源',
    },
    hongniuzy3: {
        api: 'https://www.hongniuzy3.com/api.php/provide/vod/',  // 已经加了/
        name: '红牛资源',
    },
    xsd_sdzyapi: {
        api: 'https://xsd.sdzyapi.com/api.php/provide/vod/',  // 已经加了/
        name: '索尼-闪电资源',
    },
    jyzyapi_provide: {
        api: 'https://jyzyapi.com/provide/vod',  // 已经加了/
        name: '金鹰资源采集网',
    },
    jmzy: {
        api: 'https://api.jmzy.com/api.php/provide/vod/',  // 已经加了/
        name: '金马资源网',
    },
    dadiapi: {
        api: 'https://dadiapi.com/api.php/provide/vod/',  // 已经加了/
        name: '大地资源网络',
    },
    xiaojizy: {
        api: 'https://api.xiaojizy.live/provide/vod/',  // 已经加了/
        name: '小鸡资源',
    },
    kuaichezy: {
        api: 'https://caiji.kuaichezy.org/api.php/provide/',  // 已经加了/
        name: '快车资源',
    },
    xinlangapi_provide: {
        api: 'https://api.xinlangapi.com/xinlangapi.php/provide/vod',  // 已经加了/
        name: '新浪资源阿',
    },
    yzzy_api: {
        api: 'https://api.yzzy-api.com/inc/ldg_api_all.php/provide/vod/',  // 已经加了/
        name: '优质资源库1080zyk6.com高清',
    },
    iqiyizyapi: {
        api: 'https://www.iqiyizyapi.com/api.php/provide/vod/',  // 已经加了/
        name: 'iqiyi资源',
    }

};

// 调用全局方法合并
if (window.extendAPISites) {
    window.extendAPISites(CUSTOMER_SITES);
} else {
    console.error("错误：请先加载 config.js！");
}
