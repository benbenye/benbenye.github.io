---
title: TODO-2：浏览器唤醒APP
date: 2016-09-13 16:09
---


``` javascript

(function() {
  var UA = navigator.userAgent;
  var isIPad = (UA.match(/(iPad).*OS\s([\d_]+)/)) ? true: false;
  var isIPhone = (!isIPad && UA.match(/(iPhone\sOS)\s([\d_]+)/)) ? true: false;
  var isSafari = (isIPhone || isIPad) && UA.match(/Safari/);
  var SafariVersion = 0;
  isSafari && (SafariVersion = UA.match(/Version\/([\d\.]+)/));
  SafariVersion = parseFloat(SafariVersion[1], 10);
  var isWeixin = navigator.userAgent.indexOf("MicroMessenger") >= 0;
  var j = false;
  var s = "plugIn_downloadAppPlugIn_loadIframe";
  var t = false;
  var D = {};
  var query = null;
  var J = {};
  var isQuery = window.Zepto || window.jQuery ? true: false;
  var timerAry = [];

  function bindEvent(P, O, N) {
    if (isQuery) {
      query("#" + P).bind(O, N)
    } else {
      query("#" + P).addEventListener(O, N, !1)
    }
  }
  if (isQuery) {
    query = window.$;
    J = window.$
  } else {
    query = function(N) {
      if (typeof N == "object") {
        return N
      }
      return document.querySelector(N)
    };
    if (!window.$) {
      window.$ = J = query
    } else {
      J = window.$
    }
  }
  window.onblur = function() {
    for (var N = 0; N < timerAry.length; N++) {
      clearTimeout(timerAry[N])
    }
  };
  function getCookieByName(P) {
    var O = document.cookie.indexOf(P + "=");
    if (O == -1) {
      return ""
    }
    O = O + P.length + 1;
    var N = document.cookie.indexOf(";", O);
    if (N == -1) {
      N = document.cookie.length
    }
    return document.cookie.substring(O, N)
  }
  function setCookie(P, R, N, S, Q) {
    var T = P + "=" + escape(R);
    if (N != "") {
      var O = new Date();
      O.setTime(O.getTime() + N * 24 * 3600 * 1000);
      T += ";expires=" + O.toGMTString()
    }
    if (S != "") {
      T += ";path=" + S
    }
    if (Q != "") {
      T += ";domain=" + Q
    }
    document.cookie = T
  }
  function merageConfig(N) {
    var P = {
      downAppURl: "http://static.chunboimg.com/app/"+$('#andriod_app_download_version').val() || "ChunBoMall_2.5.2.apk",
      downAppIos: "https://itunes.apple.com/us/app/chun-bo/id967139095?mt=8",
      downWeixin: "http://www.chunbo.com/app/check_app_source",
      downIpad: "https://itunes.apple.com/us/app/chun-bo/id967139095?mt=8",
      inteneUrl: "chunbo://chunbo/startApp",
      inteneUrlParams: null,
      inteneUrlPage: 3,
      openAppBtnId: "",
      closePanelBtnId: "",
      closePanelId: "",
      closeCallblack: null,
      closeCallblackSource: null,
      cookieFlag: null,
      noRecord: false,
      sourceType: "JSHOP_SOURCE_TYPE",
      sourceValue: "JSHOP_SOURCE_VALUE",
      openAppEventId: "MDownLoadFloat_OpenNow",
      closePanelEventId: "MDownLoadFloat_Close"
    };
    if (N) {
      for (var O in N) {
        if (O && N[O]) {
          P[O] = N[O]
        }
      }
    }
    return P
  }

  function getSchemaUrlWithParams(P) {
    var Y = [];
    var S = P.inteneUrlParams;
    var ParamsStr = "";

    if (S && !S.sourceType && !S.sourceValue) {
      S.sourceType = P.sourceType;
      S.sourceValue = P.sourceValue
    }
    if (S) {
      for (var X in S) {
        if (X && S[X]) {
          Y.push('"' + X + '":"' + S[X] + '"')
        }
      }
    }
//            不调用默认参数,只有传参里面有值才添加到params
    if (Y.length) {
      var O = "{" + Y.join(",") + "}";
      ParamsStr = "&params=" + O
    }

    return (P.inteneUrl + "?page=" + P.inteneUrlPage + ParamsStr)
  }
  function tryOpenApp(P, N) {
    var T = getSchemaUrlWithParams(P);
    var Q = null;
    if (isWeixin) {
      var O = null;
      if (j) {
        O = T
      } else {
        O = P.downWeixin
      }
      location.href = O;
      return
    }
    if (isIPad) {
      Q = P.downIpad
    } else {
      if (isIPhone) {
        Q = P.downAppIos
      } else {
        Q = P.downAppURl
      }
    }
    if (isSafari && SafariVersion >= 9) {
      setTimeout(function() {
          var U = document.createElement("a");
          U.setAttribute("href", T),
            U.style.display = "none",
            document.body.appendChild(U);
          var V = document.createEvent("HTMLEvents");
          V.initEvent("click", !1, !1),
            U.dispatchEvent(V)
        },
        0)
    } else {
      document.querySelector("#" + s).src = T
    }
    var R = Date.now();
    setTimeout(function() {
        if (N) {
          var U = setTimeout(function() {
              openFailTryOpen(R, Q)
            },
            1500);
          timerAry.push(U)
        }
      },
      100)
  }
  function openFailTryOpen(P, O) {
    var N = Date.now();
    if (P && (N - P) < (1500 + 200)) {
      window.location.href = O
    }
  }

  function bindOpenBtnClick(N) {
    if (N.openAppBtnId) {
      D[N.openAppBtnId] = N;
//                I(N.openAppBtnId, N.openAppEventId);
      bindEvent(N.openAppBtnId, "click",
        function() {
          var R = this.getAttribute("id");
          var O = D[R];
          if (!t) {
            var P = document.createElement("iframe");
            P.id = s;
            document.body.appendChild(P);
            document.getElementById(s).style.display = "none";
            document.getElementById(s).style.width = "0px";
            document.getElementById(s).style.height = "0px";
            t = true
          }
          var Q = O.cookieFlag ? "downloadAppPlugIn_downCloseDate_" + O.cookieFlag: "downloadAppPlugIn_downCloseDate";
          setCookie(Q, Date.now() + "_2592000000", 1, "/", ".chunbo.com");
          tryOpenApp(O, true)
        })
    }
  }
  function bindCloseBtnClick (O) {
    if (O.closePanelBtnId && O.closePanelId) {
      D[O.closePanelBtnId] = O;
//                I(O.closePanelBtnId, O.closePanelEventId);
      var S = O.cookieFlag ? "downloadAppPlugIn_downCloseDate_" + O.cookieFlag: "downloadAppPlugIn_downCloseDate";
      var Q = getCookieByName(S);
      var R = null;
      if (Q) {
        R = Q.split("_");
        if (R.length == 2) {
          R[0] = parseInt(R[0], 10);
          R[1] = parseInt(R[1], 10)
        } else {
          R = null
        }
      }
      var N = Date.now();
      if (!O.noRecord && R && R.length == 2 && (N - R[0]) < R[1]) {
        document.querySelector("#" + O.closePanelId).style.display = "none";
        if (O.closeCallblack) {
          var P = O.closeCallblackSource ? O.closeCallblackSource: null;
          O.closeCallblack.call(P)
        }
        return
      } else {
        document.querySelector("#" + O.closePanelId).style.display = "block"
      }
      bindEvent(O.closePanelBtnId, "click",
        function() {
          var W = this.getAttribute("id");
          var T = D[W];
          var V = T.cookieFlag ? "downloadAppPlugIn_downCloseDate_" + T.cookieFlag: "downloadAppPlugIn_downCloseDate";
          if (!T.noRecord) {
            setCookie(V, Date.now() + "_259200000", 1, "/", ".chunbo.com");
          }
          document.querySelector("#" + T.closePanelId).style.display = "none";
          if (T.closeCallblack) {
            var U = T.closeCallblackSource ? T.closeCallblackSource: null;
            T.closeCallblack.call(U)
          }
        })
    }
  }


  function E(N) {
    var config = merageConfig(N);
    bindOpenBtnClick(config);
    bindCloseBtnClick (config)
  }
  J.downloadAppPlugIn = E;
})();
```
