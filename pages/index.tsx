import React from "react";
import { NextPage } from "next";
import Layout from "../components/Layout";
import { HomeData, getData } from "../data/home";
import Link from "next/link";
import { getBaseUrl } from "../urlHelper";

type Props = HomeData;

const Index: NextPage<Props> = ({ posts }) => (
  <Layout>
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={"/posts/[pid]"} as={`/posts/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </Layout>
);

Index.getInitialProps = async ({ req }) => {
  const url = getBaseUrl(req) + "/api/home";

  const res = await fetch(url);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Oops");
  }
};

export default Index;
