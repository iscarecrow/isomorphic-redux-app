import DtFetch from  '../utils/dtFetch';
import * as types from '../constants/ActionTypes';
import * as api from '../constants/ApiServer';
// mock数据
// import CartListDara from '../mock/CartListDara';

function requestCart() {
  return {
    type: types.REQUEST_CART,
  };
}

function receiveCart(json) {
  return {
    type: types.RECEIVE_CART,
    validInventoryData: json.data.object_list,
    invalidInventoryData:json.data.invalid_inventories,
    receivedAt: Date.now()
  };
}

function fetchCartData() {
  return dispatch => {
    dispatch(requestCart());
    return DtFetch({
        url: api.cartUri,
        type: "GET"
      })
      .then(json => dispatch(receiveCart(json)));
  };
}

export function fetchCart() {
  return (dispatch) => dispatch(fetchCartData());
}