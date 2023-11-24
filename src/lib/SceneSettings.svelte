<script lang="ts">
  import Icon from "@iconify/svelte";
  import { writable, type Writable } from "svelte/store";
  import type { SceneData } from "./types";

  export let sceneData: Writable<SceneData>;
  export let onSave: (savingState: Writable<boolean>) => void;

  let saving = writable(false);
  let menuOpen = false;
  let backgroundSizeOpen = false;

  const handleBackgroundChange = (e: HTMLInputElement) => {
    const reader = new FileReader();
    if (!e.files) {
      return;
    }
    const file = e.files[0];
    reader.readAsDataURL(file);
    reader.onload = (readerEvent) => {
      if (!readerEvent.target) {
        return;
      }
      const result = readerEvent.target.result;
      if (readerEvent.target && typeof result === "string") {
        $sceneData.backgroundUrl = result;
        $sceneData.background = file;
      }
    };
  };
</script>

<section
  class="fixed transition-colors left-5 top-5 bg-tokyo-terminal
  rounded-lg {menuOpen ? '' : 'hover:bg-tokyo-comment'}"
>
  <button
    class="p-3 transition-colors hover:text-white"
    on:click={() => (menuOpen = !menuOpen)}
  >
    <Icon
      icon="charm:{menuOpen ? 'cross' : 'menu-hamburger'}"
      class="font-bold"
    />
  </button>
  <input
    type="text"
    placeholder="Untitled Scene"
    class="text-xl text-center text-white bg-transparent rounded-lg outline-none"
    bind:value={$sceneData.title}
  />
  {#if menuOpen}
    <menu class="flex flex-col gap-2 px-3 pb-3">
      <li>
        <label
          for="background-upload"
          class="hover:cursor-pointer hover:text-white"
        >
          <span class="flex items-center gap-2">
            <Icon icon="charm:plus" />
            {$sceneData.backgroundUrl ? "Change" : "Add"} Background
          </span>
          <input
            type="file"
            id="background-upload"
            on:change={(e) => handleBackgroundChange(e.currentTarget)}
            hidden
          />
        </label>
      </li>
      <li class="flex">
        <button
          class="flex items-center justify-between w-full hover:text-white"
          on:click={() => (backgroundSizeOpen = !backgroundSizeOpen)}
        >
          <span class="flex items-center gap-2">
            <Icon icon="charm:screen-maximise" />
            Background Size
          </span>
          <Icon
            icon="charm:chevron-{backgroundSizeOpen ? 'right' : 'down'}"
            class="pt-1"
          />
        </button>
        {#if backgroundSizeOpen}
          <div class="absolute p-2 ml-1 rounded-lg left-full bg-tokyo-terminal">
            <fieldset>
              <label
                for="background_size_cover"
                class="flex gap-2 hover:cursor-pointer"
              >
                <input
                  id="background_size_cover"
                  type="radio"
                  value="cover"
                  name="background_size"
                  class="accent-tokyo-magenta"
                  bind:group={$sceneData.backgroundSize}
                />
                Cover
              </label>
              <label
                for="background_size_contain"
                class="flex gap-2 hover:cursor-pointer"
              >
                <input
                  id="background_size_contain"
                  type="radio"
                  value="contain"
                  name="background_size"
                  class="accent-tokyo-magenta"
                  bind:group={$sceneData.backgroundSize}
                />
                Contain
              </label>
            </fieldset>
          </div>
        {/if}
      </li>
      <li>
        <button
          on:click={() => onSave(saving)}
          class="flex items-center gap-2 hover:text-white"
        >
          {#if $saving}
            <Icon icon="svg-spinners:180-ring" />
            Saving
          {:else}
            <Icon icon="charm:floppy-disk" />
            Save
          {/if}
        </button>
      </li>
      <li>
        <a href="/" class="flex items-center gap-2 hover:text-white">
          <Icon icon="charm:arrow-left" /> Main Menu
        </a>
      </li>
    </menu>
  {/if}
</section>
