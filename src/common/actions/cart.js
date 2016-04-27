import DtFetch from  '../utils/dtFetch';
import * as types from '../constants/ActionTypes';
import * as api from '../constants/ApiServer';
function requestIncreaseCart(){
  return {
    type: types.REQUEST_INCREASE_CART,
  };
}

function receiveIncreaseCart(json,shopIndex,itemIndex,id,checked) {
  //delete
  return {
    type: types.INCREASE_CART,
    data: json.data,
    shopIndex: shopIndex,
    itemIndex: itemIndex,
    checked: checked,
  };
}

function fetchIncreaseCart(shopIndex,itemIndex,id,checked) {
  let _data = {
    'inventory_id':id,
    'quantity':1,
  };
  return dispatch => {
    dispatch(requestIncreaseCart());
    return DtFetch({
        url: api.cartIncreaseUri,
        type: "POST",
        data: _data,
      })
      .then(json => dispatch(receiveIncreaseCart(json,shopIndex,itemIndex,id,checked)));
  };
}
export function increaseCart(shopIndex,itemIndex,id,checked) {
  return (dispatch) => dispatch(fetchIncreaseCart(shopIndex,itemIndex,id,checked));
}
function requestDecreaseCart(){
  return {
    type: types.REQUEST_DECREASE_CART,
  };
}

function receiveDecreaseCart(json,shopIndex,itemIndex,id,checked) {
  //delete
  return {
    type: types.DECREASE_CART,
    data: json.data,
    shopIndex: shopIndex,
    itemIndex: itemIndex,
    checked: checked,
  };
}

function fetchDecreaseCart(shopIndex,itemIndex,id,checked) {
  let _data = {
    'inventory_id':id,
    'quantity':1,
  };
  return dispatch => {
    dispatch(requestDecreaseCart());
    return DtFetch({
        url: api.cartDecreaseUri,
        type: "POST",
        data: _data,
      })
      .then(json => dispatch(receiveDecreaseCart(json,shopIndex,itemIndex,id,checked)));
  };
}
export function decreaseCart(shopIndex,itemIndex,id,checked) {
  return (dispatch) => dispatch(fetchDecreaseCart(shopIndex,itemIndex,id,checked));
}
function requestDeleteInvalidCart(){
  return {
    type: types.REQUEST_DELETE_INVALID_CART,
  };
}

function receiveDeleteInvalidCart(json,index) {
  return {
    type: types.DELETE_INVALID_CART,
    index,
  };
}

function fetchDeleteInvalidCart(index,id) {
  let _data = {'inventory_ids':id};
  return dispatch => {
    dispatch(requestDeleteInvalidCart());
    return DtFetch({
        url: api.cartDeleteUri,
        type: "POST",
        data: _data,
      })
      .then(json => dispatch(receiveDeleteInvalidCart(json,index)));
  };
}

export function deleteInvalidCart(index,id) {
  return (dispatch) => dispatch(fetchDeleteInvalidCart(index,id));
}

function requestDeleteValidCart(){
  return {
    type: types.REQUEST_DELETE_VALID_CART,
  };
}

function receiveDeleteValidCart(shopIndex,index,checked) {
  return {
    type: types.DELETE_VALID_CART,
    index,
    checked,
    shopIndex,
  };
}

function fetchDeleteValidCart(shopIndex,index,id,checked) {
  let _data = {'inventory_ids':id};
  return dispatch => {
    dispatch(requestDeleteValidCart());
    return DtFetch({
        url: api.cartDeleteUri,
        type: "POST",
        data: _data,
      })
      .then(json => dispatch(receiveDeleteValidCart(shopIndex,index,checked)));
  };
}

export function deleteValidCart(shopIndex,index,id,checked) {
  return (dispatch) => dispatch(fetchDeleteValidCart(shopIndex,index,id,checked));
}
function requestFeeCart(){
  return {
    type: types.REQUEST_FEE_CART,
  };
}

function receiveFeeCart(json,goodItems) {
  return {
    type: types.FEE_CART,
    data: json.data,
    goodItems: goodItems,
  };
}

function fetchFeeCart(goodItems) {
  let _data = {'inventory':goodItems};
  return dispatch => {
    dispatch(requestFeeCart());
    return DtFetch({
        url: api.cartFeeUri,
        type: "GET",
        data: _data,
      })
      .then(json => dispatch(receiveFeeCart(json,goodItems)));
  };
}
export function feeCart(goodItems) {
  return (dispatch) => dispatch(fetchFeeCart(goodItems));
}

function requestDeleteAllInvalidCart(){
  return {
    type: types.REQUEST_DELETE_ALL_INVALID_CART,
  };
}

function receiveDeleteAllInvalidCart() {
  return {
    type: types.DELETE_ALL_INVALID_CART,
  };
}

function fetchDeleteAllInvalidCart(ids) {
  let _data = {'inventory_ids':ids};
  return dispatch => {
    dispatch(requestDeleteAllInvalidCart());
    return DtFetch({
        url: api.cartDeleteUri,
        type: "POST",
        data: _data,
      })
      .then(json => dispatch(receiveDeleteAllInvalidCart()));
  };
}

export function deleteAllInvalidCart(ids) {
  return (dispatch) => dispatch(fetchDeleteAllInvalidCart(ids));
}


export function selectCartItem(shopIndex,itemIndex) {
  return {
    type: types.SELECT_CART_ITEM,
    shopIndex: shopIndex,
    itemIndex: itemIndex
  };
}

export function selectCartShop(shopIndex) {
  return {
    type: types.SELECT_CART_SHOP,
    shopIndex
  };
}

export function selectCartAll() {
  return {
    type: types.SELECT_CART_ALL
  };
}
