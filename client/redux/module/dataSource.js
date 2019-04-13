const ERROR_MSG = 'ERROR_MSG';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

// 默认值
const initState = {
  sourceId: -1,
  msg: '',
  // 數據源列表
  allDataSources: [],
  // 獲取到的總數據
  properties: [],
  // 展示的數據
  indexList: [],
  // 頁面展示條數
  pageSize: 10,
  // 当前页面
  pageNum: 1,
  // 输出数据
  message: '',
  // 关联的父数据
  parentData: []
}

export function dataSource(state = initState, action) {
  switch (action.type) {
    case ERROR_MSG:
      return state
    case REGISTER_SUCCESS:
      return {...state, ...action.payload}
    default:
      return state
  }
}

// 成功調用
function registerSuccess(data) {
  return {
    type: REGISTER_SUCCESS,
    payload: data
  }
}

export function setSourceDataInput(data) {
  console.log(8)
  // return {
  //   type: REGISTER_SUCCESS,
  //   payload: {pageNum: 10}
  // }
  return dispatch => {
    dispatch(registerSuccess({pageNum: data}));
  }
}