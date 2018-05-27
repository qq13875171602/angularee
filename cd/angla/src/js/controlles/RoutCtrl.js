(function () {
  var app=angular.module("controllers");
  app.controller('routrol', ['$log','$scope','$routeParams', routrol]);
  
  function routrol($log,$scope,$routeParams) {
     $log.debug("routrol...");

     $scope.$on("$destroy",function () {
         $log.debug("控制器销毁");
     });

     var key="path/";
     var user="user/";
     var html=".html";

     $scope.init=function () {
         var paths=$routeParams.path().replace(key,"");//$routeParams.path()获取路径参数然后替换成我自己定义的路径
         $log.debug("paths",paths);
         $scope.temple=user + key + html +"?pagetime" +new Date().getTime();
         $log.debug("routrol temple",$scope.temple);
     };

     $scope.init();
  }
  
})();