import { ActionContext } from "vuex";
import { CurrentVideoState, RootState } from "@/store/types";
import { createModule } from "@/store/createModule";
import { getStoreAccessors } from "typesafe-vuex";
import { extend } from "lodash";

type Context = ActionContext<CurrentVideoState, RootState>;

export const uiCurrentVideo = createModule(
  {
    getters: {},
    actions: {
      async loadVideo(context: Context, url: string) {
        commitUpdateState(context, {
          status: "pending"
        });
        const loadedVideo = await loadVideo(url);
        const { videoHeight, videoWidth } = loadedVideo;
        commitUpdateState(context, {
          url,
          meta: {
            height: videoHeight,
            width: videoWidth,
            aspectRatio: videoWidth / videoHeight
          },
          status: "dirty"
        });
      }
    },
    mutations: {
      updateState(
        state: CurrentVideoState,
        payload: Partial<CurrentVideoState>
      ) {
        extend(state, payload);
      }
    }
  },
  { url: null, meta: null, status: "clean" }
);

function loadVideo(url: string): Promise<HTMLVideoElement> {
  return new Promise(resolve => {
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.src = url;
    video.currentTime = 1;

    video.addEventListener(
      "loadeddata",
      () => {
        resolve(video);
      },
      { once: true }
    );
  });
}

const { commit, dispatch } = getStoreAccessors<CurrentVideoState, RootState>(
  "uiCurrentVideo"
);

const { mutations, actions } = uiCurrentVideo;

const commitUpdateState = commit(mutations.updateState);

export const dispatchLoadVideo = dispatch(actions.loadVideo);
