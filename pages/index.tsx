import { PagePostsComp, ssrPosts } from "../src/generated/page";
import { withApollo } from "../src/withApollo";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";

const Header = styled.header({
  display: "flex",
  justifyContent: "space-around",
});

const Logo = styled.div`
  display: flex;
  font-size: 1.5rem;
  font-weight: bold;
  align-items: center;
  & .logo-image {
    width: 60px;
  }
`;

const NavBar = styled.ul({
  display: "flex",
});

const NavItem = styled.li`
  display: inline-block;
  position: relative;
  margin: auto 1rem;
  padding: 1rem;
  color: rgb(119, 119, 119);
  &:hover a,
  &.active a {
    color: rgb(32, 118, 229);
  }
  &:hover:after,
  &.active:after {
    position: absolute;
    left: 0;
    bottom: 0;
    content: " ";
    display: block;
    height: 4px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    width: 100%;
    background: rgb(32, 118, 229);
  }

  & a {
    color: inherit;
    text-decoration: none;
  }
`;

const DropdownMenu = styled.button<{
  imageUrl?: string;
}>`
  display: flex;
  position: relative;
  align-items: center;
  font-size: 0.8em;
  font-weight: bold;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  ${(props) =>
    props.imageUrl
      ? `
  &:before {
    content: "";
    width: 2rem;
    height: 2rem;
    border-radius: 8px;
    margin-right: 1rem;
    background: url("${props.imageUrl}");
    background-size: cover;
  }
  `
      : ""}
`;

const HomePage: PagePostsComp = () => {
  const [query, setQuery] = useState<string>("");
  const { data: pageData, refetch } = ssrPosts.usePage();

  useEffect(() => {
    if (query.length > 0) {
      refetch({
        q: query,
      });
    }
  }, [query]);

  return (
    <>
      <Header>
        <Logo>
          <img
            className="logo-image"
            src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
            alt="Home"
          />
          <span>Tweeeter</span>
        </Logo>
        <NavBar>
          <NavItem>
            <a href="#">Home</a>
          </NavItem>
          <NavItem>
            <a href="#">Explore</a>
          </NavItem>
          <NavItem>
            <a href="#">Bookmarks</a>
          </NavItem>
        </NavBar>
        <DropdownMenu imageUrl="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8bWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60">
          Yunseop Kim
        </DropdownMenu>
      </Header>
      <input
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <div>
        {pageData?.posts?.map?.((item: any) => (
          <div key={item?.id}>{item?.title}</div>
        ))}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = (ctx) => {
  return ssrPosts.getServerPage({}, ctx);
};

export default withApollo(ssrPosts.withPage(() => ({}))(HomePage));
