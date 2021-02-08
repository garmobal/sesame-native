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
