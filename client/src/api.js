const API = import.meta.env.VITE_API || 'http://localhost:4000/api';
let token = localStorage.getItem('token') || '';

export function setToken(t){ token = t; localStorage.setItem('token', t); }

// async function req(path, method='GET', body, isForm=false){
//   const headers = isForm ? {} : { 'Content-Type':'application/json', 'Authorization': token ? 'Bearer '+token : '' };
//   const res = await fetch(API + path, { method, headers, body: isForm ? body : (body ? JSON.stringify(body) : undefined) });
//   if(!res.ok) throw new Error((await res.json()).message || 'Request failed');
//   return res.json();
// }

async function req(path, method = 'GET', body, isForm = false) {
  // Always include Authorization if we have a token
  const headers = {
    ...(isForm ? {} : { 'Content-Type': 'application/json' }),
    ...(token ? { 'Authorization': 'Bearer ' + token } : {})
  };

  const res = await fetch(API + path, {
    method,
    headers,
    body: isForm ? body : (body ? JSON.stringify(body) : undefined)
  });

  if (!res.ok) throw new Error((await res.json()).message || 'Request failed');
  return res.json();
}


export const api = {
  register: (data) => req('/auth/register','POST',data),
  login: (data) => req('/auth/login','POST',data),
  createAlbum: (data) => req('/albums','POST',data),
  listAlbums: () => req('/albums'),
  uploadImages: (id, files) => {
    const form = new FormData();
    [...files].forEach(f => form.append('images', f));
    return req(`/albums/${id}/images`,'POST',form,true);
  },
  autoLayout: (id, payload) => req(`/albums/${id}/auto-layout`,'POST',payload),
  getComments: (id) => req(`/albums/${id}/comments`),
  addComment: (id, payload) => req(`/albums/${id}/comments`,'POST',payload),
  updatePage: (id, index, payload) => req(`/albums/${id}/pages/${index}`,'PUT',payload),
  approve: (id) => req(`/albums/${id}/approve`,'POST')
}
