// const apiUrl = 'localhost:5002/azure/register';
const apiUrl = '192.168.1.169:5000/azure/register';

export const checkRegistrationCode = (code) => {
  return fetchUser(`${apiUrl}/${code}`, {
    method: 'GET',
  });
};
export const registerUser = (id, img) => {
  return fetchUser(`/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/octet-stream',
    },
    body: img,
  });
};

function fetchUser(url, options) {
  return fetch(url, options)
    .then((res) => {
      if (res.status < 400) {
        return res;
      } else {
        Promise.reject(res);
      }
    })
    .then((res) => {
      if (res.status !== 204) {
        return res.json();
      } else {
        return res;
      }
    });
}
