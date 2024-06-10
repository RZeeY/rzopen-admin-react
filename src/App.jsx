// react
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as userInfoSlice from './store/userInfo/index.js';
// antd
import { App } from 'antd';
// api
import { getUserByToken } from './request/api/user.js';
// other
import router from './router/index.jsx';
import { LStroge } from './global.jsx';

function MainApp() {
  const dispatch = useDispatch();

  // 判断是否存在 token，如果存在则去获取用户信息
  useEffect(() => {
    const token = LStroge.Token.get();
    if (!token) {
      return;
    }
    (async () => {
      const res = await getUserByToken({
        token,
      });
      dispatch(userInfoSlice.set(res));
    })();
    return;
  });

  return (
    <>
      <App>
        <RouterProvider router={router}></RouterProvider>
      </App>
    </>
  );
}

export default MainApp;
