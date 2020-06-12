import React from "react";
import { Reset } from "styled-reset";

import Layout from "../components/Layout";
const Index: React.FunctionComponent = () => {
  return (
    <Layout title="Home">
      <Reset />
      <h1>Hello Next.js 👋</h1>
    </Layout>
  );
};

export default Index;
