import React from 'react'
import { Link } from 'react-router-dom'
import Loader from './Loader'
class Tags extends React.Component{
    constructor(props){
        super(props)
        
    }

    render(){
        return(

            <section className='shadow-lg absolute right-0 text-center bg-red-200 py-4 w-96 p-5  '>
                <div>
                    <h2 className='text-md font-bold'>Popular Tags</h2>
                </div>
                <div className='tags py-2 items-center justify-between grid grid-cols-2 gap-2 '>
                    {

                        (!this.props.tags ? <Loader /> : 
                         this.props.tags.map((tag) => {
                             return   <SingleTag key={tag} handleTag={this.props.handleTag}  tag={tag} />
                         })
                        )
                    }
                </div>
            </section>
        )
    }
}


export function SingleTag(props){
    
   return(
    <div  onClick={props.handleTag} id={props.tag} className="mx-4 flex flex-row items-center cursor-pointer  text-shadow-xl text-gray-800">
        <i id={props.tag} className="fas relative top-1 px-1 text-blue-800 fa-tag"></i>
      <span id={props.tag}>{props.tag}</span>
    </div>
   )
}

export default Tags