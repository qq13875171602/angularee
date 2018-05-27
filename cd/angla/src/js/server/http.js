(function() {
  var app = angular.module("services");
  app.factory('datahttp', ['$log', "$http", "$cookies", "$window", datahttp]);

  function datahttp($log, $http, $cookies, $window) {
    var url = {};
    var data = {};
    var servers = ["http://localhost:1050", "http://120.77.205.162:11000", "http://127.0.0.1:11000"];

    var token = {};
    var token_key = {}; //本地贮存

    var service = {};
    service.data = function(url, dataq, cb) {
      token = $cookies.get("token_key"); //获取本地储存数据
      if (!token) {
        token = "";
      }
      dataq.seiiontoken = token;
      dataq.ajaxtimestamp = new Date().getTime();
      $log.debug("http service===>", servers[2] + url);
      $http({
        method: "POST",
        url: servers[0] + url,
        data: dataq
      }).then(function(data) {
        $log.debug("正确信息", data.data);
        $cookies.put("token_key", data.data.seiiontoken);
        (cb || angular.noop)(null, data.data);
      }, function(data) {
        $log.debug("错误信息", data);
        (cb || angular.noop)(data, null);
      });
    };

    var weeks = ["星期六", "星期一", "星期二", "星期三", "星期四", "星期五", "星期天"];

    service.time = function(datemj, formart) {
      var data = new Date();
      if (datemj) {
        data.setTime(datemj);
      }
      if (!formart) {
        formart("y-m-d");
      }

      var year = data.getFullYear();
      var mouth = data.getMonth() + 1;
      var day = data.getDate();
      var hous = data.getHours();
      var minus = data.getMinutes();
      var serop = data.getSeconds();
      var week = data.getDay();

      mouth = mouth < 10 ? "0" + mouth : "" + mouth;
      day = day < 10 ? "0" + day : "" + day;
      hous = hous < 10 ? "0" + hous : "" + hous;
      minus = minus < 10 ? "0" + minus : "" + minus;
      serop = serop < 10 ? "0" + serop : "" + serop;
      week = weeks[week];

      var reast = formart.replace("y", year);
      reast = reast.replace("m", mouth);
      reast = reast.replace("d", day);
      reast = reast.replace("h", hous);
      reast = reast.replace("i", minus);
      reast = reast.replace("s", serop);
      reast = reast.replace("w", week);
      return reast;
    };


    service.logint = function(user) {
      $window.localStorage.user = JSON.stringify(user); //将javascript值转换为json
      $rootScope.login = user;
    };

    service.deletelogint = function() {
      delete $window.localStorage.user;
      delete $rootScope.login;
    };

    service.jiexi = function() {
      var wind = $window.localStorage.user;
      if (!wind) {
        return;
      }
      try {
        $rootScope.login = JSON.parse(wind); //解析字符串后才是你想要的字符
      } catch (e) {
        // statements
        console.log(e);
      }
    };


    return service;

  }

})();