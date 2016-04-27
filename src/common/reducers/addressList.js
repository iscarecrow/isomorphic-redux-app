import { REQUEST_ADDRESS_LIST, RECEIVE_ADDRESS_LIST, SELECT_ADDRESS } from '../constants/ActionTypes';

/**
 * [initialState description]
 * @type {Object}
 * object_list: 地址栏内容
 * hasAdd: 是否存在地址
 * ismaxAdd: 最大可保存量
 * selectAddId: 当前选中地址id
 * needIdcardAuth: 地址是否身份证认证
 */
const initialState = {
  object_list:[],
  hasAdd: true,
  isMaxAdd: true,
  selectAddId:'',
  needIdcardAuth: false
};

/**
 * [AddressListData description]
 * @param       {[type]}                 state  [description]
 * @param       {[type]}                 action [地址栏action]
 * @description
 * @author      hugin<hxjlucky@gmail.com>
 * @updateTime  2016-03-07T17:49:42+0800
 */
export default function AddressListData(state = initialState, action) {
  switch (action.type) {
    case REQUEST_ADDRESS_LIST:
      return Object.assign({}, state, {
        isLoading: 1,
      });
    case RECEIVE_ADDRESS_LIST:
      // 地址栏是否为空
      action.hasAdd = action.object_list.length > 0 ? true : false;
      // 最多显示五条
      action.isMaxAdd = action.object_list.length >= 5 ? true : false;
      action.object_list.map((elem,i) => {
        elem.editLink = `/buy/address/list/?__urlopentype=pageweb&needIdcardAuth=${ action.urlParams.needIdcardAuth}&editAddId=${elem.id}&isIdCartAdd=${action.urlParams.isIdCartAdd}`;
        // 如果选中 做url处理 传给 地址编辑页面
        if(elem.id == action.urlParams.curAddId){
          elem.editLink = elem.editLink + '&isSelectedId=true';
        }
      });

      return  Object.assign({}, state, {
        object_list: action.object_list,
        hasAdd: action.hasAdd,
        isMaxAdd: action.isMaxAdd,
        needIdcardAuth: action.urlParams.needIdcardAuth,
        lastUpdated: action.receivedAt
      });
    case SELECT_ADDRESS:
      return Object.assign({}, state, {
        selectAddId: action.id
      })
    default:
      return state;
  }
}