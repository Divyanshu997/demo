import React, { Component } from 'react'

export class NewsItem extends Component {
   
  render() {
    let {title, description, imageUrl, newsUrl, author, date, source, badgeMode} = this.props;
    return (
      <div className='my-3'>
            <div className="card">
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                position: 'absolute',
                right: '0'
              }}>
              <span className={` badge ${badgeMode==="light"?"text-dark":''} rounded-pill bg-${badgeMode}`}>
                {source}</span>

              </div>
                <img src={!imageUrl?"https://media.cnn.com/api/v1/images/stellar/prod/230924170550-taylor-swift-chiefs-092423.jpg?c=16x9&q=w_800,c_fill":imageUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}
                    </h5>
                    <p className="card-text">{description}....</p>
                    <p className="card-text"><small className='text-muted'>By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} target='_blank' rel='noreferrer' className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
      </div>
    )
  }
}

export default NewsItem
