import { Service } from "typedi";
import { firebase, authProvider } from "@/lib/firebase/firebase";

@Service()
export class AuthService {
  get auth() {
    return firebase.auth();
  }

  setup() {
    this.auth
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .catch(() => /*noop*/ void 0);
  }

  get currentUser(): firebase.User | null {
    return this.auth.currentUser;
  }

  public onAuthStateChange(cb: (user: firebase.User | null) => void): void {
    this.auth.onAuthStateChanged(cb);
  }

  public async authenticate() {
    await this.auth.signInWithPopup(authProvider);
  }
}
