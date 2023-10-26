import * as fsPromise from 'fs/promises';
import * as path from 'path';
export const saveCsvToFile = async (outputPath: string, csvData: string) => {
  const filePath = path.join(outputPath);
  await fsPromise.writeFile(filePath, csvData);
};
