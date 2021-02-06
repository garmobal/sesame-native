// const apiUrl = 'localhost:5002/azure/register';
const apiUrl = '192.168.1.169:5005/azure/register';

export const checkRegistrationCode = (code) => {
  return fetchUser(`${apiUrl}/${code}`, {
    method: 'GET',
  });
};
// const aid = '022c4ae2-c730-4488-bbab-825441367e8a';
export const registerUser = (id, img) => {
  // return fetchUser('192.168.1.169:5001/azure/register/1234');
  return fetchUser(
    'http://192.168.1.169:4000/azure/register/26d247e1-4297-48cb-b502-fb3337ce40eb',
    {
      method: 'PUT',
      headers: {
        // 'Content-Type': 'application/json',
        'Content-Type': 'application/octet-stream',
      },
      body: img,
    },
  );
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
