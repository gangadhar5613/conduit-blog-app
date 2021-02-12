import React from 'react'
import Banner from './Banner'
import ListArticles from './ListArticles'
import Loader from './Loader'
import Tags from './Tags'
import Header from './Header'


class Home extends React.Component{
    constructor(props){
        super(props)
        this.state={
            articles:null,
            tags:null,
            activeTagArticles:null,
            activeTag:null
        }
    }

    handleAllArticles=  async() => {
      this.setState({
        activeTag:null,
        articles:null
      })

      await fetch('/api/articles')
        .then((res) => res.json())
        .then((articles) => this.setState({articles:articles}))
    }

    handleTag = async (event) => {

         console.log(event.target.id)
       await  fetch(`/api/articles/?tag=${event.target.id}`)
       .then((res) => res.json())
       .then((articles) => this.setState({articles:articles,activeTag:event.target.id}))
    }

  async componentDidMount(){
     await  fetch('/api/articles')
       .then((res) => res.json())
       .then((articles) => this.setState({articles:articles}))

     await  fetch('/api/tags')
     .then((res) => res.json())
     .then((tags) => this.setState({tags:tags}) )
   }

    render(){

        return(
          <>
            <Banner />
             <section className='flex flex-row mx-10 justify-between my-2'>
                  {
                    ((!this.state.tags || !this.state.articles) ? <Loader /> :
                    <>
                      <ListArticles handleAllArticles ={this.handleAllArticles} articles={this.state.articles.articles} activeTag={this.state.activeTag} activeTagArticles={(this.state.activeTagArticles ? this.state.activeTagArticles.articles : '')} />
                      <Tags handleTag={this.handleTag} tags={this.state.tags.tags} />
                    </>
                    )
                  }
             </section>
          </>
        )
    }
}

export default Home