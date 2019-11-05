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

// console.log(arr);

class Collect extends React.Component {
  state = {
    collectList: [],
  };
  goHome = () => {
    this.props.history.goBack();
  };

  getcollect() {
    let userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
    var collect = window.localStorage.getItem(`${userInfo.username}love`);
    collect = JSON.parse(collect);
    // console.log(collect);
    this.setState({
      collectList: collect,
    });
  }
  deleteCollect(id, e) {
    e.stopPropagation();
    let userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
    var arr = window.localStorage.getItem(`${userInfo.username}love`);
    arr = JSON.parse(arr);
    arr.forEach((item, index) => {
      if (item.id === id) {
        arr.splice(index, 1);
      }
    });
    if (arr.length > 0) {
      window.localStorage.setItem(`${userInfo.username}love`, JSON.stringify(arr));
    } else {
      window.localStorage.removeItem(`${userInfo.username}love`);
    }
    this.setState({
      collectList: arr,
    });
  }
  handleToDetail(id) {
    this.props.history.push({
      pathname: `/detail/${id}`,
      query: {
        id: id,
      },
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
            {this.state.collectList.map(item => {
              return (
                <li key={item.id} onClick={this.handleToDetail.bind(this, item.id)}>
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
  componentDidMount() {
    this.getcollect();
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
