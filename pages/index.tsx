import { PagePostsComp, ssrPosts } from "../src/generated/page";
import { withApollo } from "../src/withApollo";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

const HomePage: PagePostsComp = () => {
  const [query, setQuery] = useState<string>("");
  // const { data: pageData, refetch } = ssrPosts.usePage(() => ({
  //   variables: {}
  // }));
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
