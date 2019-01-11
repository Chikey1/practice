const csrfToken =  document.querySelector('meta[name=csrf-token]').getAttribute('content')
const defaultHeaders = {
  'Content-Type': 'application/json',
  'X-CSRF-Token': csrfToken,
}

export function post (uri, data, optionalHeaders = {}) {
  return fetch(uri, {
    method: 'POST',
    headers: Object.assign({}, defaultHeaders, optionalHeaders),
    body: JSON.stringify(data),
  })
}
