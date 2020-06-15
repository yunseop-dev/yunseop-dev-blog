import React from "react";
import { TextValue } from "../data/convert";
import { PostData } from "../data/post";
import Link from "next/link";

interface Props {
  sections: PostData["sections"];
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

const renderSection = (section: Props["sections"][0]) => {
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

const PostSections = (props: Props) => (
  <div>{props.sections.map(renderSection)}</div>
);

export default PostSections;
