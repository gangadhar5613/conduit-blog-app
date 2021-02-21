import React from 'react'
import {EditorState,Editor} from 'draft-js'


class NewPost extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title:'',
            description:'',
            body:'',
            tagList:'',
            pageError:'',
            errors:{
                title:'',
                description:'',
                body:'',
                tagList:''
            }
        }   
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
                let tags = value.split(',')
                this.setState({tagList:tags})
                break
            case 'body':
                errors.body = value.trim().length >= 200  ? '' : 'Body must be atleast 200 characters'
                this.setState({body:value})
           default:
               break;
       }
    }

    handleSubmitNewPost = async (event) => {
      event.preventDefault();
      const article= {
          "article":{
            title:this.state.title,
            description:this.state.description,
            body:this.state.body,
            tagList:this.state.tagList,
          }
      }

     await fetch(`/api/articles`,{method:'POST',headers:{'Content-Type':'application/json','Authorization': JSON.parse(localStorage.getItem('user')).token},body:JSON.stringify(article)})
      .then((res) => {
        if(!res.ok){
          throw new Error(res.statusText)
        }else{
          return res.json()
        }
        })
      .then((data) => console.log(data))
      .catch((error) => this.setState({pageError:'Not able to fetch the articles'}))
        window.location.href = 'http://localhost:3000/'
    }


    render(){
        return(
            <section className='my-20 flex  items-center  w-full justify-center  '>
                   <div className='w-full justify-center mx-60  items-center'>
                       <h2 className='text-center text-3xl font-bold text-shadow-sm text-green-500'>Create new post</h2>
                        <form className='flex flex-col px-10 py-5   justify-items-center rounded-md   shadow-2xl'>
                            <div className='block-1 flex flex-col my-1'>
                                <label htmlFor='title' className='text-xl font-bold py-1 text-red-700 text-shadow-sm' id='title-label'>Title</label>
                                <input required onChange={this.handleInput} type='text' className='w-full border-2 border-green-300  shadow-md p-1  border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent' name='title' id='title' placeholder='Enter your title'></input>
                                <span  className={!this.state.errors.title ? 'hidden' : ' text-xs text-red-400 font-bold'}>Title can't be empty</span>
                            </div>
                            <div className='block-1 my-1  flex flex-col'>
                                <label htmlFor='description' className='text-xl py-1 font-bold text-red-700 text-shadow-sm' id='descrption-label'>Description</label>
                                <input  onChange={this.handleInput} type='text' className='w-full border-2  border-green-300 shadow-md p-1  border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent' required name='description' id='description' placeholder='Enter your description'></input>
                                <span className={!this.state.errors.description ? 'hidden' : ' text-xs text-red-400 font-bold'}>Description must have atleast 20 characters</span>
                            </div>
                            <div className='block-1 my-1  flex flex-col'>
                                <label htmlFor='body' className='text-xl py-1 font-bold text-red-700 text-shadow-sm' id='body-label'>Body</label>
                                <textarea  required className='w-full border-2  border-green-300  shadow-md p-1  border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent' name='body' value={this.state.body} onChange={this.handleInput} rows='10'  placeholder='Enter your body for your post.(This will support markdown)'></textarea>
                                <span className={!this.state.errors.body ? 'hidden' : ' text-xs text-red-400 font-bold'}>Body must be atleast 200 characters</span>
                            </div>
                            <div className='flex my-1 flex-col'>
                                <label htmlFor='tags' className='text-xl py-1 font-bold text-red-700 text-shadow-sm'>Tags</label>
                                <input  required onChange={this.handleInput} type='text' className='w-full border-2  border-green-300  shadow-md p-1  border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent' name='tags' id='tags' placeholder='Enter your tags'></input>
                                <span className={!this.state.errors.tagList ? 'hidden' : ' text-xs text-red-400 font-bold'}>TagList can't be empty</span>
                            </div>
                            <div className='flex items-center justify-center my-2'>
                                <button disabled={this.state.errors.title || this.state.errors.body} onClick={this.handleSubmitNewPost} className='text-2xl rounded bg-black text-white px-6 py-2 '>Submit</button>
                            </div>
                        </form>
                   </div>
            </section>
        )
    }
}

export default NewPost