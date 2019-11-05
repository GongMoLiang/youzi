import React from 'react';
import './index.less';
import axios from 'axios';

class Coupon extends React.PureComponent {
  state = {
    couponList: [],
  };

  getCoupon() {
    axios.get('https://api.youzixy.com/ebapi/coupons_api/get_issue_coupon_list').then(Response => {
      let result = Response.data;
      // console.log(result.data);
      this.setState({
        couponList: result.data,
      });
    });
  }

  goHome = () => {
    this.props.history.goBack();
  };

  render() {
    const { couponList } = this.state;
    return (
      <div className="page_coupon">
        <div className="couponHeader">
          <div className="left" onClick={this.goHome}>
            <i className="iconfont icon-fanhui"></i>
          </div>
          <div className="title">
            <span>优惠券</span>
          </div>
        </div>

        <div className="couponList">
          {couponList.map((item, index) => {
            return (
              <div className="couponCard" key={index}>
                <div className="left">
                  <div className="title">{item.title}</div>
                  <div className="useInfo">使用期限：{item.remark}</div>
                  <div className="date">
                    截止: {item.end_time} 剩余：{item.remain_count} 张
                  </div>
                </div>
                <div className="right">
                  <div className="price">{item.coupon_price}元</div>
                  <div className="useRule">满{item.use_min_price}元使用</div>
                  <div className="get">领取</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getCoupon();
  }
}

export default Coupon;
