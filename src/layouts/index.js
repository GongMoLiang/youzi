import React, { Fragment } from 'react';
import './styles.less';
// 首页布局
class BasicLayout extends React.Component {
  render() {
    return (
      <div className="page-home">
        <div className="layout-home">{this.props.children}</div>
        <ul>
          <li>
            <i className="iconfont icon-1"></i>
            <span>首页</span>
          </li>
          <li>
            <i className="iconfont icon-fenlei"></i>
            <span>分类</span>
          </li>
          <li>
            <i className="iconfont icon-shuji"></i>
            <span>校园动态</span>
          </li>
          <li>
            <i className="iconfont icon-wode"></i>
            <span>我的</span>
          </li>
        </ul>
      </div>
    );
  }
}

// 基本布局
const SimbleLayout = props => {
  return <Fragment>{props.children}</Fragment>;
};

export default props => {
  let url = props.location.pathname;
  if (url === '/login' || url === '/register') {
    return <SimbleLayout {...props}></SimbleLayout>;
  } else {
    return <BasicLayout {...props}></BasicLayout>;
  }
};
