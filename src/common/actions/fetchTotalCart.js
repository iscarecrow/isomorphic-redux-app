import DtFetch from  '../utils/dtFetch';
import * as types from '../constants/ActionTypes';
import * as api from '../constants/ApiServer';
// mock数据
// import totalCartData from '../mock/TotalCartData';

function requestTotalCart() {
  return {
     type: types.REQUEST_TOTAL_CART,
  };
}

function receiveTotalCart(json) {
  return {
    type: types.RECEIVE_TOTAL_CART,
     totalCart: json && json.data? json.data.total:0,
  };
}

function fetchTotalCart() {
  return dispatch => {
    dispatch(requestTotalCart());
    return DtFetch({
        url: api.cartTotalUri,
        type: "GET"
      })
      .then(json => dispatch(receiveTotalCart(json)));
  };
}
/**
 * [totalCart description]
 * @return      {[type]}                 [description]
 * @description 获取购物车总量
 * @author      hugin<hxjlucky@gmail.com>
 * @updateTime  2016-03-24T19:45:08+0800
 */
export function totalCart() {
  return (dispatch) => dispatch(fetchTotalCart());
}