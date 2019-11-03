/*
 *title: '详情展示'
 */
import React from 'react';
import Bar from '../../Components/footerfixed/fixed';
import './style.less';
import { Carousel } from 'antd';
import xiao from 'axios';

class Detail extends React.PureComponent {
  state = {
    imglist: [],
    title: '',
    info: '',
    price: '',
    postage: '',
    browse: 0,
    merchant: '',
    time: '',
    tag: [],
    avatar: '',
    nickname: '',
  };
  getimglist() {
    // let id = this.props.location.pathname.str.substr(8);
    xiao
      .post('https://api.youzixy.com/ebapi/store_api/details', {
        id: '2861',
      })
      .then(Response => {
        let result = Response.data.data.storeInfo;
        console.log(result);
        this.setState({
          imglist: result.slider_image,
          title: result.store_name,
          info: result.store_info,
          price: result.price,
          postage: result.postage,
          browse: result.browse,
          cost: result.cost,
          merchant: result.merchant,
          time: result.refresh_time,
          tag: result.keyword,
          avatar: result.avatar,
          nickname: result.nickname,
        });
      });
  }
  render() {
    let {
      imglist,
      title,
      info,
      price,
      postage,
      browse,
      cost,
      merchant,
      time,
      tag,
      avatar,
      nickname,
    } = this.state;
    return (
      <div className="page-detail">
        <Bar></Bar>
        <h1>详情展示</h1>
        <Carousel autoplay>
          {imglist.map((item, index) => {
            return (
              <div key={index}>
                <img src={item} alt="" />
              </div>
            );
          })}
        </Carousel>
        <dl className="product">
          <dt>{title}</dt>
          <dd>{info}</dd>
          <dd>
            <span>￥</span>
            <span className="price">{price}</span> <del>原价{cost}</del>{' '}
            <i>{Math.floor((price / cost) * 100)}折</i>
          </dd>
          <dd>
            <span>邮费：</span>
            <span>{postage}</span>
            <span className="browse">浏览量：</span>
            <span>{browse}</span>
          </dd>
        </dl>
        <dl className="auto">
          <dt>
            <img src={avatar} alt="" />
            <div>
              <span>{nickname}</span>
              <span>未认证</span>
            </div>
          </dt>
          <dd className="iconfont icon-weizhi"> {merchant}</dd>
          <dd className="iconfont icon-shizhong"> 更新于{time}</dd>
          <dd className="tag iconfont icon-biaoqian">
            {tag.map((item, index) => {
              return <span key={index}>{item}</span>;
            })}
          </dd>
          <dd className="iconfont icon-xiaoxi1"> 登入后查看联系方式</dd>
        </dl>
        <div className="pingrun">
          <p>
            <span>评价(0)</span>
            <span>全部评价></span>
          </p>
          <p>
            <span>此商品暂无评论</span>
            <span>我去评论</span>
          </p>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.getimglist();
  }
}
export default Detail;
