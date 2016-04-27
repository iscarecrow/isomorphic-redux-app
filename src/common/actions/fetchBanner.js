import DtFetch from  '../utils/dtFetch';
import * as types from '../constants/ActionTypes';
import * as api from '../constants/ApiServer';

function requestBanner() {
  return {
    type: types.REQUEST_BANNER,
  };
}

function receiveBanner(json) {
  return {
    type: types.RECEIVE_BANNER,
    object_list: json.data.object_list,
    receivedAt: Date.now()
  };
}

function fetchBannerData(params_) {
  return dispatch => {
    dispatch(requestBanner());
    return DtFetch({
        type: "GET",
        url: api.bannerUri,
        data: params_
      })
      .then(json => dispatch(receiveBanner(json)));
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
export function fetchBanner(params_) {
  return (dispatch) => dispatch(fetchBannerData(params_));
}