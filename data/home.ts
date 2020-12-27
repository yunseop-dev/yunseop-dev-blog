import { loadPageChunk, queryCollection } from "./notion";
import { convertCollection, ConvertCollectionOutput } from "./convert";

interface Output {
  posts: ConvertCollectionOutput["posts"];
  tags: ConvertCollectionOutput["tags"];
}

const pageId = "0ac5c8b6-baef-40c9-896b-6612725f1049";

export const getData = async (): Promise<Output> => {
  const {
    recordMap: { block: blocks },
  } = await loadPageChunk({ pageId });

  const page = blocks[pageId];

  const collectionData = await queryCollection({
    collectionId: page.value.collection_id,
    collectionViewId: page.value.view_ids[0],
    query: {
      sort: [],
    },
  });

  const { posts, tags } = convertCollection(collectionData);
  return {
    posts,
    tags,
  };
};

export type HomeData = Output;
