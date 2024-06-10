import axios from 'axios';
import { message } from 'antd';

export default class BaseRequest extends axios {
  constructor(params) {
    super(params);
  }
  static baseUrl = import.meta.env.VITE_API_BASE_URL;
  static async request(params) {
    let options = Object.assign({}, params);
    if (options.method === 'get') {
      options.params = options.data;
      delete options.data;
    }
    options.baseURL = `${this.baseUrl}`;
    try {
      let res = await super.request(options);
      // IMPROVE: 实际项目开发中还需对返回的 request 数据做进一步的响应结果处理，比如 data 字段中还可能能包括 status 的判断
      // In practice, further processing of the returned request data is required, e.g. the data field may include a status judgement.
      return res.data;
    } catch (err) {
      message.error('网络错误');
    }
  }
}
