import React from 'react'
import Loader from './Loader'

class EditArticle extends React.Component{
    constructor(props){
        super(props)
        this.state = {
                title:'',
                description:'',
                body:'',
                tagList:'',
                pageError:'',
                currentArticle:null,
                errors:{
                    title:'',
                    description:'',
                    body:'',
                    tagList:''
                }
        }     
    }

    componentDidMount(){
        fetch(`/api/articles/${this.props.match.params.slug}`)
        .then((res) => res.json())
        .then((article) => this.setState({
            currentArticle:article,
            title:article.article.title,
            body:article.article.body,
            description:article.article.description,
            tagList:article.article.tagList

        }))
    }
    
    handleInput = (event) => {
       const {name,value} = event.target
       let errors = this.state.errors
       switch (name) {
           case 'title':
                 errors.title = value.trim().length >=10 ? '' : " title can't be empty  "
                this.setState({title:value})
               break;
            case 'description':
                errors.description = value.trim().length >=10 ? '' : " Description must be atleast 20 characters  "
                this.setState({description:value})
                break;
            case 'tags':
                errors.tagList = value.trim().length >=10 ? '' : " tagList can't be empty  "
                this.setState({tagList:value})
                break
            case 'body':
                errors.body = value.trim().length >= 200  ? '' : 'Body must be atleast 200 characters'
                this.setState({body:value})
                break
           default:
               break;
       }
    }

    handleSubmitEditArticle = (event) => {
      event.preventDefault();
      const article= {
          "article":{
              title:this.state.title,
              description:this.state.description,
              body:JSON.stringify(this.state.body),
              tagList:this.state.tags,
            }
        }

      fetch(`/api/articles/${this.state.currentArticle.article.slug}`,{method:'PUT',headers:{'Content-Type':'application/json','Authorization': JSON.parse(localStorage.getItem('user')).token},body:JSON.stringify(article)})
      .then((res) => {
        if(!res.ok){
          throw new Error(res.statusText)
        }else{
          return res.json()
        }
        })
      .then((data) =>this.setState({currentArticle:data}))
      .catch((error) => this.setState({pageError:'Not able to fetch the articles'}))
       window.location.href = `http://localhost:3000/article/${this.state.currentArticle.article.slug}`
    }


    render(){
        if(!this.state.currentArticle){
            return <Loader />
        }else{
        return(
            <section className='my-20 flex  items-center  w-full justify-center  '>
                   <div className='w-full justify-center mx-60  items-center'>
                       <h2 className='text-center text-3xl font-bold text-shadow-sm text-green-500'>Update  post</h2>
                        <form className='flex flex-col px-10 py-5   justify-items-center rounded-md   shadow-2xl'>
                            <div className='block-1 flex flex-col my-1'>
                                <label htmlFor='title' className='text-xl font-bold py-1 text-red-700 text-shadow-sm' id='title-label'>Title</label>
                                <input onChange={this.handleInput} type='text' className='w-full border-2 border-green-300  shadow-md p-1  border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent' value={this.state.title} name='title' id='title' placeholder='Enter your title'></input>
                                <span  className={!this.state.errors.title ? 'hidden' : ' text-xs text-red-400 font-bold'}>Title can't be empty</span>
                            </div>
                            <div className='block-1 my-1  flex flex-col'>
                                <label htmlFor='description' className='text-xl py-1 font-bold text-red-700 text-shadow-sm' id='descrption-label'>Description</label>
                                <input onChange={this.handleInput} type='text' className='w-full border-2  border-green-300 shadow-md p-1  border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent' name='description' value={this.state.description} id='description' placeholder='Enter your description'></input>
                                <span className={!this.state.errors.description ? 'hidden' : ' text-xs text-red-400 font-bold'}>Description must have atleast 20 characters</span>
                            </div>
                            <div className='block-1 my-1  flex flex-col'>
                                <label htmlFor='body' className='text-xl py-1 font-bold text-red-700 text-shadow-sm' id='body-label'>Body</label>
                                <textarea required className='w-full border-2  border-green-300  shadow-md p-1  border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent' name='body' value={this.state.body} onChange={this.handleInput} rows='10'  placeholder='Enter your body for your post .(This will support markdown and must be atleast 200 characters)'></textarea>
                                <span className={!this.state.errors.body ? 'hidden' : ' text-xs text-red-400 font-bold'}>Body must be atleast 200 characters</span>
                            </div>
                            <div className='flex my-1 flex-col'>
                                <label htmlFor='tags' className='text-xl py-1 font-bold text-red-700 text-shadow-sm'>Tags</label>
                                <input required onChange={this.handleInput} type='text' className='w-full border-2  border-green-300  shadow-md p-1  border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent' name='tags' value={this.state.tagList} id='tags' placeholder='Enter your tags'></input>
                                <span className={!this.state.errors.tagList ? 'hidden' : ' text-xs text-red-400 font-bold'}>TagList can't be empty</span>
                            </div>
                            <div className='flex items-center justify-center my-2'>
                                <button onClick={this.handleSubmitEditArticle} className='text-2xl rounded bg-black text-white px-6 py-2 '>Submit</button>
                            </div>
                        </form>
                   </div>
            </section>
          )
        }
    }
}

export default EditArticle