// mathjax-inject.js
// No data stored, simple script. 
// Necessary for obtaining the LaTeX code via MathJax API for MathJax v3 and v4.
(function() {
  function getLatexForContainer(mjxContainer) {
    console.log('[HoverLatex][Injected] getLatexForContainer called', mjxContainer);
    if (typeof MathJax !== 'undefined' && MathJax.startup && MathJax.startup.document && MathJax.startup.document.math) {
      let current = MathJax.startup.document.math.list;
      const targetHTML = mjxContainer.innerHTML;
      while (current && current.data) {
        const mathItem = current.data;
        if (mathItem.typesetRoot && mathItem.typesetRoot.innerHTML === targetHTML) {
          if (mathItem.math && typeof mathItem.math === 'string') {
            console.log('[HoverLatex][Injected] Found LaTeX:', mathItem.math);
            return mathItem.math.trim();
          }
        }
        current = current.next;
        if (current === MathJax.startup.document.math.list) break;
      }
    } else {
      console.log('[HoverLatex][Injected] MathJax v3 not found or not ready');
    }
    return null;
  }

  document.addEventListener('mouseover', function(e) {
    const mjx = e.target.closest('mjx-container');
    if (mjx) {
      console.log('[HoverLatex][Injected] mouseover on mjx-container', mjx);
      const latex = getLatexForContainer(mjx);
      if (latex) {
        window.postMessage({ type: 'HoverLatex_MathJaxV3', latex, mjxId: mjx.getAttribute('ctxtmenu_counter') }, '*');
        console.log('[HoverLatex][Injected] Posted message with LaTeX:', latex);
      } else {
        console.log('[HoverLatex][Injected] No LaTeX found for mjx-container');
      }
    }
  }, true);

  document.addEventListener('click', function(e) {
    const mjx = e.target.closest('mjx-container');
    if (mjx) {
      console.log('[HoverLatex][Injected] click on mjx-container', mjx);
      const latex = getLatexForContainer(mjx);
      if (latex) {
        window.postMessage({ type: 'HoverLatex_MathJaxV3', latex, mjxId: mjx.getAttribute('ctxtmenu_counter') }, '*');
        console.log('[HoverLatex][Injected] Posted message with LaTeX:', latex);
      } else {
        console.log('[HoverLatex][Injected] No LaTeX found for mjx-container');
      }
    }
  }, true);
})();
