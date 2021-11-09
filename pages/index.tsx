import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { connect, RootStateOrAny, useSelector } from 'react-redux';
//import { setIds} from '../redux/actions/main';
import { set_Ids } from '../redux/reducers/main';
import { useDispatch, useStore } from 'react-redux';
import { Post,Posts,Results,TotalPages,Result } from '../lib/types';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

import MessageIcon from '@mui/icons-material/Message';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';




const Home: NextPage<Results> = (props) => {
  
  let posts : Posts = props.data.data;
  
  let { currentPage, setIds} = props;

  let nextDisabled = parseInt(currentPage,10) === TotalPages;

  let prevDisabled = parseInt(currentPage,10) === 0;

  let prevPageUrl =
   parseInt(currentPage,10) === 1
    ? "/"
      : `/blogs/${parseInt(currentPage,10) - 1}`;

  const nextPageUrl = `/blogs/${parseInt(currentPage,10) + 1}`;
  
  
  const Ids : Array<String> = [];

  posts.forEach(function(item)
  {
    Ids.push(item.id);
  })
  
 
const dispatch  = useDispatch();
dispatch(set_Ids(Ids));

  return (
    <div className="mx-auto my-8 w-12/12 min-h-screen">
      <Head>
        
        <title>Sumaya's Blog</title>
        <meta name="description" content="Blog app" />
        
      </Head>
<header className="mb-20">
  <h1  className="text-6xl font-bold text-center text-gray-700">Welcome to Sumaya Ali's Blog</h1>
</header>
      <main >
        
        <div className="space-y-4 flex flex-row flex-wrap">
        
        {




posts.map((item,index) => (


  <div key={index} className="w-1/4 flex-grow rounded-lg shadow-xl bg-white ml-5 mt-0 mb-5 ">
  <img
    src={item.image}
    alt={item.title}
    className="rounded-t-lg h-60 w-full object-cover"
  />
 
  <header className=" text-xl font-extrabold p-4 text-gray-500">{item.title}</header>
  <div className="px-5">
    <p className="text-gray-500 px-4 mb-3">
      
    </p>
    <div className="flex flex-row space-x-8">
     
    <div className="text-gray-600 text-xs space-x-2">
      <ThumbUpIcon />
      <span>
      {item.claps_count}
      </span>
      </div>
 <div className="text-gray-600 text-xs space-x-2">
 <MessageIcon />
   <span>
   {item.comments_count}
   </span>
   </div>
  
    
    </div>
  </div>
  
  <footer className="text-right py-5 px-8 text-gray-500">
  <Link href={`/blog/${item.id}`}>
    <a
      className="py-2 px-4 mt-5 bg-green-500 rounded-lg text-white font-semibold hover:bg-green-600"
    >
      Read more..
    </a>
  </Link>
  </footer>
</div>



))



      }
      </div>
        
      </main>
<footer className="my-4">

<ul className="flex flex-row justify-center space-x-80">
      <li>
        {prevDisabled && <span>Previous page</span>}
        {!prevDisabled && (
          <Link href={prevPageUrl}>
            <a>Previous page</a>
          </Link>
        )}
      </li>
      <li>
        Page {currentPage} of {TotalPages}
      </li>
      <li>
        {nextDisabled && <span>Next page</span>}
        {!nextDisabled && (
          <Link href={nextPageUrl}>
            <a>Next page</a>
          </Link>
        )}
      </li>
    </ul>

</footer>
      


    </div>



  )
}


/*
props.setIds(Ids); 
window.localStorage.setItem("Ids",JSON.stringify(Ids,null,' ' ));
*/

export default Home


/*
const mapStateToProps  = (state: any) =>({
  Ids: state.main
})
const mapDispatchToProps = {
  setIds: setIds
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)
*/

export const getStaticProps: GetStaticProps= async() => {

let currentPage = 0

  const res = await fetch(`https://microservice.newsifier.com/api/v2/article/scopes/lat/get/${currentPage}`,{

    method:'GET',
    headers:{"X-Tenant":"androidworld.newsifier.com"}
    });
  const data :Result = await res.json();
 
 /* 
  const Ids : Array<String> = [];

  data.data.forEach(function(item)
  {
    Ids.push(item.id);
  })
*/
 
  return {
    props: {data, currentPage},
    revalidate: 180,
  };
}
