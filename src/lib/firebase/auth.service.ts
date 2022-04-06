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

  authStateResolved(): Promise<firebase.User> {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(async (user) => {
        console.log("changed", user);
        if (!user) {
          await this.authenticate();
        } else {
          resolve(user);
        }
      });
    });
  }

  public async authenticate() {
    console.log("e?");
    await this.auth.signInWithPopup(authProvider);
  }
}
