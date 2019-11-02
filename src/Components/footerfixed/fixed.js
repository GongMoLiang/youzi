import React, { PureComponent } from 'react';
import './style.less';
class Bar extends PureComponent {
  render() {
    return (
      <ul className="fixed">
        <li>
          <span className="iconfont icon-1"></span>
          <span>首页</span>
        </li>
        <li>
          <span className="iconfont icon-xiaoxi1"></span>
          <span>评论</span>
        </li>
        <li>
          <span className="iconfont icon-shoucang1"></span>
          <span>收藏</span>
        </li>
        <li>
          <span className="iconfont icon-jubao"></span>
          <span>举报</span>
        </li>
      </ul>
    );
  }
}

export default Bar;
