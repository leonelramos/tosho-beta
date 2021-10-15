import { BookModel } from "@/shared/models/book";

export interface IPathApi {
  resolve(url: string, ...pathArgs: string[]): string;
  join(url: string, ...pathArgs: string[]): string;
  rendererPath: string;
}

export interface IEnvApi {
  isDevelopment: boolean;
}

export interface IBookApi {
  render(url: string): void;
  importFolder(url: string): Promise<BookModel[]>
}

export interface ISystemApi {
  getDialogFolderUrl(): Promise<{ canceled: boolean, filePaths: string[], bookmarks?: string[] }>;
}

export interface IDbApi {
  getToshoLibrary(): BookModel[];
}

declare global {
  interface Window {
    pathApi: IPathApi,
    envApi: IEnvApi,
    bookApi: IBookApi,
    systemApi: ISystemApi,
    dbApi: IDbApi
  }
}