export default {
  path: 'content-management',
  loader: () => {
    return {
      meta: {
        title: '内容管理',
      },
    };
  },
  children: [
    {
      path: 'content',
      children: [
        {
          path: 'list',
          lazy: () => import('../../views/content-management/content/list/index.jsx'),
          loader: () => {
            return {
              meta: {
                title: '内容管理',
              },
            };
          },
        },
        {
          path: 'add',
          lazy: () => import('../../views/content-management/content/add/index.jsx'),
          loader: () => {
            return {
              meta: {
                title: '内容管理',
              },
            };
          },
        },
      ],
    },
  ],
};
