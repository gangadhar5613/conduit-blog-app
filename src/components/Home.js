import React from 'react'
import Banner from './Banner'
import ListArticles from './ListArticles'
import Loader from './Loader'
import Tags from './Tags'
import Header from './Header'
import {Article} from './ListArticles'


class Home extends React.Component{
  constructor(props){
    super(props)
    this.state={
      articles:null,
      error:'',
      tags:null,
      activeTagArticles:null,
      activeTag:null,
      acitveUser:( JSON.parse( localStorage.getItem('user')) ? JSON.parse( localStorage.getItem('user')) : null )
    }
  }

  handleAllArticles=  async() => {
      this.setState({
        activeTag:null,
        articles:null
    })

      await fetch('/api/articles')
        .then((res) => {
            if(!res.ok){
              throw new Error(res.statusText)
            }else{
              return res.json()
            }
        }
        )
        .then((articles) => this.setState({articles:articles}))
        .catch((error) => this.setState({error:'Not able to fetch the articles'}))
  }

  handleTag =  (event) => {

         console.log(event.target)
         fetch(`/api/articles/?tag=${event.target.id}`)
       .then((res) => {
         if(!res.ok){
           throw new Error(res.statusText)
         }else{
           return res.json()
         }
       })
       .then((articles) => this.setState({articles:articles,activeTag:event.target.id}))
       .catch((error) => this.setState({error:'Not able to fetch the articles'}))
  }

  componentDidMount(){
       fetch('/api/articles')
       .then((res) => {
         if(!res.ok){
            throw new Error(res.statusText)
         }else{
            return res.json()
         }
       })
       .then((articles) => this.setState({articles:articles}))
       .catch((error) => this.setState({error:'Not able to fetch the articles'}))

       fetch('/api/tags')
       .then((res) => {
        if(!res.ok){
           throw new Error(res.statusText)
        }else{
           return res.json()
        }
      })
    .then((tags) => this.setState({tags:tags}) )
    .catch((error) => this.setState({error:'Not able to fetch the tags'}))
  }

    render(){

        return(
          <>
           <main className='conatiner mx-auto'>
              <Banner />
                <section className='flex flex-row mx-10  my-2'>
                      {
                        (this.state.error ? <p className='text-3xl text-center w-full text-shadow-sm'>{this.state.error}</p> : '')
                      }
                      {
                        ((!this.state.tags || !this.state.articles) ? <Loader /> :
                        <>
                          <ListArticles activeUser={this.state.acitveUser} handleAllArticles ={this.handleAllArticles} articles={this.state.articles.articles} activeTag={this.state.activeTag} activeTagArticles={(this.state.activeTagArticles ? this.state.activeTagArticles.articles : '')} />
                          <Tags handleTag={this.handleTag} tags={this.state.tags.tags} />
                        </>
                        )
                      }
                </section>
           </main>
          </>
        )
    }
}

export default Home