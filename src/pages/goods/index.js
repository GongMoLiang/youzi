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
        sid: '28',
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
  render() {
    let { goodslist1, goodslist2 } = this.state;
    return (
      <div className="page-goods">
        <Topbar></Topbar>
        <ul className="goodslist">
          <div className="list-left">
            {goodslist1.map((item, index) => {
              return <Product obj={item} key={index}></Product>;
            })}
          </div>
          <div className="list-right">
            {goodslist2.map(aaa => {
              return <Product obj={aaa} key={aaa.id}></Product>;
            })}
          </div>
        </ul>
      </div>
    );
  }
  componentDidMount() {
    this.getgoodlist();
  }
}

export default Goods;
