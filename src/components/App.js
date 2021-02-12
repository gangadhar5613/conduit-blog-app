import Home from './Home'
import React from 'react'
import '../css/tailwind.css'
import {BrowserRouter,Route} from 'react-router-dom'
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
            <Route path='/login'  exact>
                <Login />
            </Route>
            <Route path='/article/:slug'  exact component={SingleArticle} />

        </BrowserRouter>
    )
}

export default App