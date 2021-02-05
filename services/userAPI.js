const apiUrl = 'http://192.168.1.169:5002/azure/identify';

export const checkUserAuth = (doorId, faceId) => {
  console.log(`${apiUrl}/${doorId}/${faceId}`);
  return sendRequest(`${apiUrl}/${doorId}/${faceId}`, {
    method: 'GET',
  });
};

function sendRequest(url, options) {
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
    })
    .catch((err) => console.log(err));
}
