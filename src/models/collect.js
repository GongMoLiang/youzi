let userInfo = window.localStorage.getItem('userInfo');
if (userInfo) {
  userInfo = JSON.parse(userInfo);
  var collect = window.localStorage.getItem(`${userInfo.username}love`);
  console.log(collect);
}

export default {
  namespace: 'collect',
  state: {
    collect: collect ? JSON.parse(collect) : [],
  },

  reducers: {
    detail(state, action) {
      return { ...state, ...{ collect: action.collect } };
    },
  },
};
