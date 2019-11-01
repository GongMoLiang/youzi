import React from 'react';
import './article.less';
import axios from 'axios';
import { Carousel } from 'antd';
class Article extends React.PureComponent {
  state = {
    articlelist: [],
    bannerlist: [],
  };
  getarticlelist() {
    axios.post('https://api.youzixy.com/ebapi/article_api/get_cid_article').then(response => {
      let result = response.data;
      this.setState({
        articlelist: result.data,
      });
    });
  }
  getbannerlist() {
    axios.post('https://api.youzixy.com/ebapi/article_api/get_article_banner').then(response => {
      let result = response.data;
      console.log(result);
      this.setState({
        bannerlist: result.data,
      });
    });
  }
  render() {
    let { articlelist, bannerlist } = this.state;
    return (
      <div className="article">
        <h1>咨询</h1>
        <div className="banner">
          <Carousel autoplay>
            {bannerlist.map(item => {
              return (
                <div key={item.id}>
                  <img src={item.image_input[0]} alt="" />
                </div>
              );
            })}
          </Carousel>
          ,
        </div>
        <ul className="article-lsit">
          {articlelist.map(item => {
            return (
              <li key={item.id}>
                <dt>
                  <img src={item.image_input[0]} alt="" />
                </dt>
                <dd>
                  <p>{item.title}</p>
                  <div className="time">
                    <span>官方</span>
                    <span>{item.add_time}</span>
                  </div>
                </dd>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  componentDidMount() {
    this.getarticlelist();
    this.getbannerlist();
  }
}

export default Article;
