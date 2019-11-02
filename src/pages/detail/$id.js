/*
 *title: '详情展示'
 */
import React from 'react';
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
  };
  getimglist() {
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
        });
      });
  }
  render() {
    let { imglist, title, info, price, postage, browse, cost } = this.state;
    return (
      <div className="page-detail">
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
        <dl>
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
        <div></div>
      </div>
    );
  }
  componentDidMount() {
    this.getimglist();
  }
}
export default Detail;
