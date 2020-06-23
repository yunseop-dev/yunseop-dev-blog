import React from "react";
import {
  TextValue,
  ConvertBlockOutput,
  convertBlock,
  Block,
} from "../data/convert";
import { PostData } from "../data/post";
import Link from "next/link";
const initial = require("lodash/initial");
const last = require("lodash/last");

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
    case "numbered_list":
      return <li key={section.id}>{renderTextSection(section.value)}</li>;
    case "image":
      return (
        <img
          key={section.id}
          src={section.value}
          onClick={() => window.open(section.value)}
        />
      );
    case "to_do":
      return (
        <div key={section.id}>
          <label>
            <input type="checkbox" value={section.value} />
            {section.value}
          </label>
        </div>
      );
    case "bookmark":
      return (
        <a key={section.id} href={section.link}>
          <h5>
            <img src={section.icon} alt="icon" width="12" height="12" />
            {section.value}
          </h5>
        </a>
      );
    default:
      break;
  }
};

const recognizeArrays = (value: any, index: number) => {
  if (Array.isArray(value) && value[0].block.value.type === "bulleted_list") {
    return (
      <ul key={index} style={{ padding: "0 10px" }}>
        {value.map(recognizeArrays)}
      </ul>
    );
  } else if (
    Array.isArray(value) &&
    value[0].block.value.type === "numbered_list"
  ) {
    return (
      <ol key={index} style={{ padding: "0 10px" }}>
        {value.map(recognizeArrays)}
      </ol>
    );
  }
  return (
    <React.Fragment key={index}>
      {renderSection(convertBlock(value.block))}
      {value.children.length > 0 && value.children}
    </React.Fragment>
  );
};

const generateSection = (content: string[], pageChunks: any) =>
  (content || [])
    .map((id: string) => pageChunks[id])
    .map((block: Block): any => ({
      block,
      children: generateSection(block.value.content || [], pageChunks),
    }))
    .reduce((prev, curr) => {
      const lastItem: any = last(prev);
      if (curr.block.value.type === "bulleted_list") {
        if (
          !Array.isArray(lastItem) ||
          (Array.isArray(lastItem) &&
            lastItem[0].block.value.type === "numbered_list")
        ) {
          return [...prev, [curr]];
        } else if (
          Array.isArray(lastItem) &&
          lastItem[0].block.value.type === "bulleted_list"
        ) {
          return [...initial(prev), [...lastItem, curr]];
        }
      } else if (curr.block.value.type === "numbered_list") {
        if (
          !Array.isArray(lastItem) ||
          (Array.isArray(lastItem) &&
            lastItem[0].block.value.type === "bulleted_list")
        ) {
          return [...prev, [curr]];
        } else if (
          Array.isArray(lastItem) &&
          lastItem[0].block.value.type === "numbered_list"
        ) {
          return [...initial(prev), [...lastItem, curr]];
        }
      } else {
        return [...prev, curr];
      }
    }, [])

    .map(recognizeArrays);

const PostSections = (props: Props) => {
  const result = generateSection(
    props.pageChunks[props.id].value.content,
    props.pageChunks
  );
  return <>{result}</>;
};

export default PostSections;
