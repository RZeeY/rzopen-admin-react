import BaseRequest from '../baseRequest';

export const getArticles = async () => {
  return await BaseRequest.request({
    method: 'get',
    url: '/articles',
  });
};
