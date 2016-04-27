import fetch from '../lib/isomorphic-fetch';
import DtTools from '../utils/dtTools';
import DtPop from '../utils/dtPop';
import param from '../utils/param';
import DtPlatform from '../utils/dtPlatform';
// import DtSdk from '../utils/dtSdk';
import isPlainObject from '../utils/isPlainObject';

let DtFetch = function(payload) {
  let buyGlobalConfig = 'http://www.duitang.com';
  let ishttp = new RegExp("^(http|https)://", "i");
  // https走 htpps， 否则走相对域名
  let domain = (buyGlobalConfig.buySchema === 'https') ? buyGlobalConfig.buySchema +'://' + buyGlobalConfig.buyDomain : '';
  let settingsUrl = ishttp.test(payload.url) ? payload.url : domain + payload.url;

  if (DtPlatform.isDuiTang() && DtPlatform.sdkVersion() >= 0.7) {
    let _url = ishttp.test(settingsUrl) ? settingsUrl : (buyGlobalConfig.buySchema +'://' + buyGlobalConfig.buyDomain + settingsUrl);
    let type = payload.type || 'GET';
    let data = payload.data || {};

    // return new Promise(function(resolve, reject) {
    //   DtSdk.ready(function(){
    //     DtSdk.httpRequest({
    //       url : _url,
    //       method : type,
    //       params: data
    //     }, function(jsn){
    //       jsn = isPlainObject(jsn) ? jsn: JSON.parse(jsn);
    //       let json = jsn.data;
    //       resolve(json);
    //     });
    //   })
    // });

  } else {
    let data = {credentials: 'include'};
    let fulUrl;
    if (payload.type == undefined || payload.type === "GET") {
      // 绝对路径走绝对路径， 相对路径走后端配置路径
      fulUrl = DtTools.dtUriTrans(payload.url, payload.data);
      fulUrl = ishttp.test(fulUrl) ? fulUrl : domain + fulUrl;
    } else if ( payload.type === 'POST') {
      fulUrl = payload.url;
      // 绝对路径走绝对路径， 相对路径走后端配置路径
      fulUrl = ishttp.test(fulUrl) ? fulUrl : domain + fulUrl;
      data = {
        credentials: 'include',
        method: 'post',
        headers: {
          'Accept': 'application/json,text/plain, */*',
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        body: param(payload.data)
      }
    }

    return fetch(fulUrl, data)
     .then(response =>
      response.json().then(json => ({json, response})))
     .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      } else {
        if (json.status === 1) {
          return Promise.resolve(json)
        } else {
          let msg = json.message;
          if(msg){
            DtPop.popupMsg(msg);
            setTimeout(function(){
              DtPop.popupClose();
            },1500);
          }
        }
      }
    })
  }
};

export default DtFetch;