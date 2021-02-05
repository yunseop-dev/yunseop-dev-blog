import {
  ssrGetCountriesByCode,
  PageGetCountriesByCodeComp,
  ssrGetContinents,
} from "../src/generated/page";

import { withApollo } from "../src/withApollo";
import { GetServerSideProps, GetStaticPaths } from "next";

const HomePage: PageGetCountriesByCodeComp = (props) => {
  return (
    <div>
      {props.data?.countries?.map((country, k) => (
        <div key={k}>{country.name}</div>
      ))}
    </div>
  );
};

export const getStaticProps: GetServerSideProps = async ({ params }) => {
  const res = await ssrGetCountriesByCode.getServerPage({
    variables: { code: params?.continent?.toString().toUpperCase() || "" },
  });

  if (res.props.error || !res.props.data?.countries?.length) {
    return {
      notFound: true,
    };
  }
  return res;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { props } = await ssrGetContinents.getServerPage({}, null);
  const paths =
    props?.data?.continents.map((continent: any) => ({
      params: { continent: continent.code },
    })) || [];
  paths.push({ params: { continent: "WWW" } });
  return {
    paths,
    fallback: false,
  };
};

export default withApollo(
  ssrGetCountriesByCode.withPage((arg: any) => ({
    variables: { code: arg?.query?.continent?.toString().toUpperCase() || "" },
  }))(HomePage)
);
