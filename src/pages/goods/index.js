import React from 'react';
import Product from '../../Components/product/product.js';
import Topbar from '../../Components/topbar/tapbar.js';
import './style.less';
class Goods extends React.PureComponent {
  render() {
    return (
      <div className="page-goods">
        <Topbar></Topbar>
        <ul className="goodslist">
          <div className="list-left">
            <Product></Product>
          </div>
          <div className="list-right">
            <Product></Product>
          </div>
        </ul>
      </div>
    );
  }
}

export default Goods;
