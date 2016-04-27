import DtFetch from  '../utils/dtFetch';
import * as types from '../constants/ActionTypes';
import * as api from '../constants/ApiServer';
// mock数据
// import waveOrderData from '../mock/waveOrderData';

function requestWaveOrder() {
  return {
    type: types.REQUEST_ORDER_WAVE,
  };
}

function receiveWaveOrder(json) {
  return {
    type: types.RECEIVE_ORDER_WAVE,
     data: json.data,
  };
}

function fetchWaveOrder() {
  return dispatch => {
    dispatch(requestWaveOrder());
    return DtFetch({
        url: api.orderWaveUri,
        type: "GET"
      })
      .then(json => dispatch(receiveWaveOrder(json)));
  };
}

export function getWaveOrder() {
  return (dispatch) => dispatch(fetchWaveOrder());
}

/**
 * [setWaveOrder description]
 * @param       {[type]}                 bool [description]
 * @description  漂订单
 * @author      hugin<hxjlucky@gmail.com>
 * @updateTime  2016-03-24T19:43:10+0800
 */

export function setWaveOrder(bool) {
    return {
      type: types.SET_WAVE_ORDER,
      bool,
    }
}