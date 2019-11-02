import React from 'react';
import './product.less';
class Product extends React.PureComponent {
  render() {
    return (
      <li>
        <img
          src="https://api.youzixy.com/public/uploads/attach/2019/10/15/5da593a4d2df5.png"
          alt=""
        />
        <p className="title">
          棒球帽
          黑色发货速度和付款的看法是开发的房间那你护发素加快递费那事点技能剪短发市科技局房间爱房交会
        </p>
        <p className="price">￥16</p>
        <p className="scholl">
          <span>协和</span>
        </p>
      </li>
    );
  }
}
export default Product;
