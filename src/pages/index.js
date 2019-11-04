import React from 'react';
import './index.less';
import { Input, Carousel } from 'antd';
import axios from 'axios';

import Logo1 from '../assets/1.png';
import Logo2 from '../assets/2.png';
import Logo3 from '../assets/3.png';
import Logo4 from '../assets/4.png';
import Hua from '../assets/hua.png';

class Home extends React.PureComponent {
  state = {
    bannerList: [],
    categoryList: [],
  };

  //获取数据
  getStateList() {
    axios.get('https://api.youzixy.com/ebapi/public_api/index').then(Response => {
      let result = Response.data;
      // console.log(result);
      this.setState({
        bannerList: result.data.banner,
        categoryList: result.data.menus,
      });
    });
  }

  goSchool = () => {
    this.props.history.push('/school');
  };

  render() {
    const { bannerList, categoryList } = this.state;
    return (
      <div className="page_home">
        <div className="home_header">
          <div className="school" onClick={this.goSchool}>
            <i className="iconfont icon-location"></i>
            <span>所有学校</span>
          </div>
          <div className="search">
            <Input placeholder="输入关键字" suffix={<i className="iconfont icon-sousuo"></i>} />
          </div>
          <div className="message">
            <i className="iconfont icon-xiaoxi"></i>
          </div>
        </div>

        <div className="swiper">
          <Carousel className="banner" autoplay>
            {bannerList.map(banner => (
              <img key={banner.id} src={banner.pic} alt="" />
            ))}
          </Carousel>
        </div>

        <div className="category">
          <ul>
            {categoryList.map(product => (
              <li>
                <img src={product.pic} alt="" />
                <span>{product.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="welfare">
          <h2>福利专区</h2>
          <div className="welfareList">
            <div className="area">
              <div className="area_content">
                <div className="title">
                  <h3>优惠券</h3>
                  <p>福利多多</p>
                </div>
                <div className="area_link">
                  <span>点击进入</span>
                </div>
              </div>
              <div className="area_logo">
                <img src={Logo3} alt="" />
              </div>
            </div>
            <div className="area">
              <div className="area_content">
                <div className="title">
                  <h3>兼职</h3>
                  <p>校园兼职</p>
                </div>
                <div className="area_link">
                  <span>点击进入</span>
                </div>
              </div>
              <div className="area_logo">
                <img src={Logo4} alt="" />
              </div>
            </div>
          </div>
          <div className="welfareList">
            <div className="area">
              <div className="area_content">
                <div className="title">
                  <h3>求购</h3>
                  <p>求购</p>
                </div>
                <div className="area_link">
                  <span>点击进入</span>
                </div>
              </div>
              <div className="area_logo">
                <img src={Logo1} alt="" />
              </div>
            </div>
            <div className="area">
              <div className="area_content">
                <div className="title">
                  <h3>咨询</h3>
                  <p>最新动态</p>
                </div>
                <div className="area_link">
                  <span>点击进入</span>
                </div>
              </div>
              <div className="area_logo">
                <img src={Logo2} alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="hot">
          <div className="hot_title">
            <img src={Hua} alt="" />
            <span>热门推荐</span>
            <img src={Hua} alt="" />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getStateList();
  }
}

export default Home;
