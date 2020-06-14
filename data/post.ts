import { loadPageChunk } from "./notion";
import { convertBlock, ConvertBlockOutput } from "./convert";

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
  const title = emoji ? emoji + " " + titleText : titleText;
  //   const tags = page.value?.properties["!'(w"][0][0].split(",");
  const tags: string[] = [];

  const contentIds: string[] = page.value.content;
  const availableType = ["image", "text", "header"];

  const sections = contentIds
    .map((id) => blocks[id])
    .filter((block) => availableType.indexOf(block.value.type) > -1)
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
