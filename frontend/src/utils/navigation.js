export function getCurrentPage() {
  const params = new URLSearchParams(window.location.search)
  return params.get('page') || 'home'
}

export function hrefForPage(page, hash = '') {
  const url = new URL(window.location.href)
  if (!page || page === 'home') url.searchParams.delete('page')
  else url.searchParams.set('page', page)
  url.hash = hash || ''
  return `${url.pathname}${url.search}${url.hash}`
}

export function navigateTo(page, hash = '') {
  const next = hrefForPage(page, hash)
  window.history.pushState({}, '', next)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

