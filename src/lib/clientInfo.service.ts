import { Service } from "typedi";

@Service()
export class ClientInfo {
  get height(): number {
    return window.innerHeight;
  }
  get width(): number {
    return window.innerWidth;
  }
  get aspectRatio(): number {
    return this.width / this.height;
  }
}
