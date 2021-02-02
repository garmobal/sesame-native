import axios from 'axios'; // for making requests to the cognitive services API

const key = 'dab23811cac547258589f18bd4aaf214';
const loc = 'westeurope.api.cognitive.microsoft.com'; // replace with the server nearest to you

const azureOptions = {
  baseURL: `https://${loc}/face/v1.0`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/octet-stream',
    'Ocp-Apim-Subscription-Key': key,
  },
};

export default async (octetStream) => {
  const faceDetectInstance = axios.create(azureOptions);

  const faceDetectRes = await faceDetectInstance.post(
    '/detect?returnFaceId=true&returnFaceAttributes=smile',
    octetStream,
  );
  return faceDetectRes;
};
