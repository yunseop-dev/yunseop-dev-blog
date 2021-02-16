import { PagePostsComp, ssrPosts } from "../src/generated/page";
import { withApollo } from "../src/withApollo";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useState } from "react";
import { ParsedUrlQuery } from "querystring";
import Post from "../src/components/Post";
import Header from "../src/components/Header";
import Logo from "../src/components/Logo";
import { NavBar, NavItem } from "../src/components/Nav";
import DropdownMenuContainer from "../src/containers/DropdownMenuContainer";
import { profileImage } from "../src/constants";
import styled from "@emotion/styled";
import TweetFormComponent from "../src/components/Tweetform";

const Section = styled.section`
  max-width: 1024px;
  margin: 0 auto;
`;

const PAGE_LIMIT = 5;

const HomePage: PagePostsComp = () => {
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const { data: pageData, variables, fetchMore } = ssrPosts.usePage(() => ({
    variables: {
      offset: 0,
      limit: PAGE_LIMIT,
    },
  }));

  function onLoadMore() {
    fetchMore({
      variables: {
        ...variables,
        offset: pageData?.posts?.length ?? 0,
      },
    }).then((fetchMoreResult) => {
      setIsLastPage((fetchMoreResult.data.posts?.length ?? 0) < PAGE_LIMIT);
    });
  }

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
        <DropdownMenuContainer></DropdownMenuContainer>
      </Header>
      <main style={{ background: "#FAFAFB", padding: "1rem" }}>
        <Section>
          <TweetFormComponent profileImage={profileImage} />
        </Section>
        <Section>
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
        </Section>
        <button onClick={onLoadMore} disabled={isLastPage}>
          More
        </button>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = (
  ctx: GetServerSidePropsContext<ParsedUrlQuery>
) => {
  return ssrPosts.getServerPage(
    {
      variables: {
        offset: 0,
        limit: PAGE_LIMIT,
      },
    },
    ctx
  );
};

export default withApollo(
  ssrPosts.withPage(() => ({
    variables: {
      offset: 0,
      limit: PAGE_LIMIT,
    },
  }))(HomePage)
);
