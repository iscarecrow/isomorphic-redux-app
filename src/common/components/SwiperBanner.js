// import React, { PropTypes, Component } from 'react';

// import Swiper from 'swiper';

// import $ from 'jquery';


// export default class SwiperBanner extends React.Component {
//   constructor(props) {
//     super(props);
//     this.flag = true;
//   }
//   componentDidMount(){
//     this._initSwiper();
//   }
//   componentDidUpdate () {
//     this._initSwiper();
//   }
//   _initSwiper(){
//     if (this.props.data.object_list.length > 0 && this.flag) {
//       this.flag = false;
//       let swiper = new Swiper('.swiper-container'+ this.props.data.index, {
//         pagination : '.swiper-pagination',
//         lazyLoading : true,
//         onInit: function(swiper){
//           $('.swiper-pagination').show();
//         }
//       });
//     }
//   }
//   render() {

//     const { data } = this.props;
//     let Lists = data.object_list.map((item,i) =>
//       <a href={item.target? item.target : 'javascript:void(0)'} data-background={item.image_url} className="swiper-lazy swiper-slide" key={i}>
//         <div className="backend">
//           <div className="swiper-container-text">
//             {item.stitle?<h3>
//               <div className="swiper-container-h3-group clr">
//                 <div className="swiper-container-h3-line l"></div>
//                 <div className="swiper-container-h3-text l">{item.stitle}</div>
//                 <div className="swiper-container-h3-line l"></div>
//               </div>
//             </h3>:null}
//             <h2>{item.description}</h2>
//           </div>
//         </div>
//       </a>
//     )
//     let uniqueSwiper="swiper-container"+data.index+" swiper-container";
//     return(
//       <section className="swiper-banners">
//         <div className={uniqueSwiper}>
//           <div className="swiper-wrapper">
//             {Lists}
//           </div>
//           {Lists.length >1 ? <div className="swiper-pagination"></div>: null}
//         </div>
//       </section>
//     )
//   }
// }