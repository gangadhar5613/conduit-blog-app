import React from 'react'
import Banner from './Banner'
import ListArticles from './ListArticles'
import Loader from './Loader'
import Tags from './Tags'
import Pagination from './Pagination'


class Home extends React.Component{
  constructor(props){
    super(props)
    this.state={
      articles:null,
      error:'',
      tags:null,
      activeTagArticles:null,
      activeTag:null,
      articlesCount:0,
      articlesPerPage:8,
      activePageIndex:1,
      acitveUser:( JSON.parse( localStorage.getItem('user')) ? JSON.parse( localStorage.getItem('user')) : null )
    }
  }

  handleAddToFavoriteArticles = (article) => {
       let user = {
         "user":{
           favoriteArticles:article.id
         }
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
        .then((articles) => this.setState({articles:articles,articlesCount:articles.articlesCount}))
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

  componentDidUpdate(_prevProps,prevState){
    if(prevState.activePageIndex !== this.state.activePageIndex){
      this.fetchData()
    }
  }

   componentDidMount(){
     this.fetchData()
   }

  fetchData(){
    let limit = this.state.articlesPerPage
    let offset = (this.state.activePageIndex - 1) * limit
       fetch(`/api/articles/?limit=${limit}&offset=${offset}`)
       .then((res) => {
         if(!res.ok){
            throw new Error(res.statusText)
         }else{
            return res.json()
         }
       })
       .then((articles) => this.setState({articles:articles,articlesCount:articles.articlesCount}))
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

  updateCurrentIndex = (index) => {
      this.setState({activePageIndex:index},this.fetchData)
  } 

    render(){

        return(
          <>
           <main className='conatiner relative mx-auto'>
              <Banner />
                <section className='flex flex-row mx-10   my-2'>
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
                <section className='container mx-auto flex items-center justify-center my-5'>
                     <Pagination updateCurrentIndex={this.updateCurrentIndex} articlesCount={this.state.articlesCount} activePageIndex={this.state.activePageIndex} articlesPerPage={this.state.articlesPerPage} />
                </section>
           </main>
          </>
        )
    }
}

export default Home