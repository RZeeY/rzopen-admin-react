import BaseRequest from '../baseRequest';

export const getUsers = async () => {
  return await BaseRequest.request({
    method: 'get',
    url: '/users',
  });
};

export const getRoles = async () => {
  return await BaseRequest.request({
    method: 'get',
    url: '/roles',
  });
};

export const getUserByToken = async params => {
  return await BaseRequest.request({
    method: 'get',
    url: '/user',
    data: params,
  });
};
