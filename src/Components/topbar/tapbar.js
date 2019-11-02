import React from 'react';
import './style.less';
class Topbar extends React.PureComponent {
  render() {
    return (
      <div className="search">
        <div className="topbar">
          <span className="iconfont icon-fanhui"></span>
          <input type="text" placeholder="搜索商品" />
          <span className="iconfont icon-location"></span>
        </div>
        <ul className="chocie">
          <li>时间</li>
          <li>价格</li>
          <li>浏览量</li>
          <li className="active">多选</li>
        </ul>
      </div>
    );
  }
}

export default Topbar;
