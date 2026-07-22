document.addEventListener('DOMContentLoaded', () => {
  const getCopyButton = () => {
    const button = document.createElement("div")
    button.textContent = '复制代码'
    button.className = 'copy-button'
    return button
  }

  const codeBlocks = document.querySelectorAll('figure.highlight')

  codeBlocks.forEach((codeBlock) => {
    const copyButton = getCopyButton();
    copyButton.onclick = async () => {
      try {
        const codeEl = codeBlock.querySelector('code');
        if (!codeEl) throw new Error('no code element');
        await navigator.clipboard.writeText(codeEl.innerText);
        copyButton.innerText = '已复制!'
      } catch {
        copyButton.innerText = '发生错误'
      } finally {
        setTimeout(() => {
          copyButton.innerText = '复制代码'
        }, 1000)
      }
    }
    codeBlock.appendChild(copyButton)
  })
})
