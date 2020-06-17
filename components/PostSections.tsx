import React from "react";
import {
  TextValue,
  ConvertBlockOutput,
  convertBlock,
  Block,
} from "../data/convert";
import { PostData } from "../data/post";
import Link from "next/link";

interface Props {
  id: string;
  pageChunks: PostData["pageChunks"];
}

export const renderTextSection = (value: TextValue[]) => {
  return value.map((s, i) => {
    if (s.length === 1) {
      return s[0];
    } else {
      return (s[1] as string[][]).reduce((a: any, c: any, i2: any) => {
        switch (c[0]) {
          case "c":
            return <code key={i + "-" + i2}>{a}</code>;
          case "a":
            const href = c[1].includes("https://")
              ? c[1].replace("https:", "")
              : c[1];
            return (
              <Link key={i + "-" + i2} href={href}>
                <a>{a}</a>
              </Link>
            );
          default:
            return a;
        }
      }, s[0]);
    }
  });
};

const renderSection = (section: ConvertBlockOutput) => {
  switch (section?.type) {
    case "header":
      return <h6 key={section.id}>{section.value}</h6>;
    case "text":
      return <div key={section.id}>{renderTextSection(section.value)}</div>;
    case "bulleted_list":
      return <li key={section.id}>{renderTextSection(section.value)}</li>;
    case "image":
      return (
        <img
          key={section.id}
          src={section.value}
          onClick={() => window.open(section.value)}
        />
      );
    default:
      break;
  }
};

const generateSection = (content: string[], pageChunks: any) =>
  (content || [])
    .map((id: string) => pageChunks[id])
    .map((block: Block): any => ({
      block: renderSection(convertBlock(block)),
      children: generateSection(block.value.content || [], pageChunks),
    }))
    .map((value) => (
      <div style={{ padding: "0 10px" }}>
        {value.block}
        <div style={{ padding: "0 10px" }}>{value.children}</div>
      </div>
    ));

const PostSections = (props: Props) => {
  const result = generateSection(
    props.pageChunks[props.id].value.content,
    props.pageChunks
  );
  return <div>{result}</div>;
};

export default PostSections;
