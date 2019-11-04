import React from 'react';
import './index.less';

class Setting extends React.PureComponent {
  goCenter = () => {
    this.props.history.goBack();
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
            <ul>
              <li>
                <span>清除缓存</span>
                <i className="iconfont icon-iconfontyoujiantou-copy-copy-copy-copy"></i>
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
                <i className="iconfont icon-iconfontyoujiantou-copy-copy-copy-copy"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Setting;
