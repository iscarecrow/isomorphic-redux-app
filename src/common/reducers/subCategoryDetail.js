import { REQUEST_INVENTORY_BY_CAT, RECEIVE_INVENTORY_BY_CAT } from '../constants/ActionTypes';
import DtTools from '../utils/dtTools';

const limit = 10;

const initialState = {
  object_list:[],
  isLoading: 1,
  limit: limit,
  start: 0
};
// 渲染数据
let listCache = [];

export default function SubCategoryDetailData(state = initialState, action) {
  switch (action.type) {
    case REQUEST_INVENTORY_BY_CAT:
      return Object.assign({}, state, {
        isLoading: 0,
      });
    case RECEIVE_INVENTORY_BY_CAT:
      action.object_list.map((elem,i) => {
        elem.pictures[0] = DtTools.dtImageTrans(elem.pictures[0], true, 200, 200, 'c');
        elem.url = `/buy/item/detail/?id=${elem.id}&__urlopentype=pageweb&goodfrom=Category2`;
        listCache.push(elem);
      });
      return  Object.assign({}, state, {
        object_list: listCache,
        isLoading: action.isLoading,
        limit: limit,
        start: action.nextStart,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}