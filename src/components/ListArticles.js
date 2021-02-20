import React from 'react'
import {Link} from 'react-router-dom'
import Loader from './Loader'
import {SingleTag} from './Tags'
function ListArticles(props){
   

   
        return(
            <section className='mx-2 z-0'>
               <div className='flex flex-row'>
                    <div className='article-type-button '>
                        <h3 onClick={props.handleAllArticles} className='text-xl cursor-pointer font-bold text-shadow-sm underline text-red-500'>All Articles</h3>
                    </div>
                   {
                       (props.activeTag ? <div className='article-type-button mx-2'>
                        <h3 className='text-xl font-bold text-shadow-sm  underline text-green-500'>#{props.activeTag}</h3>
                    </div> :'' )
                   }
               </div>
                <div className='articles  flex-1 flex flex-col gap-1 w-full h-full'>
                    {
                        (!props.articles ? <Loader /> :
                              props.articles.map((article) => {
                               return <Article key={article.id} article={article} />
                            })
                        )
                    }

                </div>
            </section>
        )

}




function Article(props){
    return(
        <div className="px-6 relative   bg-transparent py-2 mx-20 my-4 rounded  shadow-md   flex flex-row items-center  ">
            <div className=" flex flex-col justify-between ">
                <img
                    className="w-20 h-20 rounded-full"
                    src={props.article.image ? props.article.image : "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"}
                    alt="product" >
                </img>
            </div>
            <div className='flex flex-row items-center'>
                <div className="flex flex-col">
                    <div className="flex flex-col py-2">
                            <div className="px-1 leading-5">
                            <Link to={`/article/${props.article.slug}`}>
                                <h2 className="text-2xl py-2 text-black">
                                    {props.article.title}
                                </h2>
                            </Link >
                                <p className="text-sm py-2 text-gray-600">
                                    {props.article.description.slice(0,50)}
                                </p>
                            </div>
                            
                    </div>
                    <div className=" items-center flex flex-row">
                            <Link to={`/article/${props.article.slug}`}>
                                <span className="py-6  text-blue-600 ">Read More</span>
                            </Link>
                            <div className="flex mx-5 flex-row">
                                <div className="flex mx-10 flex-row">
                                    {
                                    props.article.tagList.map((tag) => {
                                        return <SingleTag tag={tag} />
                                    })
                                    }
                                </div>
                            </div>
                    </div>
                </div>
                <div className='bg-red-600 absolute right-1 bottom-1 cursor-pointer   text-white px-4 py-1 inline-block  rounded-sm'>
                    <h3>1</h3>
                    <i class="fas fa-heart"></i>
                </div>
            </div>

      </div>
    )
}

export default ListArticles
