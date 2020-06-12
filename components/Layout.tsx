import * as React from "react";
import Link from "next/link";
import Head from "next/head";
import styled from "styled-components";
import { Reset } from "styled-reset";
type LayoutProps = {
  title?: string;
};
const Wrapper = styled.div`
  max-width: 1024px;
  margin: 0px auto;
`;

const Layout: React.FunctionComponent<LayoutProps> = ({ children, title }) => (
  <Wrapper>
    <Reset />
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{" "}
        |{" "}
        <Link href="/about">
          <a>About</a>
        </Link>{" "}
        |{" "}
      </nav>
    </header>
    {children}
  </Wrapper>
);

export default Layout;
