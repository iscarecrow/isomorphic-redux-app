import { REQUEST_BANNER, RECEIVE_BANNER ,REQUEST_INVENTORY_BY_IDS,RECEIVE_INVENTORY_BY_IDS} from '../constants/ActionTypes';

const initialState = {
  ShoprankBanner:[],
  isGetbannerFinish: false,
  isLoading: 0,
  index: 0,
};
let _shoprankBanner =[];
let _shoprankBannerCache =[];
let _index = 0;
export default function ShoprankListData(state = initialState, action) {
  switch (action.type) {
    case REQUEST_BANNER:
      return Object.assign({}, state, {
        isLoading: 0,
        isGetbannerFinish: false,
      });
    case RECEIVE_BANNER:
     action.object_list.map((elem,i) => {
       elem.goodsList = {object_list: [], needRank: true};
     })
      _shoprankBanner = action.object_list;
      _shoprankBannerCache[_index] = _shoprankBanner[_index];
      return  Object.assign({}, state, {
        ShoprankBanner: _shoprankBannerCache,
        isGetbannerFinish: true,
        isLoading: 1,
        index: _index,
      });
    case REQUEST_INVENTORY_BY_IDS:
      return Object.assign({}, state, {
        isLoading: 0,
        isGetbannerFinish: false,
      });
    case RECEIVE_INVENTORY_BY_IDS:
      let _currentItems = [];
      action.object_list.map((elem,i) => {
        elem.pictures[0] = DtTools.dtImageTrans(elem.pictures[0], true, 200, 200, 'c');
        elem.uri = `/buy/item/detail/?id=${elem.id}&__urlopentype=pageweb&goodfrom=hotSingleGoods`;
        _currentItems.push(elem);
      });
      if(_shoprankBannerCache[ _index]){
        _shoprankBannerCache[ _index].goodsList.object_list= _currentItems;
        _shoprankBannerCache[ _index].goodsList.show = true;
        _shoprankBannerCache[ _index].goodsList.index = _index;
      }
      if(_shoprankBanner.length >_index){
          _index++;
          _shoprankBannerCache[ _index] = _shoprankBanner[ _index];
      }
      return  Object.assign({}, state, {
        ShoprankBanner: _shoprankBannerCache,
        isGetbannerFinish: false,
        isLoading: _shoprankBanner.length >_index? 1: 0,
        index: _index,
      });
    default:
      return state;
  }
}