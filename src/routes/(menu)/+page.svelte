<script lang="ts">
  import { Scene, pb } from "$lib/pocketbase";
  import Icon from "@iconify/svelte";

  let scenesPromise = Scene.getFullList();
  let deletingSceneId = "";

  function deleteScene(id: string) {
    deletingSceneId = id;
    pb.collection("scenes")
      .delete(id)
      .then(() => location.reload());
  }
</script>

<svelte:head>
  <title>All Scenes</title>
</svelte:head>
<section class="flex flex-col items-center justify-center min-h-screen gap-4">
  {#await scenesPromise}
    <Icon icon="svg-spinners:180-ring" />
  {:then scenes}
    {#each scenes as scene}
      <div
        class="flex justify-between w-1/4 px-4 py-2 border-2 border-tokyo-white"
      >
        <a
          href="/scene/{scene.id}"
          class="flex font-semibold transition-colors hover:text-tokyo-magenta"
        >
          <h2>{scene.title}</h2>
        </a>
        <button
          on:click={() =>
            confirm("Are you sure you want to delete?") &&
            deleteScene(scene.id)}
          title="Delete Scene"
          class="transition-colors hover:text-tokyo-red"
        >
          {#if deletingSceneId == scene.id}
            <Icon icon="svg-spinners:180-ring" />
          {:else}
            <Icon icon="octicon:trash-24" class="text-xl" />
          {/if}
        </button>
      </div>
    {:else}
      <div class="px-4 py-2 border border-white">No scenes currently</div>
    {/each}
  {/await}
  <a href="/create" class="items-center w-1/5 mt-3 text-center">
    <button
      class="w-full px-4 py-2 transition-colors bg-tokyo-terminal hover:bg-tokyo-comment"
    >
      + New Scene
    </button>
  </a>
</section>
