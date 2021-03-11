import { PagePostsComp, ssrPosts } from "../src/generated/page";
import { Account } from "../src/generated/graphql";
import { withApollo } from "../src/withApollo";
import { GetServerSideProps } from "next";
import React from "react";
import Post from "../src/components/Post";
import Header from "../src/components/Header";
import Logo from "../src/components/Logo";
import { NavBar, NavItem } from "../src/components/Nav";
import DropdownMenuContainer from "../src/containers/DropdownMenuContainer";
import { profileImage } from "../src/constants";
import styled from "@emotion/styled";
import TweetFormComponent from "../src/components/Tweetform";
import { useReactiveVar } from "@apollo/client";
import { myInfoVar } from "../src/graphql/cache";

const Section = styled.section`
  max-width: 1024px;
  margin: 0 auto;
`;

// const PAGE_LIMIT = 5;

const HomePage: PagePostsComp = () => {
  // const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const my: Account | null = useReactiveVar(myInfoVar);
  const { data: pageData } = ssrPosts.usePage(() => ({}));
  // useInfinityScroll(onLoadMore, !loading && !isLastPage);

  // function onLoadMore() {
  //   fetchMore({
  //     variables: {
  //       offset: pageData?.posts?.length ?? 0,
  //     },
  //   }).then((fetchMoreResult) => {
  //     setIsLastPage((fetchMoreResult.data.posts?.length ?? 0) < PAGE_LIMIT);
  //   });
  // }

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
                id: item?.id ?? "",
                profileImage,
                title: `${item?.author.firstName} ${item?.author.lastName}`,
                subtitle: item?.publishedAt ?? "",
                content: item?.content ?? "",
                likeCount: item?.likedBy?.length ?? 0,
                isLiked:
                  item?.likedBy?.findIndex?.(
                    (user) => user?.id === my?.user.id
                  ) !== -1,
              }}
            />
          ))}
        </Section>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = (ctx: any) => {
  return ssrPosts.getServerPage({}, ctx);
};

export default withApollo(HomePage);
