import "vuelidate";

declare module "vuelidate" {
  interface Validation {
    $each?: {
      [index: number]: Validation;
      $iter: Validation;
    };
  }
}
