import { data } from 'autoprefixer'
import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import {validateEmail,validatePassword} from './SignUp'

class Login extends React.Component{

    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
            pageError:'',
            errors :{
                email:'',
                password: ''
            },
            isUserLoggedin:false

        }
    }

    handleInput = (event) => {
     const{name,value} = event.target
     const errors = this.state.errors

        switch (name) {
            case 'email':
                 errors.email = validateEmail(value) ? '' : 'Please enter valid email'
                this.setState({email:value})
                break
            case 'password':
                errors.password = validatePassword(value) ? '' : 'Password must contain a number & letter'
                this.setState({password:value})
                break;
            default:
                break;
        }

    }

    handlelogin = async (event) => {
        event.preventDefault()
        let user = {
            "user":{
                "email":this.state.email,
                "password":this.state.password
            }
        }

      await  fetch('/api/users/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(user)})
      .then((res) => {
        if(!res.ok){
          throw new Error(res.statusText)
        }else{
          return res.json()
        }
        })
        .then((data) => localStorage.setItem('user',JSON.stringify(data.user)))
        .then(() => this.setState({isUserLoggedin:true}))
        .catch((error) => this.setState({pageError:'Not able to fetch the articles'}))
        window.location.href = 'http://localhost:3000/'
    }

       
    render(){
        if(localStorage.getItem('user') || this.state.isUserLoggedin){
            return <Redirect  to='/' />
        }else{
        return(
            <section className='h-screen overflow-hidden bg-gray-100 flex items-center justify-center' >
                   <div className=  ' w-96 h-96 p-3  rounded-md shadow-xl'>
                        <div className=''>
                            <div className='text-center my-2 text-2xl font-bold  text-shadow-md'>
                                <h2>Login</h2>
                            </div>
                            <form >
                                <div className='flex flex-col my-2'>
                                    <label className='text-md text-green-800 font-bold' htmlFor='email' id='email-label'>Email</label>
                                    <input onChange={this.handleInput} className='w-full shadow  p-1 border border-transparent focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent  outline-none  rounded-sm' id='email' type='email' value={this.state.email} name='email'  placeholder='Please enter email'></input>
                                    <span className='text-red-500 text-sm my-1'>{this.state.errors.email ? this.state.errors.email : ''}</span>
                                </div>
                                <div className='flex flex-col my-2'>
                                    <label className='text-md text-green-800 font-bold' htmlFor='Password' id='Password-label'>Password</label>
                                    <input onChange={this.handleInput} className='w-full shadow p-1 border border-transparent focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent  outline-none  rounded-sm' id='Password' type='password' value={this.state.password} name='password'  placeholder='Please enter Password'></input>
                                    <span className='text-red-500 text-sm my-1'>{this.state.errors.password ? this.state.errors.password : ''}</span>
                                </div>
                                <div className='flex justify-center my-4'>
                                    <button onClick={this.handlelogin} className='bg-red-800 py-2 px-6 text-white rounded-sm' type='submit' >Login</button>
                                </div>
                                <div className='flex flex-row text-center justify-center'>
                                    <h2 className='text-md font-bold text-green-800'>Not Registered Yet? </h2>
                                    <Link to='/signup' className='text-blue-700 font-bold mx-1'>
                                       Register
                                    </Link>
                                </div>
                            </form>
                        </div>
                   </div>
            </section>
        )
    
    }
  }
}

export default Login