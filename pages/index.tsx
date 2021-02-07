import { PagePostsComp, ssrPosts } from "../src/generated/page";
import { withApollo } from "../src/withApollo";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";

const profileImage =
  "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8bWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

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

const Post = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;
  margin: 1.5rem;
  padding: 1rem;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileCover = styled.img`
  object-fit: cover;
  width: 2rem;
  height: 2rem;
  border-radius: 0.8rem;
  margin: 0.5rem;
`;

const ProfileInformation = styled.div``;
const PostTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0.4rem;
`;
const PostSubtitle = styled.div`
  margin: 0.4rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: #bdbdbd;
`;

const PostContent = styled.p`
  font-size: 1rem;
  line-height: 2.2rem;
  letter-spacing: -0.035em;
  color: #4f4f4f;
`;

const PostCounts = styled.div`
  text-align: right;
`;

const PostCountItem = styled.div`
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.6rem;
  letter-spacing: -0.035em;
  color: #bdbdbd;
`;

const PostButtonGroup = styled.div`
  display: flex;
  padding: 0.2rem;
  justify-content: space-around;
  border-top: 1px solid #f2f2f2;
  border-bottom: 1px solid #f2f2f2;
`;
const PostButton = styled.button`
  width: 100%;
  padding: 0.8rem;

  // TODO: 이 아래것들은 묶을 생각 해보자
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  &:hover {
    background: #f2f2f2;
    border-radius: 8px;
  }
`;

const HomePage: PagePostsComp = () => {
  const [query] = useState<string>("");
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
        <DropdownMenu imageUrl={profileImage}>Yunseop Kim</DropdownMenu>
      </Header>
      <main style={{ background: "#FAFAFB", padding: "1rem" }}>
        {/* <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        /> */}
        <section style={{ maxWidth: "1024px", margin: "0 auto" }}>
          {pageData?.posts?.map?.((item) => (
            // TODO: Post 컴포넌트 분리
            <Post key={item?.id}>
              <PostHeader>
                <ProfileCover src={profileImage} alt="author" />
                <ProfileInformation>
                  <PostTitle>{`${item?.author.firstName} ${item?.author.lastName}`}</PostTitle>
                  <PostSubtitle>{item?.publishedAt}</PostSubtitle>
                </ProfileInformation>
              </PostHeader>
              <PostContent>{item?.content}</PostContent>
              <PostCounts>
                <PostCountItem>
                  {item?.likedBy?.length ?? 0} Likes
                </PostCountItem>
              </PostCounts>
              <PostButtonGroup>
                <PostButton>Comment</PostButton>
                <PostButton>Retweeted</PostButton>
                <PostButton>Liked</PostButton>
                <PostButton>Saved</PostButton>
              </PostButtonGroup>
              {/* <div>
                <ProfileCover src={profileImage} alt="commenter" />
                <input type="text" />
              </div> */}
            </Post>
          ))}
        </section>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = (ctx) => {
  return ssrPosts.getServerPage({}, ctx);
};

export default withApollo(ssrPosts.withPage(() => ({}))(HomePage));
