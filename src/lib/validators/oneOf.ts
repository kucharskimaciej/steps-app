import { helpers } from "vuelidate/lib/validators";

export function oneOf<T>(values: T[]) {
  return (value: T) => !helpers.req(value) || values.includes(value);
}
