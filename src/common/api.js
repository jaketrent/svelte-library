import { bookApiUrl } from './config.js'

export function httpGet(url) {
  return req(url)
}

export function httpPost(url, data) {
  return req(url, 'POST', data)
}

export function httpPut(url, data) {
  return req(url, 'PUT', data)
}

async function req(url, method = 'GET', data) {
  const res = await fetch(bookApiUrl + url, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: data && JSON.stringify(data)
  })
  const json = await res.json()
  return { ok: res.ok, data: json }
}
