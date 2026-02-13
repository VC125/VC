var rule = {
    title: '腾讯视频',
    host: 'https://v.qq.com',
    homeUrl: '/x/bu/pagesheet/list?_all=1&append=1&channel=cartoon&listpage=1&offset=0&pagesize=21&iarea=-1&sort=18',
    detailUrl: 'https://node.video.qq.com/x/api/float_vinfo2?cid=fyid',
    searchUrl: '**',
    searchable: 2,
    filterable: 1,
    multi: 1,
    url: '/x/bu/pagesheet/list?_all=1&append=1&channel=fyclass&listpage=1&offset=((fypage-1)*21)&pagesize=21&iarea=-1',
    filter_url: 'sort={{fl.sort or 75}}&iyear={{fl.iyear}}&year={{fl.year}}&itype={{fl.type}}&ifeature={{fl.feature}}&iarea={{fl.area}}&itrailer={{fl.itrailer}}&gender={{fl.sex}}',
    filter:{"choice":[{"key":"sort","name":"排序","value":[{"n":"最热","v":"75"},{"n":"最新","v":"83"},{"n":"好评","v":"81"}]},{"key":"iyear","name":"年代","value":[{"n":"全部","v":"-1"},{"n":"2025","v":"2025"},{"n":"2024","v":"2024"},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"}]}],"tv":[{"key":"sort","name":"排序","value":[{"n":"最热","v":"75"},{"n":"最新","v":"79"},{"n":"好评","v":"16"}]},{"key":"feature","name":"类型","value":[{"n":"全部","v":"-1"},{"n":"爱情","v":"1"},{"n":"古装","v":"2"},{"n":"悬疑","v":"3"},{"n":"都市","v":"4"},{"n":"家庭","v":"5"},{"n":"喜剧","v":"6"},{"n":"传奇","v":"7"},{"n":"武侠","v":"8"},{"n":"军旅","v":"9"},{"n":"权谋","v":"10"},{"n":"革命","v":"11"},{"n":"现实","v":"13"},{"n":"青春","v":"14"},{"n":"猎奇","v":"15"},{"n":"科幻","v":"16"},{"n":"竞技","v":"17"},{"n":"玄幻","v":"18"}]},{"key":"iyear","name":"年代","value":[{"n":"全部","v":"-1"},{"n":"2025","v":"2025"},{"n":"2024","v":"2024"},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"}]}],"movie":[{"key":"sort","name":"排序","value":[{"n":"最热","v":"75"},{"n":"最新","v":"83"},{"n":"好评","v":"81"}]},{"key":"type","name":"类型","value":[{"n":"全部","v":"-1"},{"n":"犯罪","v":"4"},{"n":"励志","v":"2"},{"n":"喜剧","v":"100004"},{"n":"热血","v":"100061"},{"n":"悬疑","v":"100009"},{"n":"爱情","v":"100005"},{"n":"科幻","v":"100012"},{"n":"恐怖","v":"100010"},{"n":"动画","v":"100015"},{"n":"战争","v":"100006"},{"n":"家庭","v":"100017"},{"n":"剧情","v":"100022"},{"n":"奇幻","v":"100016"},{"n":"武侠","v":"100011"},{"n":"历史","v":"100021"},{"n":"老片","v":"100013"},{"n":"西部","v":"3"},{"n":"记录片","v":"100020"}]},{"key":"year","name":"年代","value":[{"n":"全部","v":"-1"},{"n":"2025","v":"2025"},{"n":"2024","v":"2024"},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"}]}],"variety":[{"key":"sort","name":"排序","value":[{"n":"最热","v":"75"},{"n":"最新","v":"23"}]},{"key":"iyear","name":"年代","value":[{"n":"全部","v":"-1"},{"n":"2025","v":"2025"},{"n":"2024","v":"2024"},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"}]}],"cartoon":[{"key":"sort","name":"排序","value":[{"n":"最热","v":"75"},{"n":"最新","v":"83"},{"n":"好评","v":"81"}]},{"key":"area","name":"地区","value":[{"n":"全部","v":"-1"},{"n":"内地","v":"1"},{"n":"日本","v":"2"},{"n":"欧美","v":"3"},{"n":"其他","v":"4"}]},{"key":"type","name":"类型","value":[{"n":"全部","v":"-1"},{"n":"玄幻","v":"9"},{"n":"科幻","v":"4"},{"n":"武侠","v":"13"},{"n":"冒险","v":"3"},{"n":"战斗","v":"5"},{"n":"搞笑","v":"1"},{"n":"恋爱","v":"7"},{"n":"魔幻","v":"6"},{"n":"竞技","v":"20"},{"n":"悬疑","v":"17"},{"n":"日常","v":"15"},{"n":"校园","v":"16"},{"n":"真人","v":"18"},{"n":"推理","v":"14"},{"n":"历史","v":"19"},{"n":"经典","v":"3"},{"n":"其他","v":"12"}]},{"key":"iyear","name":"年代","value":[{"n":"全部","v":"-1"},{"n":"2025","v":"2025"},{"n":"2024","v":"2024"},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"}]}],"child":[{"key":"sort","name":"排序","value":[{"n":"最热","v":"75"},{"n":"最新","v":"76"},{"n":"好评","v":"20"}]},{"key":"sex","name":"性别","value":[{"n":"全部","v":"-1"},{"n":"女孩","v":"1"},{"n":"男孩","v":"2"}]},{"key":"area","name":"地区","value":[{"n":"全部","v":"-1"},{"n":"内地","v":"3"},{"n":"日本","v":"2"},{"n":"其他","v":"1"}]},{"key":"iyear","name":"年龄段","value":[{"n":"全部","v":"-1"},{"n":"0-3岁","v":"1"},{"n":"4-6岁","v":"2"},{"n":"7-9岁","v":"3"},{"n":"10岁以上","v":"4"},{"n":"全年龄段","v":"7"}]}],"doco":[{"key":"sort","name":"排序","value":[{"n":"最热","v":"75"},{"n":"最新","v":"74"}]},{"key":"itrailer","name":"出品方","value":[{"n":"全部","v":"-1"},{"n":"BBC","v":"1"},{"n":"国家地理","v":"4"},{"n":"HBO","v":"3175"},{"n":"NHK","v":"2"},{"n":"历史频道","v":"7"},{"n":"ITV","v":"3530"},{"n":"探索频道","v":"3174"},{"n":"ZDF","v":"3176"},{"n":"腾讯自制","v":"15"},{"n":"合作机构","v":"6"},{"n":"其他","v":"5"}]},{"key":"type","name":"类型","value":[{"n":"全部","v":"-1"},{"n":"自然","v":"4"},{"n":"美食","v":"10"},{"n":"社会","v":"3"},{"n":"人文","v":"6"},{"n":"历史","v":"1"},{"n":"军事","v":"2"},{"n":"科技","v":"8"},{"n":"财经","v":"14"},{"n":"探险","v":"15"},{"n":"罪案","v":"7"},{"n":"竞技","v":"12"},{"n":"旅游","v":"11"}]}]},
    headers: {
        'User-Agent': 'PC_UA'
    },
    timeout: 5000,
    cate_exclude: '会员|游戏|全部',
    class_name: '精选&电影&电视剧&综艺&动漫&少儿&纪录片',
    class_url: 'choice&movie&tv&variety&cartoon&child&doco',
    limit: 20,
    play_parse: true,
    lazy: $js.toString(() => {
    try {
        let api = "http://nm.4688888.xyz//jiexi.php?data=6996e4d509ca23fad7897c2992ebf579&url=" + input.split("?")[0];
        let response = fetch(api, {
            method: 'get',
            headers: {
                'User-Agent': 'okhttp/3.14.9',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        let bata = JSON.parse(response);
        
        // 检查原始 URL 和可能转义的 URL
        let urlToCheck = bata.url || "";
        
        // 处理转义的反斜杠
        let unescapedUrl = urlToCheck.replace(/\\\//g, '/');
        
        // 检查是否是失效链接
        if (unescapedUrl.includes("gitee.com/nm_nm/interface/raw/master/fail/fail")) {
            log("检测到失效链接，阻止播放: " + unescapedUrl);
            // 返回一个无法播放的链接，确保不会播放
            input = {
                header: {
                    'User-Agent': "Mozilla/5.0"
                },
                parse: 0,
                url: "data:text/plain,视频无法播放",
                jx: 0,
                danmaku: ""
            };
            return;
        }
        
        if (urlToCheck && urlToCheck.includes("http")) {
            input = {
                header: {
                    'User-Agent': ""
                },
                parse: 0,
                url: urlToCheck,
                jx: 0,
                danmaku: "http://dm.4688888.xyz/?url=" + input.split("?")[0]
            };
        } else {
            input = {
                header: {
                    'User-Agent': ""
                },
                parse: 0,
                url: input.split("?")[0],
                jx: 1,
                danmaku: "http://dm.4688888.xyz/?url=" + input.split("?")[0]
            };
        }
    } catch (e) {
        // 如果解析失败，检查原始输入是否包含失效链接
        let originalUrl = input || "";
        let unescapedOriginal = originalUrl.replace(/\\\//g, '/');
        
        if (unescapedOriginal.includes("gitee.com/nm_nm/interface/raw/master/fail/fail")) {
            log("原始链接是失效链接，阻止播放: " + unescapedOriginal);
            input = {
                header: {
                    'User-Agent': "Mozilla/5.0"
                },
                parse: 0,
                url: "data:text/plain,视频无法播放",
                jx: 0,
                danmaku: ""
            };
            return;
        }
        
        input = {
            header: {
                'User-Agent': ""
            },
            parse: 0,
            url: input.split("?")[0],
            jx: 1,
            danmaku: "http://dm.4688888.xyz/?url=" + input.split("?")[0]
        };
    }
}),
    推荐: '.list_item;img&&alt;img&&src;a&&Text;a&&data-float',
    一级: '.list_item;img&&alt;img&&src;a&&Text;a&&data-float',
二级: $js.toString(() => {
    VOD = {};
    let d = [];
    let video_list = [];
    let video_lists = [];
    let QZOutputJson;
    let html = fetch(input, fetch_params);
    let sourceId = /get_playsource/.test(input) ? input.match(/id=(\d*?)&/)[1] : input.split("cid=")[1];
    let cid = sourceId;
    let detailUrl = "https://v.qq.com/detail/m/" + cid + ".html";
    try {
        let json = JSON.parse(html);
        VOD = {
            vod_url: input,
            vod_name: json.c.title,
            type_name: json.typ.join(","),
            vod_actor: json.nam.join(","),
            vod_year: json.c.year,
            vod_content: json.c.description,
            vod_remarks: json.rec,
            vod_pic: urljoin2(input, json.c.pic)
        }
    } catch (e) {}
    if (/get_playsource/.test(input)) {
        eval(html);
        let indexList = QZOutputJson.PlaylistItem.indexList;
        indexList.forEach(function(it) {
            let dataUrl = "https://s.video.qq.com/get_playsource?id=" + sourceId + "&plat=2&type=4&data_type=3&range=" + it + "&video_type=10&plname=qq&otype=json";
            eval(fetch(dataUrl, fetch_params));
            let vdata = QZOutputJson.PlaylistItem.videoPlayList;
            vdata.forEach(function(item) {
                // 修复：只显示集数，不显示剧名
                let episodeTitle = item.title;
                // 尝试提取纯集数，如"01"、"02"
                let episodeMatch = episodeTitle.match(/_(\d+)$/);
                if (episodeMatch) {
                    episodeTitle = episodeMatch[1].padStart(2, '0'); // 确保两位数格式
                } else {
                    // 其他格式的处理：如"第01集"、"EP01"
                    episodeMatch = episodeTitle.match(/(?:第|EP|Ep)(\d+)(?:集)?/i);
                    if (episodeMatch) {
                        episodeTitle = episodeMatch[1].padStart(2, '0');
                    }
                }
                
                d.push({
                    title: episodeTitle, // 只显示集数
                    pic_url: item.pic,
                    desc: item.episode_number + "\t\t\t播放量：" + item.thirdLine,
                    url: item.playUrl
                })
            });
            video_lists = video_lists.concat(vdata)
        })
    } else {
        let json = JSON.parse(html);
        video_lists = json.c.video_ids;
        let url = "https://v.qq.com/x/cover/" + sourceId + ".html";
        if (video_lists.length === 1) {
            let vid = video_lists[0];
            url = "https://v.qq.com/x/cover/" + cid + "/" + vid + ".html";
            d.push({
                title: "在线播放",
                url: url
            })
        } else if (video_lists.length > 1) {
            for (let i = 0; i < video_lists.length; i += 30) {
                video_list.push(video_lists.slice(i, i + 30))
            }
            video_list.forEach(function(it, idex) {
                let o_url = "https://union.video.qq.com/fcgi-bin/data?otype=json&tid=1804&appid=20001238&appkey=6c03bbe9658448a4&union_platform=1&idlist=" + it.join(",");
                let o_html = fetch(o_url, fetch_params);
                eval(o_html);
                QZOutputJson.results.forEach(function(it1) {
                    it1 = it1.fields;
                    let url = "https://v.qq.com/x/cover/" + cid + "/" + it1.vid + ".html";
                    
                    // 修复：只显示集数，不显示剧名
                    let episodeTitle = it1.title;
                    // 尝试提取纯集数
                    let episodeMatch = episodeTitle.match(/_(\d+)$/);
                    if (episodeMatch) {
                        episodeTitle = episodeMatch[1].padStart(2, '0'); // 确保两位数格式
                    } else {
                        // 其他格式的处理：如"第01集"、"EP01"
                        episodeMatch = episodeTitle.match(/(?:第|EP|Ep)(\d+)(?:集)?/i);
                        if (episodeMatch) {
                            episodeTitle = episodeMatch[1].padStart(2, '0');
                        }
                    }
                    
                    d.push({
                        title: episodeTitle, // 只显示集数
                        pic_url: it1.pic160x90.replace("/160", ""),
                        desc: it1.video_checkup_time,
                        url: url,
                        type: it1.category_map && it1.category_map.length > 1 ? it1.category_map[1] : ""
                    })
                })
            })
        }
    }
    let yg = d.filter(function(it) {
        return it.type && it.type !== "正片"
    });
    let zp = d.filter(function(it) {
        return !(it.type && it.type !== "正片")
    });
    VOD.vod_play_from = yg.length < 1 ? "QQ" : "QQ$$$预告及花絮";
    VOD.vod_play_url = yg.length < 1 ? d.map(function(it) {
        return it.title + "$" + it.url
    }).join("#") : [zp, yg].map(function(it) {
        return it.map(function(its) {
            return its.title + "$" + its.url
        }).join("#")
    }).join("$$$")
}),
搜索: $js.toString(() => {
    let d = [], keyword = input.split("/")[3];
    
    function vodSearch(keyword, page = 0) {
        return request('https://pbaccess.video.qq.com/trpc.videosearch.mobile_search.MultiTerminalSearch/MbSearch?vplatform=2', {
            body: JSON.stringify({
                version: "25042201",
                clientType: 1,
                filterValue: "",
                uuid: "B1E50847-D25F-4C4B-BBA0-36F0093487F6",
                retry: 0,
                query: keyword,
                pagenum: page,
                isPrefetch: true,
                pagesize: 30,
                queryFrom: 0,
                searchDatakey: "",
                transInfo: "",
                isneedQc: true,
                preQid: "",
                adClientInfo: "",
                extraInfo: {
                    isNewMarkLabel: "1",
                    multi_terminal_pc: "1",
                    themeType: "1",
                    sugRelatedIds: "{}",
                    appVersion: ""
                }
            }),
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.139 Safari/537.36',
                'Content-Type': 'application/json',
                'Origin': 'https://v.qq.com',
                'Referer': 'https://v.qq.com/'
            },
            method: 'POST'
        });
    }

    try {
        let html = vodSearch(keyword, 0);
        let json = JSON.parse(html);
        
        // 收集所有结果
        let allResults = [];
        
        function processItemList(itemList) {
            if (!itemList) return;
            
            itemList.forEach(it => {
                if (it.doc && it.doc.id && it.videoInfo) {
                    let title = it.videoInfo.title || "";
                    let cleanTitle = title.replace(/<[^>]+>/g, '');
                    let img = it.videoInfo.imgUrl || "";
                    let secondLine = it.videoInfo.secondLine || "";
                    let thirdLine = it.videoInfo.thirdLine || "";
                    
                    allResults.push({
                        title: title,
                        cleanTitle: cleanTitle,
                        img: img,
                        url: it.doc.id,
                        desc: secondLine,
                        thirdLine: thirdLine,
                        rawData: it
                    });
                }
            });
        }
        
        if (json.data && json.data.normalList && json.data.normalList.itemList) {
            processItemList(json.data.normalList.itemList);
        }
        
        if (json.data && json.data.areaBoxList) {
            json.data.areaBoxList.forEach(box => {
                processItemList(box.itemList);
            });
        }
        
        let validResults = [];
        
        let cleanKeyword = keyword.replace(/《|》/g, '').trim();
        
        let keywordVariants = [
            cleanKeyword,
            `《${cleanKeyword}》`,
            `${cleanKeyword}年番`,
            `${cleanKeyword} 年番`,
            `${cleanKeyword}（年番）`,
            `${cleanKeyword} 第`,
            `《${cleanKeyword}年番》`,
            `${cleanKeyword}年番第`,
            `${cleanKeyword}·年番`
        ];
        
        let seenIds = new Set();
        let uniqueResults = [];
        allResults.forEach(item => {
            if (!seenIds.has(item.url)) {
                seenIds.add(item.url);
                uniqueResults.push(item);
            }
        });
        
        uniqueResults.forEach(item => {
            let title = item.cleanTitle;
            let id = item.url;
            let img = item.img;
            
            let isExactMatch = false;
            
            for (let variant of keywordVariants) {
                if (title === variant) {
                    isExactMatch = true;
                    break;
                }
            }
            
            if (!isExactMatch) {
                for (let variant of keywordVariants) {
                    if (title.startsWith(variant) || title.includes(`《${cleanKeyword}》`)) {
                        isExactMatch = true;
                        break;
                    }
                }
            }
            
            let isExcluded = false;
            
            let shortVideoIdPatterns = [
                /^[a-z][0-9]{5,}/,
                /^t[0-9]{6}/,
                /^c[0-9]{5}/
            ];
            
            for (let pattern of shortVideoIdPatterns) {
                if (pattern.test(id)) {
                    isExcluded = true;
                    break;
                }
            }
            
            if (img && img.includes('_hz.jpg')) {
                isExcluded = true;
            }
            
            let excludeKeywords = [
                '预告', '花絮', '片花', '特辑', 'MV', '主题曲',
                '抢先看', '片段', '剪辑版', '精编版', '纯享版',
                '精彩片段', '高能片段', '名场面', '剪辑', '解说',
                '分析', '解读', '揭秘', '盘点', '混剪', '饭制',
                'reaction', 'Reaction', 'REACTION', '彩蛋', '幕后'
            ];
            
            for (let kw of excludeKeywords) {
                if (title.includes(kw)) {
                    isExcluded = true;
                    break;
                }
            }
            
            if (title.includes('？') || title.includes('?') || 
                title.includes('为什么') || title.includes('如何') ||
                title.includes('怎样') || title.includes('多少')) {
                isExcluded = true;
            }
            
            let isMainSeries = false;
            
            if (id.startsWith('mzc00') || id.startsWith('mzc0')) {
                isMainSeries = true;
            }
            
            if (img && (img.includes('vcover_vt_pic') || img.includes('vcover_vt_pic'))) {
                isMainSeries = true;
            }
            
            
            if (isExactMatch && !isExcluded && isMainSeries) {
                validResults.push({
                    ...item,
                    matchScore: 100 // 精确匹配最高分
                });
                log(`✅ 接受（精确匹配）: ${title}`);
            } else if (isMainSeries && !isExcluded) {
                let matchScore = 0;
                
                let containsKeyword = false;
                for (let variant of keywordVariants) {
                    if (title.includes(variant)) {
                        containsKeyword = true;
                        break;
                    }
                }
                
                if (containsKeyword) {
                    matchScore = 80; 
                    validResults.push({
                        ...item,
                        matchScore: matchScore
                    });
                    log(`⚠️ 接受（包含关键词）: ${title} (分数: ${matchScore})`);
                }
            } else {
                log(`❌ 排除: ${title} (精确匹配: ${isExactMatch}, 排除: ${isExcluded}, 正剧: ${isMainSeries})`);
            }
        });
        
        if (validResults.length === 0) {
            log('没有找到匹配结果，尝试放宽条件...');
            
            uniqueResults.forEach(item => {
                let title = item.cleanTitle;
                let id = item.url;
                
                if (id.startsWith('mzc00')) {
                    let hasExcludedKeyword = false;
                    for (let kw of ['预告', '花絮', 'MV', '主题曲', '剪辑']) {
                        if (title.includes(kw)) {
                            hasExcludedKeyword = true;
                            break;
                        }
                    }
                    
                    if (!hasExcludedKeyword) {
                        let similarity = 0;
                        for (let variant of keywordVariants) {
                            if (title.includes(cleanKeyword)) {
                                similarity = 60; 
                                break;
                            }
                        }
                        
                        if (similarity > 0) {
                            validResults.push({
                                ...item,
                                matchScore: similarity
                            });
                            log(`⚠️ 放宽条件接受: ${title} (分数: ${similarity})`);
                        }
                    }
                }
            });
        }
        
        validResults.sort((a, b) => {
            if (b.matchScore !== a.matchScore) {
                return b.matchScore - a.matchScore;
            }
            return a.cleanTitle.length - b.cleanTitle.length;
        });
        
        let finalResults = [];
        let seenTitles = new Set();
        
        for (let item of validResults) {
            if (finalResults.length >= 10) break;
            
            let normalizedTitle = item.cleanTitle
                .replace(/《|》/g, '')
                .replace(/\s+/g, '')
                .toLowerCase();
            
            if (!seenTitles.has(normalizedTitle)) {
                seenTitles.add(normalizedTitle);
                finalResults.push(item);
            }
        }
        
        log(`最终结果: ${finalResults.length}个`);
        
        if (finalResults.length === 0) {
            log('警告：未找到任何匹配结果');
            d = [];
        } else {
            d = finalResults.map(item => ({
                title: item.cleanTitle,
                img: item.img,
                url: item.url,
                desc: item.desc || item.thirdLine || ""
            }));
        }
        
    } catch (e) {
        log("搜索出错: " + e.message);
    }
    
    setResult(d);
})
};