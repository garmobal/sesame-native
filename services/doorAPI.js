import serverURL from './serverURL';
const apiUrl = `${serverURL}/door/list`;

export const getDoors = () => {
  return fetchDoors(apiUrl, {
    method: 'GET',
  });
};

function fetchDoors(url, options) {
  return fetch(url, options)
    .then((res) => {
      console.log('response -> ', res);
      if (res && res.status < 400) {
        return res;
      } else {
        return res;
      }
    })
    .then((res) => {
      console.log('response 2 -> ', res);
      if (res && res.status !== 204) {
        return res.json();
      } else {
        return res;
      }
    })
    .catch((err) => {
      console.log('error from doorAPI -> ', err);
      throw err;
    });
}
