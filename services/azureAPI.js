// const key = 'dab23811cac547258589f18bd4aaf214'; // Mine
const key = '6df147ede473450d9c66ac50d3ba8d04'; // Matthieu
const loc = 'westeurope.api.cognitive.microsoft.com'; // replace with the server nearest to you
const params =
  'detect?returnFaceId=true&recognitionModel=recognition_02&detectionModel=detection_02';

export const detectFace = async (octetStream) => {
  console.log(`https://${loc}/face/v1.0/${params}`);
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
