import * as fsPromise from 'fs/promises';
import * as path from 'path';

export async function isExists(path: string) {
  try {
    await fsPromise.access(path);
    return true;
  } catch {
    return false;
  }
}

export async function writeFile(filePath: string, data: any) {
  try {
    const dirname = path.dirname(filePath);
    const exist = await isExists(dirname);
    if (!exist) {
      await fsPromise.mkdir(dirname, { recursive: true });
    }
    if (!( await isExists(filePath))) {
      await fsPromise.writeFile(filePath, data, 'utf8');
    }
  } catch (err) {
    throw new Error(err);
  }
}
