export default {
  path: 'dashboard',
  loader: () => {
    return {
      meta: {
        title: '数据看板',
      },
    };
  },
  children: [
    {
      path: 'overview',
      lazy: () => import('../../views/dashboard/overview/index.jsx'),
      loader: () => {
        return {
          meta: {
            title: '内容分析',
          },
        };
      },
    },
    {
      path: 'income',
      lazy: () => import('../../views/dashboard/income/index.jsx'),
      loader: () => {
        return {
          meta: {
            title: '收益分析',
          },
        };
      },
    },
    {
      path: 'flower',
      lazy: () => import('../../views/dashboard/flower/index.jsx'),
      loader: () => {
        return {
          meta: {
            title: '关注者分析',
          },
        };
      },
    },
  ],
};
