let timeFormat = function(timeStr) {
  timeStr = timeStr? timeStr.replace(/-/g, "/"): '';
  let _time = new Date(timeStr);
  let day = _time.getDay();
  switch(day){
    case 1: day = "星期一"; break;
    case 2: day = "星期二"; break;
    case 3: day = "星期三"; break;
    case 4: day = "星期四"; break;
    case 5: day = "星期五"; break;
    case 6: day = "星期六"; break;
    case 0: day = "星期日"; break;
  }
  return {
    'day': day,
    'year': _time.getFullYear(),
    'mouth': _time.getMonth()+1,
    'date': _time.getDate(),
  } 
}

export default timeFormat;