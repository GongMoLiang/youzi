import React from 'react';
import './center.less';
import photo from '../../assets/photo.png';
import Link from 'umi/link';
import { connect } from 'dva';
import { Modal } from 'antd';
import cookie from 'react-cookies';

const { confirm } = Modal;
const toolBarList = [
  { icon: 'icon-shoucang', title: '我的收藏', link: '/collect' },
  { icon: 'icon-youhuiquan', title: '优惠券', link: '/coupon' },
  { icon: 'icon-icon-test', title: '个人资料', link: '/setting' },
  { icon: 'icon-qiandao', title: '签到记录', link: '/others' },
  { icon: 'icon-ditu', title: '收获地址', link: '/others' },
  { icon: 'icon-xiaoxi', title: '消息中心', link: '/others' },
  { icon: 'icon-fabu', title: '发布商品', link: '/others' },
  { icon: 'icon-shangpin1', title: '我的商品', link: '/others' },
  { icon: 'icon-weirenzheng', title: '未认证', link: '/others' },
  { icon: 'icon-biaoqian', title: '开通学校', link: '/school' },
  { icon: 'icon-changyongtubiao-mianxing-', title: '发布求购', link: '/others' },
  { icon: 'icon-shangpin', title: '我的求购', link: '/others' },
];
let d = new Date();
let year = d.getFullYear();
let month = d.getMonth() + 1;
let date = d.getDate();
let today = year + '' + month + '' + date;

class Category extends React.Component {
  state = {
    arrived: false,
    visible: false,
    grade: 0,
  };

  //是否签到
  isArrived = () => {
    let userInfo = this.props.userInfo;
    let username = userInfo ? encodeURI(userInfo.username) : '';
    if (userInfo) {
      this.setState({
        arrived: true,
        grade: 10,
      });
      cookie.save(`${username}Arrived`, `${username}Arrived` + today);
    } else {
      this.showLogin();
    }
  };
  componentDidMount() {
    let userInfo = this.props.userInfo;
    let username = userInfo ? encodeURI(userInfo.username) : '';
    // 判断cookie是否有更新，从而判断是否有签到
    if (userInfo) {
      let cookieNow = cookie.load(`${username}Arrived`);
      let todayCookie = `${username}Arrived` + today;
      if (todayCookie === cookieNow) {
        this.setState({
          arrived: true,
          grade: 10,
        });
      }
    } else {
      this.setState({
        arrived: false,
      });
    }
  }
  showLogin = () => {
    confirm({
      title: '您还没有登录',
      content: '点击确定，跳转到登录页面',
      onOk: () => {
        this.props.history.push('/login');
      },
      onCancel() {},
    });
  };
  //点击li判断是否登录
  handleIsLogin = (index, e) => {
    if (this.props.userInfo) {
      let link = toolBarList[index].link;
      this.props.history.push(link, toolBarList[index]);
    } else {
      this.showLogin();
    }
  };

  //点击头部设置，去到设置页面
  Setting = () => {
    this.props.history.push('/setting');
  };

  render() {
    // let userInfo = window.localStorage.getItem('userInfo');
    // let username = userInfo ? JSON.parse(userInfo).username : '';
    let userInfo = this.props.userInfo;
    let username = userInfo ? userInfo.username : '';
    return (
      <div className="center-page">
        {/* 设置 */}
        <div className="head" onClick={this.Setting}>
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
                <h2>
                  <Link to="/login">请登录</Link>
                </h2>
                <p>登录更精彩</p>
              </div>
              <div className={userInfo ? 'login_show' : 'login_hidden'}>
                <h2>欢迎你 , {username}</h2>
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
              <i>{this.state.grade}</i>
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
              {toolBarList.map((item, index) => {
                return (
                  <li key={item.title} onClick={e => this.handleIsLogin(index, e)}>
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
    return {
      userInfo: state.global.userInfo,
    };
  },
  null,
)(Category);
