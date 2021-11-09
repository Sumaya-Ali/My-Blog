import Head from 'next/head';
import { Posts, Result,PostResult} from '../../lib/types';
import { GetStaticProps, GetStaticPaths, GetServerSideProps, NextPage } from 'next'
import { useDispatch, useStore } from 'react-redux';
import { setIds} from '../../redux/actions/main';
import { connect, RootStateOrAny, useSelector } from 'react-redux';
import store from '../../redux/store';

const PageDetails: NextPage<PostResult> = (props) => {

/*
  const {Ids} = useSelector((state: RootStateOrAny) =>state.Ids);
  console.log("Ids == " + JSON.stringify(Ids,null,' '))
*/
  let data = props?.post?.data;
  let comments = props?.comments?.data;

  if(props?.post?.metaData?.status !== 200) {
    return <>
      <Head>
        <meta name="robots" content="noindex"/>

      </Head>
      <main>

      <div> 404 Not Found</div>      
      </main>

    </>
  }


  return (
    <div>
      <Head>
        <title>{data.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
<header className="border-b-2 border-gray-200 mb-4">
<h1 className="text-4xl font-bold text-center text-gray-700">{data.title}</h1>
        
       
</header>
      <main>
        
        <div className=" border border-gray-100 hover:border-gray-200 shadow hover:shadow-md rounded-md p-4 transition duration-200 ease-in">{
          
          data.content.map((item,index) => (
            item.type =='paragraph'?( 
            <p className="text-gray-500 px-4 mb-3" dangerouslySetInnerHTML={{ __html: item.data?.text }} key={index} />
            )
            : null
          ))
          
          }</div>
        {
       
        comments.length >0?
        (<>
            <h2 className="border border-gray-100 hover:border-gray-200 shadow hover:shadow-md rounded-md transition duration-200 ease-in text-xl font-extrabold p-4 text-gray-500"> Comments </h2>
            <div>{
              comments.map((item,index) =>(
                <p  className="border border-gray-100 hover:border-gray-200 shadow hover:shadow-md rounded-md p-4 transition duration-200 ease-in text-gray-500 px-4 mb-3" key={index}>{item?.content}</p>
        ))
              }</div>
          </>
        ):(

          <h2  className="text-gray-500 px-4 mb-3"> No comments available </h2>
        )

        }
          
      </main>
    </div>
  );
}


export default PageDetails

/*
const mapStateToProps  = (state: any) =>({
  Ids: state.main
})
const mapDispatchToProps = {
  setIds: setIds
}

export default connect(mapStateToProps,mapDispatchToProps)(PageDetails)
*/


export const getStaticProps: GetStaticProps= async(context) => {
  
  let {params} = context

  
  const res = await fetch(`https://androidworld.newsifier.com/api/v1/article-as-visitor/${params?.id}?include=clapsCount,commentsCount`,{
    method:'GET',
    headers:{"X-Tenant":"androidworld.newsifier.com",
  "Authorization" : "Bearer "+"m8tiFyxZrZD1NGWNAjSu7dpPV8hlJOMLOqS2sWCGXXFllxFsHmGwrD3oT2Son1kXaEM6iRL22nLsgBPp"
  }

  })
 

 const post = await res.json();

  const resComments = await fetch(`https://microservice.newsifier.com/api/v1/article/${params?.id}/comments/0`,{
    method:'GET',
    headers:{"X-Tenant":"androidworld.newsifier.com"
  }

  })

  const comments = await resComments.json();

  return {
    props: {post,comments} ,
  };
}


export const getStaticPaths: GetStaticPaths = async (props) => {

 // const {Ids} = useSelector((state: RootStateOrAny) =>state.Ids);
 const state = store.getState();

  const res = await fetch('https://microservice.newsifier.com/api/v2/article/scopes/lat/get/0',{

    method:'GET',
    headers:{"X-Tenant":"androidworld.newsifier.com"}
    });
  const data :Result = await res.json();
 
let posts : Posts = data.data;

let paths = posts.map((item) => ({
  params: {
    id: item.id.toString()
  },
}))

  return {
    paths,
    fallback: false,
  };
 
}
