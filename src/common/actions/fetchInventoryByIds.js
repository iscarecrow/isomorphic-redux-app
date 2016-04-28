import DtFetch from  '../utils/dtFetch';
import * as types from '../constants/ActionTypes';
import * as api from '../constants/ApiServer';

function requestInventoryByIds() {
  return {
    type: types.REQUEST_INVENTORY_BY_IDS,
  };
}

function receiveInventoryByIds(json, moredata={}) {
  return {
    type: types.RECEIVE_INVENTORY_BY_IDS,
    object_list: json.data,
    moredata: moredata,
    receivedAt: Date.now()
  };
}

function fetchInventoryByIdsData(ids='',moredata={}) {
  return dispatch => {
    dispatch(requestInventoryByIds());
    return DtFetch({
        type: "GET",
        url: api.inventoryByIdsUri,
        data: {ids:ids}
      })
      .then(json => dispatch(receiveInventoryByIds(json,moredata)));
  };
}
/**
 * [fetchInventoryByIds description]
 * @param       {[string]}                 ids [商品id以逗号分割1,2,3,4]
 * @return      {[func]}                     [触发发送行为]
 * @description  通过商品ids批量查询商品方法
 * @author      hugin
 * @updateTime  2016-02-17T11:57:50+0800
 */
export function fetchInventoryByIds(ids, moredata) {
  return (dispatch) => dispatch(fetchInventoryByIdsData(ids,moredata));
}