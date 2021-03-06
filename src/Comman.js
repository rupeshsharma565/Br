import swal from 'sweetalert';
import DateDiff from 'date-diff';
import dateFormat from 'dateformat';
import config from './config';
import { resolve } from 'url';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const endtimeinsecond = 0;

export const HBRout = "/#";

export const dashboardpage = HBRout + "/matches";

export const checkresponse = (title, status, message, messgshow) => {
  if (status === 401 || status === 403) {
    //return window.location.href = HBRout + '/suprt';
  }
  if (status === 500) {
    return "";
  }
  else if (messgshow === 1) {
    swal({
      title: title,
      text: message,
      icon: "success",
      className: "swall-custom-class"
    });
  }
  else if (messgshow === 0) {
    swal({
      title: title + "!",
      text: (message) ? message : "Something went wrong",
      icon: "error",
      className: "swall-custom-class"
    });
  }
  else if (messgshow === 3) {
    swal({
      title: title + "!",
      text: (message) ? message : "Something went wrong",
      icon: "warning",
      className: "swall-custom-class"
    });
  }
  else {
    return true;
  }


  // if(status!==200)
  // {
  //   swal({
  //     title: "Wrong!",
  //     text: (message)?message:"Something went wrong",
  //     icon: "error",
  //   });
  // }
}

export const validation = {
  username: '^[0-9]+$',
  email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/,
  name: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
  address: /^[a-zA-Z0-9\s,.'-]{1,}$/,
  percentage: /(?!^0*$)(?!^0*\.0*$)^\d{1,2}(\.\d{1,2})?$/,
  averagenumber: '^[0-9]{1}+$',
  password: /^.*(?=.{8,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/,
  mobile10verify: /[0-9]/g,
  phneEmailid: /^((([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))|([0-9]{9,}))\w+$/,
  pancard: /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
  ifsc: /^[A-Za-z]{4}\d{7}$/
};


export const converttosecond = (matchdate) => {

  var date1 = new Date(matchdate); // 2015-12-1
  var date2 = new Date(); // 2014-01-1

  var diff = new DateDiff(date1, date2);
  return diff.seconds();
}

export const secondsToTime = (secs) => {
  let hours = Math.floor(secs / (60 * 60));

  let divisor_for_minutes = secs % (60 * 60);
  let minutes = Math.floor(divisor_for_minutes / 60);

  let divisor_for_seconds = divisor_for_minutes % 60;
  let seconds = Math.ceil(divisor_for_seconds);

  let obj = {
    "h": hours,
    "m": minutes,
    "s": seconds
  };
  return obj;
}

export const timestampToDate = (timestamp) => {
  if (timestamp) {
    let intdate = parseInt(timestamp) * 1000;
    let fulldate = new Date(intdate);
    return dateFormat(fulldate, "yyyy-mm-dd")
  }
  else {
    return "";
  }
}

export const timestampToDateTime_old = (timestamp) => {
  if (timestamp) {
    let intdate = parseFloat(timestamp) * 1000;
    let fulldate = new Date(intdate).toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    return dateFormat(fulldate, "yyyy-mm-dd hh:mm:ss");
  }
  else {
    return "";
  }
}

export const timestampToDateTime = (timestamps) => {

  var u = new Date(timestamps * 1000);
  var month = u.getMonth();
  month = month + 1;
  return u.getFullYear() +
    '-' + ('0' + month).slice(-2) +
    '-' + ('0' + u.getDate()).slice(-2) +
    ' ' + ('0' + u.getHours()).slice(-2) +
    ':' + ('0' + u.getMinutes()).slice(-2) +
    ':' + ('0' + u.getSeconds()).slice(-2)
}

export const goBack = () => {
  //console.log("window.history--->>>", window.history);
  window.history.back();
}

export const sendHome = () => {
  window.location.href = HBRout + '/home';
}

export const sessioncheck = () => {
  if (sessionStorage.getItem('jwt')) {
    return true;
  }
  else {
    //window.location.href =HBRout+'/login';
    return false;
  }
}

export const upcomingmatchs = {
  "tab1": { name: "Fixtures", key: "fixtures" },
  "tab2": { name: "Live", key: "live" },
  "tab3": { name: "Results", key: "results" }
}

export const mymatchs = {
  "tab1": { name: "Fixtures", key: "fixtures" },
  "tab2": { name: "Live", key: "live" },
  "tab3": { name: "Results", key: "results" }
}

//export const PAYTM_TXN_URL = 'https://securegw-stage.paytm.in/theia/processTransaction';
export const PAYTM_TXN_URL = 'https://securegw.paytm.in/theia/processTransaction';


export const getCurrentTime = () => {
  return new Promise(function (resolve, reject) {
    let formthis = this;
    var object = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }

    var api_url = `${config.API_URL}`;
    var apiUrl = "";
    apiUrl = api_url + "/gettime";

    fetch(apiUrl, object)
      .then(function (response) {
        response.json().then(json => {
          let datetime = json.data.time;
          let intdate = parseInt(datetime) * 1000;
          resolve(intdate);
        })
      })
  })
}

export const converttosecondnew = (matchdate, currentdatetime) => {

  var date1 = new Date(matchdate); // 
  var date2 = new Date(currentdatetime); // current datetime

  var diff = new DateDiff(date1, date2);
  let lasttime = diff.seconds() - endtimeinsecond;
  return lasttime;
}


export const pointsname = {
  "playing": "Playing 11",
  "run": "Run",
  "four": "Boundary Bonus",
  "six": "Six Bonus",
  "fifty": "Half-century Bonus",
  "hundred": "Century Bonus",
  "wicket": "Wicket",
  "fourwhb": "4 wicket haul Bonus",
  "fivewhb": "5 wicket haul Bonus ",
  "mdnover": "Maiden over",
  "catch": "Catch",
  "stumped": "Stumping",
  "runout": "Run-out(Direct)",
  "duck": "Duck",
  "thrower": "Thrower",
  "catcher": "Catcher",
  "srone": "Between 60-70 runs per 100 balls",
  "srtwo": "Between 50-59.9 runs per 100 balls",
  "srthree": "Below 50 runs per 100 balls",
  "erone": "Below 4 runs per over",
  "ertwo": "Between 4-4.99 runs per over",
  "erthree": "Between 5-6 runs per over",
  "erfour": "Between 9-10 runs per over",
  "erfive": "Between 10.1-11 runs per over",
  "ersix": "Above 11 runs per over",
  "srmball": "SR min balls",
  "ermover": "ER min over",
}


export const getConvertoWord = (snumber) => {
  let winnumber = "";
  if (snumber) {
    let inumber = parseInt(snumber);
    let sinumber = inumber.toString();

    let lablerupee = "";
    if (sinumber.length == 6 || sinumber.length == 7) {
      lablerupee = " Lac";
    }
    if (sinumber.length > 7) {
      lablerupee = " Cr";
    }

    if (sinumber.length >= 6 && sinumber.length <= 8) {
      if (sinumber.length % 2 === 0) {
        let kk = sinumber.substring(0, 2);
        winnumber = parseInt(kk) / 10 + lablerupee;
      }
      else {
        let kk = sinumber.substring(0, 3);
        winnumber = parseInt(kk) / 10 + lablerupee;
      }
    }
    else if (sinumber.length > 8) {

      let kk = sinumber.substring(0, sinumber.length - 6);
      winnumber = parseInt(kk) / 10 + lablerupee;
    }
    else {
      winnumber = sinumber;
    }
    return (winnumber);
  }
  else {
    winnumber = "0";
    return (winnumber);
  }

}

export const matchFormatTypes = (type) => {
  let matchtypes = {
    "t10": "T10",
    "t20": "T20",
    "test": "Test",
    "one-day": "ODI",
    "ODI": "ODI",
    "kabaddi": "Kabaddi",
  }
  return (type && matchtypes[type]) ? matchtypes[type] : "";
}

export const matchStatusTypes = (type = null) => {
  let types = {
    "uc": "Upcomming",
    "dc": "Completed",
    "cm": "Under Review",
    "cl": "Canceled"
  }
  return type != null ? types[type] : types;
}

export const taxRegulation = {
  "tax": "31.2",
  "amount": "10,000"
}

export const unCamelCase = (str = null) => {
  return str
    // insert a space between lower & upper
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    // space before last upper in a sequence followed by lower
    .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
    // uppercase the first character
    .replace(/^./, function (str) { return str.toUpperCase(); })
}
/*
* 1 = cricket,
* 2 = football
* 3 = kabaddi
*/
export const playerPointKeyConst = {
  "1": {
    "playername": "Player Name",
    "playeingPoints": "Playing Points",
    "run": "Runs",
    "four": "4's",
    "six": "6's",
    "wicket": "Wickets",
    "mdnover": "Maiden Overs",
    "catch": "Catch",
    "thrower": "Thrower",
    "catcher": "Catcher",
    "stumped": "Stumped",
    "runout": "Run Out",
    "fiftyBonus": "50's Bonus",
    "hundredBonus": "100's Bonus",
    "fourwhb": "4 Wkts",
    "fivewhb": "5 Wkts",
    "duck": "Duck",
    "srone": "Between 60-70 runs per 100 balls",
    "srtwo": "Between 50-59.9 runs per 100 balls",
    "srthree": "Below 50 runs per 100 balls",
    "erone": "Below 4 runs per over",
    "ertwo": "Between 4-4.99 runs per over",
    "erthree": "Between 5-6 runs per over",
    "erfour": "Between 9-10 runs per over",
    "erfive": "Between 10.1-11 runs per over",
    "ersix": "Above 11 runs per over",
    "er": "E/R",
    "sr": "S/R",
    "totalpoints": "Total Points"
  },
  "2": {
    "playername": "Player Name",
    "role": "Role",
    "playing": "Playing Points",
    "goal": "Goal",
    "assist": "Assist",
    "owngoal": "Own Goal",
    "goalsaved": "Shot saved",
    "goalsconceded": "Goals Conceded",
    "cleansheet": "Clean Sheet",
    "penaltysave": "Penalty Save",
    "yellowcard": "Yellow Card",
    "redcard": "Red Card",
    "penaltymissed": "Penalty Missed",
    "passes": "Passes",
    "tackles": "Tackles",
    "shotontarget": "Shot On Target",
    "totalpoints": "Total Points"
  },
  "3": {
    "playername": "Player Name",
    "playeingPoints": "Playing Points",
    "raidbonus": "Raid Bonus",
    "unsuccessraid": "Unsuccess Raid",
    "successtackle": "Success Tackle",
    "touch": "Touch",
    "supertackle": "Super Tackle",
    "redcard": "Red Card",
    "greencard": "Green Card",
    "yellowcard": "Yellow Card",
    "pushallout": "Push All Out",
    "getallout": "Get All Out",
    "totalpoints": "Total Points"
  }
}

export const overrideLoaderCss = "display: block;margin: 0 auto;border-color: red;";
export const loaderColorCode = "#ea4c89";
export const currentTimestamp = parseInt(Date.now() / 1000);

export const matchCountDown = (timestamp, elementID) => {
  //var deadline = new Date("Dec 5, 2019 23:37:25").getTime();
  var deadline = timestamp * 1000;
  var countdown = "00h 00m 00s";
  var x = setInterval(function () {
    var now = new Date().getTime();
    var t = deadline - now;
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((t % (1000 * 60)) / 1000);
    if (days != null && hours != null && minutes != null && seconds != null) {
      document.getElementById(elementID).innerHTML = days + "d "
        + hours + "h " + minutes + "m " + seconds + "s ";
    }
    if (t < 0) {
      clearInterval(x);
      document.getElementById(elementID).innerHTML = "00h 00h 00s";
    }

  }, 1000);
  return true;
}

export const OTP_TIMEOUT = 30;

export const timestampToDateString = (timestamp) => {
  let intdate = parseInt(timestamp) * 1000;
  const date = new Date(intdate);
  const formattedDate = date.toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  }).replace(/ /g, ' ');
  return formattedDate;
}

export const fantasyPointSystem = {
  "football": {
    "playfiftyfivemin": "Played 55 minutes or more",
    "playlessfiftyfive": "Played less than 55 minutes",
    "goalfor": "For every goal scored (Forward)",
    "goalmid": "For every goal scored (Midfielder)",
    "goalgk": "For every goal scored (GK)",
    "goaldef": "For every goal scored (Defender)",
    "assist": "For every assist",
    "passes": "For every 10 passes completed",
    "shotontarget": "For every 2 shots on target",
    "cleansheetmid": "Clean sheet (Midfielder)",
    "cleansheetgk": "Clean sheet (GK)",
    "cleansheetdef": "Clean sheet (Defender)",
    "goalsaved": "For every 3 shots saved(GK)",
    "penaltysavegk": "For every penalty saved (GK)",
    "tackles": "For every 3 successful tackles made",
    "yellowcard": "Yellow card",
    "redcard": "Red card",
    "owngoal": "For every own goal",
    "goalsconcededgk": "For every 2 goals conceded (GK)",
    "goalsconcededdef": "For every 2 goals conceded (Defender)",
    "penaltymissed": "For every penalty missed"
  },
  "kabaddi": {
    "playing": "In Starting 7",
    "touch": "For every successful raid touch point",
    "raidbonus": "Raid Bonus",
    "successtackle": "For every successful tackle",
    "unsuccessraid": "For every unsuccessful raid",
    "supertackle": "Super tackle",
    "pushallout": "Pushing all out (starting 7)",
    "getallout": "Getting all out (starting 7)",
    "greencard": "Green Card",
    "yellowcard": "Yellow Card",
    "redcard": "Red card",
    "makesubstitute": "Substitute appearance"
  }
}

export const priceOnPercent = (totalWinPrize = 0, percent = 0) => {
  let price = 0;
  price = parseFloat(totalWinPrize * percent) / 100;
  return price;
}

export const findObjectByKey = (nameKey, array) => {
  for (var i = 0; i < array.length; i++) {
    if (array[i].name === nameKey) {
      return array[i];
    }
  }
}

export const toastMessage = (status, msg) => {
  toast.dismiss();
  if (status === "success") {
    toast.success(msg, {
      position: toast.POSITION.TOP_LEFT
    });
  } else if (status === "error") {
    toast.error(msg, {
      position: toast.POSITION.TOP_LEFT
    });
  } else if (status === "warning") {
    toast.warn(msg, {
      position: toast.POSITION.TOP_LEFT
    });
  } else if (status === "info") {
    toast.info(msg, {
      position: toast.POSITION.TOP_LEFT
    });
  } else if (status === "") {
    toast(msg, {
      position: toast.POSITION.TOP_LEFT,
      className: 'foo-bar'
    });
  }

}

export const statusColorCode = (type = null) => {
  let types = {
    "uc": "#23282c",
    "dc": "#08c308",
    "cm": "#c7c70f",
    "cl": "#d21818"
  }
  return type != null ? types[type] : '#23282c';
}


export const securityCall = (swindow) => {
  if (swindow.location !== swindow.top.location) {
    swindow.top.location = swindow.location;
  }
}




