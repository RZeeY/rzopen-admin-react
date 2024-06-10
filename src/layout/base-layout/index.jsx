// React
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useMatches } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as userInfoSlice from '../../store/userInfo/index.js';
// antd
import { Menu, Dropdown, Breadcrumb, Space } from 'antd';
import { PieChartOutlined, FileWordOutlined, TeamOutlined, GithubOutlined } from '@ant-design/icons';
import { App } from 'antd';
// stylesheet
import './index.less';
import imgAvatar from '../../assets/images/common/avatar.svg';
// other
import { LStroge } from '../../global';

const menuItem = [
  {
    key: 1712575857036,
    icon: <PieChartOutlined />,
    label: '数据看板',
    children: [
      {
        key: 1712576498657,
        label: '内容分析',
        data: {
          pathType: 0,
          path: '/dashboard/overview',
        },
      },
      {
        key: 1712546498627,
        label: '收益分析',
        data: {
          pathType: 0,
          path: '/dashboard/income',
        },
      },
      {
        key: 1712576598627,
        label: '关注者分析',
        data: {
          pathType: 0,
          path: '/dashboard/flower',
        },
      },
    ],
  },
  {
    key: 17125758651202,
    icon: <FileWordOutlined />,
    label: '内容管理',
    children: [
      {
        key: 1712526498657,
        label: '内容管理',
        data: {
          pathType: 0,
          path: '/content-management/content/list',
        },
      },
    ],
  },
  {
    key: 1712576031453,
    icon: <TeamOutlined />,
    label: '用户管理',
    children: [
      {
        key: 1712526986257,
        label: '用户管理',
        data: {
          pathType: 0,
          path: '/user-management/user/list',
        },
      },
      {
        key: 1712576426359,
        label: '角色管理',
        data: {
          pathType: 0,
          path: '/user-management/role/list',
        },
      },
    ],
  },
];

export function Component() {
  const navigate = useNavigate();
  const matches = useMatches();
  let [breadcrumb, setBreadcrumb] = useState([]);
  const userInfo = useSelector(state => state.userInfo.value);
  const { modal } = App.useApp();
  const dispatch = useDispatch();

  useEffect(() => {
    let breadcrumArr = [];
    for (const item of matches) {
      if (item.data && item.data.meta && item.data.meta.title) {
        breadcrumArr.push({
          title: item.data.meta.title,
        });
      }
    }
    setBreadcrumb(breadcrumArr);
    return;
  }, [matches]);

  function handleMenuItemClick(data) {
    try {
      const cData = data.item.props.data;
      const path = cData.path;
      const pathType = cData.pathType;
      if (!path) {
        return false;
      }
      if (pathType === 0) {
        navigate(path);
      } else {
        location.href = path;
      }
    } catch (err) {
      throw Error(err);
    }
  }

  async function handleLogoutBtnClick() {
    const confirm = await modal.confirm({
      title: '退出登录',
      content: '是否确定退出登录？',
    });
    if (!confirm) {
      return;
    }
    LStroge.Token.remove();
    dispatch(userInfoSlice.remove());
    navigate('/login');
  }

  return (
    <>
      <div className='bl-container'>
        <header className='main-header'>
          <p className='app-title'>{import.meta.env.VITE_PRODUCT_NAME}</p>
          <div className='header-actions'>
            <a className='item' href='https://github.com/RZeeY' target='_blank'>
              <GithubOutlined />
            </a>
            <Dropdown
              menu={{
                items: [
                  {
                    label: '退出登录',
                    onClick: handleLogoutBtnClick,
                  },
                ],
              }}
              placement='bottomLeft'
            >
              <div className='item'>
                <div className='user'>
                  <img src={imgAvatar} />
                  <div className='user-name'>{(userInfo && userInfo.nickname) || ''}</div>
                </div>
              </div>
            </Dropdown>
          </div>
        </header>
        <div className='main-body'>
          <div className='main-menu'>
            <Menu style={{ width: 256 }} mode='inline' items={menuItem} defaultOpenKeys={['1712575857036']} onClick={handleMenuItemClick} />
          </div>
          <div className='main-content'>
            <Space direction='vertical' style={{ width: '100%' }} size='middle'>
              <Breadcrumb items={breadcrumb} />
              <Outlet />
            </Space>
          </div>
        </div>
      </div>
    </>
  );
}
