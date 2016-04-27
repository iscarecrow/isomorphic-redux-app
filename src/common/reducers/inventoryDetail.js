import  { REQUEST_INVENTORY_DETAIL, RECEIVE_INVENTORY_DETAIL, REQUEST_NOTICE,  RECEIVE_NOTICE,REQUEST_BLOGS,RECEIVE_BLOGS,REQUEST_USERS,RECEIVE_USERS,CHANGE_INVENTORY_COUNT,INIT_INVENTORY_COUNT,RECEIVE_INCREASE_CART_COUNT,REQUEST_INCREASE_CART_COUNT,SET_JOIN_CART,RECEIVE_TOTAL_CART,REQUEST_TOTAL_CART,RECEIVE_ORDER_WAVE,REQUEST_ORDER_WAVE,SET_WAVE_ORDER}    from '../constants/ActionTypes';
import DtTools from '../utils/dtTools';

const initialState = {
  GoodData:{showResults: false},
  SwiperData: [],
  NeedOtherInventoryData: false,
  NeedUserInfo: false,
  CommentData: {showResults:false},
  NoticeData:{showResults:false},
  WaveData: {},
};
function inventoryType(inventory_type) {
  switch (inventory_type) {
    case 1:
      return '市场价';
    case 2:
      return '国内价';
  }
}
// 计算处理折扣
function saleDiscount(n1,n2) {
  return  (n1/n2*10).toFixed(1);
}

// 计算商品运费
function calculateLogisticsPrice (logistics_price) {
  if(logistics_price === '¥0.00'){
    return '包邮';
  }else{
    return '邮费: '+logistics_price;
  }
}

// 计算商家运费
function calculateLogisticsThreshold (logistics_threshold) {
  if(logistics_threshold === 0){
    return '包邮';
  }else if(logistics_threshold === -1){
    return '';
  }else{
    return '满'+logistics_threshold + '元包邮';
  }
}

export default function InventoryDetailData(state = initialState, action={shopIndex:0}) {
  // 一个商店下的所有商品
  let inventories={};
  // 一个商品
  let item;
  // 一个商店的头部
  let titleData = {};
  let isAllItemChecked = true;
  let isAllShopChecked = true;
  switch (action.type) {
    case REQUEST_INVENTORY_DETAIL:
      return Object.assign({}, state, {
        inventoryDetail:{},
      });
    case RECEIVE_INVENTORY_DETAIL:
      let data = action.inventoryDetail;
      // 处理成swiper需要的数据结构
      let newSwiperData = {object_list:[]};
      data.pictures.map((elem,i)=> newSwiperData.object_list.push({'image_url':elem,'less_image_url':DtTools.dtImageTrans(elem, true, 600, 600, 'c')}));
      if(data.detail_desc_pics) data.detail_desc_pics.map((item,i)=> {data.detail_desc_pics[i] =  DtTools.dtImageTrans(item, true, 600, 0);});
      // 价格类型
      data.inventory_type = inventoryType(data.inventory_type);
      // 折扣
      data.sale_discount = saleDiscount(data.sale_price,data.market_price);
      // 商品邮费计算
      data.logistics_price = calculateLogisticsPrice(data.logistics_price);
      // 商店邮费计算
      // data.logistics_threshold = calculateLogisticsThreshold(data.logistics_threshold);
      if(data.inventory_attr && data.inventory_attr.indexOf('/n')>-1){
        data.inventory_attr = data.inventory_attr.split('/n');
      }else{
        data.inventory_attr = data.inventory_attr.split('\n');
      }
      if(data.recommend && data.recommend.indexOf('/r')>-1){
        data.recommend = data.recommend.split('/r');
      }else if(data.recommend === ""){
        data.recommend = [];
      }else if(data.recommend){
        data.recommend = data.recommend.split('\n');
      }
      if(data.banner_link){
        if(data.banner_link.indexOf('?') < 0){
          data.banner_link = data.banner_link+'?__urlopentype=pageweb';
        }else{
          data.banner_link = data.banner_link+'&__urlopentype=pageweb';
        }
      }else{
        data.banner_link = 'javascript:void(0);';
      }
      // 显示
      data.showResults = true;
      // let _blogIds = data.related_blogs.join(',') || '';
      // if (data.related_blogs.length > 0) this.loadCommentFromServer(_blogIds);
      // this.loadNoticeFromServer(data.delivery_type);
      state.GoodData = data,
      state.SwiperData = newSwiperData;
      state.NeedOtherInventoryData = true;
      return Object.assign({}, state);
    case REQUEST_NOTICE:
      state.NeedOtherInventoryData = false;
      return Object.assign({}, state);
    case RECEIVE_NOTICE:
      state.NoticeData = action.noticeData;
      state.NeedOtherInventoryData = false;
      return Object.assign({}, state);
    case REQUEST_BLOGS:
      state.NeedOtherInventoryData = false;
      return Object.assign({}, state);
    case RECEIVE_BLOGS:
      state.CommentData = action.CommentData;
      state.NeedOtherInventoryData = false;
      state.NeedUserInfo = true;
      return Object.assign({}, state);
    case REQUEST_USERS:
      state.NeedOtherInventoryData = false;
      state.NeedUserInfo = false;
      return Object.assign({}, state);
    case RECEIVE_USERS:
      state.CommentData.map((blog, i) => {
        action.UsersData.map((user, j) => {
          if(user.id === blog.sender_id){
            //若user.identity[0]以_certify为结尾，则为达人，需要加V
            if(user.identity[0].indexOf('_certify')>=0){
              user.passIdentity = true;
            }else{
              user.passIdentity = false;
            }
            blog.passIdentity = user.passIdentity;
            blog.username = user.username;
            blog.identity_info = user.identity_info;
            if(user.avatar) user.avatar =  DtTools.dtImageTrans(user.avatar, true, 100, 100, 'c');
            blog.avatar = user.avatar;
            blog.url = `duitang://www.duitang.com/blog/detail/?id=${blog.id}`;
          }
        })
      })
      state.NeedOtherInventoryData = false;
      state.NeedUserInfo = false;
      state.CommentData.showResults = true;
      return Object.assign({}, state);
    case CHANGE_INVENTORY_COUNT:
      let _changeNum = action.changeNum;
      let _num = action.oldCount;
      let _buy_limit = state.GoodData.buy_limit;
       if(_changeNum === 1){
          _num >= _buy_limit ? _buy_limit : _num++;
        }else if(_changeNum === -1){
           _num <= 1 ? 1 : _num--;
        }
      state.GoodData.inventory_count = _num;
      return Object.assign({}, state);
    case INIT_INVENTORY_COUNT:
      state.GoodData.inventory_count = 1;
      return Object.assign({}, state);
    case REQUEST_INCREASE_CART_COUNT:
      return Object.assign({}, state);
    case RECEIVE_INCREASE_CART_COUNT:
      state.GoodData.cart_count = action.cartCount;
      state.IsJoinCart = true;
      return Object.assign({}, state);
    case SET_JOIN_CART:
      state.IsJoinCart = action.bool;
      return Object.assign({}, state);
    case RECEIVE_TOTAL_CART:
      state.GoodData.cart_count = action.totalCart;
      return Object.assign({}, state);
    case REQUEST_TOTAL_CART:
      return Object.assign({}, state);
     case REQUEST_ORDER_WAVE:
      return Object.assign({}, state);
    case RECEIVE_ORDER_WAVE:
      state.WaveData = action.data;
      state.needTowave = true;
      return Object.assign({}, state);
    case SET_WAVE_ORDER:
      state.needTowave = action.bool;
      return Object.assign({}, state);
    default:
      return state;
   };

}