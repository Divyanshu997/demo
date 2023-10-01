import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner   from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country:'us',
    pageSize: 5,
    category: 'science',
    badgeMode: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    badgeMode: PropTypes.string
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
    constructor(props){
        super(props);
        console.log("Hellow i am a constructor.");
        this.state={
            articles: [],
            loading:false,
            page:1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }
    
    async updateNews () {

      console.log("url fetched")
      // async componentDidMount(){
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        this.props.setProgress(30);
        let parseData = await data.json();
        console.log(parseData);
        this.props.setProgress(50);
      this.setState({
        articles: parseData.articles, 
        totalResults: parseData.totalResults,
        loading: false
      })
      this.props.setProgress(100);
    // }
  }

  async componentDidMount(){
    // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b81fa60fa80a4bf3b445bb39d6adb23d&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parseData = await data.json();
    // console.log(parseData);
    // this.setState({
    //   articles: parseData.articles, 
    //   totalResults: parseData.totalResults,
    //   loading: false
    // })
    this.updateNews();
  }
    handleNextClick = async () => {
      console.log("Next");
      // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))) {
      //   this.setState({loading:true})
      //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b81fa60fa80a4bf3b445bb39d6adb23d&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      //   let data = await fetch(url);
      //   let parseData = await data.json();
      //   console.log(parseData);
        
      // this.setState({
      //   page: this.state.page + 1,
      //   articles: parseData.articles,
      //   loading:false

      // })

    // }
    this.setState({
      page: this.state.page + 1
    })
    this.updateNews();
  }
  handlePreviousClick = async () => {
    console.log("Previous");
    // this.setState({loading:true})
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b81fa60fa80a4bf3b445bb39d6adb23d&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //   let data = await fetch(url);
    //   let parseData = await data.json();
    //   console.log(parseData);
      
    //   this.setState({
    //     page:this.state.page - 1,
    //     articles: parseData.articles,
    //     loading:false
        
    //   })
      this.setState({
        page: this.state.page - 1
      })
      this.updateNews();
    }
    
    fetchMoreData = async() => {
      
      this.setState({page: this.state.page +1})
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parseData = await data.json();
      console.log(parseData);
      this.setState({
        articles: this.state.articles.concat(parseData.articles), 
        totalResults: parseData.totalResults,
        loading: false
      })
      console.log(this.state.loading)
    };
    render() {
      console.log("render");
      return (
        <>
        {/* <div className='container my-3'> */}
        <h1 className='text-center my-4'>NewsMonkey - Top Headlines from {this.capitalizeFirstLetter(this.props.category)}</h1>
        {/* {this.state.loading&&<Spinner/>} */}
        {this.state.loading?<Spinner/>:""}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={this.state.loading?<Spinner/>:""}
        >


          <div className="container">

        <div className="row">
        { this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} 
                newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}
                badgeMode={this.props.badgeMode}/>
            </div>
          })}
          </div>
        </div>
          </InfiniteScroll>
{/*           
        <div className="container d-flex justify-content-between">
        <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
      </div> */}
      {/* </div> */}
      </>
    )
  }
}

export default News