import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import undoable from 'redux-undo';

import user from './user';
import counter from './counter';
import layout from './layout';
import todos from './todos';
import version from './version';


// 有料
import SubCategoryDetailData from './subCategoryDetail';
import TitleData from './showTitle';
import HotSingleGoodsData from './hotSingleGoods';
import NewSingleGoodsData from './newSingleGoods';
import AddressListData from './addressList';
import CartListData from './cartList';
import InventoryDetailData from './inventoryDetail';
import SpecialPromotionData from './specialPromotion';
import ShoprankListData from './shoprankList';

  // HotSingleGoodsData :HotSingleGoodsData,
  // TitleData: TitleData,
  // SubCategoryDetailData: SubCategoryDetailData,
  // AddressListData: AddressListData,
  // CartListData: CartListData,
  // InventoryDetailData: InventoryDetailData,
  // SpecialPromotionData: SpecialPromotionData,
  // ShoprankListData: ShoprankListData,


import { selectedReddit, postsByReddit } from './reddit';

const rootReducer = combineReducers({
  user : user,
  version : version,
  counter : undoable(counter),
  layout : undoable(layout),
  todos : undoable(todos),
  selectedReddit : undoable(selectedReddit),
  postsByReddit : undoable(postsByReddit),
  NewSingleGoodsData: NewSingleGoodsData,
  router : routerStateReducer
});

export default rootReducer;