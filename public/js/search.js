(async () => {
  const pagefind = await import('/.pagefind/pagefind.js');
  window.search = query => pagefind.debouncedSearch(query, {}, 300);

  const event = new CustomEvent('pagefind:instance');
  dispatchEvent(event);
})();
