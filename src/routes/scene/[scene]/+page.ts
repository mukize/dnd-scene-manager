import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { Scene } from "$lib/pocketbase";
export const load: PageLoad = async ({ params }) => {
  const scene = await Scene.getOne(params.scene);
  return {
    scene,
  };
};
