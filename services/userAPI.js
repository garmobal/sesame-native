import serverURL from './serverURL';
const apiUrl = `${serverURL}/azure`;

export const checkUserAuth = (doorId, faceId) => {
  return sendRequest(`${apiUrl}/identify/${doorId}/${faceId}`, {
    method: 'GET',
  });
};

export const checkRegistrationCode = (code) => {
  return sendRequest(`${apiUrl}/register/${code}`, {
    method: 'GET',
  });
};

// const aid = '022c4ae2-c730-4488-bbab-825441367e8a';
export const registerUser = (id, images) => {
  // return fetchUser('192.168.1.169:5001/azure/register/1234');
  return sendRequest(
    'http://192.168.1.169:5001/azure/register/022c4ae2-c730-4488-bbab-825441367e8a',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/octet-stream',
      },
      body: JSON.stringify(images),
    },
  );
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
    });
  // .catch((err) => console.log(err));
}
