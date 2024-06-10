export default {
  path: 'user-management',
  loader: () => {
    return {
      meta: {
        title: '用户管理',
      },
    };
  },
  children: [
    {
      path: 'user',
      children: [
        {
          path: 'list',
          lazy: () => import('../../views/user-management/user/list/index.jsx'),
          loader: () => {
            return {
              meta: {
                title: '用户管理',
              },
            };
          },
        },
      ],
    },
    {
      path: 'role',
      children: [
        {
          path: 'list',
          lazy: () => import('../../views/user-management/role/list/index.jsx'),
          loader: () => {
            return {
              meta: {
                title: '角色管理',
              },
            };
          },
        },
      ],
    },
  ],
};
