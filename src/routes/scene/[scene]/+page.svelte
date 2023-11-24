<script lang="ts">
  import Scene from "$lib/scene/Scene.svelte";
  import { pb } from "$lib/pocketbase";
  import type { SceneData } from "$lib/types";
  import { Scene as SceneModel } from "$lib/pocketbase";
  import { writable, type Writable } from "svelte/store";
  import type { PageData } from "./$types";

  export let data: PageData;
  const scene = data.scene;
  let title: string = scene.title;

  let sceneData = writable<SceneData>({
    title: scene.title,
    backgroundUrl: pb.files.getUrl(scene, scene.background),
    backgroundSize: scene.backgroundSize,
  });

  const onSave = (saving: Writable<boolean>) => {
    saving.set(true);
    let data = {
      title: $sceneData.title,
      backgroundSize: $sceneData.backgroundSize,
      background: $sceneData.background || scene.background,
    };
    SceneModel.update(scene.id, data).then(() => {
      title = $sceneData.title;
      saving.set(false);
    });
  };
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<Scene {sceneData} {onSave} />
