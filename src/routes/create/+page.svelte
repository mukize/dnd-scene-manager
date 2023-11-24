<script lang="ts">
  import { goto } from "$app/navigation";
  import Scene from "$lib/Scene.svelte";
  import { Scene as SceneModel } from "$lib/pocketbase";
  import type { SceneData } from "$lib/types";
  import { writable, type Writable } from "svelte/store";

  let sceneData = writable<SceneData>({
    title: "",
    backgroundSize: "cover",
  });
  const onSave = (saving: Writable<boolean>) => {
    saving.set(true);
    SceneModel.create({
      title: $sceneData.title || "Untitled Scene",
      background: $sceneData.background,
      backgroundSize: $sceneData.backgroundSize,
    }).then((record) => {
      goto(`/scenes/${record.id}`);
    });
  };
</script>

<svelte:head>
  <title>New Scene</title>
</svelte:head>
<Scene {sceneData} {onSave} />
