(function (win) {
  var app = angular.module("myapp", ["ngRoute","ngCookies","controllers","directives","services"]);
  angular.module("controllers",[]);
  angular.module("directives",[]);
  angular.module("services",[]);
  app.config(['$logProvider',function($logProvider) {
    $logProvider.debugEnabled(true);
  }]);

  app.config(['$httpProvider',function($httpProvider) {
    $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
 var parseParams = function(params) { // 参数处理
     var query = "",
       name, value, fullSubName, subName, subValue, innerObj, i;
    for (name in params) {
      value = params[name];
     if (value instanceof Array) {
         for (i = 0; i < value.length; i++) {
          subValue = value[i];
           fullSubName = name + "[" + i + "]";
            innerObj = {};
           innerObj[fullSubName] = subValue;
            query += parseParams(innerObj) + "&";
         }
       } else if (value instanceof Object) {
          for (subName in value) {
           subValue = value[subName];
            fullSubName = name + "." + subName;
          innerObj = {};
           innerObj[fullSubName] = subValue;
            query += parseParams(innerObj) + "&";
          }
        } else if (value !== undefined && value !== null) {
          query += encodeURIComponent(name) + "=" + encodeURIComponent(value) + "&";
       }
      }
      var querydata = query.length ? query.substr(0, query.length - 1) : query;
      return querydata;
    };

    $httpProvider.defaults.transformRequest = [function(data) {
      var formdata = angular.isObject(data) && String(data) !== "[object File]" ? parseParams(data) : data;
      return formdata;
    }];

  }]);

  app.config(['$routeProvider',function($routeProvider) {
    $routeProvider.when("/",{
      redirectTo:"html/user/user.html"
    }).when("/admin",{
      templateUrl:"html/user/admin/admin.html"
    }).when("/zhuce",{
      templateUrl:"html/user/zhuce/zhuce.html"
    }).when("/denglu",{
      templateUrl:"html/user/denglu/denglu.html"
    }).when("/yemian",{
      templateUrl:"html/user/houtai/yemian.html"
    }).when("/bokeTypeAdd",{
      templateUrl:"html/user/houtai/bokeTypeAdd.html"
    }).when("/book",{
      templateUrl:"html/user/houtai/book.html"
    }).when("/index.debug",{
      templateUrl:"/index.debug.html"
    }).otherwise({
      templateUrl:"html/user/user.html"
    });
  }]);


})(window);