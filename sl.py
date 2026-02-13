#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import re
import requests
import hashlib
import time
from urllib.parse import urlparse, quote, unquote

class Spider:
    
    def __init__(self):
        self.name = "360影视"
        self.api_base = "https://api.web.360kan.com"
        self.search_base = "https://api.so.360kan.com"
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
        
        # 解析接口
        self.parse_api = "http://nm.4688888.xyz//jiexi.php?data=6996e4d509ca23fad7897c2992ebf579&url="
        
        self.categories = {
            "电视剧": 2,
            "电影": 1,
            "动漫": 4,
            "综艺": 3
        }
        
        self.site_names = {
            "qiyi": "爱奇艺",
            "qq": "腾讯视频",
            "youku": "优酷",
            "imgo": "芒果TV",
            "sohu": "搜狐视频",
            "pptv": "PPTV",
            "leshi": "乐视",
            "bilibili1": "哔哩哔哩",
            "iqiyi": "爱奇艺",
            "tencent": "腾讯视频"
        }
        
        # 线路优先级：腾讯视频、哔哩哔哩、芒果TV、爱奇艺、优酷
        self.site_priority = ["腾讯视频", "哔哩哔哩", "芒果TV", "爱奇艺", "优酷"]
        
        self.blocked_sites = ["乐视", "M1905", "RENREN", "XIGUA", "CNTV", "HUASHU", "DOUYIN", "PPTV"]
        print(f"[360影视] 硬编码屏蔽线路: {self.blocked_sites}")
        
        self.session = requests.Session()
        self.session.headers.update(self.headers)
        self.session.verify = False
    
    def getName(self):
        return self.name
    
    def getDependence(self):
        return ["json", "re", "requests", "hashlib"]
    
    def init(self, extend):
        try:
            if extend and extend.strip():
                print(f"[360影视] 收到extend参数: {extend}")
                extend_data = json.loads(extend)
                if "blocked_sites" in extend_data:
                    print(f"[360影视] 配置中的屏蔽线路: {extend_data['blocked_sites']}")
                    print(f"[360影视] 实际使用的屏蔽线路(硬编码): {self.blocked_sites}")
        except Exception as e:
            print(f"[360影视] 解析extend失败: {e}")
        return True
    
    def is_blocked_site(self, site_name):
        if not self.blocked_sites:
            return False
        
        if site_name in self.blocked_sites:
            return True
        
        for blocked in self.blocked_sites:
            if blocked and blocked in site_name:
                return True
        
        return False
    
    def isVideoFormat(self, url):
        video_formats = ['.mp4', '.m3u8', '.flv', '.avi', '.mkv', '.ts', '.mov', '.wmv', '.webm', '.mpd']
        return any(fmt in url.lower() for fmt in video_formats)
    
    def manualVideoCheck(self):
        return False
    
    def _fetch(self, url, params=None, timeout=15):
        try:
            response = self.session.get(url, params=params, timeout=timeout)
            response.encoding = 'utf-8'
            data = response.json()
            
            if data.get("errno", 0) != 0:
                raise Exception(data.get("msg", "未知错误"))
                
            return data
        except Exception as e:
            print(f"请求失败: {url}, 参数: {params}, 错误: {str(e)}")
            raise
    
    def _get_youku_real_url(self, url):
        if not url:
            return url
            
        if "gitee.com/nm_nm/interface/raw/master/fail/fail" in url:
            print(f"检测到gitee错误链接: {url}")
            return None
        
        if "v.youku.com/v_show/id_" in url:
            return url
            
        patterns = [
            r'id_([a-zA-Z0-9=]+)\.html',
            r'/([a-zA-Z0-9=]+)\.html',
            r'vid=([a-zA-Z0-9=]+)',
            r'video\.id\s*:\s*[\'"]([a-zA-Z0-9=]+)[\'"]',
        ]
        
        for pattern in patterns:
            match = re.search(pattern, url)
            if match:
                video_id = match.group(1)
                return f"https://v.youku.com/v_show/id_{video_id}.html"
        
        return url
    
    def _get_bilibili_real_url(self, url):
        """
        专门处理哔哩哔哩地址，确保能获取到可播放的地址
        """
        if not url:
            return None
            
        print(f"[哔哩哔哩] 处理地址: {url}")
        
        # 先检查是否已经是视频地址
        if self.isVideoFormat(url):
            print(f"[哔哩哔哩] 已经是视频地址: {url}")
            return url
        
        # 使用解析接口
        try:
            encoded_url = quote(url, safe='')
            parsed_url = f"{self.parse_api}{encoded_url}"
            print(f"[哔哩哔哩] 解析接口地址: {parsed_url}")
            
            response = self.session.get(parsed_url, timeout=10)
            response.encoding = 'utf-8'
            content = response.text
            
            print(f"[哔哩哔哩] 解析响应长度: {len(content)}")
            
            # 尝试从响应中提取地址
            # 1. 检查是否是JSON
            if content.strip().startswith('{') or content.strip().startswith('['):
                try:
                    result = json.loads(content)
                    if isinstance(result, dict):
                        # 尝试常见的字段名
                        for key in ['url', 'playUrl', 'video_url', 'videoUrl', 'src']:
                            if key in result and result[key]:
                                video_url = result[key]
                                if self.isVideoFormat(video_url) or 'http' in video_url:
                                    print(f"[哔哩哔哩] 从JSON字段 {key} 获取地址: {video_url}")
                                    return video_url
                except:
                    pass
            
            # 2. 尝试直接提取视频地址
            video_patterns = [
                r'http[s]?://[^\s<>"\']+\.(mp4|m3u8|flv|mpd)[^\s<>"\']*',
                r'src=[\'"](http[s]?://[^\s<>"\']+\.(mp4|m3u8|flv|mpd)[^\s<>"\']*)[\'"]',
                r'url=[\'"](http[s]?://[^\s<>"\']+\.(mp4|m3u8|flv|mpd)[^\s<>"\']*)[\'"]',
                r'file=[\'"](http[s]?://[^\s<>"\']+\.(mp4|m3u8|flv|mpd)[^\s<>"\']*)[\'"]',
            ]
            
            for pattern in video_patterns:
                matches = re.findall(pattern, content, re.IGNORECASE)
                for match in matches:
                    if isinstance(match, tuple):
                        video_url = match[0]
                    else:
                        video_url = match
                    
                    if video_url and ('http' in video_url or self.isVideoFormat(video_url)):
                        print(f"[哔哩哔哩] 从响应提取地址: {video_url}")
                        return video_url
            
            # 3. 如果没有找到，返回解析接口的URL
            print(f"[哔哩哔哩] 未找到视频地址，返回解析接口URL")
            return parsed_url
            
        except Exception as e:
            print(f"[哔哩哔哩] 解析失败: {e}")
            return url
    
    def homeContent(self, filter):
        result = {"class": []}
        
        for type_name, type_id in self.categories.items():
            result["class"].append({
                "type_id": str(type_id),
                "type_name": type_name
            })
        
        try:
            ret = self._fetch(f"{self.api_base}/v1/rank", {
                "cat": 1,
                "size": 8
            })
            
            result["list"] = []
            for item in ret.get("data", []):
                result["list"].append({
                    "vod_id": f"{item.get('cat', 1)}_{item.get('ent_id', '')}",
                    "vod_name": item.get("title", ""),
                    "vod_pic": item.get("cover", ""),
                    "vod_remarks": item.get("upinfo", ""),
                    "vod_content": item.get("description", "")
                })
        except Exception as e:
            print(f"获取首页推荐失败: {e}")
            result["list"] = []
        
        return result
    
    def homeVideoContent(self):
        return {'list': []}
    
    def categoryContent(self, cid, pg, filter, ext):
        videos = []
        
        try:
            tid = int(cid)
            page = int(pg) if pg and str(pg).isdigit() else 1
            size = 21
            
            ret = self._fetch(f"{self.api_base}/v1/filter/list", {
                "catid": tid,
                "size": size,
                "pageno": page
            })
            
            data = ret.get("data", {})
            movies = data.get("movies", [])
            total = data.get("total", 0)
            
            for movie in movies:
                vod = {
                    "vod_id": f"{tid}_{movie.get('id', '')}",
                    "vod_name": movie.get("title", ""),
                    "vod_pic": "",
                    "vod_remarks": movie.get("doubanscore", "") or movie.get("comment", "")
                }
                
                pic = movie.get("cdncover", "") or movie.get("cover", "")
                if pic and not pic.startswith(('http://', 'https://')):
                    pic = f"https:{pic}"
                vod["vod_pic"] = pic
                
                videos.append(vod)
            
            pagecount = max(1, (total + size - 1) // size)
            
            result = {
                'list': videos,
                'page': page,
                'pagecount': pagecount,
                'limit': size,
                'total': total
            }
            
        except Exception as e:
            print(f"获取分类内容失败: {e}")
            result = {
                'list': [],
                'page': 1,
                'pagecount': 1,
                'limit': 21,
                'total': 0
            }
        
        return result
    
    def detailContent(self, ids):
        if not ids:
            return {'list': []}
        
        videos = []
        
        try:
            id_list = ids if isinstance(ids, list) else [ids]
            
            for video_id in id_list:
                parts = video_id.split('_', 2)
                if len(parts) < 2:
                    continue
                    
                cat, vid = parts[0], parts[1]
                
                ret = self._fetch(f"{self.api_base}/v1/detail", {
                    "cat": cat,
                    "id": vid
                })
                
                data = ret.get("data", {})
                
                vod = {
                    "vod_id": video_id,
                    "vod_name": data.get("title", ""),
                    "vod_pic": data.get("cdncover", ""),
                    "type_name": data.get("moviecategory", [""])[-1] if data.get("moviecategory") else "",
                    "vod_year": data.get("pubdate", ""),
                    "vod_area": ", ".join(data.get("area", [])),
                    "vod_remarks": data.get("doubanscore", ""),
                    "vod_actor": ", ".join(data.get("actor", [])),
                    "vod_director": ", ".join(data.get("director", [])),
                    "vod_content": data.get("description", ""),
                    "vod_play_from": "",
                    "vod_play_url": ""
                }
                
                if len(id_list) == 1:
                    if self.blocked_sites:
                        vod["vod_content"] += f"\n\n【已屏蔽线路】{', '.join(self.blocked_sites)}"
                    
                    play_forms = []
                    play_urls = []
                    collected_sites = {}
                    
                    all_sites = data.get("playlink_sites", []) or list(data.get("playlinksdetail", {}).keys())
                    
                    # 首先收集所有站点的播放信息
                    for site in all_sites:
                        site_name = self.site_names.get(site, site.upper())
                        
                        if self.is_blocked_site(site_name):
                            print(f"[屏蔽] 跳过线路: {site_name}")
                            continue
                        
                        play_url_list = []
                        episodes = data.get("allepidetail", {}).get(site, [])
                        total_ep = int(data.get("allupinfo", {}).get(site, 0) or 0)
                        
                        if not episodes and total_ep > 0:
                            try:
                                site_params = {
                                    "cat": cat,
                                    "id": vid,
                                    "site": site,
                                    "start": 1,
                                    "end": min(50, total_ep)
                                }
                                site_ret = self._fetch(f"{self.api_base}/v1/detail", site_params)
                                episodes = site_ret.get("data", {}).get("allepidetail", {}).get(site, [])
                            except Exception as e:
                                print(f"获取站点 {site} 数据失败: {e}")
                        
                        if episodes:
                            if len(episodes) < total_ep and total_ep > 50:
                                page_size = 50
                                for page in range(1, (total_ep + page_size - 1) // page_size):
                                    start = page * page_size + 1
                                    end = min(start + page_size - 1, total_ep)
                                    next_params = {
                                        "cat": cat,
                                        "id": vid,
                                        "start": start,
                                        "end": end,
                                        "site": site
                                    }
                                    try:
                                        next_ret = self._fetch(f"{self.api_base}/v1/detail", next_params)
                                        more_ep = next_ret.get("data", {}).get("allepidetail", {}).get(site, [])
                                        episodes.extend(more_ep)
                                    except Exception as e:
                                        continue
                            
                            for ep in episodes:
                                if ep.get("url") and ep.get("playlink_num"):
                                    clean_url = ep["url"].strip()
                                    
                                    if site == "youku":
                                        clean_url = self._get_youku_real_url(clean_url)
                                        if not clean_url:
                                            continue
                                    
                                    play_url_list.append(f"{ep['playlink_num']}${clean_url}")
                        
                        if not play_url_list and data.get("playlinksdetail", {}).get(site, {}).get("default_url"):
                            link = data["playlinksdetail"][site]
                            clean_url = link["default_url"].strip()
                            
                            if site == "youku":
                                clean_url = self._get_youku_real_url(clean_url)
                                if not clean_url:
                                    continue
                            
                            play_url_list.append(f"{site}${clean_url}")
                        
                        if play_url_list:
                            collected_sites[site_name] = "#".join(play_url_list)
                    
                    # 按照指定顺序组织线路：腾讯视频、哔哩哔哩、芒果TV、爱奇艺、优酷，其他在后面
                    ordered_sites = []
                    
                    # 添加优先级站点
                    for priority_site in self.site_priority:
                        if priority_site in collected_sites:
                            ordered_sites.append(priority_site)
                    
                    # 添加其他站点
                    for site_name in collected_sites:
                        if site_name not in ordered_sites:
                            ordered_sites.append(site_name)
                    
                    # 构建最终结果
                    for site_name in ordered_sites:
                        play_forms.append(site_name)
                        play_urls.append(collected_sites[site_name])
                    
                    if play_forms:
                        vod["vod_play_from"] = "$$$".join(play_forms)
                        vod["vod_play_url"] = "$$$".join(play_urls)
                        print(f"[360影视] 可用线路: {play_forms}")
                
                videos.append(vod)
        
        except Exception as e:
            print(f"获取详情失败: {e}")
            videos.append({
                "vod_id": ids[0] if isinstance(ids, list) else ids,
                "vod_name": "详情获取失败",
                "vod_content": f"错误: {str(e)[:100]}"
            })
        
        return {'list': videos}
    
    def playerContent(self, flag, id, vipFlags):
        # 提取原始播放地址
        play_url = id
        if '$' in id:
            play_url = id.split('$')[1]
        
        print(f"[播放器] 线路: {flag}")
        print(f"[播放器] 原始播放地址: {play_url}")
        
        # 特殊处理哔哩哔哩线路
        if "哔哩哔哩" in flag:
            print(f"[播放器] 检测到哔哩哔哩线路，进行特殊处理")
            # 使用专门的哔哩哔哩解析方法
            video_url = self._get_bilibili_real_url(play_url)
            
            if video_url:
                print(f"[哔哩哔哩] 最终地址: {video_url}")
                
                # 判断是否需要解析
                parse_flag = 0
                
                # 如果是视频格式地址，不需要解析
                if self.isVideoFormat(video_url):
                    print(f"[哔哩哔哩] 视频格式地址，不需要解析")
                    parse_flag = 0
                # 如果是解析接口的URL，需要解析
                elif video_url.startswith(self.parse_api):
                    print(f"[哔哩哔哩] 解析接口地址，需要解析")
                    parse_flag = 1
                # 其他情况，需要解析
                else:
                    print(f"[哔哩哔哩] 其他类型地址，需要解析")
                    parse_flag = 1
                
                # 添加哔哩哔哩特定的headers
                bilibili_headers = self.headers.copy()
                bilibili_headers.update({
                    "Referer": "https://www.bilibili.com",
                    "Origin": "https://www.bilibili.com"
                })
                
                return {
                    "parse": parse_flag,      # 是否需要解析
                    "jx": parse_flag,         # 是否需要解析
                    "url": video_url,
                    "header": json.dumps(bilibili_headers)
                }
        
        # 特殊处理优酷线路 - 简化处理，直接返回原始地址让播放器解析
        if "优酷" in flag or "youku" in flag.lower():
            print(f"[播放器] 检测到优酷线路，简化处理")
            
            # 处理优酷的特殊情况
            if "gitee.com/nm_nm/interface/raw/master/fail/fail" in play_url:
                print(f"检测到gitee错误链接，尝试修复: {play_url}")
                real_url = self._get_youku_real_url(play_url)
                if real_url:
                    play_url = real_url
            
            print(f"[优酷] 最终使用地址: {play_url}")
            
            # 对于优酷，我们直接返回原始地址，让播放器内置的解析器处理
            # 设置 parse=1 和 jx=1 表示需要解析
            youku_headers = self.headers.copy()
            youku_headers.update({
                "Referer": "https://v.youku.com",
                "Origin": "https://v.youku.com"
            })
            
            return {
                "parse": 1,      # 需要解析
                "jx": 1,         # 需要解析
                "url": play_url,
                "header": json.dumps(youku_headers)
            }
        
        # 处理其他线路
        # 使用内置解析接口解析播放地址
        if play_url and play_url.startswith(('http://', 'https://')):
            try:
                # 对播放地址进行URL编码
                encoded_url = quote(play_url, safe='')
                # 拼接解析接口
                parsed_url = f"{self.parse_api}{encoded_url}"
                print(f"[播放器] 解析接口地址: {parsed_url}")
                
                # 尝试获取解析后的真实地址
                response = self.session.get(parsed_url, timeout=10)
                response.encoding = 'utf-8'
                
                # 检查响应内容
                content = response.text
                print(f"[播放器] 解析接口响应长度: {len(content)}")
                
                # 如果响应是JSON格式，尝试解析
                if content.strip().startswith('{') or content.strip().startswith('['):
                    try:
                        result = json.loads(content)
                        if isinstance(result, dict) and "url" in result:
                            final_url = result["url"]
                            print(f"[播放器] 从JSON中提取的地址: {final_url}")
                        else:
                            final_url = parsed_url
                    except:
                        final_url = parsed_url
                # 如果响应看起来像是一个视频地址
                elif self.isVideoFormat(content) or any(x in content.lower() for x in ['m3u8', 'mp4', 'flv', 'ts', 'mpd']):
                    final_url = content.strip()
                    print(f"[播放器] 解析到视频流地址: {final_url[:100]}...")
                # 如果响应是HTML，可能是重定向页面
                elif '<html' in content.lower() or '<script' in content.lower():
                    # 尝试提取可能的视频地址
                    patterns = [
                        r'src="([^"]+\.(m3u8|mp4|flv|mpd)[^"]*)"',
                        r'url="([^"]+\.(m3u8|mp4|flv|mpd)[^"]*)"',
                        r'file="([^"]+\.(m3u8|mp4|flv|mpd)[^"]*)"',
                        r'video.*src="([^"]+)"',
                        r'http[s]?://[^\s<>"\']+\.(m3u8|mp4|flv|mpd)[^\s<>"\']*'
                    ]
                    
                    final_url = parsed_url
                    for pattern in patterns:
                        match = re.search(pattern, content, re.IGNORECASE)
                        if match:
                            found_url = match.group(1) if match.groups() else match.group(0)
                            if found_url.startswith('http'):
                                final_url = found_url
                                print(f"[播放器] 从HTML中提取的视频地址: {final_url}")
                                break
                else:
                    final_url = parsed_url
                
                # 判断是否需要解析
                parse_flag = 0
                if final_url.startswith(self.parse_api) or not self.isVideoFormat(final_url):
                    parse_flag = 1
                
                return {
                    "parse": parse_flag,      # 是否需要解析
                    "jx": parse_flag,         # 是否需要解析
                    "url": final_url,
                    "header": json.dumps(self.headers)
                }
                
            except Exception as e:
                print(f"[播放器] 解析失败，使用原始解析接口地址: {e}")
                return {
                    "parse": 0,
                    "jx": 0,
                    "url": parsed_url,
                    "header": json.dumps(self.headers)
                }
        else:
            # 如果不是有效的URL，直接返回原始地址
            print(f"[播放器] 不是有效的URL，直接返回: {play_url}")
            return {
                "parse": 1,      # 需要解析
                "jx": 1,         # 需要解析
                "url": play_url,
                "header": json.dumps(self.headers)
            }
    
    def searchContent(self, key, quick, pg="1"):
        videos = []
        
        try:
            page = int(pg) if pg and str(pg).isdigit() else 1
            
            response = self.session.get(f"{self.search_base}/index", params={
                "kw": key
            }, timeout=15)
            
            response.encoding = 'utf-8'
            ret = response.json()
            
            if ret.get("data", {}).get("longData", {}).get("rows"):
                for row in ret["data"]["longData"]["rows"]:
                    videos.append({
                        "vod_id": f"{row.get('cat_id', '')}_{row.get('en_id', '')}",
                        "vod_name": row.get("titleTxt", ""),
                        "vod_pic": row.get("cover", ""),
                        "vod_remarks": row.get("coverInfo", {}).get("txt", ""),
                        "year": row.get("year", "")
                    })
            
            result = {
                'list': videos,
                'page': page,
                'pagecount': 1,
                'limit': 90,
                'total': len(videos)
            }
            
        except Exception as e:
            print(f"搜索失败: {e}")
            result = {
                'list': [],
                'page': 1,
                'pagecount': 1,
                'limit': 90,
                'total': 0
            }
        
        return result
    
    def searchContentPage(self, key, quick, pg=1):
        return self.searchContent(key, quick, pg)
    
    def localProxy(self, params):
        return None