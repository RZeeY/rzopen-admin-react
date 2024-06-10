/**
 * 路由守卫
 * route defender
 *
 * @param {Object} props props
 * @param {React.Component} children react component
 * @returns {React.Component}
 */

// React
import { useEffect } from 'react';
import { useLocation, useMatches, useNavigate } from 'react-router-dom';
// other
import { LStroge } from '../../global.jsx';

export default function Component({ children }) {
  const matches = useMatches();
  const location = useLocation();
  const navigate = useNavigate();

  // 判断是否存在token，如果没有则需要让用户跳转到登录页，重新登录
  // Determine whether the token exists, if not then you need to let the user jump to the login page and log in again
  useEffect(() => {
    const token = LStroge.Token.get();
    if (token) {
      return;
    }
    if (confirm('登录已失效，请重新登录')) {
      navigate('/login');
    }
  }, [location, navigate]);

  useEffect(() => {
    const currentMatch = matches.find(item => item.pathname === location.pathname);
    if (!currentMatch) {
      return null;
    }
    const data = currentMatch.data;
    if (!data && !data.meta) {
      return null;
    }
    const meta = data.meta;
    // set document title
    if (meta.title) {
      document.title = meta.title;
    }
    // redirect url
    if (meta.redirect) {
      navigate(meta.redirect, {
        replace: true,
      });
    }
  });

  return children;
}
