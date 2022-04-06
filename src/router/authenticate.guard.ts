import { Container } from "typedi";
import { NavigationGuard } from "vue-router";
import { AuthService } from "@/lib/firebase/auth.service";
import { dispatchHandleAuthStateChange, provideStore } from "@/store";

export const authenticate: NavigationGuard = async (to, from, next) => {
  if (to.meta?.public) {
    next();
  } else {
    const authService = Container.get(AuthService);
    const $store = provideStore();

    if (authService.currentUser) {
      await dispatchHandleAuthStateChange($store, authService.currentUser.uid);
    }

    await authService.authStateResolved();
    next();

    // authService.onAuthStateChange(async user => {
    //   try {
    //     await dispatchHandleAuthStateChange($store, user ? user.uid : "");
    //
    //     if (!user) {
    //       await authService.authenticate();
    //     } else {
    //       next();
    //     }
    //   } catch (e) {
    //     next();
    //   }
    // });
  }
};
