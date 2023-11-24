import PocketBase from "pocketbase";
import type { TypedPocketBase } from "./pocketbase-types";
export const pocketbase = new PocketBase(
  "http://127.0.0.1:8090"
) as TypedPocketBase;

export const Scene = pocketbase.collection("scenes");
export const pb = pocketbase;
