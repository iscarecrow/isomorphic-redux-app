import { REQUEST_INVENTORY_BY_IDS, RECEIVE_INVENTORY_BY_IDS } from '../constants/ActionTypes';
import DtTools from '../utils/dtTools';

const limit = 10;

const initialState = {
  object_list:[],
};

export default function HotSingleGoodsData(state = initialState, action) {
  switch (action.type) {
    case REQUEST_INVENTORY_BY_IDS:
      return Object.assign({}, state, {
        isLoading: 1,
      });
    case RECEIVE_INVENTORY_BY_IDS:
      action.object_list.map((elem,i) => {
        elem.pictures[0] = DtTools.dtImageTrans(elem.pictures[0], true, 400, 400, 'c');
        elem.url = `/buy/item/detail/?id=${elem.id}&__urlopentype=pageweb&goodfrom=hotSingleGoods`;
        elem.sale = elem.market_price?(elem.sale_price/elem.market_price*10).toFixed(1):10;
      });
      return  Object.assign({}, state, {
        object_list: action.object_list,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}