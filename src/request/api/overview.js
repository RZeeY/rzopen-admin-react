import BaseRequest from '../baseRequest';

export const getContentAnalysis = async () => {
  return await BaseRequest.request({
    method: 'get',
    url: '/contentAnalysis',
  });
};

export const getIncomeAnalysis = async () => {
  return await BaseRequest.request({
    method: 'get',
    url: '/incomeAnalysis',
  });
};

export const getFlowerAnalysis = async () => {
  return await BaseRequest.request({
    method: 'get',
    url: '/flowerAnalysis',
  });
};
