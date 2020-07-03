<template>
  <GlobalStyles>
    <router-view></router-view>
  </GlobalStyles>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ComponentOptions } from "vue";
import GlobalStyles from "@/components/GlobalStyles.vue";
import { dispatchHandleAuthStateChange } from "@/store/modules/auth";
import { Inject } from "vue-typedi";
import { dispatchFetchAllSteps } from "@/store/modules/steps";
import { AuthService } from "@/lib/firebase/auth.service";

@Component({
  components: {
    GlobalStyles
  }
})
export default class App extends Vue implements ComponentOptions<Vue> {
  @Inject() private firebaseAuth!: AuthService;

  public async mounted() {
    await this.firebaseAuth.setup();

    if (this.firebaseAuth.currentUser) {
      await dispatchHandleAuthStateChange(
        this.$store,
        this.firebaseAuth.currentUser.uid
      );
    }

    this.firebaseAuth.onAuthStateChange(async user => {
      await dispatchHandleAuthStateChange(this.$store, user ? user.uid : "");

      if (!user) {
        await this.firebaseAuth.authenticate();
      } else {
        await dispatchFetchAllSteps(this.$store);
      }
    });
  }
}
</script>
