import React from 'react'
import {Link} from 'react-router-dom'
import Loader from './Loader'

class SingleArticle extends React.Component{
    constructor(props){
        super(props)
        this.state={
            article:null,
            comment:''
        }
    }

    componentDidMount(){
        fetch(`/api/articles/${this.props.match.params.slug}`)
        .then((res) => res.json())
        .then((article) => {
            this.setState({article:article})
        })
    }

    handleComment = (event) => {
            const {name,value} = event.target

            switch (name) {
                case 'comment':
                      this.setState({comment:value})
                    break;
                default:
                    break;
            }
    }

    submitComment = (event) => {
        console.log('comment')
    }

    render(){
        return(
            <article className='flex items-center my-10 px-60 justify-center container'>
                    {
                        (!this.state.article ? <Loader /> :
                            <section className='article-body'>
                                <div>
                                    <div className='flex flex-row my-5 '>
                                        <div className='w-10  '>
                                            <img className='w-full h-10 rounded-full' src='/images/user-1.jpg' alt=''></img>
                                        </div>
                                        <div className='flex mx-2 my-1 flex-col'>
                                            <Link >
                                            <h2 className='text-md font-bold hover:underline text-shadow-sm text-red-800'>{this.state.article.article.author.username}</h2>
                                            </Link>
                                            <h3 className='text-xs text-gray-500'>{this.state.article.article.createdAt.toLocaleString()}</h3>
                                        </div>
                                    </div>
                                    <div className='flex flex-col'>
                                        <h2 className='text-3xl my-2 font-bold'>{this.state.article.article.title}</h2>
                                        <p className='border-2 text-md text-gray-500 border-red-800 p-4 text-justify h-full '>{this.state.article.article.description}</p>
                                    </div>
                                    <div className='text-center flex flex-row items-center justify-center text-2xl my-2'>
                                            <h2><Link className='text-red-600 font-bold underline mx-1' to='/signup'>SignUp</Link>or<Link className='text-red-600 font-bold underline mx-1'  to='/login'>Login</Link> to Comment</h2>
                                    </div>
                                    <div className=' my-5  comments-section '>
                                        <div>
                                             <h2 className='text-xl font-bold my-1'>Comments</h2>
                                        </div>
                                        <div className='border-2 border-gray-200 shadow-md rounded-sm'>
                                              <div className='flex flex-row p-2 items-center'>
                                                  <textarea onChange={this.handleComment} type='textarea' rows='2' cols='50' className='w-full border-2 shadow border-transparent focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent ' name='comment' id='comment' placeholder='Add your comment' ></textarea>
                                                  <button onClick={this.submitComment}  type='submit' className='text-sm bg-black text-white py-2 px-6 w-40 mx-6'>Add Comment</button>
                                              </div>
                                              <div className='mx-2 border-2 px-2  justify-center py-2  shadow-lg  my-1'>
                                                   <div className='flex flex-row items-center justify-between my-1 border-1 border-gray-300 '>
                                                        <div className='flex items-center'>
                                                            <div className='w-5  '>
                                                                <img className='w-full h-5 rounded-full' src='/images/user-1.jpg' alt=''></img>
                                                            </div>
                                                            <div className='flex mx-2 my-1 flex-col'>
                                                                <Link >
                                                                <h2 className='text-xs font-bold hover:underline text-shadow-sm text-red-800'>{this.state.article.article.author.username}</h2>
                                                                </Link>
                                                                <h3 className='text-xs text-gray-500'>{this.state.article.article.createdAt.toLocaleString()}</h3>
                                                            </div>
                                                        </div>
                                                        <div className='mx-5'>
                                                            <h3 className='text-xl font-bold'>Comment</h3>
                                                        </div>
                                                        <div>
                                                            <button className='  shadow-lg bg-gray-100 py-2 px-4'>Delete</button>
                                                        </div>
                                                    </div>
                                              </div>
                                        </div>
                                    </div>

                                </div>
                            </section>
                        )
                    }
            </article>
        )
    }
}

export default SingleArticle