/*
 * title: '商品列表'
 */
import React from 'react';
import Product from '../../Components/product/product.js';
import Topbar from '../../Components/topbar/tapbar.js';
import './style.less';
import axios from 'axios';
class Goods extends React.PureComponent {
  state = {
    goodslist1: [],
    goodslist2: [],
  };
  getgoodlist() {
    axios
      .post('https://api.youzixy.com/ebapi/store_api/get_product_list', {
        keyword: '',
        limit: 12,
        page: 1,
        sid: this.props.location.query.sid,
        timeOrder: 'desc',
      })
      .then(response => {
        let result = response.data.data.list;
        let arr = [],
          brr = [];
        result.forEach((item, index) => {
          if (index % 2 === 0) {
            arr.push(item);
          } else {
            brr.push(item);
          }
        });
        this.setState({
          goodslist1: arr,
          goodslist2: brr,
        });
      });
  }
  goBack = () => {
    this.props.history.goBack();
  };
  render() {
    let { goodslist1, goodslist2 } = this.state;
    return (
      <div className="page-goods">
        <Topbar fn={this.goBack}></Topbar>
        {goodslist1.length > 0 ? (
          <List goodslist1={goodslist1} goodslist2={goodslist2} {...this.props}></List>
        ) : (
          <Nolist></Nolist>
        )}
      </div>
    );
  }
  componentDidMount() {
    this.getgoodlist();
  }
}

class List extends React.Component {
  godetial(id) {
    this.props.history.push({
      pathname: `/detail/${id}`,
      query: {
        id: id,
      },
    });
  }
  render() {
    let { goodslist1, goodslist2 } = this.props;
    return (
      <ul className="goodslist">
        <div className="list-left">
          {goodslist1.map((item, index) => {
            return (
              <Product obj={item} key={index} fn={this.godetial.bind(this, item.id)}></Product>
            );
          })}
        </div>
        <div className="list-right">
          {goodslist2.map(item => {
            return (
              <Product obj={item} key={item.id} fn={this.godetial.bind(this, item.id)}></Product>
            );
          })}
        </div>
      </ul>
    );
  }
}

class Nolist extends React.PureComponent {
  render() {
    return (
      <div className="nolist">
        <img src="https://www.youzixy.com/static/icon/noGoods.png" alt="" />
      </div>
    );
  }
}
export default Goods;
