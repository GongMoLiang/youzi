import { Fragment } from 'react';
// 首页布局
const BasicLayout = props => {
  return (
    <div>
      <h1>一级路由</h1>
      {props.children}
    </div>
  );
};

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
