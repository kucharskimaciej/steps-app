<template>
  <GlobalStyles>
    <router-view></router-view>
  </GlobalStyles>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ComponentOptions } from "vue";
import GlobalStyles from "@/components/GlobalStyles.vue";
import { getModule } from "vuex-module-decorators";
import { AuthModule } from "@/store/modules/auth";
import { Container, Inject } from "vue-typedi";
import { StepsModule } from "@/store/modules/steps";
import { AuthService } from "@/lib/firebase/auth.service";

@Component({
  components: {
    GlobalStyles
  }
})
export default class App extends Vue implements ComponentOptions<Vue> {
  //private currentUser = getModule(CurrentUserModule, this.$store);
  private auth = getModule(AuthModule, this.$store);
  private steps = getModule(StepsModule, this.$store);

  @Inject() private firebaseAuth!: AuthService;

  get uid() {
    return this.auth.uid;
  }

  public async mounted() {
    await this.firebaseAuth.setup();

    if (this.firebaseAuth.currentUser) {
      await this.auth.handleAuthStateChange(this.firebaseAuth.currentUser.uid);
    }

    this.firebaseAuth.onAuthStateChange(async user => {
      await this.auth.handleAuthStateChange(user ? user.uid : "");

      if (!user) {
        await this.firebaseAuth.authenticate();
      } else {
        await this.steps.fetchAllSteps();
      }
    });
  }
}
</script>
