import { loadPageChunk, queryCollection } from "./notion";
import { convertCollection, ConvertCollectionOutput } from "./convert";

interface Output {
  posts: ConvertCollectionOutput["posts"];
  tags: ConvertCollectionOutput["tags"];
}

const pageId = "7e716e58-4745-4621-8ef4-1b038ed71d78";

export const getData = async (): Promise<Output> => {
  const {
    recordMap: { block: blocks },
  } = await loadPageChunk({ pageId });

  const page = blocks[pageId];

  const collectionData = await queryCollection({
    collectionId: page.value.collection_id,
    collectionViewId: page.value.view_ids[0],
    query: {
      sort: [
        {
          direction: "descending",
          property: "}%j{",
          type: "created_time",
        },
      ],
    },
  });

  const { posts, tags } = convertCollection(collectionData);
  return {
    posts,
    tags,
  };
};

export type HomeData = Output;
