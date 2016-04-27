import DtFetch from  '../utils/dtFetch';
import * as types from '../constants/ActionTypes';
import * as api from '../constants/ApiServer';

function requestInventoryByPromotionId() {
  return {
    type: types.REQUEST_INVENTORY_BY_PROMOTIONID,
  };
}

function receiveInventoryByPromotionId(json, moredata={}) {
  return {
    type: types.RECEIVE_INVENTORY_BY_PROMOTIONID,
    object_list: json.data.object_list,
    isLoading: json.data.more,
    nextStart: json.data.next_start,
    receivedAt: Date.now()
  };
}

function fetchInventoryByPromotionIdData(param_) {
  return dispatch => {
    dispatch(requestInventoryByPromotionId());
    return DtFetch({
        type: "GET",
        url: api.inventoryByPromotionIdUri,
        data: param_
      })
      .then(json => dispatch(receiveInventoryByPromotionId(json)));
  };
}
/**
 * [fetchInventoryByPromotionId 根据专场满减的id获取商品信息]
 * @param       {[type]}                 param_ {start:10,limit:10,promotion_id:59}
 * @author      turebetty
 * @email       qin.yang@duitang.com
 * @updateTime  2016-04-21T15:34:30+0800
 */
export function fetchInventoryByPromotionId(param_) {
  return (dispatch) => dispatch(fetchInventoryByPromotionIdData(param_));
}