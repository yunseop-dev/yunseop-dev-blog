import { PagePostsComp, ssrPosts } from "../src/generated/page";
import { withApollo } from "../src/withApollo";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useEffect, useState } from "react";
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
  const { data: pageData, variables, loading, fetchMore } = ssrPosts.usePage(
    () => ({
      variables: {
        offset: 0,
        limit: PAGE_LIMIT,
      },
    })
  );

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

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && !loading && !isLastPage) {
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      onLoadMore();
    }
  };

  useEffect(() => {
    // scroll event listener 등록
    window.addEventListener("scroll", handleScroll);
    return () => {
      // scroll event listener 해제
      window.removeEventListener("scroll", handleScroll);
    };
  });

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
        {/* <button onClick={onLoadMore} disabled={isLastPage}>
          More
        </button> */}
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
