import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as fetchInventoryByIdsActions from '../actions/fetchInventoryByIds';
import fetch from '../lib/isomorphic-fetch';
import DtTools from '../utils/dtTools';
import * as api from '../constants/ApiServer';
// import SwiperBanner from '../components/SwiperBanner';
import NewSingleGoodsItem from '../components/NewSingleGoodsItem';

if ( 'undefined' !== typeof window ) {
  require('../utils/dtSdk');
}

class NewSingleGoods extends Component {
  constructor(props) {
    super(props);
    this.itemList = [];
  }
  componentDidMount () {
    console.log(DtSdk.VERSION);
    this._loadBannerFromServer();

    DtSdk.ready(() => {
    //   SetNavigationShoppingCar();
      DtSdk.titleChange({'title': '每日上新'});
    });
  }
  _loadBannerFromServer() {
    // 获取banner数据
    let _data = {ad_id: 'COM015',limit: 30};
    const url = DtTools.dtUriTrans(api.bannerUri, _data);
    fetch(url)
      .then(response => response.json())
      .then(json => {
        if( json.data.object_list.length > 0){
          this.itemList = json.data.object_list;
          this._loadALLcategoryFromServer(json.data.object_list,0);
        }
    });
  }
  _loadALLcategoryFromServer(data, i) {
    const { fetchInventoryByIds } = this.props;
    let elem = data[i] || {};
    fetchInventoryByIds(elem.tag_title, elem);
  }
  _loadMoreItems() {
    const { NewSingleGoodsData } = this.props;
    this._loadALLcategoryFromServer(this.itemList,NewSingleGoodsData.index);
  }
  _renderWaypoint() {
    const { NewSingleGoodsData } = this.props;
    if (this.itemList.length > 0 && this.itemList.length > NewSingleGoodsData.index) {
      return (
        <Waypoint onEnter={() => this._loadMoreItems()}
          threshold={2.0} />
      );
    }
  }
  render() {
    const { NewSingleGoodsData } = this.props;
    let Lists = NewSingleGoodsData.object_list.map((item,i) =>
      <li className="cp-nsgoods-item" key={i}>
        <div className="pg-new-single-goods">
          <div className="pg-new-single-goods-time">{item.addTime.year}年{item.addTime.mouth}月{item.addTime.date}日 {item.addTime.day}</div>
          {item.bannerData.object_list.length<0 ? <SwiperBanner data={item.bannerData}/> : null}
          <div className="blackTop"></div>
          <NewSingleGoodsItem data={item.goodsData}/>
        </div>
      </li>
    )

    return (
      <section>
        <ul>
          {Lists}
        </ul>
      </section>
    )
  }
}

NewSingleGoods.propTypes  = {
  NewSingleGoodsData: PropTypes.object.isRequired,
  fetchInventoryByIds: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    NewSingleGoodsData: state.NewSingleGoodsData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(fetchInventoryByIdsActions, dispatch)
}


export default connect(mapStateToProps,mapDispatchToProps)(NewSingleGoods);