import { RECEIVE_CART, REQUEST_CART, INCREASE_CART, DECREASE_CART,SELECT_CART_SHOP,SELECT_CART_ITEM,SELECT_CART_ALL, DELETE_INVALID_CART,DELETE_ALL_INVALID_CART,DELETE_VALID_CART,FEE_CART } from '../constants/ActionTypes';

const initialState = {
  validInventoryData:[],
  invalidInventoryData: [],
  payData: {}
};

export default function CartListData(state = initialState, action={shopIndex:0}) {
  // 一个商店下的所有商品
  let inventories={};
  // 一个商品
  let item;
  // 一个商店的头部
  let titleData = {};

  let isAllItemChecked = true;
  let isAllShopChecked = true;
  switch (action.type) {
    case REQUEST_CART:
      return Object.assign({}, state, {
        needCountFee: false,
        isLoading: 1,
      });
    case RECEIVE_CART:
      action.validInventoryData.map((elem, i) => {
        elem.checked = false;
        elem.inventories.map((subElem, j) => {
          subElem.checked = false;
          if(subElem.image) subElem.image =  DtTools.dtImageTrans(subElem.image, true, 200, 200, 'c');
          if(elem.zc_promotions.length> 0){
            elem.zc_promotions.map((zcItem, j) => {
              zcItem.inventory_ids.map((zcItemIds, j) => {
                if(zcItemIds === subElem.inventory_id){
                  zcItem.url = `/buy/special/promotion/?promotion_id=${zcItem.promotion_id}&__urlopentype=pageweb`;
                  subElem.zc_promotion = zcItem;
                }
              })
            })
          }
        });
        elem.titleData = {
          'checked': elem.checked,
          'seller_inventory_num': elem.seller_inventory_num,
          'seller_name': elem.seller_name,
          'user_logistic_fee': elem.user_logistic_fee,
          'user_logistic_threshold': elem.user_logistic_threshold
        };
        elem.postageData = {
          'user_logistic_fee': elem.user_logistic_fee,
          'user_logistic_threshold': elem.user_logistic_threshold,
          'user_logistic_rest': elem.user_logistic_rest,
          'select_price': elem.select_price
        };
        elem.promotionData = elem.promotions[0] || {};
        elem.zcpromotionsData = elem.zc_promotions || [];
      });
      return  Object.assign({}, state, {
        validInventoryData: action.validInventoryData,
        invalidInventoryData: action.invalidInventoryData,
        payData: {
          checked: false,
          total_pirce: '¥0.00',
          total_inventory_num: 0,
          pay_url: 'javascript:void',
        },
        needCountFee: false,
        lastUpdated: action.receivedAt
      });

    case INCREASE_CART:
      state.validInventoryData[action.shopIndex].inventories[action.itemIndex].quantity = action.data.quantity;
      state.needCountFee = action.checked?true:false;
      return Object.assign({}, state);

    case DECREASE_CART:
      inventories = state.validInventoryData[action.shopIndex].inventories;
      if (inventories[action.itemIndex].quantity > 1) inventories[action.itemIndex].quantity = action.data.quantity;
      state.needCountFee = action.checked?true:false;
      return Object.assign({}, state);

    case SELECT_CART_SHOP:
      inventories = state.validInventoryData[action.shopIndex].inventories;
      titleData = state.validInventoryData[action.shopIndex].titleData;
      titleData.checked = !titleData.checked;
      if (titleData.checked) {
        inventories.map((inventory,i) => inventory.checked = true);
      } else {
        inventories.map((inventory,i) => inventory.checked = false);
      }
      for (let validInventory of state.validInventoryData) {
        if (validInventory.titleData.checked === false) {
          isAllShopChecked = false;
        }
      }
      state.payData.checked = isAllShopChecked;
      state.needCountFee = true;
      return Object.assign({}, state);

    case SELECT_CART_ITEM:
      inventories = state.validInventoryData[action.shopIndex].inventories;
      titleData = state.validInventoryData[action.shopIndex].titleData;
      item = inventories[action.itemIndex];
      item.checked = !item.checked;
      for (let inventory of inventories) {
        if (inventory.checked === false){
          isAllItemChecked = false;
        }
      }
      titleData.checked = isAllItemChecked;


      if (!item.checked) {
        titleData.checked = false;
      }

      for (let validInventory of state.validInventoryData) {
        if (validInventory.titleData.checked === false) {
          isAllShopChecked = false;
        }
      }

      state.payData.checked = isAllShopChecked;
      state.needCountFee = true;
      return Object.assign({}, state);

    case SELECT_CART_ALL:
      state.payData.checked = !state.payData.checked;
      if (state.payData.checked) {
        state.validInventoryData.map((elem, i) => {
          elem.checked = true;
          elem.titleData.checked = true;
          elem.inventories.map((subElem, j) => {
            subElem.checked = true;
          });
        });
      } else {
        state.validInventoryData.map((elem, i) => {
          elem.checked = false;
          elem.titleData.checked = false;
          elem.inventories.map((subElem, j) => {
            subElem.checked = false;
          });
        });
      }
      state.needCountFee = true;
      return Object.assign({}, state);

    case DELETE_INVALID_CART:
      let newinvalidInventoryData = state.invalidInventoryData;
      newinvalidInventoryData.splice(action.index,1);
      return Object.assign({}, state, {
        invalidInventoryData: newinvalidInventoryData,
      });
    case DELETE_ALL_INVALID_CART:
      return Object.assign({}, state, {
        invalidInventoryData:[],
      });
    case DELETE_VALID_CART:
      let newValidInventoryData = state.validInventoryData[action.shopIndex].inventories;
      if(newValidInventoryData.length === 1){
        state.validInventoryData.splice(action.shopIndex,1);
      }else{
        newValidInventoryData.splice(action.index,1);
        state.validInventoryData[action.shopIndex].titleData.seller_inventory_num = newValidInventoryData.length;
      }
      state.needCountFee = action.checked?true:false;
      return Object.assign({}, state);
    case FEE_CART:
      state.payData.total_pirce = action.data.total;
      state.payData.total_inventory_num = action.data.total_inventory_num;
      state.payData.pay_url = `/buy/pay/confirm/?goodItem=${action.goodItems}&__urlopentype=pageweb`;
      state.validInventoryData.map((stateElem, i) => {
        let checedFlag = false;
        stateElem.inventories.map((item, z) => {
          if(item.checked){
            checedFlag = true;
          }
        });
        if(!checedFlag){
          stateElem.postageData.select_price = 0;
          stateElem.promotionData = stateElem.promotions[0] || {};
        }
        action.data.seller_list.map((newElem, j) => {
          if(newElem.seller_name === stateElem.seller_name){
            stateElem.promotionData = newElem.promotions[0] || {};
            stateElem.postageData.select_price = newElem.actual_fee;
            stateElem.postageData.user_logistic_rest = (stateElem.postageData.user_logistic_threshold-stateElem.postageData.select_price).toFixed(2);
            //包含逻辑，若后端不返回时，需要恢复原始状态
            stateElem.zc_promotions.map((zcItem, k) => {
              let zcFlag = false;
              newElem.zc_promotions.map((newZcItem, g) => {
                if(zcItem.promotion_id === newZcItem.promotion_id){
                  newZcItem.url = `/buy/special/promotion/?promotion_id=${zcItem.promotion_id}&__urlopentype=pageweb`;
                  stateElem.zc_promotions[k] = newZcItem;
                  zcFlag = true;
                }
              })
              if(!zcFlag){
                stateElem.zc_promotions[k].discount =  0;
              }
            })
          }
          stateElem.titleData.seller_inventory_num = stateElem.inventories.length;
        });

      });
      state.needCountFee = false;
      return Object.assign({}, state);
    default:
      return state;
  }
}