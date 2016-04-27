import { REQUEST_INVENTORY_BY_PROMOTIONID, RECEIVE_INVENTORY_BY_PROMOTIONID } from '../constants/ActionTypes';
import DtTools from '../utils/dtTools';

const limit = 10;

const initialState = {
  object_list:[],
  isLoading: 1,
  limit: limit,
  start: 0,
  title: '',
  needChangeTitle: false,
};
// 渲染数据
let listCache = [];

export default function SpecialPromotionData(state = initialState, action) {
  switch (action.type) {
    case REQUEST_INVENTORY_BY_PROMOTIONID:
      return Object.assign({}, state, {
        isLoading: 0,
      });
    case RECEIVE_INVENTORY_BY_PROMOTIONID:
      let title = state.title;
      let needChangeTitle = title?false: true;
      action.object_list.map((elem,i) => {
        elem.pictures[0] = DtTools.dtImageTrans(elem.pictures[0], true, 400, 400, 'c');
        elem.url = `/buy/item/detail/?id=${elem.id}&__urlopentype=pageweb&goodfrom=Category2`;
        title = elem.zc_promotions.length > 0?elem.zc_promotions[0].zc_tag_name : '';
        listCache.push(elem);
      });
      return  Object.assign({}, state, {
        object_list: listCache,
        isLoading: action.isLoading,
        limit: limit,
        title: title,
        start: action.nextStart,
        needChangeTitle: needChangeTitle,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}