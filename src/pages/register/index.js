/*
 * title: 注册
 */

import React from 'react';
import './index.less';
import { Form, Input, Button } from 'antd';
import { connect } from 'dva';
import axios from 'axios';

class Register extends React.Component {
  state = {
    loading: false,
  };
  fanhui = () => {
    //返回
    this.props.history.goBack();
  };
  hanldeSubmit = e => {
    // 1. 阻止表单默认行为
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 校验通过
        console.log(values);

        // 发送请求之前
        this.setState({
          loading: true,
        });
        // 发送请求
        this.props.handleLogin(values, isOk => {
          // 发送请求完成
          this.setState({
            loading: false,
          });

          if (isOk) {
            // 登录成功，跳转到首页
            // router.replace('/');
            console.log('ok了');
          }
        });
      }
    });

    //手动校验
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="register-page">
        <div className="head">
          <i className="iconfont icon-fanhui" onClick={this.fanhui}></i>
          <p>注 册</p>
        </div>
        <h1>欢迎您！</h1>
        <Form className="form" onSubmit={this.hanldeSubmit}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [
                { required: true, message: '用户名不能为空' },
                { min: 2, max: 10, message: '长度在2-10之间' },
              ],
            })(<Input placeholder="请输入用户名" size="large" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: '请输入邮箱' },
                { type: 'email', message: '请输入正确的邮箱地址' },
              ],
            })(<Input placeholder="请输入邮箱" size="large" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: '请输入密码' },
                { min: 6, max: 15, message: '长度在6-15之间' },
              ],
            })(<Input type="password" placeholder="请输入密码" size="large" />)}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={this.state.loading}
              block
            >
              注 册
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

// export default Form.create()(Register);
export default connect(
  null,
  dispatch => ({
    handleLogin(values, callback) {
      axios
        .post('http://134.175.52.84:3000/api/register', values)
        .then(response => {
          let result = response.data;
          if (result.code === 0) {
            //注册成功
          }
          // 存储
          window.localStorage.setItem('userInfo', JSON.stringify(values));

          dispatch({
            type: 'global/register',
            // userInfo: result,
          });

          callback && callback(true);
        })
        .catch(() => {
          callback && callback(false);
        });
    },
  }),
)(Form.create()(Register));
