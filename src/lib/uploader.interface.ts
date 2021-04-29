export interface Uploader {
  upload(file: File, name: string): Promise<string>;
  exists(name: string): Promise<boolean>;
}
