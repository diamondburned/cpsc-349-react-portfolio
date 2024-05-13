import type { PageContextServer } from "vike/types";
import { type ObjectDocument, load } from "lib/0xd14";

export type Data = Awaited<{
  object: ObjectDocument;
}>;

export async function data(_: PageContextServer): Promise<Data> {
  const object = await load();
  return {
    object,
  };
}
