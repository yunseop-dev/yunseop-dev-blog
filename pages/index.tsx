import React from "react";
import { NextPage } from "next";
import Layout from "../components/Layout";
import { HomeData, getData } from "../data/home";

type Props = HomeData;

const Index: NextPage<Props> = ({ posts }) => (
  <Layout>
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  </Layout>
);

Index.getInitialProps = () => {
  return getData();
};

export default Index;
