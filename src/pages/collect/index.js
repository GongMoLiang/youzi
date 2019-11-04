import React from 'react';
import './index.less';

class Collect extends React.Component {
  goHome = () => {
    this.props.history.goBack();
  };
  render() {
    return (
      <div className="collect-page">
        <div className="head">
          <i className="iconfont icon-fanhui" onClick={this.goHome}></i>
          <p>我的收藏</p>
        </div>
        <ul>
          <li>
            <div className="goodsImg">
              <img src={require('../../assets/1.png')} alt="" />
            </div>
            <div className="center">
              <p>加湿器</p>
              <span>2019-11-04</span>
            </div>
            <div className="right">
              <p>￥59</p>
            </div>
          </li>
          <li>
            <div className="goodsImg">
              <img src={require('../../assets/1.png')} alt="" />
            </div>
            <div className="center">
              <p>加湿器</p>
              <span>2019-11-04</span>
            </div>
            <div className="right">
              <p>￥59</p>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default Collect;
