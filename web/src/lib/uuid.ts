import { hash } from "spark-md5";

export function uuid(): string {
  return hash(Math.random().toString());
}
