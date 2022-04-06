import { SetupContext } from "vue";

export function useModalView(ctx: SetupContext<any>) {
  return {
    close() {
      ctx.emit("close");
    },
  };
}
