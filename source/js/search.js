// 搜索功能：加载搜索索引并提供实时搜索
// IIFE 封装，仅将 searchInitialize 挂到 window 供模板内联脚本调用
;(function () {
  const searchBtn = document.querySelector('#search-btn')
  const searchIpt = document.querySelector('#search-input')
  const searchResult = document.querySelector('#search-result')
  const searchClearBtn = document.querySelector('#search-clear')
  const searchMask = document.querySelector('#search-mask')

  let searchStatus = 0

  function showSearchDialog() {
    if (searchStatus) return
    searchMask.style.display = 'block'
    document.body.style.overflow = 'hidden'
    searchIpt.focus()
    searchStatus = 1
  }

  function closeSearchDialog() {
    if (!searchStatus) return
    searchMask.style.display = 'none'
    document.body.style.overflow = ''
    searchIpt.value = ''
    searchStatus = 0
  }

  function searchInitialize(url) {
    // 入口判空：缺少任一关键元素直接退出，避免后续抛错
    if (!searchBtn || !searchMask || !searchIpt || !searchResult || !searchClearBtn) return

    // 快捷键绑在 fetch 之前，索引加载失败也能用 Ctrl+K / Esc 打开/关闭弹窗
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        if (searchStatus) closeSearchDialog()
        else showSearchDialog()
      }
      if (e.key === 'Escape') closeSearchDialog()
    })

    // fetch 增加 8s 超时（AbortController），失败时降级提示
    const controller = new AbortController()
    const timer = setTimeout(() => { controller.abort() }, 8000)
    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error('HTTP ' + res.status)
        return res.json()
      })
      .then(res => {
        clearTimeout(timer)

        const inputHandler = debounce(doSearch)

        searchBtn.style.display = 'flex'

        searchClearBtn.addEventListener('click', () => {
          searchIpt.value = ''
          clearResult()
        })

        searchBtn.addEventListener('click', () => {
          showSearchDialog()
        })

        searchBtn.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            showSearchDialog()
          }
        })

        searchMask.addEventListener('click', e => {
          if (e.target !== searchMask) return
          closeSearchDialog()
        })

        searchIpt.addEventListener('input', inputHandler.bind(searchIpt, res))
      })
      .catch(err => {
        clearTimeout(timer)
        console.error('search index load failed:', err)
        if (searchResult) searchResult.innerHTML = '<div class="search-error">搜索索引加载失败</div>'
      })
  }

  function clearResult() {
    searchResult.innerHTML = ''
  }

  function doSearch(data) {
    if (this.value.trim().length <= 0) return clearResult()

    const keywords = this.value.trim().toLowerCase().split(/[\s\-]+/).filter(Boolean);

    const result = search(data, keywords)

    renderSearchResult(result, searchResult)
  }

  function search(data, keywords) {
    const matchedPost = []

    data
      .filter(post => post.content)
      .forEach(post => {
        let postTitle = post.title && post.title.trim()
        postTitle = (postTitle && postTitle.length > 0) ? postTitle : 'Untitled'

        const postContent = post.content.trim().replace(/<[^>]+>/g, '')

        const lowerTitle = postTitle.toLowerCase()
        const lowerContent = postContent.toLowerCase()

        const matchedContentIndices = []

        keywords.forEach((keyword, i) => {
          const index_title = lowerTitle.indexOf(keyword);
          const index_content = lowerContent.indexOf(keyword);

          if (index_title < 0 && index_content < 0) return

          // 仅在正文命中时记录位置，标题命中用 -1 标记（取正文开头）
          matchedContentIndices.push(index_content >= 0 ? index_content : 0)
        });

        if (matchedContentIndices.length) matchedPost.push({
          url: post.url,
          content: trimContent(matchedContentIndices, postContent, keywords),
          title: postTitle
        })
      });

    return matchedPost
  }

  function renderSearchResult(result, el) {
    el.innerHTML = ''

    if (!result || result.length <= 0) {
      el.innerHTML = '<div class="search-result-empty">无结果</div>'
      return
    }

    const list = document.createDocumentFragment()
    result.forEach(res => {
      const item = document.createElement('a')
      item.className = 'search-result-item'
      item.href = res.url

      const title = document.createElement('div')
      title.className = 'search-result__head'
      title.innerText = res.title

      const content = document.createElement('div')
      content.className = 'search-result__body'
      res.content.forEach(contentText => {
        const contentItem = document.createElement('div')
        contentItem.innerHTML = contentText
        content.appendChild(contentItem)
      })

      item.append(title, content)
      list.append(item)
    })

    el.appendChild(list)
  }

  function trimContent(keyIndexs, content, keywords, wordLen = 20) {
    // 不使用 d 标志（hasIndices），兼容更多浏览器；手动计算区间
    const reg = /[\u4e00-\u9fa5]|\w+/g
    const splitIndex = []
    let arr
    while ((arr = reg.exec(content)) !== null)
      splitIndex.push([arr.index, arr.index + arr[0].length])

    return keyIndexs.map(key => {
      // 内容无可用词元（纯标点/emoji 等）时，直接截取开头作为摘要
      if (splitIndex.length === 0) {
        let snippet = content.slice(0, wordLen * 2)
        snippet = snippet.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        return highlightKeyword(snippet, keywords)
      }

      const pos = binaryFind(splitIndex, key)
      const wordStart = Math.max(0, pos - 10)
      const wordEnd = Math.min(wordLen + wordStart, splitIndex.length - 1)
      const start = splitIndex[wordStart][0]
      const end = splitIndex[wordEnd][1]
      let snippet = content.slice(start, end)
      // 先转义 HTML，避免摘要中的 < > & 被当作标签解析（XSS 防护）
      snippet = snippet.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      return highlightKeyword(snippet, keywords)
    })
  }

  function highlightKeyword(snippet, keywords) {
    keywords.forEach(keyword => {
      // 转义正则元字符，避免用户输入 ( ) [ ] * 等导致报错
      const safe = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      snippet = snippet.replace(new RegExp(safe, 'ig'),
        function (m) { return '<span class="search-keyword">' + m + '</span>' })
    })
    return snippet
  }

  function binaryFind(arr, value) {
    let i = 0, j = arr.length - 1, mid = j
    while (i <= j) {
      if (value < arr[mid][0]) j = mid - 1;
      else if (value > arr[mid][1]) i = mid + 1
      else return mid
      mid = Math.floor((i + j) / 2)
    }
    return mid
  }

  function debounce(fn, t = 400) {
    let timer = null
    return function (...args) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.call(this, ...args)
      }, t)
    }
  }

  window.searchInitialize = searchInitialize
})();
