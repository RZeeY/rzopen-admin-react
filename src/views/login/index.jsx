// react
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as userInfoSlice from '../../store/userInfo/index.js';
// antd
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// stylesheet
import './index.less';
import loginBackground from '../../assets/images/login/login-background.png';
// api
import { getUserByToken } from '../../request/api/user.js';
// other
import validateRules from '../../form-validate-rules/login/index.js';
import { LStroge, useMsg } from '../../global.jsx';

export function Component() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { errorMsg } = useMsg();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleUsernameInputChange(ev) {
    setUsername(ev.target.value);
  }

  function handlePasswordInputChange(ev) {
    setPassword(ev.target.value);
  }

  function handleMainFormFinish() {
    // 这里是演示模拟登录，实际需要自行实现调用后端登录接口
    // Here is the demo simulation login, the actual need to implement their own call back-end login interface
    if (username === 'admin' && password === '123') {
      const token = '9f8b7c2a-d9e5-4bfa-8a2e-5b4f7e2c3a1d';
      LStroge.Token.set(token);
      (async () => {
        const res = await getUserByToken({
          token,
        });
        dispatch(userInfoSlice.set(res));
        navigate('/home');
      })();
    } else {
      errorMsg('账号密码错误');
    }
  }

  return (
    <>
      <div className='login-container'>
        <img src={loginBackground} className='main-bg' />
        <div className='main-box'>
          <h1 className='project-title'>{import.meta.env.VITE_PRODUCT_NAME}</h1>
          <div className='login-form'>
            <Form className='width-fill' validateTrigger='onBlur' onFinish={handleMainFormFinish}>
              <Form.Item name='username' rules={validateRules.username}>
                <Input prefix={<UserOutlined />} placeholder='username: admin' onChange={handleUsernameInputChange} />
              </Form.Item>
              <Form.Item name='password' rules={validateRules.password} onChange={handlePasswordInputChange}>
                <Input prefix={<LockOutlined />} placeholder='password: 123' />
              </Form.Item>
              <Form.Item>
                <Button type='primary' block htmlType='submit'>
                  登录
                </Button>
              </Form.Item>
              <Form.Item>
                <div className='extra'>
                  <Button type='link' size='small'>
                    注册
                  </Button>
                  <Button type='link' size='small'>
                    忘记密码?
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
