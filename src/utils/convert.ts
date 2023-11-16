export function convertArrayToObject(inputArray, header) {
  const resultObject = {};

  for (let i = 0; i < header.length; i++) {
    resultObject[header[i]] = inputArray[i];
  }

  return resultObject;
}
