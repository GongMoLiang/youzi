/*
 * title: 登录
 */

import React from 'react';
import './index.less';
import { Form, Input, Button, message } from 'antd';
import Link from 'umi/link';
import { connect } from 'dva';
import axios from 'axios';
import router from 'umi/router';

class Login extends React.Component {
  state = {
    loading: false,
  };
  fanhui = () => {
    // 后退
    this.props.history.goBack();
  };

  hanldeSubmit = e => {
    // 1. 阻止表单默认行为
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 校验通过

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
            router.replace('/');
          }
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-page">
        <div className="head">
          <i className="iconfont icon-fanhui" onClick={this.fanhui}></i>
          <p>登 录</p>
        </div>
        <h1>欢迎回来！</h1>
        <Form className="form" onSubmit={this.hanldeSubmit}>
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
          <Form.Item className="remember">
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: false,
            })(
              <p>
                没有账号?去<Link to="/register">注册</Link>
              </p>,
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={this.state.loading}
              block
            >
              登 录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default connect(
  null,
  dispatch => ({
    handleLogin(values, callback) {
      axios
        .post('http://134.175.52.84:3000/api/login', values)
        .then(response => {
          let result = response.data;
          if (result.code !== 0) {
            message.error('邮箱或密码错误');
            callback && callback(false);
            return;
          }
          message.success('登录成功');
          // 存储
          window.localStorage.setItem('userInfo', JSON.stringify(result.userInfo));
          dispatch({
            type: 'global/login',
            userInfo: result.userInfo,
          });
          callback && callback(true);
        })
        .catch(() => {
          message.success('登录失败');
          callback && callback(false);
        });
    },
  }),
)(Form.create()(Login));
