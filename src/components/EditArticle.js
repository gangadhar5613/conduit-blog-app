import React from 'react'
import {EditorState,Editor} from 'draft-js'


class EditArticle extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            editorState:EditorState.createEmpty(),
                title:'',
                description:'',
                body:'',
                tags:'',
            
        
        }
        
       
        
    }

    

    updateEditorState = (editorState) => {
        this.setState({editorState})
    }

    handleForm = (event) => {
        console.log(event.target.value)
        this.editor.save().then((output) => {
            this.setState({body:output})
            console.log('Article data',output)
        }).catch((error) => {
            console.log('saving failed',error)
        })
        this.setState({body:event.target.value})
    }

    handleInput = (event) => {
       const {name,value} = event.target


       switch (name) {
           case 'title':
                this.setState({title:value})
               break;
            case 'description':
                this.setState({description:value})
                break;
            case 'tags':
                this.setState({tags:value})
                break
            case 'body':
                this.setState({body:value})
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

      fetch(`/api/articles`,{method:'POST',headers:{'Content-Type':'application/json','Authorization': JSON.parse(localStorage.getItem('user')).token},body:article})
      .then((res) => res.json())
      .then((data) => console.log(data))
    }


    render(){
        console.log('edit')
        return(
            <section className='my-20 flex  items-center  w-full justify-center  '>
                   <div className='w-full justify-center mx-60  items-center'>
                       <h2 className='text-center text-3xl font-bold text-shadow-sm text-green-500'>Update  post</h2>
                        <form className='flex flex-col px-10 py-5   justify-items-center rounded-md   shadow-2xl'>
                            <div className='block-1 flex flex-col my-1'>
                                <label htmlFor='title' className='text-xl font-bold py-1 text-red-700 text-shadow-sm' id='title-label'>Title</label>
                                <input onChange={this.handleInput} type='text' className='w-full border-2 border-green-300  shadow-md p-1  border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent' name='title' id='title' placeholder='Enter your title'></input>
                                <span className=' text-xs text-red-400 font-bold'>Title can't be empty</span>
                            </div>
                            <div className='block-1 my-1  flex flex-col'>
                                <label htmlFor='description' className='text-xl py-1 font-bold text-red-700 text-shadow-sm' id='descrption-label'>Description</label>
                                <input onChange={this.handleInput} type='text' className='w-full border-2  border-green-300 shadow-md p-1  border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent' name='description' id='description' placeholder='Enter your description'></input>
                                <span className=' text-xs text-red-400 font-bold'>Description must have atleast 20 characters</span>
                            </div>
                            <div className='block-1 my-1  flex flex-col'>
                                <label htmlFor='body' className='text-xl py-1 font-bold text-red-700 text-shadow-sm' id='body-label'>Body</label>
                                <textarea className='w-full border-2  border-green-300  shadow-md p-1  border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent' name='body' value={this.state.body} onChange={this.handleInput} rows='10'  placeholder='Enter your body for your post.(This will support markdown)'></textarea>
                            </div>
                            <div className='flex my-1 flex-col'>
                                <label htmlFor='tags' className='text-xl py-1 font-bold text-red-700 text-shadow-sm'>Tags</label>
                                <input onChange={this.handleInput} type='text' className='w-full border-2  border-green-300  shadow-md p-1  border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent' name='tags' id='tags' placeholder='Enter your tags'></input>
                                <span className=' text-xs text-red-400 font-bold'>Description must have atleast 20 characters</span>
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

export default EditArticle