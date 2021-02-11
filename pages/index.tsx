import { PagePostsComp, ssrPosts } from "../src/generated/page";
import { withApollo } from "../src/withApollo";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { Account, useMyLazyQuery } from "../src/generated/graphql";
import { ParsedUrlQuery } from "querystring";
import { isLoggedInVar, myInfoVar } from "../src/graphql/cache";
import { useReactiveVar } from "@apollo/client";
import Post from "../components/Post";
import DropdownMenu from "../components/DropdownMenu";
import Header from "../components/Header";
import Logo from "../components/Logo";
import { NavBar, NavItem } from "../components/Nav";
import LoginDialog from "../components/LoginDialog";
import useModal from "../hooks/useModal";

const profileImage =
  "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8bWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

ReactModal.setAppElement("#__next");

const HomePage: PagePostsComp = () => {
  const [query] = useState<string>("");
  const { isShowing, toggle } = useModal();
  const [
    useMyQuery,
    { data: my, loading: myLoading, error: myError },
  ] = useMyLazyQuery();
  const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);
  const account: Account | null = useReactiveVar(myInfoVar);
  const { data: pageData, refetch } = ssrPosts.usePage();

  useEffect(() => {
    if (!account) {
      useMyQuery();
    }
  }, [account]);

  useEffect(() => {
    myInfoVar(my?.my);
  }, [my]);

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
        <DropdownMenu
          imageUrl={isLoggedIn ? profileImage : ""}
          onClick={toggle}
        >
          {isLoggedIn ? my?.my?.user.firstName : "Login"}
        </DropdownMenu>
      </Header>
      <main style={{ background: "#FAFAFB", padding: "1rem" }}>
        {/* <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        /> */}
        <section style={{ maxWidth: "1024px", margin: "0 auto" }}>
          {pageData?.posts?.map?.((item) => (
            <Post
              key={item?.id}
              {...{
                profileImage,
                title: `${item?.author.firstName} ${item?.author.lastName}`,
                subtitle: item?.publishedAt ?? "",
                content: item?.content ?? "",
                likeCount: item?.likedBy?.length ?? 0,
              }}
            />
          ))}
        </section>
      </main>
      <LoginDialog isShowing={isShowing} hide={toggle} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = (
  ctx: GetServerSidePropsContext<ParsedUrlQuery>
) => {
  return ssrPosts.getServerPage({}, ctx);
};

export default withApollo(ssrPosts.withPage(() => ({}))(HomePage));
