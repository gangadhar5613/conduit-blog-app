import React from 'react'
import {Link} from 'react-router-dom'
import {validateEmail,validatePassword} from './SignUp'

class UserProfile extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username:'',
            email:'',
            bio:'',
            password:'',
            errors :{
                email:'',
               password:'',
               username:'',
            },
            profilePicURL:'',
            currentUser:null
        }
    }


    handleInput = (event) => {
        const{name,value} = event.target
        const errors = this.state.errors
           switch (name) {
               case 'username':
                   
                   errors.username = (value.length >=6 && value.trim().length>=6 ) ? '' : 'Username must contain 6 characters'
                    this.setState({username:value})
                   break;
               case 'email':
                   errors.email = validateEmail(value) ? '' : 'Please enter valid email'
                   this.setState({email:value})
                   break
               case 'password':
                   errors.password = (value.length >=6 && validatePassword(value)) ? '': ' Password must a number & letter'
                   this.setState({password:value})
                   break;
               default:
                   break;
           }
       }
    
       handleUpdateProfile = async () => {
           const user = {
               "user":{
                   image:this.state.profilePicURL,
                   bio:this.state.bio,
                   username:this.state.username,
                   password:this.state.password,
                   email:this.state.email
               }
           }

       await fetch(`/api/user`,{method:'PUT',headers:{'Content-Type':'application/json','Authorization': JSON.parse(localStorage.getItem('user')).token},body:JSON.stringify(user)})
            .then((res) => res.json())
            .then((user) => this.setState({
                email:user.user.email,
            bio:user.user.bio,
            profilePicURL:user.user.image,
            username:user.user.username
            }) )

       }
   


    componentDidMount(){
        fetch(`/api/user`,{method:'GET',headers:{'Content-Type':'application/json','Authorization': JSON.parse(localStorage.getItem('user')).token}})
        .then((res) => res.json())
        .then((user) => this.setState({
            email:user.user.email,
            bio:user.user.bio,
            profilePicURL:user.user.image,
            username:user.user.username
        }))
    }

    render(){
        return(
            <section className='h-screen overflow-hidden bg-gray-100 flex items-center justify-center' >
            <div className=  ' w-96  p-3    rounded-md shadow-xl'>
                 <div className=''>
                     <div className='text-center my-2 text-2xl font-bold  text-shadow-md'>
                         <h2>Update Profile</h2>
                     </div>
                     <form >
                         <div className='flex flex-col my-1'>
                             <label className='text-md text-red-800 font-bold' htmlFor='username' id='username-label'>Profile Pic URL</label>
                             <input onChange={this.handleInput} className='w-full  p-1 shadow border border-transparent focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent  outline-none  rounded-sm' id='username' type='text' value={this.state.profilePicURL} name='image'  placeholder='Please enter username'></input>
                             <span className='text-red-500 text-sm my-1'>{this.state.errors.username ? this.state.errors.username : ''}</span>
                         </div>
                         <div className='flex flex-col my-2'>
                             <label className='text-md text-red-800 font-bold' htmlFor='email' id='email-label'>Username</label>
                             <input onChange={this.handleInput} className='w-full shadow  p-1 border border-transparent focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent  outline-none  rounded-sm' id='username' type='text' value={this.state.username} name='username'  placeholder='Please enter email'></input>
                             <span className='text-red-500 text-sm my-1'>{this.state.errors.username ? this.state.errors.username : ''}</span>
                         </div>
                         <div className='flex flex-col my-2'>
                             <label className='text-md text-red-800 font-bold' htmlFor='Password' id='Password-label'>Bio</label>
                             <input onChange={this.handleInput} className='w-full shadow p-1 border border-transparent focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent  outline-none  rounded-sm' id='bio' type='bio' value={this.state.bio} name='bio'  placeholder='Please update your bio'></input>
                             <span className='text-red-500 text-sm my-1'>{this.state.errors.bio ? this.state.errors.bio : ''}</span>
                         </div>
                         <div className='flex flex-col my-2'>
                             <label className='text-md text-red-800 font-bold' htmlFor='Password' id='Password-label'>Email</label>
                             <input onChange={this.handleInput} className='w-full shadow p-1 border border-transparent focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent  outline-none  rounded-sm' id='email' type='email' value={this.state.email} name='email'  placeholder='Update your email'></input>
                             <span className='text-red-500 text-sm my-1'>{this.state.errors.email ? this.state.errors.email : ''}</span>
                         </div>
                         <div className='flex flex-col my-2'>
                             <label className='text-md text-red-800 font-bold' htmlFor='Password' id='Password-label'>Update Password</label>
                             <input onChange={this.handleInput} className='w-full shadow p-1 border border-transparent focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent  outline-none  rounded-sm' id='Password' type='password' value={this.state.password} name='password'  placeholder='Update your Password'></input>
                             <span className='text-red-500 text-sm my-1'>{this.state.errors.password ? this.state.errors.password : ''}</span>
                         </div>
                         <div className='flex justify-center my-4'>
                             <button onClick={this.handleUpdateProfile} className='bg-red-800 py-2 px-6 text-white rounded-sm' type='submit' >Update</button>
                         </div>
                     </form>
                 </div>
            </div>
     </section>
        )
    }
}


export default UserProfile