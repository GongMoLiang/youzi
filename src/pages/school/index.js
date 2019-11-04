/**
 * title: 所有学校
 *
 *
 *
 */

import React from 'react';
import './index.less';
import { Input } from 'antd';
import axios from 'axios';

import Logo1 from '../../assets/merchant.png';
import Logo2 from '../../assets/platform.png';

class School extends React.PureComponent {
  state = {
    schoolList: [],
  };

  getSchoolList() {
    axios.get('https://api.youzixy.com/ebapi/merchant_api/get_merchant_list').then(Response => {
      let result = Response.data.data;
      // console.log(result);
      let arr = [];
      result.forEach(item => {
        let obj = {
          letter: item[0].letter,
          list: item,
        };
        arr.push(obj);
      });
      // console.log(arr);
      this.setState({
        schoolList: arr,
      });
    });
  }

  houtui = () => {
    this.props.history.goBack();
  };

  zimu(id) {
    let dom = document.getElementById(`Letter${id}`);
    let top = dom.offsetTop;
    let height = this.refs.tip.offsetHeight;
    // console.log(dom.offsetTop);
    this.refs.box.scrollTo(0, top + height);
  }

  render() {
    const { schoolList } = this.state;
    return (
      <div className="page_school">
        <div className="school_title">
          <div className="left" onClick={this.houtui}>
            <i className="iconfont icon-fanhui"></i>
          </div>
          <div className="center">
            <span>学校列表</span>
          </div>
          <div className="right">
            <span>开通学校</span>
          </div>
        </div>

        <div className="main" ref="box">
          <div className="searchBar" ref="tip">
            <Input placeholder="输入学校简称,关键字或全称" />
          </div>

          <div className="schoolList">
            <div className="leftList">
              <div className="shcool_index">
                <p className="label">#</p>
                <ul>
                  <li>
                    <div className="schoolLogo">
                      <img src={Logo1} alt="" />
                    </div>
                    <div className="school_info">
                      <h2>所有学校</h2>
                      <p>您将同时浏览所有学校的商品</p>
                    </div>
                  </li>
                  <li>
                    <div className="schoolLogo">
                      <img src={Logo2} alt="" />
                    </div>
                    <div className="school_info">
                      <h2>自营</h2>
                      <p>您将浏览官方自营的商品</p>
                    </div>
                  </li>
                </ul>
              </div>
              {schoolList.map((item, index) => {
                return (
                  <div className="shcool_index" key={index} id={`Letter${item.letter}`}>
                    <p className="label">{item.letter}</p>
                    <ul>
                      {item.list.map(schoolInfo => {
                        return (
                          <li key={schoolInfo.id}>
                            <div className="schoolLogo">
                              <img src={schoolInfo.logo} alt="" />
                            </div>
                            <div className="school_info">
                              <h2>{schoolInfo.title}</h2>
                              <p>{schoolInfo.address}</p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
            <div className="rightList">
              <ul>
                {schoolList.map(item => {
                  return (
                    <li
                      className="zimuList"
                      key={item.letter}
                      onClick={this.zimu.bind(this, item.letter)}
                    >
                      {item.letter}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getSchoolList();
  }
}

export default School;
