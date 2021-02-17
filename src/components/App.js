import Home from './Home'
import React from 'react'
import '../css/tailwind.css'
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'
import Header from './Header'
import SignUp from './SignUp'
import NewPost from './Newpost'
import Login from './Login'
import SingleArticle from './SingleArticle'
import EditArticle from './EditArticle'
import UserProfile from './UserProfile'
import User from './UserInfo'
import NoMatch from './NoMatch'



function App(){
    console.log('hello')
    return(
        <BrowserRouter>
            <Header />
           

           <Switch>
            <Route path='/' exact >
                    <Home />
                </Route>
                <Route path='/signup'  exact>
                {
                    console.log('hello 4')
                }
                    <SignUp />
                </Route>
                <Route path='/login' component={Login} >
                {
                    console.log('hello 2')
                }
                </Route>
                <Route path='/article/:slug/edit' exact component={EditArticle} / >
            
                
                <Route path='/article/:slug'  exact component={SingleArticle} />
                <Route path='/article/create/new' exact  >
                    <NewPost />
                </Route>

                <Route path='/user/profile' exact >
                    <UserProfile />
                </Route>
                <Route path='/user' exact >
                    <User />
                </Route>
                <Route path='*' exact>
                    <NoMatch />
                </Route>

            
            </Switch>
            

  


        </BrowserRouter>
    )
}

export default App