<template>
  <GlobalStyles>
    <router-view></router-view>
  </GlobalStyles>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ComponentOptions } from "vue";
import GlobalStyles from "@/components/GlobalStyles.vue";
import { Inject } from "vue-typedi";
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
  }
}
</script>
