import React, { PropTypes, Component } from 'react';

export default class NewSingleGoodsItem extends React.Component {

  render() {

    const {data} = this.props;

    let Lists = data.map((item,i) =>
      <li className="cp-nsgoods-item DYlist" data-index={i} key={i}>

        <a className="cp-nsgoods-item-link" href={item.url}>
          <dl>
            <dt>
            {item.sale_stage == 2 ? <div className="cp-nsgoods-item-sale-out"><span>售罄</span></div>: null}
              <img src={item.pictures[0]} />
            </dt>
            <dd>
              <div className="cp-nsgoods-item-caption">{item.inventory_caption}</div>
              <div className="cp-nsgoods-item-title">{item.inventory_name}</div>
              <div className="cp-nsgoods-item-price-banner">
                <p className="cp-nsgoods-item-price l">
                  <strong>¥{item.sale_price}</strong>
                  <span  className="cp-nsgoods-item-market-price">¥{item.market_price}</span>
                  {item.flash_sale_desc ? <div  className="cp-nsgoods-item-sale-desc">{item.flash_sale_desc}</div>: null}
                </p>
              </div>
               {item.banner_title ? <div className="cp-nsgoods-item-banner-title">{item.banner_title}</div>: null}
            </dd>
          </dl>
        </a>
         <div className="blackBottom"></div>
      </li>
    )
    return(
      <section>
        <ul className="cp-new-single-goods">
          {Lists}
        </ul>
      </section>
    )
  }
}

NewSingleGoodsItem.propTypes = {
  data: PropTypes.array.isRequired
}