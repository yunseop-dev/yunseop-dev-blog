import { ssrGetCountries, PageGetCountriesComp } from "../src/generated/page";

import { withApollo } from "../src/withApollo";
import { GetServerSideProps } from "next";

const HomePage: PageGetCountriesComp = (props: any) => {
  return (
    <div>
      {props.data?.countries?.map((country: any, k: any) => (
        <div key={k}>{country.name}</div>
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await ssrGetCountries.getServerPage({}, ctx);
};

export default withApollo(ssrGetCountries.withPage(() => ({}))(HomePage));
