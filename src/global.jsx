import { App } from 'antd';

/**
 * hook, 封装 antd 的 message 组件，使整个项目使用统一的 message 配置
 * hook, wraps antd's message component so that the entire project uses a uniform message configuration
 */
export function useMsg() {
  const { message } = App.useApp();
  const msgTypes = Object.freeze({
    INFO: 'info',
    SUCCESS: 'success',
    ERROR: 'error',
  });
  const showMsg = params => {
    const { type, content } = params;
    message.open({
      type,
      content,
    });
  };
  const errorMsg = content => {
    showMsg({
      type: msgTypes.ERROR,
      content,
    });
  };
  const successMsg = content => {
    showMsg({
      type: msgTypes.SUCCESS,
      content,
    });
  };
  const infoMsg = content => {
    showMsg({
      type: msgTypes.INFO,
      content,
    });
  };
  return { showMsg, errorMsg, successMsg, infoMsg, msgTypes };
}

export function useComputeSelectOption(obj) {
  let arr = [];
  for (const key in obj) {
    const item = obj[key];
    arr.push({
      value: item,
      label: item,
    });
  }
  return arr;
}

// 集中的 localStorage 管理
// intense localStorage
export class LStroge {
  static Token = class {
    static set(str) {
      window.localStorage.setItem('token', str);
    }
    static get() {
      return window.localStorage.getItem('token');
    }
    static remove() {
      window.localStorage.removeItem('token');
    }
  };
}
