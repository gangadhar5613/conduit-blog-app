import {Link} from 'react-router-dom'

function Comment(props){
    return(
        <>
                <div key={props.comment.id} className='flex flex-row items-center py-2   justify-between my-2 border-2 border-gray-300 '>
                        <div className='flex items-center'>
                            <div className='w-5  '>
                                <img className='w-full h-5 rounded-full' src='/images/user-1.jpg' alt=''></img>
                            </div>
                            <div className='flex mx-2 my-1 flex-col'>
                                <Link >
                                    <h2 className='text-xs font-bold hover:underline text-shadow-sm text-red-800'>{JSON.parse(localStorage.getItem('user')).username}</h2>
                                </Link>
                                <h3 className='text-xs text-gray-500'>11/02/2020</h3>
                            </div>
                        </div>
                        <div className='mx-5'>
                            <h3 className='text-md font-bold'>{props.comment.body}</h3>
                        </div>
                        <div>
                            <button onClick={props.handleDeleteComment} id={props.comment._id} className='  shadow-lg bg-gray-100 py-2 px-4'>Delete</button>
                        </div>
                </div>
        </>
    )
}

export default Comment