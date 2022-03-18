import { StepDTO, Step } from "../../common/types/Step";
import { VueRouter } from "vue-router/types/router";
import { ROUTES } from "@/router/routes";

export function ShortLinkFilter(
  step: StepDTO | Step,
  $router: VueRouter
): string {
  const { resolved } = $router.resolve({
    name: ROUTES.PUBLIC_STEP,
    params: { stepId: step.id }
  });
  return `${window.location.origin}${resolved.fullPath}`;
}
