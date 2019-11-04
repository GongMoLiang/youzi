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
          cost: result.cost,
          merchant: result.merchant,
          time: result.refresh_time,
          tag: result.keyword ? result.keyword : [],
          avatar: result.avatar,
          nickname: result.nickname,
        });
      });
  }

  goBack = () => {
    console.log(1);
    this.props.history.goBack();
  };

  // 处理收藏
  handleCollect() {
    let userInfo = window.localStorage.getItem('userInfo');
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
      if (!collect) {
        // 没有收藏过
        let arr = [obj];
        window.localStorage.setItem(`${userInfo.username}love`, JSON.stringify(arr));
      } else {
        // 收藏过
        console.log(1);
        let arr = JSON.parse(collect);
        var flag = false;
        arr.forEach(item => {
          if (item.id === obj.id) {
            flag = false;
            return;
          } else {
            flag = true;
          }
        });
        console.log(flag);
        if (flag) {
          console.log('jinla');
          arr.push(obj);
          window.localStorage.setItem(`${userInfo.username}love`, JSON.stringify(arr));
        }
      }
    } else {
      alert('你还没有登入');
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
      opacity,
    } = this.state;
    return (
      <div className="page-detail" onScroll={this.handleScroll}>
        <Bar fn1={this.handleCollect.bind(this)}></Bar>
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
  }
}
export default connect(
  null,
  dispatch => ({
    handleCollect() {
      let userInfo = window.localStorage.getItem('userInfo');
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
        if (!collect) {
          // 没有收藏过
          let arr = [obj];
          window.localStorage.setItem(`${userInfo.username}love`, JSON.stringify(arr));
          dispatch({
            type: 'collect/detail',
            collect: arr,
          });
        } else {
          // 收藏过
          console.log(1);
          let arr = JSON.parse(collect);
          var flag = false;
          arr.forEach(item => {
            if (item.id === obj.id) {
              flag = false;
              return;
            } else {
              flag = true;
            }
          });
          console.log(flag);
          if (flag) {
            console.log('jinla');
            arr.push(obj);
            window.localStorage.setItem(`${userInfo.username}love`, JSON.stringify(arr));
            dispatch({
              type: 'collect/detail',
              collect: arr,
            });
          }
        }
      } else {
        alert('你还没有登入');
      }
    },
  }),
)(Detail);
