import React from 'react'
import {Link} from 'react-router-dom'

function Header(props){
    let currentUser = (JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null ) 
    return(
         <header className='flex flex-row justify-between fixed top-0  overscroll-y-bg-transparent  overflow-hidden  items-center container px-10 py-2 bg-gray-100 text-black shadow-lg'>
             <div className='logo py-2'>
                 <h1 className='text-3xl font-bold text-shadow-lg text-black '>Conduit</h1>
             </div>
            <div className='flex flex-row items-center justify-around '>
                <div className='mx-5 my-2'>
                    <input className='border-2 border-black shadow-lg rounded-full px-2 w-60' placeholder='search articles' type='text'></input>
                </div>
                <div>
                    <nav className='flex flex-row items-center'>
                        <Link to='/' className='text-xl mx-2 text-red-800 text-shadow-sm font-bold'>
                            Home
                        </Link>
                        <Link to={localStorage.getItem('user')? `/${JSON.parse(localStorage.getItem('user')).username}` : '/signup'} className='text-xl mx-2 text-red-800 text-shadow-sm font-bold'>
                        {localStorage.getItem('user')? `${JSON.parse(localStorage.getItem('user')).username}` : 'Signup'}
                        </Link>
                        <Link to={localStorage.getItem('user')? `/logout` : '/login'} className='text-xl mx-2 text-red-800 text-shadow-sm font-bold'>
                            {localStorage.getItem('user') ? 'Logout' : 'Login'}
                        </Link>
                    </nav>
                </div>
            </div>
         </header>
    )
}

export default Header