import React from 'react'
import { Link } from 'react-router-dom'
import Loader from './Loader'
class Tags extends React.Component{
    constructor(props){
        super(props)
        
    }

    render(){
        return(

            <section className='shadow-lg text-center bg-red-200 py-4 w-96 h-32'>
                <div>
                    <h2 className='text-md font-bold'>Popular Tags</h2>
                </div>
                <div className='tags py-2 items-center justify-center flex flex-row'>
                    {

                        (!this.props.tags ? <Loader /> : 
                         this.props.tags.map((tag) => {
                             return   <Link>
                                  <SingleTag handleTag={this.props.handleTag}  tag={tag} />
                             </Link>
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
    <h4 onClick={props.handleTag} id={props.tag} className='bg-red-400 mx-1 shadow-md text-white px-1 py-0.5 rounded-full'>{props.tag}</h4>
   )
}

export default Tags