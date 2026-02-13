// 哔哩哔哩B站影视资源爬虫
// 基于原bilibili.js规则转换，适配CatVod爬虫框架
// 转换日期：2025.12.29

import {Crypto,_} from 'assets://js/lib/cat.js';

let host = 'https://api.bilibili.com';
const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    'Referer': 'https://www.bilibili.com',
    'Cookie': 'b_nut=1754358399; buvid3=0F2F49F9-DB89-BB64-8C82-0FC19C89700C99838infoc; bsource=search_baidu; _uuid=D75882107-8DA4-5CEB-610BF-1C947B575F6F00241infoc; buvid4=708DFED9-5C46-1145-2E55-C666A6DCD00D00431-125080509-2JaJVUbLMmiKSv6f1hrFWOzvO5HPB0qiGQ88G7/gWinLq9zArOyfN4Sxbea0Elu2; bmg_af_switch=1; bmg_src_def_domain=i0.hdslb.com; buvid_fp=a648a8f1a55caf7d8a9f1cf0a7012532; rpdid=0zbfvUmrTi|gvd1C9k3|4EB|3w1UJ6Qk; b_lsid=3F6610F34_19B627D262F; home_feed_column=4; browser_resolution=1100-2444; theme-tip-show=SHOWED; theme-avatar-tip-show=SHOWED; bili_ticket=eyJhbGciOiJIUzI1NiIsImtpZCI6InMwMyIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjcxNDM0NjAsImlhdCI6MTc2Njg4NDIwMCwicGx0IjotMX0.Mq61VKWaA2PwrfGmjz5wdxxTq4gAEl8OCW1aC1vcyAg; bili_ticket_expires=1767143400; CURRENT_FNVAL=16; CURRENT_QUALITY=0; sid=pp8jodon'
};

let vmid = ''; // 用户vmid，需要从配置中获取

async function init(cfg) {
    if (cfg.ext) {
        // 从配置中提取vmid
        try {
            vmid = cfg.ext.trim();
            console.log('初始化B站爬虫，vmid:', vmid);
        } catch (e) {
            console.error('初始化B站爬虫失败:', e);
        }
    }
}

async function home(filter) {
    // 分类定义
    const class_list = [
        { 'type_id': '1', 'type_name': '番剧' },
        { 'type_id': '4', 'type_name': '国创' },
        { 'type_id': '2', 'type_name': '电影' },
        { 'type_id': '5', 'type_name': '电视剧' },
        { 'type_id': '3', 'type_name': '纪录片' },
        { 'type_id': '7', 'type_name': '综艺' },
        { 'type_id': '全部', 'type_name': '全部' },
        { 'type_id': '追番', 'type_name': '追番' },
        { 'type_id': '追剧', 'type_name': '追剧' },
        { 'type_id': '时间表', 'type_name': '时间表' }
    ];
    
    // 过滤条件
    const filters = {
        '全部': [
            {
                'key': 'tid',
                'name': '分类',
                'value': [
                    { 'n': '番剧', 'v': '1' },
                    { 'n': '国创', 'v': '4' },
                    { 'n': '电影', 'v': '2' },
                    { 'n': '电视剧', 'v': '5' },
                    { 'n': '记录片', 'v': '3' },
                    { 'n': '综艺', 'v': '7' }
                ]
            },
            {
                'key': 'order',
                'name': '排序',
                'value': [
                    { 'n': '播放数量', 'v': '2' },
                    { 'n': '更新时间', 'v': '0' },
                    { 'n': '最高评分', 'v': '4' },
                    { 'n': '弹幕数量', 'v': '1' },
                    { 'n': '追看人数', 'v': '3' },
                    { 'n': '开播时间', 'v': '5' },
                    { 'n': '上映时间', 'v': '6' }
                ]
            },
            {
                'key': 'season_status',
                'name': '付费',
                'value': [
                    { 'n': '全部', 'v': '-1' },
                    { 'n': '免费', 'v': '1' },
                    { 'n': '付费', 'v': '2%2C6' },
                    { 'n': '大会员', 'v': '4%2C6' }
                ]
            }
        ],
        '时间表': [
            {
                'key': 'tid',
                'name': '分类',
                'value': [
                    { 'n': '番剧', 'v': '1' },
                    { 'n': '国创', 'v': '4' }
                ]
            }
        ]
    };
    
    return JSON.stringify({ class: class_list, filters: filters });
}

async function homeVod() {
    try {
        const videos = [];
        
        // 获取番剧排行
        const resp1 = await req('https://api.bilibili.com/pgc/web/rank/list?season_type=1&pagesize=5&page=1&day=3', { headers });
        const json1 = JSON.parse(resp1.content);
        if (json1.code === 0) {
            const list1 = json1.result ? json1.result.list : json1.data.list;
            for (const item of list1.slice(0, 5)) {
                if (!item.title.includes('预告')) {
                    videos.push({
                        'vod_id': item.season_id.toString(),
                        'vod_name': item.title.trim(),
                        'vod_pic': item.cover.trim(),
                        'vod_remarks': item.new_ep ? item.new_ep.index_show : item.index_show
                    });
                }
            }
        }
        
        // 获取其他分类排行
        const types = [4, 2, 5, 3, 7];
        for (const type of types) {
            const resp = await req(`https://api.bilibili.com/pgc/season/rank/web/list?season_type=${type}&pagesize=5&page=1&day=3`, { headers });
            const json = JSON.parse(resp.content);
            if (json.code === 0) {
                const list = json.result ? json.result.list : json.data.list;
                for (const item of list.slice(0, 5)) {
                    if (!item.title.includes('预告')) {
                        videos.push({
                            'vod_id': item.season_id.toString(),
                            'vod_name': item.title.trim(),
                            'vod_pic': item.cover.trim(),
                            'vod_remarks': item.new_ep ? item.new_ep.index_show : item.index_show
                        });
                    }
                }
            }
        }
        
        return JSON.stringify({ list: videos });
    } catch (e) {
        console.error('获取首页推荐失败:', e);
        return JSON.stringify({ list: [] });
    }
}

async function category(tid, pg, filter, extend) {
    try {
        let videos = [];
        
        if (tid === '1') {
            // 番剧排行
            videos = await getRankList(tid, pg);
        } else if (['2', '3', '4', '5', '7'].includes(tid)) {
            // 其他分类排行
            videos = await getRankList2(tid, pg);
        } else if (tid === '全部') {
            // 全部内容
            const tid_val = extend.tid || '1';
            const order = extend.order || '2';
            const season_status = extend.season_status || '-1';
            videos = await getAllList(tid_val, pg, order, season_status);
        } else if (tid === '追番') {
            // 追番列表
            videos = await getFollowList(pg, 1);
        } else if (tid === '追剧') {
            // 追剧列表
            videos = await getFollowList(pg, 2);
        } else if (tid === '时间表') {
            // 时间表
            const tid_val = extend.tid || '1';
            videos = await getTimeline(tid_val);
        }
        
        return JSON.stringify({ list: videos, page: parseInt(pg), total: 1000 });
    } catch (e) {
        console.error('获取分类列表失败:', e);
        return JSON.stringify({ list: [], page: 1, total: 0 });
    }
}

async function search(wd, quick, pg = 1) {
    try {
        const encodedKeyword = encodeURIComponent(wd);
        const videos = [];
        
        // 搜索番剧
        const url1 = `https://api.bilibili.com/x/web-interface/search/type?search_type=media_bangumi&keyword=${encodedKeyword}&page=${pg}`;
        const resp1 = await req(url1, { headers });
        const json1 = JSON.parse(resp1.content);
        
        // 搜索影视
        const url2 = `https://api.bilibili.com/x/web-interface/search/type?search_type=media_ft&keyword=${encodedKeyword}&page=${pg}`;
        const resp2 = await req(url2, { headers });
        const json2 = JSON.parse(resp2.content);
        
        // 处理搜索结果
        function cleanHtml(text) {
            if (!text) return '';
            return text.replace(/<[^>]+>/g, '').replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        }
        
        if (json1.code === 0 && json1.data.numResults > 0) {
            const result1 = json1.data.result;
            for (const item of result1) {
                const title = cleanHtml(item.title).trim();
                const remark = cleanHtml(item.index_show).trim();
                if (!title.includes('预告') && !remark.includes('预告')) {
                    videos.push({
                        'vod_id': item.season_id.toString(),
                        'vod_name': title,
                        'vod_pic': item.cover.trim(),
                        'vod_remarks': remark
                    });
                }
            }
        }
        
        if (json2.code === 0 && json2.data.numResults > 0) {
            const result2 = json2.data.result;
            for (const item of result2) {
                const title = cleanHtml(item.title).trim();
                const remark = cleanHtml(item.index_show).trim();
                if (!title.includes('预告') && !remark.includes('预告')) {
                    videos.push({
                        'vod_id': item.season_id.toString(),
                        'vod_name': title,
                        'vod_pic': item.cover.trim(),
                        'vod_remarks': remark
                    });
                }
            }
        }
        
        return JSON.stringify({ list: videos, page: parseInt(pg), total: 1000 });
    } catch (e) {
        console.error('搜索失败:', e);
        return JSON.stringify({ list: [], page: 1, total: 0 });
    }
}

async function detail(id) {
    try {
        const resp = await req(`https://api.bilibili.com/pgc/view/web/season?season_id=${id}`, { headers });
        const json = JSON.parse(resp.content);
        const result = json.result;
        
        // 格式化数字
        function formatNumber(num) {
            if (!num) return '0';
            const n = Number(num);
            if (n > 1e8) {
                return (n / 1e8).toFixed(2) + '亿';
            } else if (n > 1e4) {
                return (n / 1e4).toFixed(2) + '万';
            }
            return n.toString();
        }
        
        // 视频信息
        const title = result.title;
        const pic = result.cover;
        const areas = result.areas && result.areas.length > 0 ? result.areas[0].name : '';
        const typeName = result.share_sub_title;
        const date = result.publish && result.publish.pub_time ? result.publish.pub_time.substr(0, 4) : '';
        const dec = result.evaluate || '';
        const remark = result.new_ep ? result.new_ep.desc : '';
        const stat = result.stat || {};
        
        const status = `弹幕: ${formatNumber(stat.danmakus)}　点赞: ${formatNumber(stat.likes)}　投币: ${formatNumber(stat.coins)}　追番追剧: ${formatNumber(stat.favorites)}`;
        const score = result.rating ? `评分: ${result.rating.score}　${result.subtitle}` : `暂无评分　${result.subtitle}`;
        
        // 过滤掉预告片
        const episodes = result.episodes.filter(ep => 
            !ep.title.includes('预告') && !(ep.badge && ep.badge.includes('预告'))
        );
        
        // 构建播放列表
        const playUrls1 = []; // eid_cid格式
        const playUrls2 = []; // link格式
        
        for (const ep of episodes) {
            const part = `${ep.title.replace('#', '-')} ${ep.long_title || ''}[${ep.badge || ''}]`;
            const eid_cid = `${ep.id}_${ep.cid}`;
            const link = ep.link || '';
            
            playUrls1.push(`${part}$${eid_cid}`);
            if (link) {
                playUrls2.push(`${part}$${link}`);
            }
        }
        
        // 合并播放地址
        let playUrl = '';
        if (playUrls1.length > 0) {
            playUrl = playUrls1.join('#');
            if (playUrls2.length > 0) {
                playUrl += '$$$' + playUrls2.join('#');
            }
        }
        
        const vod = {
            'vod_id': result.season_id.toString(),
            'vod_name': title,
            'vod_pic': pic,
            'type_name': typeName,
            'vod_year': date,
            'vod_area': areas,
            'vod_remarks': remark,
            'vod_actor': status,
            'vod_director': score,
            'vod_content': dec,
            'vod_play_from': '$$$bilibili',
            'vod_play_url': playUrl
        };
        
        return JSON.stringify({ list: [vod] });
    } catch (e) {
        console.error('获取详情失败:', e);
        return JSON.stringify({ list: [] });
    }
}

async function play(flag, vid, flags) {
    try {
        let parse = 0;
        let jx = 1;
        let url = '';
        let playHeader = { ...headers };
        
        // 判断是否为外部链接（如爱奇艺）
        if (vid.includes('qiyi')) {
            jx = 0;
            url = vid;
        } else {
            // B站视频，尝试获取播放地址
            if (vid.includes('_')) {
                // eid_cid格式
                const [eid, cid] = vid.split('_');
                const apiUrl = `https://api.bilibili.com/pgc/player/web/playurl?cid=${cid}&ep_id=${eid}&qn=116&fnval=16`;
                
                try {
                    const resp = await req(apiUrl, { headers });
                    const json = JSON.parse(resp.content);
                    if (json.code === 0 && json.result) {
                        // 取最高质量的视频地址
                        const dash = json.result.dash;
                        if (dash && dash.video && dash.video.length > 0) {
                            // 按质量排序，取第一个
                            const videos = dash.video.sort((a, b) => b.id - a.id);
                            if (videos[0].baseUrl) {
                                url = videos[0].baseUrl;
                            }
                        }
                        
                        // 如果没有dash，尝试取durl
                        if (!url && json.result.durl && json.result.durl.length > 0) {
                            url = json.result.durl[0].url;
                        }
                    }
                } catch (e) {
                    console.error('获取播放地址失败，使用原始API:', e);
                }
                
                // 如果还是没获取到，使用原始API
                if (!url) {
                    url = `https://api.bilibili.com/pgc/player/web/playurl?cid=${cid}&ep_id=${eid}`;
                }
            } else {
                // 直接使用vid作为URL
                url = vid;
            }
        }
        
        // 弹幕地址
        const danmaku = `http://dm.4688888.xyz/?url=${url}`;
        
        return JSON.stringify({
            parse: parse,
            url: url,
            jx: jx,
            header: JSON.stringify(playHeader),
            danmaku: danmaku
        });
    } catch (e) {
        console.error('播放处理失败:', e);
        return JSON.stringify({
            parse: 0,
            url: vid,
            jx: 1,
            header: JSON.stringify(headers)
        });
    }
}

// ========== 辅助函数 ==========

async function getRankList(tid, pg) {
    const resp = await req(`https://api.bilibili.com/pgc/web/rank/list?season_type=${tid}&pagesize=20&page=${pg}&day=3`, { headers });
    const json = JSON.parse(resp.content);
    return parseVideoList(json);
}

async function getRankList2(tid, pg) {
    const resp = await req(`https://api.bilibili.com/pgc/season/rank/web/list?season_type=${tid}&pagesize=20&page=${pg}&day=3`, { headers });
    const json = JSON.parse(resp.content);
    return parseVideoList(json);
}

async function getAllList(tid, pg, order, season_status) {
    const url = `https://api.bilibili.com/pgc/season/index/result?order=${order}&pagesize=20&type=1&season_type=${tid}&page=${pg}&season_status=${season_status}`;
    const resp = await req(url, { headers });
    const json = JSON.parse(resp.content);
    return parseVideoList(json);
}

async function getFollowList(pg, mode) {
    if (!vmid) {
        console.warn('未设置vmid，无法获取追番/追剧列表');
        return [];
    }
    
    const url = `https://api.bilibili.com/x/space/bangumi/follow/list?type=${mode}&follow_status=0&pn=${pg}&ps=10&vmid=${vmid}`;
    const resp = await req(url, { headers });
    const json = JSON.parse(resp.content);
    return parseVideoList(json);
}

async function getTimeline(tid) {
    const url = `https://api.bilibili.com/pgc/web/timeline/v2?season_type=${tid}&day_before=2&day_after=4`;
    const resp = await req(url, { headers });
    const json = JSON.parse(resp.content);
    
    const videos = [];
    
    if (json.code === 0) {
        // 最新更新
        const latestList = json.result.latest || [];
        for (const item of latestList) {
            if (!item.title.includes('预告')) {
                const remark = `${item.pub_index}　${item.follows ? item.follows.replace('系列', '') : ''}`;
                videos.push({
                    'vod_id': item.season_id.toString(),
                    'vod_name': item.title.trim(),
                    'vod_pic': item.cover.trim(),
                    'vod_remarks': remark
                });
            }
        }
        
        // 时间表
        const timeline = json.result.timeline || [];
        for (const day of timeline) {
            const episodes = day.episodes || [];
            for (const item of episodes) {
                if (item.published === 0 && !item.title.includes('预告')) {
                    const date = new Date(item.pub_ts * 1000).toLocaleDateString();
                    const remark = `${date}   ${item.pub_index}`;
                    videos.push({
                        'vod_id': item.season_id.toString(),
                        'vod_name': item.title.trim(),
                        'vod_pic': item.cover.trim(),
                        'vod_remarks': remark
                    });
                }
            }
        }
    }
    
    return videos;
}

function parseVideoList(json) {
    const videos = [];
    
    if (json.code === 0) {
        const vodList = json.result ? json.result.list : json.data.list;
        for (const item of vodList) {
            const title = item.title ? item.title.trim() : '';
            const remark = item.new_ep ? item.new_ep.index_show : item.index_show;
            
            if (!title.includes('预告') && !remark.includes('预告')) {
                videos.push({
                    'vod_id': item.season_id.toString(),
                    'vod_name': title,
                    'vod_pic': item.cover.trim(),
                    'vod_remarks': remark
                });
            }
        }
    }
    
    return videos;
}

export function __jsEvalReturn() {
    return {
        init: init,
        home: home,
        homeVod: homeVod,
        category: category,
        search: search,
        detail: detail,
        play: play
    };
}