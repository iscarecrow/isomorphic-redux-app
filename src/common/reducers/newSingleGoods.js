import { REQUEST_INVENTORY_BY_IDS, RECEIVE_INVENTORY_BY_IDS } from '../constants/ActionTypes';
import DtTools from '../utils/dtTools';
import timeFormat from '../parts/timeFormat';
import NewSingleGoodsMockData from '../mock/NewSingleGoodsData';

const limit = 10;

const initialState = {
  object_list:[],
};

// 渲染数据
let listCache = [];
let index = 0;

export default function NewSingleGoodsData(state = initialState, action) {
  switch (action.type) {
    case REQUEST_INVENTORY_BY_IDS:
      return Object.assign({}, state, {
        isLoading: 1,
      });
    case RECEIVE_INVENTORY_BY_IDS:

      let _currentItems = [];
      action.object_list.map((elem,i) => {
        elem.pictures[0] = DtTools.dtImageTrans(elem.pictures[0], true, 400, 400, 'c');
        elem.url = `/buy/item/detail/?id=${elem.id}&__urlopentype=pageweb&goodfrom=hotSingleGoods`;
        _currentItems.push(elem);
      });
      let _bannerData = [];
      if (action.moredata.image_url) _bannerData = [action.moredata];
      let addTime = timeFormat(action.moredata.enabled_at_str);
      let goodsItem = {
        goodsData: _currentItems,
        bannerData: {
          object_list:_bannerData,
          index:index,
        },
        addTime: addTime
      }
      listCache.push(goodsItem);
      index ++;
      return  Object.assign({}, state, {
        object_list: listCache,
        index: index,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}