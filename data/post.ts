import { loadPageChunk } from "./notion";

interface Input {
  pageId: string;
}

interface Output {
  id: string;
  tags: string[];
  title: string;
  createdTime: number;
  lastEditedTime: number;
  cover: string;
  pageChunks: any;
}

export const getData = async ({ pageId }: Input): Promise<Output> => {
  const {
    recordMap: { block: pageChunks },
  } = await loadPageChunk({ pageId });
  const page = pageChunks[pageId];
  const emoji = page.value.format?.page_icon;
  const titleText = page.value.properties?.title?.[0]?.[0] || "Untitled";
  const title = emoji ? `${emoji} ${titleText}` : titleText;
  const tags = page.value?.properties?.["!'(w"]?.[0]?.[0].split(",") || [];

  return {
    id: pageId,
    tags,
    title,
    pageChunks,
    createdTime: page.value.created_time,
    cover: page.value?.format?.page_cover,
    lastEditedTime: page.value.last_edited_time,
  };
};

export type PostData = Output;
