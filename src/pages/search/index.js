import React from 'react';
import './index.less';
import axios from 'axios';

import { Input } from 'antd';

class Search extends React.PureComponent {
  state = {
    searchList: [],
  };

  goBack = () => {
    this.props.history.goBack();
  };

  getSearch() {
    axios.get('https://api.youzixy.com/ebapi/store_api/hot_search').then(Response => {
      let result = Response.data.data;
      console.log(result);
      this.setState({
        searchList: result,
      });
    });
  }

  render() {
    const { searchList } = this.state;
    return (
      <div className="page_search">
        <div className="searchHeader">
          <div className="left" onClick={this.goBack}>
            <i className="iconfont icon-fanhui"></i>
          </div>
          <div className="title">
            <span>搜索</span>
          </div>
        </div>

        <div className="searchBar">
          <Input
            placeholder="搜索关键字"
            prefix={<i className="iconfont icon-sousuo"></i>}
            autofocus
          />
        </div>

        <div className="searchContent">
          <h1>大家正在搜</h1>
          <ul>
            {searchList.map((item, index) => {
              return <li key={index}>{item.title}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getSearch();
  }
}

export default Search;
