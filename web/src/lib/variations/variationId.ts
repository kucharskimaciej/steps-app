import { hash } from "spark-md5";

export function createVariationId(): string {
  return hash(Math.random().toString());
}
