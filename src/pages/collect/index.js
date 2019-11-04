/**
 * title: 收藏夹
 * Routes:
 *  - /src/routes/PrivateRoute.js
 *
 */

import React from 'react';
import './index.less';
import { connect } from 'dva';
import Link from 'umi/link';

class Collect extends React.Component {
  state = {
    collectList: window.localStorage.getItem(`${this.props.userInfo.username}love`),
  };
  goHome = () => {
    this.props.history.goBack();
  };

  deleteCollect(id) {
    let arr = JSON.parse(window.localStorage.getItem(`${this.props.userInfo.username}love`));
    let index = arr.findIndex(item => {
      return item.id === id;
    });
    arr.splice(index, 1);
    if (arr.length > 0) {
      window.localStorage.setItem(
        `${this.props.userInfo.username}love`,
        JSON.stringify(this.state.collectList),
      );
    } else {
      window.localStorage.removeItem(`${this.props.userInfo.username}love`);
    }
    this.setState({
      collectList: arr,
    });
  }

  render() {
    if (this.state.collectList) {
      return (
        <div className="collect-page">
          <div className="head">
            <i className="iconfont icon-fanhui" onClick={this.goHome}></i>
            <p>我的收藏</p>
          </div>
          <ul>
            {JSON.parse(this.state.collectList).map(item => {
              return (
                <li key={item.id} onClick={this.handleToDetail}>
                  <div className="goodsImg">
                    <img src={item.imglist[0]} alt="" />
                  </div>
                  <div className="center">
                    <p>{item.title}</p>
                    <span>{item.time}</span>
                  </div>
                  <div className="right">
                    <button className="delete" onClick={this.deleteCollect.bind(this, item.id)}>
                      删除
                    </button>
                    <p>￥{item.price}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      );
    } else {
      return (
        <div className="collect-page">
          <div className="head">
            <i className="iconfont icon-fanhui" onClick={this.goHome}></i>
            <p>我的收藏</p>
          </div>
          <p className="empty">收藏夹为空，现在去收藏吧~</p>
          <button className="btn">
            <Link to="/">go</Link>
          </button>
        </div>
      );
    }
  }
}

export default connect(
  state => {
    return {
      userInfo: state.global.userInfo,
    };
  },
  null,
)(Collect);
