import type { NextPage } from 'next'
import { Results,TotalPages } from '../../lib/types';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import Home from '..';


const Page: NextPage<Results> = (props) => {
  
  return (
    <Home 
    currentPage={props.currentPage}
    data={props.data}
    />
  )
}

export default Page

export const getStaticProps: GetStaticProps= async({params}) => {

  let currentPage = params?.page
 
  const res = await fetch(`https://microservice.newsifier.com/api/v2/article/scopes/lat/get/${currentPage}`,{

    method:'GET',
    headers:{"X-Tenant":"androidworld.newsifier.com"}
    });
  const data :Results = await res.json();
 

  return {
    props: {data, currentPage},
    revalidate: 180,
  };
}
export const getStaticPaths: GetStaticPaths = async () => {
  
  let paths = [];

  
  for (let page = 1; page <= TotalPages; page++) {
    paths.push({ params: { 
      page: page.toString() 
    } });
  }
  
  return {
    paths,
    fallback: false,
  };
 
}