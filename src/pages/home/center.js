import React from 'react';
import './center.less';
import photo from '../../assets/photo.png';
import Link from 'umi/link';
import { connect } from 'dva';

const toolBarList = [
  { icon: 'icon-shoucang', title: '我的收藏' },
  { icon: 'icon-youhuiquan', title: '优惠券' },
  { icon: 'icon-icon-test', title: '个人资料' },
  { icon: 'icon-qiandao', title: '签到记录' },
  { icon: 'icon-ditu', title: '收获地址' },
  { icon: 'icon-xiaoxi', title: '消息中心' },
  { icon: 'icon-fabu', title: '发布商品' },
  { icon: 'icon-shangpin1', title: '我的商品' },
  { icon: 'icon-weirenzheng', title: '未认证' },
  { icon: 'icon-biaoqian', title: '开通学校' },
  { icon: 'icon-changyongtubiao-mianxing-', title: '发布求购' },
  { icon: 'icon-shangpin', title: '我的求购' },
];

class Category extends React.Component {
  state = {
    arrived: false,
  };
  isArrived = () => {
    //是否签到
    this.setState({
      arrived: true,
    });
  };
  render() {
    console.log(this.props.userInfo);
    const userInfo = this.props.userInfo;
    const username = userInfo ? userInfo.username : '';
    return (
      <div className="center-page">
        {/* 设置 */}
        <div className="head">
          <i className="iconfont icon-shezhi"></i>
        </div>

        {/* 登录 */}
        <div className="signin-bar">
          <div className="signin">
            <div className="signin-left">
              <img src={photo} alt="" />
            </div>
            <div className="signin-right">
              <div className={userInfo ? 'login_hidden' : 'login_show'}>
                <p>
                  <Link to="/login">请登录</Link>
                </p>
                <p>登录更精彩</p>
              </div>
              <div className={userInfo ? 'login_show' : 'login_hidden'}>
                <p>欢迎你 , {username}</p>
                <p>懒得连签名都没有~</p>
              </div>
            </div>
          </div>
        </div>

        {/* 签到 */}
        <div className="place">
          <div className={this.state.arrived === false ? 'login_show' : 'login_hidden'}>
            <i className="iconfont icon-zb"></i>
            <p>您今天尚未签到</p>
            <span onClick={this.isArrived}>签到</span>
          </div>
          <div className={this.state.arrived === false ? 'login_hidden' : 'login_show'}>
            <i className="iconfont icon-zb"></i>
            <p>您今天已签到</p>
          </div>
        </div>

        {/* 积分 */}
        <div className="joinbar">
          <ul>
            <li>
              <i>0</i>
              <p>积分</p>
            </li>
            <li>
              <i className="iconfont icon-jifen"></i>
              <p>积分特权</p>
            </li>
            <li>
              <i className="iconfont icon-tequan"></i>
              <p>认证特权</p>
            </li>
            <li>
              <i className="iconfont icon-jiarubanji"></i>
              <p>加入我们</p>
            </li>
          </ul>
        </div>

        {/* 工具栏 */}
        <div className="toolbar">
          <div className="tool">
            <h1>我的工具栏</h1>
            <ul>
              {toolBarList.map(item => {
                return (
                  <li key={item.title}>
                    <i className={`iconfont ${item.icon}`}></i>
                    <p>{item.title}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => {
    // console.log(state);
    return {
      userInfo: state.global.userInfo,
    };
  },
  null,
)(Category);
