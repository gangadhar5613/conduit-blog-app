import React from 'react'
import {Link} from 'react-router-dom'
import Loader from './Loader'
import {SingleTag} from './Tags'
class UserInfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            allArticles : null,
            query:'author'
        }
    }

    componentDidMount(){
        fetch(`/api/articles/?author=${JSON.parse(localStorage.getItem('user')).username}`)
        .then((res) => {
          if(!res.ok){
            throw new Error(res.statusText)
          }else{
            return res.json()
          }
      }
      )
        .then((articles) => this.setState({allArticles:articles.articles}))
    }

    handleFavoriterticles = () => {
        this.setState({allArticles:null})
        fetch(`/api/articles/feed`,{method:'GET',headers:{'Content-Type':'application/json','Authorization': JSON.parse(localStorage.getItem('user')).token}})
        .then((res) => {
          if(!res.ok){
            throw new Error(res.statusText)
          }else{
            return res.json()
          }
      }
      )
        .then((articles) => this.setState({allArticles:articles.articles}))
    }

    render(){
        return(
           <section className='my-20'>
                <div className='hero-part bg-black text-white h-44 w-full'>
                    <div className='py-5 flex flex-col items-center justify-center'>
                            <div className='flex flex-row  items-center '>
                                <div className='w-20  '>
                                    <img className='w-full h-20 rounded-full' src='/images/user-1.jpg' alt=''></img>
                                </div>
                                <div className='flex mx-2 my-1 flex-col'>
                                    <Link >
                                        <h2 className='text-xl font-bold hover:underline text-shadow-sm text-red-800'>N Gangadhar Reddy</h2>
                                    </Link>
                                </div>
                            </div>
                            <div className='my-5'>
                                <Link to='/user/profile/' className='bg-white text-black px-6 py-2 rounded-md'>
                                    Update Profile
                                </Link>
                            </div>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className='articles-list flex flex-row my-2 justify-center items-center'>
                         <h2   className='bg-black text-white mx-5 cursor-pointer  px-6 py-2 rounded'>My Articles</h2>
                         <h2 onClick={this.handleFavoriterticles} className='bg-black text-white mx-5 cursor-pointer  px-6 py-2 rounded'>Favorited Articles</h2>
                    </div>
                    <div>
                         {
                             (!this.state.allArticles ?  <Loader /> :
                                   this.state.allArticles.map((article) => {
                                       return <Card key={article.id} article={article} />
                                   })
                                )
                         }
                    </div>
                </div>
           </section>
        )
    }
}


function Card(props){
    return(
        <div className="px-4   bg-transparent py-2 mx-60 my-4 rounded  shadow-md  flex flex-row items-center  ">
        <div className=" flex flex-col justify-between ">
          <img
            className="w-20 h-20 rounded-full"
            src="https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt="product"
          ></img>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col py-2">
            <div className="px-1 leading-5">
              <h2 className="text-2xl py-2 text-black">
                {props.article.title}
              </h2>
              <p className="text-sm py-2 text-gray-600">
                {props.article.description.slice(0,100)}
              </p>
            </div>
          </div>
          <div className=" items-center flex flex-row">
            <Link>
              <span className="py-6 text-blue-600 ">Read More</span>
            </Link>
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
    )
}


export default UserInfo