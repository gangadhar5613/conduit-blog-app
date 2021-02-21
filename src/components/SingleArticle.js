import { data } from 'autoprefixer'
import { Editor } from 'draft-js'
import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import Loader from './Loader'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import Comment from './Comment'
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
// // SyntaxHighlighter.registerLanguage('javascript', js);

class SingleArticle extends React.Component{
    constructor(props){
        super(props)
        this.state={
            article:null,
            comment:'',
            allComments:null,
            pageError:'',
            isArticleDeleted:false,


        
        }
    }
    componentDidMount(){
        fetch(`/api/articles/${this.props.match.params.slug}`)
        .then((res) => {
            if(!res.ok){
              throw new Error(res.statusText)
            }else{
              return res.json()
            }
        }
        )
        .then((article) => {
            this.setState({article:article})
        })
        .catch((error) => this.setState({pageError:'Not able to fetch the article'}))


      fetch(`/api/articles/${this.props.match.params.slug}/comments`)
      .then((res) => {
        if(!res.ok){
          throw new Error(res.statusText)
        }else{
          return res.json()
        }
        })
        .then((comments) => this.setState({allComments:comments.comments}) )
        .catch((error) => this.setState({pageError:'Not able to fetch the comments'}))
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

    submitComment = async (event) => {
        console.log('hello')
       event.preventDefault();
        const comment = {
            "comment":{
                body:this.state.comment
            }
        }
        await fetch(`/api/articles/${this.props.match.params.slug}/comments`,{method:'POST',headers:{'Content-Type':'application/json','Authorization': JSON.parse(localStorage.getItem('user')).token},body:JSON.stringify(comment)})
        .then((res) => {
            if(!res.ok){
              throw new Error(res.statusText)
            }else{
              return res.json()
            }
          })
        .then((comment) =>this.setState({allComments:this.state.allComments.concat(comment.comment)}) ) 
        .catch((error) => this.setState({pageError:'Not able to post the comment'}))

    }

    handleDeleteArticle = (slug) => {

        fetch(`/api/articles/${slug}`,{method:'DELETE',headers : {"Content-Type":'application/json',"Authorization":JSON.parse(localStorage.getItem('user')).token}})
        .then((res)=> {
            if(!res.ok){
                throw new Error(res.statusText)
            }else{
                return res.json()
            }
        })
        .then((article) => this.setState({isArticleDeleted:true}) )
        .catch((error) => this.setState({pageError:'Not able to delete the article'}) )
        window.location.href = 'http://localhost:3000'

    }

    handleDeleteComment = (event) => {
        event.preventDefault();
        const commentId = event.target.id

        fetch(`/api/articles/${this.props.match.params.slug}/comments/${commentId}`,{method:'DELETE',headers:{'Content-Type':'application/json','Authorization': JSON.parse(localStorage.getItem('user')).token}})
        .then((res) => {
            if(!res.ok){
              throw new Error(res.statusText)
            }else{
              return res.json()
            }
        })
        .then((data) => console.log(data))
        .catch((error) => this.setState({pageError:'Not able to delete the comment'}))     
         window.location.reload()
    }

    render(){
        if(this.state.isArticleDeleted){
            <Redirect to='/' />
        }
        if(this.state.pageError){
            return <p className='my-20 text-3xl text-center text-shadow-sm'>{this.state.pageError}</p>
        }
        return(
            <article className='flex items-center my-20 px-60 justify-center container'>
                    {
                        (!this.state.article ? <Loader /> :
                            <section className='article-body relative'>
                                <div>
                                    <div className='flex flex-row my-5 items-center '>
                                        <div className='w-10  '>
                                            <img className='w-full h-10 rounded-full' src={this.state.article.article.author.image ? this.state.article.article.author.image : '/images/user-1.jpg'  } alt={this.state.article.article.slug}></img>
                                        </div>
                                        <div className='flex mx-2 my-1 flex-col'>
                                            <Link >
                                               <h2 className='text-md font-bold hover:underline text-shadow-sm text-red-800'>{this.state.article.article.author.username}</h2>
                                            </Link>
                                            <h3 className='text-xs text-gray-500'>{this.state.article.article.createdAt.toLocaleString()}</h3>
                                        </div>
                                        {
                                           ((JSON.parse(localStorage.getItem('user')).username === this.state.article.article.author.username) ?
                                           <div className='flex flex-row'>
                                            <Link to={`/article/${this.state.article.article.slug}/edit`} >
                                                <i className="fas text-4xl mx-2 text-red-400 cursor-pointer fa-edit"></i>
                                            </Link>
                                            <div>
                                             <i onClick={() => this.handleDeleteArticle(this.state.article.article.slug)} className="far text-3xl text-red-700 cursor-pointer mx-2 fa-trash-alt"></i>
                                            </div>
                                          </div>
                                             : '')
                                        }
                                         <div className='bg-red-500 cursor-pointer absolute right-0 text-white px-4 py-1 inline-block  rounded-sm'>
                                               <h3>1</h3>
                                               <i class="fas fa-heart"></i>
                                        </div>
                                    </div>
                                    <div className='flex flex-col'>
                                        <h2 className='text-3xl my-2 font-bold'>{this.state.article.article.title}</h2>
                                        <p className=' text-md text-gray-500 border-2 p-4  text-justify h-full '>{this.state.article.article.description}</p>
                                    </div>
                                    <div>
                                         <div className='border-2 markdown border-green-600 p-4 my-4'>
                                             {<ReactMarkdown  source={this.state.article.article.body}  />}
                                         </div>
                                    </div>
                                    
                                     {
                                         ((localStorage.getItem('user')) ? "" :
                                            <div className='text-center flex flex-row items-center justify-center text-2xl my-2'>
                                                 <h2><Link className='text-red-600 font-bold underline mx-1' to='/signup'>SignUp</Link>or<Link className='text-red-600 font-bold underline mx-1'  to='/login'>Login</Link> to Comment</h2>
                                            </div>
                                          )
                                     }
                                    <div className=' my-5  comments-section '>
                                        <div>
                                             <h2 className='text-xl font-bold my-1'>Comments</h2>
                                        </div>
                                        <div className='border-2 border-gray-200 shadow-md rounded-sm'>
                                              {
                                                (  ! (localStorage.getItem('user')) ? '' : 
                                                    <div className='flex flex-row p-2 items-center'>
                                                       <textarea onChange={this.handleComment} type='textarea' rows='2' cols='50' className='w-full border-2 shadow border-transparent focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent ' name='comment' id='comment' placeholder='Add your comment' ></textarea>
                                                      <button onClick={this.submitComment}  type='submit' className='text-sm bg-black text-white py-2 px-6 w-40 mx-6'>Add Comment</button>
                                                    </div> 
                                                )
                                              }
                                              <div className='mx-2 border-2 px-2  justify-center py-2 flex flex-col  shadow-lg  my-1'>
                                                   {
                                                       (!this.state.allComments ?  'Add Comments' : 
                                                             this.state.allComments.map((comment) => {
                                                                 return(
                                                                       <Comment key={comment.id} handleDeleteComment={this.handleDeleteComment} comment={comment} />
                                                                 )
                                                             })
                                                       )
                                                   }
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