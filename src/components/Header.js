import React from 'react'
import {NavLink,Link} from 'react-router-dom'

function Header(props){

    return(
         <header className='flex flex-row z-10  md:w-full justify-between fixed top-0 container mx-auto  overscroll-y-bg-transparent  overflow-hidden  items-center container px-10 py-2 bg-gray-100 text-black shadow-lg'>
            <Link to='/'> 
              <div className='logo py-2'>
                 <h1 className='text-3xl font-bold text-shadow-lg text-black '>Conduit</h1>
              </div>
            </Link>
            <div className='flex flex-row items-center justify-around '>
                <div>
                    <nav className='flex flex-row items-center'>
                        <NavLink exact activeStyle={{ fontWeight: "bold",  color: "red"}} activeClassName='selected' to='/' className='text-lg mx-2 text-red-800 text-shadow-sm font-bold'>
                            Home
                        </NavLink>

                        <NavLink exact activeStyle={{ fontWeight: "bold",  color: "red"}} activeClassName='selected' to={localStorage.getItem('user')? `/user/profile/${JSON.parse(localStorage.getItem('user')).username}` : '/signup'} className='text-lg mx-2 text-red-800 text-shadow-sm font-bold'>
                            {localStorage.getItem('user')? 'Profile' : 'Signup'}
                        </NavLink>
                         {
                             (localStorage.getItem('user') ? 
                            <>
                             <h2 exact activeStyle={{ fontWeight: "bold",  color: "red"}} activeClassName='selected'  onClick={handleLogout} to='' className='text-lg mx-2 cursor-pointer text-red-800 text-shadow-sm font-bold'>
                                Logout 
                             </h2>
                             <NavLink exact activeStyle={{ fontWeight: "bold",  color: "red"}} activeClassName='selected' to='/article/create/new' className='text-lg mx-2 text-red-800 text-shadow-sm font-bold'>
                                 New Article
                             </NavLink>
                            </>
                             :
                              <NavLink exact activeStyle={{ fontWeight: "bold",  color: "red"}} activeClassName='selected'  to='/login' className='text-lg mx-2 text-red-800 text-shadow-sm font-bold'>
                                      Login
                             </NavLink>
                             )
                         }
                    </nav>
                </div>
            </div>
         </header>
    )
}

function handleLogout(){
    localStorage.clear()
    window.location.href='http://localhost:3000'
}

export default Header