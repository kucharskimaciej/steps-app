import router from "./router";
import { authenticate } from "@/router/authenticate.guard";

router.beforeEach(authenticate);

export default router;
export * from "@/router/routes";
