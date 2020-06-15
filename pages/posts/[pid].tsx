import React from "react";

import { NextPage } from "next";

import Layout from "../../components/Layout";
import { PostData } from "../../data/post";
import PostSections from "../../components/PostSections";
import { getBaseUrl } from "../../urlHelper";

type Props = PostData;

const Post: NextPage<Props> = ({
  createdTime,
  lastEditedTime,
  tags,
  title,
  sections,
}) => {
  return (
    <Layout>
      <div>
        <h1>제목:{title}</h1>
        <h2>생성일:{createdTime}</h2>
        <h3>수정일:{lastEditedTime}</h3>
        <pre>태그:{tags}</pre>
        <PostSections sections={sections}></PostSections>
      </div>
    </Layout>
  );
};

Post.getInitialProps = async ({ query, req }) => {
  const { pid } = query;
  const pageId = Array.isArray(pid) ? pid[0] : pid;

  const url = getBaseUrl(req) + "/api/posts/" + pageId;

  const res = await fetch(url);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Oops");
  }
};

export default Post;
