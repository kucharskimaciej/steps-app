import { Service } from "vue-typedi";
import { ArrayBuffer as HashBuffer } from "spark-md5";

@Service()
export class FileIdentityService {
  private readonly CHUNK_SIZE = 1024 * 512; // 512kb chunks

  getIdentifier(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      const chunks = this.chunks(file);
      const spark = new HashBuffer();

      function next() {
        const nextChunk = chunks.next().value;
        if (nextChunk) {
          fileReader.readAsArrayBuffer(nextChunk);
        } else {
          resolve(spark.end());
        }
      }

      fileReader.onload = event => {
        spark.append(event.target?.result as ArrayBuffer);
        next();
      };
      fileReader.onerror = reject;

      next();
    });
  }

  private getTotalNumberOfChunks(file: File): number {
    return Math.ceil(file.size / this.CHUNK_SIZE);
  }

  private nthChunk(n: number, file: File): Blob {
    const start = n * this.CHUNK_SIZE;
    const end =
      start + this.CHUNK_SIZE >= file.size
        ? file.size
        : start + this.CHUNK_SIZE;

    return file.slice(start, end);
  }

  private *chunks(file: File): Generator<Blob, void, void> {
    const n = this.everyNthChunk(file);
    const totalChunks = this.getTotalNumberOfChunks(file);
    for (let i = 0; i < totalChunks; i++) {
      if (i % n === 0) {
        yield this.nthChunk(i, file);
      }
    }
  }

  private everyNthChunk(file: File): number {
    const magic = Math.E / Math.PI;
    return Math.max(
      Math.round(magic * Math.sqrt(this.getTotalNumberOfChunks(file))),
      1
    );
  }
}
