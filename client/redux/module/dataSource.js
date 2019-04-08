const ERROR_MSG = 'ERROR_MSG';

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
    default:
      return state
  }
}
