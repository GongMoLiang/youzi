import React from 'react';
import './index.less';
import logo from '../../assets/zanwu.png';

class Others extends React.Component {
  goHome = () => {
    this.props.history.goBack();
  };
  render() {
    return (
      <div className="others-page">
        <div className="head">
          <i className="iconfont icon-fanhui" onClick={this.goHome}></i>
          <p>{this.props.location.state.title}</p>
        </div>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
      </div>
    );
  }
}
export default Others;
