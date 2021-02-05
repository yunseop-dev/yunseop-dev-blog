import { PageGetContinentsComp, ssrGetContinents } from "../src/generated/page";
import Link from "next/link";
import { withApollo } from "../src/withApollo";

const ContinentPage: PageGetContinentsComp = () => {
  const { data } = ssrGetContinents.usePage();
  return (
    <div>
      {data?.continents?.map((continent, k) => (
        <div key={k}>
          <Link href={`/${continent.code}`}>
            <a>{continent.name} </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps = async () => {
  return await ssrGetContinents.getServerPage({});
};

export default withApollo(ContinentPage);
