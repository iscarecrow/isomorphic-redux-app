import DtFetch from  '../utils/dtFetch';
import * as types from '../constants/ActionTypes';
import * as api from '../constants/ApiServer';
// mock数据
// import InventoryDetailData from '../mock/InventoryDetailData';

function requestInventoryDetail(inventoryDetail) {
  return {
   type: types.REQUEST_INVENTORY_DETAIL,
  };
}

function receiveInventoryDetail(inventoryDetail) {
  return {
    type: types.RECEIVE_INVENTORY_DETAIL,
    inventoryDetail: inventoryDetail.data,
    receivedAt: Date.now()
  };
}

function fetchInventoryDetailData(id) {
  return dispatch => {
    dispatch(requestInventoryDetail());
    return DtFetch({
        url: api.inventoryDetailUri,
        data: {"id":id},
        type: "GET",
      })
      .then(json => dispatch(receiveInventoryDetail(json)));
  };
}

/**
 * [fetchInventoryDetail description]
 * @param       {[num]}                 id [商品详情]
 * @return      {[object]}                 [json]
 * @description  获取商品详情
 * @author      hugin<hxjlucky@gmail.com>
 * @updateTime  2016-03-24T19:47:40+0800
 */
export function fetchInventoryDetail(id) {
  return (dispatch) => dispatch(fetchInventoryDetailData(id));
}

