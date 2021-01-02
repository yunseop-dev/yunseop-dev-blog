import React from "react";
import { NextPage } from "next";
import { ExtendedRecordMap, NotionRenderer } from "react-notion-x";
import { NotionAPI } from "notion-client";
const notion = new NotionAPI();

type Props = {
  recordMap: ExtendedRecordMap;
};

const Index: NextPage<Props> = (props) => {
  return (
    <>
      <div>Hello World</div>
      <NotionRenderer
        recordMap={props.recordMap}
        previewImages={true}
        fullPage={false}
        darkMode={false}
      />
      <pre>{JSON.stringify(props.recordMap)}</pre>
    </>
  );
};
Index.getInitialProps = async () => {
  const recordMap: ExtendedRecordMap = await notion.getPage(
    "0ac5c8b6baef40c9896b6612725f1049"
  );
  return { recordMap };
};

export default Index;
