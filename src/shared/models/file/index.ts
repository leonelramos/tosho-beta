export default class FileModel {
  id: string;
  url: string;
  name: string;
  dateCreate: string;
  size: string;
  type: string;
  ext: string;

  constructor(id: string, fileInfo: FileInfo) {
    this.id = id;
    this.url = fileInfo.url;
    this.name = fileInfo.name;
    this.type = fileInfo.type;
    this.ext = fileInfo.ext;
    this.dateCreate = fileInfo.dateCreated;
    this.size = fileInfo.size;
  }
}

export interface FileInfo {
  url: string,
  name: string,
  type: string,
  ext: string,
  dateCreated: string,
  size: string
}