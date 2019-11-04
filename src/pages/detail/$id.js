/*
 *title: '详情展示'
 */
import React from 'react';
import Bar from '../../Components/footerfixed/fixed';
import './style.less';
import { Carousel } from 'antd';
import { connect } from 'dva';
import xiao from 'axios';

class Detail extends React.PureComponent {
  state = {
    imglist: [],
    title: '',
    info: '',
    price: '',
    postage: '',
    browse: 0,
    merchant: '',
    time: '',
    tag: [],
    avatar: '',
    nickname: '',
    opacity: 0,
    color: '#8a8a8a',
  };
  getimglist() {
    let id = this.props.location.query.id;
    // console.log(id);
    xiao
      .post('https://api.youzixy.com/ebapi/store_api/details', {
        id: id,
      })
      .then(Response => {
        let result = Response.data.data.storeInfo;
        this.setState({
          imglist: result.slider_image,
          title: result.store_name,
          info: result.store_info,
          price: result.price,
          postage: result.postage,
          browse: result.browse,
          cost: Number(result.cost) === 0 ? result.price : result.cost,
          merchant: result.merchant,
          time: result.refresh_time,
          tag: result.keyword ? result.keyword : [],
          avatar: result.avatar,
          nickname: result.nickname,
        });
      });
  }

  goBack = () => {
    this.props.history.goBack();
  };

  处理收藏;
  handleCollect() {
    let userInfo = window.localStorage.getItem('userInfo');
    // console.log(userInfo);
    if (userInfo) {
      //用户名存在
      userInfo = JSON.parse(userInfo);
      let collect = window.localStorage.getItem(`${userInfo.username}love`);
      let id = this.props.location.query.id;
      let obj = {
        imglist: this.state.imglist,
        price: this.state.price,
        time: this.state.time,
        title: this.state.title,
        id,
      };
      if (!collect || collect === '[]') {
        // 没有收藏过
        let arr = [obj];
        this.setState({
          color: 'red',
        });
        window.localStorage.setItem(`${userInfo.username}love`, JSON.stringify(arr));
      } else {
        // 收藏过

        let arr = JSON.parse(collect);
        var flag = false;
        arr.forEach((item, index) => {
          if (item.id === obj.id) {
            flag = false;
            this.setState({
              color: '#8a8a8a',
            });
            arr.splice(index, 1);
            console.log(arr.length);
            if (arr === []) {
              console.log(1);
              window.localStorage.removeItem(`${userInfo.username}love}`);
            } else {
              window.localStorage.setItem(`${userInfo.username}love`, JSON.stringify(arr));
            }
            return;
          } else {
            flag = true;
          }
        });

        if (flag) {
          this.setState({
            color: 'red',
          });
          arr.push(obj);
          window.localStorage.setItem(`${userInfo.username}love`, JSON.stringify(arr));
        }
      }
    } else {
      alert('你还没有登入');
    }
  }

  // 页面加载的时候判断收藏状态
  collectcolor() {
    let userInfo = window.localStorage.getItem('userInfo');

    if (userInfo) {
      userInfo = JSON.parse(userInfo);
      let str = window.localStorage.getItem(`${userInfo.username}love`);
      console.log(str);
      if (str) {
        let id = this.props.location.query.id;
        let arr = JSON.parse(str);
        console.log(arr);
        arr.forEach(item => {
          if (item.id === id) {
            this.setState({
              color: 'red',
            });
          }
        });
      }
    }
  }

  render() {
    let {
      imglist,
      title,
      info,
      price,
      postage,
      browse,
      cost,
      merchant,
      time,
      tag,
      avatar,
      nickname,
      color,
      opacity,
    } = this.state;
    return (
      <div className="page-detail" onScroll={this.handleScroll}>
        <Bar fn1={this.handleCollect.bind(this)} color={color}></Bar>
        <span className="back iconfont icon-fanhui" onClick={this.goBack}></span>
        <h1 style={{ opacity: opacity }}>详情展示</h1>
        <Carousel autoplay>
          {imglist.map((item, index) => {
            return (
              <div key={index}>
                <img src={item} alt="" />
              </div>
            );
          })}
        </Carousel>
        <dl className="product">
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
        <dl className="auto">
          <dt>
            <img src={avatar} alt="" />
            <div>
              <span>{nickname}</span>
              <span>未认证</span>
            </div>
          </dt>
          <dd className="iconfont icon-weizhi"> {merchant}</dd>
          <dd className="iconfont icon-shizhong"> 更新于{time}</dd>
          <dd className="tag iconfont icon-biaoqian">
            {tag.map((item, index) => {
              return <span key={index}>{item}</span>;
            })}
          </dd>
          <dd className="iconfont icon-xiaoxi1"> 登入后查看联系方式</dd>
        </dl>
        <div className="pingrun">
          <p>
            <span>评价(0)</span>
            <span>全部评价></span>
          </p>
          <p>
            <span>此商品暂无评论</span>
            <span>我去评论</span>
          </p>
        </div>
      </div>
    );
  }

  // 滚动条处理
  handleScroll = e => {
    let target = e.target;
    let scrollTop = target.scrollTop;
    if (scrollTop > 120) {
      this.setState({
        opacity: 1,
      });
    } else if (scrollTop > 0) {
      this.setState({
        opacity: 0.5,
      });
    } else if (scrollTop === 0) {
      this.setState({
        opacity: 0,
      });
    }
  };
  componentDidMount() {
    this.getimglist();
    let dom = document.getElementById('root');
    dom.addEventListener('scroll', this.handleScroll);
    this.collectcolor();
  }
}
export default connect(null)(Detail);
