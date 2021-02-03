const key = 'dab23811cac547258589f18bd4aaf214';
const loc = 'westeurope.api.cognitive.microsoft.com'; // replace with the server nearest to you
const params = 'detect?returnFaceId=true&returnFaceAttributes=smile';

export const detectFace = async (octetStream) => {
  const res = await fetch(`https://${loc}/face/v1.0/${params}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      'Ocp-Apim-Subscription-Key': key,
    },
    body: octetStream,
  });
  const faceDetectRes = await res.json();
  return faceDetectRes;
};
