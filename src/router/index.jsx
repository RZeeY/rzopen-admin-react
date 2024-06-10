// react
import { createBrowserRouter } from 'react-router-dom';
// components
import RzRouteDefender from '../components/rz-route-defender/index.jsx';
import { Component as BaseLayout } from '../layout/base-layout/index.jsx';
import { Component as NotFound } from '../views/not-found/index.jsx';
// children route
import dashboard from './dashboard/index.jsx';
import contentManagement from './content-management/index.jsx';
import userManagement from './user-management/index.jsx';

const routes = createBrowserRouter([
  {
    path: '/',
    Component: () => (
      <RzRouteDefender>
        <BaseLayout />
      </RzRouteDefender>
    ),
    loader: () => {
      return {
        meta: {
          redirect: '/home',
        },
      };
    },
    children: [
      {
        path: 'home',
        lazy: () => import('../views/home/index.jsx'),
        loader: () => {
          return {
            meta: {
              title: 'Welcome',
            },
          };
        },
      },
      dashboard,
      contentManagement,
      userManagement,
    ],
  },
  {
    path: '/login',
    lazy: () => import('../views/login/index.jsx'),
    loader: () => {
      return {
        meta: {
          title: '登录',
        },
      };
    },
  },
  {
    path: '*',
    Component: NotFound,
  },
]);

export default routes;
