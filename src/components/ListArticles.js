import React from 'react'
import {Link} from 'react-router-dom'
import Loader from './Loader'
import {SingleTag} from './Tags'
class ListArticles extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <section className=''>
               <div className='flex flex-row'>
                    <div className='article-type-button '>
                        <h3 onClick={this.props.handleAllArticles} className='text-xl cursor-pointer font-bold text-shadow-sm underline text-red-500'>All Articles</h3>
                    </div>
                   {
                       (this.props.activeTag ? <div className='article-type-button mx-2'>
                        <h3 className='text-xl font-bold text-shadow-sm  underline text-green-500'>#{this.props.activeTag}</h3>
                    </div> :'' )
                   }
               </div>
                <div className='articles flex flex-1 flex-row w-full h-full'>
                    {
                        (!this.props.articles ? <Loader /> :
                              this.props.articles.map((article) => {
                               return <Article article={article} />
                            })
                        )
                    }

                </div>
            </section>
        )
    }
}


function Article(props){
    return(
     <div className='flex flex-col w-96 h-82 shadow-xl py-2 px-6  '>
        <div className='flex flex-row '>
            <div className='w-10  '>
                <img className='w-full h-10 rounded-full' src='/images/user-1.jpg' alt=''></img>
            </div>
            <div className='flex mx-2 my-1 flex-col'>
                <Link >
                   <h2 className='text-md font-bold hover:underline text-shadow-sm text-red-800'>{props.article.author.username}</h2>
                </Link>
                <h3 className='text-xs text-gray-500'>{props.article.createdAt.toLocaleString()}</h3>
            </div>
        </div>
         <div className='my-1'>
             <Link to={`/article/${props.article.slug}`}>
                 <h3 className='font-bold '>{props.article.title}</h3>
             </Link>
             <p className='font-medium text-gray-600'>{props.article.description}</p>
         </div>
        <div className='flex my-1 flex-col justify-between'>
            <div className='flex flex-row justify-between my-2'>
                <div>
                    <button className='text-xl font-bold text-blue-500 underline'>Read More</button>
                </div>
                <div>
                    <Link>
                        <i className="far text-xl  fa-heart"></i>
                    </Link>
                </div>
            </div>
            <div className='tags py-2 flex flex-row'>
                {
                    props.article.tagList.map((tag) => {
                        return       <SingleTag tag={tag} />
                    })
                }
            </div>
        </div>
     </div>
    )
}

export default ListArticles
