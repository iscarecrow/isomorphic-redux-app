import DtFetch from  '../utils/dtFetch';
import * as types from '../constants/ActionTypes';
import * as api from '../constants/ApiServer';

function requestAddressList() {
  return {
    type: types.REQUEST_ADDRESS_LIST,
  };
}

function receiveAddressList(json,urlParams={}) {
  let object_list = json.data && json.data.object_list || {};
  return {
    type: types.RECEIVE_ADDRESS_LIST,
    object_list: object_list,
    urlParams: urlParams,
    receivedAt: Date.now()
  };
}

/**
 * [selectAddress 选择地址]
 * @param       {[num]}                 id [当前地址id]
 * @return      {[type]}                   [description]
 * @description
 * @author      hugin<hxjlucky@gmail.com> 
 * @updateTime  2016-03-08T18:44:15+0800
 */
export function selectAddress(id) {
  return {
    type: types.SELECT_ADDRESS,
    id
  }
}

function fetchAddressListData(urlParams) {
  return dispatch => {
    dispatch(requestAddressList());

    return DtFetch({
        url:api.addressList,
        type: "GET"
      })
      .then(json => dispatch(receiveAddressList(json,urlParams)));
  };
}

export function fetchAddressList(urlParams) {
  return (dispatch) => dispatch(fetchAddressListData(urlParams));
}