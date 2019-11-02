// dva 操作 redux 的拆分出来的模块文件

// 取值
const userInfo = window.localStorage.getItem('userInfo');

export default {
  state: {
    userInfo: userInfo ? JSON.parse(userInfo) : null,
  },

  reducers: {
    login(state, action) {
      return { ...state, ...{ userInfo: action.userInfo } };
    },
  },
};
