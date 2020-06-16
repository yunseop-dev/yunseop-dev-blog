import { loadPageChunk } from "./notion";
import { convertBlock, ConvertBlockOutput, Block } from "./convert";
import _ from "lodash";

interface Input {
  pageId: string;
}

interface Output {
  id: string;
  tags: string[];
  title: string;
  createdTime: number;
  lastEditedTime: number;
  sections: Array<ConvertBlockOutput>;
}

export const getData = async ({ pageId }: Input): Promise<Output> => {
  const {
    recordMap: { block: blocks },
  } = await loadPageChunk({ pageId });
  const page = blocks[pageId];
  const emoji = page.value.format?.page_icon;
  const titleText = page.value.properties.title[0][0];
  const title = emoji ? `${emoji} ${titleText}` : titleText;
  const tags = page.value?.properties?.["!'(w"]?.[0]?.[0].split(",") || [];

  const availableType = ["image", "text", "header", "bulleted_list"];
  const blockList: Array<Block> = Object.values(blocks).map((block: any) => {
    block.value.depth = 1;
    return block;
  });

  const hasContentList = _.flatten(
    blockList
      .filter((block) => block.value.content && block.value.id !== pageId)
      .map((block) => block.value.content)
  );
  hasContentList.forEach((id) => {
    const parentId = blocks[id as string].value.parent_id;
    blocks[id as string].value.depth += blocks[parentId].value.depth;
  });

  const sections = blockList
    .filter((block: Block) => availableType.indexOf(block.value.type) > -1)
    .map(convertBlock);

  return {
    id: pageId,
    tags,
    title,
    sections,
    createdTime: page.value.created_time,
    lastEditedTime: page.value.last_edited_time,
  };
};

export type PostData = Output;
