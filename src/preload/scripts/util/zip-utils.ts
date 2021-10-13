import JSZip from 'jszip'
import fs from 'fs/promises'

export default async function getZipItemURL(url: string, itemRelativeUrl: string) {
  const zip = new JSZip();
  const data = await fs.readFile(url);
  const result = await zip.loadAsync(data);
  const blob = await result.files[itemRelativeUrl].async('blob');
  return URL.createObjectURL(blob);
}