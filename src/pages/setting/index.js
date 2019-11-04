import React from 'react';
import './index.less';

class Setting extends React.PureComponent {
  goCenter = () => {
    this.props.history.goBack();
  };

  goLogin = () => {
    this.props.history.push('./login');
  };

  render() {
    return (
      <div className="page_setting">
        <div className="settingHeader">
          <div className="left" onClick={this.goCenter}>
            <i className="iconfont icon-fanhui"></i>
          </div>
          <div className="title">
            <span>设置</span>
          </div>
        </div>

        <div className="settingContent">
          <div className="personalData">
            <ul>
              <li>
                <span>个人资料</span>
                <i className="iconfont icon-iconfontyoujiantou-copy-copy-copy-copy"></i>
              </li>
              <li>
                <span>收货地址</span>
                <i className="iconfont icon-iconfontyoujiantou-copy-copy-copy-copy"></i>
              </li>
              <li>
                <span>实名验证</span>
                <i className="iconfont icon-iconfontyoujiantou-copy-copy-copy-copy"></i>
              </li>
            </ul>
          </div>
        </div>

        <div className="settingContent_1">
          <div className="about">
            <ul>
              <li>
                <span>清楚缓存</span>
                <div className="cathe">
                  <span>0M</span>
                  <i className="iconfont icon-iconfontyoujiantou-copy-copy-copy-copy"></i>
                </div>
              </li>
              <li>
                <span>关于柚子校园</span>
                <i className="iconfont icon-iconfontyoujiantou-copy-copy-copy-copy"></i>
              </li>
              <li>
                <span>联系我们</span>
                <i className="iconfont icon-iconfontyoujiantou-copy-copy-copy-copy"></i>
              </li>
              <li>
                <span>当前版本</span>
                <i className="versions">3.0.0</i>
              </li>
            </ul>
          </div>
        </div>

        <div className="loginBtn" onClick={this.goLogin}>
          <p>登 录</p>
        </div>
      </div>
    );
  }
}

export default Setting;
