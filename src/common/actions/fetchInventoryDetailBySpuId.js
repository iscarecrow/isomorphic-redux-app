import DtFetch from  '../utils/dtFetch';
import * as types from '../constants/ActionTypes';
import * as api from '../constants/ApiServer';
// mock数据
// import InventoryDetailData from '../mock/InventoryDetailData';

function requestInventoryDetailBySpuId(inventoryDetail) {
  return {
   type: types.REQUEST_INVENTORY_DETAIL,
  };
}

function receiveInventoryDetailBySpuId(inventoryDetail) {
  return {
    type: types.RECEIVE_INVENTORY_DETAIL,
    inventoryDetail: inventoryDetail.data,
    receivedAt: Date.now()
  };
}

function fetchInventoryDetailDataBySpuId(spuId) {
  return dispatch => {
    dispatch(requestInventoryDetailBySpuId());
    return DtFetch({
        url: api.inventoryDetailBySpuIdUri,
        data: {"spu_id":spuId},
        type: "GET",
      })
      .then(json => dispatch(receiveInventoryDetailBySpuId(json)));
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
export function fetchInventoryDetailBySpuId(spuId) {
  return (dispatch) => dispatch(fetchInventoryDetailDataBySpuId(spuId));
}

