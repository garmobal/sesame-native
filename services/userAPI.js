import { SERVER_IP, PORT } from '@env';

const apiUrl = `${SERVER_IP}:${PORT}/azure`;

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

export const registerUser = (id, img) => {
  return sendRequest(`${apiUrl}/register/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/octet-stream',
    },
    body: img,
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
    });
}
