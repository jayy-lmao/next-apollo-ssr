import { useQuery, gql } from  "@apollo/client";
import { useRouter } from 'next/router';
import List from "../../components/List";

const JOB_QUERY = gql`
query JobQuery($slug: String!) {
  jobs(input:{slug: $slug}){
    title
    id
    slug
  }
}
`

const JobPage = (props) => {


  // Comment these out and use props.jobSlug instead and it only works client side...
  const router = useRouter();
  const jobSlug = router?.query?.jobSlug;

  const { data, error , loading, networkStatus } = useQuery(JOB_QUERY, 
    { 
      variables: { 
        slug: jobSlug 
      },
      ssr: true,
  });

  console.log({ networkStatus, error, jobSlug, router });

  if (loading || !data){
    return <div>...loading</div>
  }

  return <List data={data.jobs} /> 
}

export default JobPage

export const getServerSideProps = (ctx) =>
  ({ props: { jobSlug: ctx.query.jobSlug } })
