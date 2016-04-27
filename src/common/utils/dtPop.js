let DtPop = {

  popupMsg: function(msg) {

    let body = document.body;
    let popmask = document.getElementById('pop-center-mask');

    if(!popmask){
      popmask = document.createElement("div");
      popmask.setAttribute("id", "pop-center-mask");
      popmask.setAttribute("style","visibility: visible;position: fixed;top: 0px;left: 0px; width: 100%; height: 100%; display: block; opacity: 0; background-color: rgb(0, 0, 0); z-index: 999; ");
      body.appendChild(popmask);
    }

    let pop = document.getElementById('pop-center-msg');

    if(!pop){
      pop = document.createElement("div");
      pop.setAttribute("id", "pop-center-msg");
      pop.setAttribute("style"," transform: translate( -50% ,-50%); visibility: visible;  position: fixed; padding: 30px 40px;  border-radius: 8px; color: rgb(255, 255, 255); text-align: center; font-size: 1.4em; z-index: 999; display: block; height: auto; left: 50%; top: 50%; background-color: rgb(0, 0, 0);");
      body.appendChild(pop);
    }
    pop.innerHTML = msg;
  },
  popupClose: function(){
    let popmask = document.getElementById('pop-center-mask');
    let pop = document.getElementById('pop-center-msg');
    popmask.setAttribute("style", "display:none");
    pop.setAttribute("style", "display:none");
  }
}

export default DtPop;
