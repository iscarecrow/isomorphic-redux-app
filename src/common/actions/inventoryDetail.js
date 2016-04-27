import DtFetch from  '../utils/dtFetch';
import $ from 'jquery';
import * as types from '../constants/ActionTypes';
import * as api from '../constants/ApiServer';
// mock数据
// import NoticeData from '../mock/NoticeData';
// import CommentData from '../mock/CommentData';
// import UsersData from '../mock/UsersData';

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


function requestUsers(){
  return {
     type: types.REQUEST_USERS,
  };
}

function receiveUsers(json) {
  return {
    type: types.RECEIVE_USERS,
    UsersData: json.data.object_list,
  };
}

function fetchUsers(userIds) {
  return dispatch => {
    dispatch(requestUsers());
    return DtFetch({
        url: api.usersUri,
        type: "GET",
        data: {ids: userIds},
      })
      .then(json => dispatch(receiveUsers(json)));
  };
}
/**
 * [getUsers description]
 * @param       {[type]}                 userIds [逗号分割的id]
 * @return      {[type]}                         [description]
 * @description  根据userIds，获取user信息
 * @author      turebetty
 * @email       qin.yang@duitang.com
 * @updateTime  2016-03-28T17:08:30+0800
 */
export function getUsers(userIds) {
  return (dispatch) => dispatch(fetchUsers(userIds));
}

function requestBlogs(){
  return {
    type: types.REQUEST_BLOGS,
  };
}

function receiveBlogs(json) {
  return {
    type: types.RECEIVE_BLOGS,
     CommentData: json.data.object_list,
  };
}

function fetchBlogs(blogIds) {
  return dispatch => {
    dispatch(requestBlogs());
    return DtFetch({
        url: api.blogsUri,
        type: "GET",
        data: {ids: blogIds},
      })
      .then(json => dispatch(receiveBlogs(json)));
  };
}

/**
 * [getBlogs description]
 * @param       {[type]}                 blogIds [逗号分割的id]
 * @return      {[type]}                         [description]
 * @description 根据blogid，获取blog信息
 * @author      turebetty
 * @email       qin.yang@duitang.com
 * @updateTime  2016-03-28T17:07:43+0800
 */
export function getBlogs(blogIds) {
  return (dispatch) => dispatch(fetchBlogs(blogIds));
}

function requestNotice(){
  return {
    type: types.REQUEST_NOTICE,
  };
}

function receiveNotice(json) {
  return {
    type: types.RECEIVE_NOTICE,
     noticeData: {tpl:json,showResults:true},
  };
}

function fetchNotice(deliveryType) {
  return dispatch => {
    dispatch(requestNotice());
    let url = '';
    //海外商品购买须知
    if(deliveryType === 2){
      url = api.noticeOverseaUri;
    } else if(deliveryType === 3){
    //保税仓购买须知
      url = api.noticeBondedUri;
    }else{
    //普通商品购买须知
      url = api.noticeNormalUri;
    }
    let data = {credentials: 'include'};
    $.ajax({
      type: "GET",
      url: url,
      success: (jsn) => {
       return dispatch(receiveNotice(jsn));
      }
    });
  };
}

/**
 * [getNotice description]
 * @param       {[type]}                 deliveryType [发货类型]
 * @return      {[type]}                              [description]
 * @description 根据deliveryType，获取不同的购买须知
 * @author      turebetty
 * @email       qin.yang@duitang.com
 * @updateTime  2016-03-28T17:06:37+0800
 */
export function getNotice(deliveryType) {
   return (dispatch) => dispatch(fetchNotice(deliveryType));
}
/**
 * [inventoryCount description]
 * @param       {[type]}                 oldCount  [原来的数量]
 * @param       {[type]}                 changeNum [改变的数量]
 * @return      {[type]}                           [description]
 * @description 前端修改inventory的数量，不调用接口
 * @author      turebetty
 * @email       qin.yang@duitang.com
 * @updateTime  2016-03-28T17:11:48+0800
 */
export function inventoryCount(oldCount,changeNum) {
    return {
      type: types.CHANGE_INVENTORY_COUNT,
      oldCount,
      changeNum,
    }
}
/**
 * [initInventoryCount description]
 * @return      {[type]}                 [description]
 * @description 初始化inventory的数量为1
 * @author      turebetty
 * @email       qin.yang@duitang.com
 * @updateTime  2016-03-28T17:13:19+0800
 */
export function initInventoryCount() {
    return {
      type: types.INIT_INVENTORY_COUNT,
    }
}

/**
 * [setJoinCart description]
 * @param       {[type]}                 bool [description]
 * @description
 * @author      hugin<hxjlucky@gmail.com>
 * @updateTime  2016-03-24T20:11:07+0800
 */
export function setJoinCart(bool) {
    return {
      type: types.SET_JOIN_CART,
      bool,
    }
}


function requestIncreaseCart(){
  return {
    type: types.REQUEST_INCREASE_CART_COUNT,
  };
}

function receiveIncreaseCart(json) {
  return {
    type: types.RECEIVE_INCREASE_CART_COUNT,
    cartCount: json.data?json.data.cart_count:0,
  };
}

function fetchIncreaseCart(id,count) {
  let _data = {
    'inventory_id':id,
    'quantity':count,
  };
  return dispatch => {
    dispatch(requestIncreaseCart());
    return DtFetch({
        url: api.cartIncreaseUri,
        type: "POST",
        data: _data,
      })
      .then(json => dispatch(receiveIncreaseCart(json)));
  };
}

/**
 * [increaseCart description]
 * @param       {[type]}                 id    [description]
 * @param       {[type]}                 count [description]
 * @return      {[type]}                       [description]
 * @description  购物车+1
 * @author      hugin<hxjlucky@gmail.com>
 * @updateTime  2016-03-24T20:10:20+0800
 */
export function increaseCart(id,count) {
  return (dispatch) => dispatch(fetchIncreaseCart(id,count));
}
