import Home from './Home'
import React from 'react'
import '../css/tailwind.css'
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'
import Header from './Header'
import SignUp from './SignUp'
import Login from './Login'
import SingleArticle from './SingleArticle'


function App(){
    return(
        <BrowserRouter>
            <Header />
            <Route path='/' exact >
                <Home />
            </Route>
            <Route path='/signup'  exact>
                <SignUp />
            </Route>
            <Route path='/login' component={Login} >
               
            </Route>
            {
                (localStorage.getItem('token')) ? <Redirect to='/' /> : <Redirect  to='/login' />
            }
            

            <Route path='/article/:slug'  exact component={SingleArticle} />

        </BrowserRouter>
    )
}

export default App