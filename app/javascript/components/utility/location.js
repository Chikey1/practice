// document is unavailable during server side rendering
const location = typeof document !== 'undefined' ? document.location : {}
export default location

export const navigateTo = (url) => {
  window.location.href = url
}
