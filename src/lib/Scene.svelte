<script lang="ts">
  import type { Writable } from "svelte/store";
  import SceneSettings from "./SceneSettings.svelte";
  import type { SceneData } from "./types";

  export let sceneData: Writable<SceneData>;
  export let onSave: (savingState: Writable<boolean>) => void;
</script>

<section class="h-screen">
  <SceneSettings {sceneData} {onSave} />
  <div
    class="w-full min-h-full bg-center bg-no-repeat"
    style:background-image={$sceneData.backgroundUrl
      ? `url('${$sceneData.backgroundUrl}')`
      : ""}
    style:background-size={$sceneData.backgroundSize}
  />
</section>
