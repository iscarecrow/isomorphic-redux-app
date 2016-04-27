import DtFetch from  '../utils/dtFetch';
import * as types from '../constants/ActionTypes';
import * as api from '../constants/ApiServer';

function requestInventoryByCat() {
  return {
    type: types.REQUEST_INVENTORY_BY_CAT,
  };
}

function receiveInventoryByCat(json) {
  return {
    type: types.RECEIVE_INVENTORY_BY_CAT,
    object_list: json.data.object_list,
    isLoading: json.data.more,
    nextStart: json.data.next_start,
    receivedAt: Date.now()
  };
}
function fetchInventoryByCatData(data) {
  return dispatch => {
    dispatch(requestInventoryByCat());
    return DtFetch({
        url: api.inventoryByCatUri,
        type: "GET",
        data: data
      })
      .then(json => dispatch(receiveInventoryByCat(json)));
  };
}
/**
 * [fetchInventoryByCat description]
 * @param       {[object]}                 data [api的查询参数，参数见wiki]
 * @return      {[object]}                      [标准api返回]
 * @description 通过inventory_cat(类别)  查询inventory(库存)列表 按时间倒序
 * @author      hugin<hxjlucky@gmail.com>
 * @updateTime  2016-02-17T12:26:51+0800
 */
export function fetchInventoryByCat(data) {
  return (dispatch) => dispatch(fetchInventoryByCatData(data));
}