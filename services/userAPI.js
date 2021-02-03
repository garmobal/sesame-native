const apiUrl = 'localhost:5002/azure/register';

export const checkRegistrationCode = (code) => {
  return fetchUser(`${apiUrl}/${code}`, {
    method: 'GET',
  });
};

export const registerUser = (id, images) => {
  return fetchUser(`${apiUrl}/images/${id}`, {
    method: 'PUT',
    headers: {
      // 'Content-Type': 'application/json',
      'Content-Type': 'application/octet-stream',
    },
    body: images,
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
  // .catch((err) => console.log(err));
}
