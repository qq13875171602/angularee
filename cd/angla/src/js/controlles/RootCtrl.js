(function () {
   var app=angular.module("controllers");
   app.controller('rootctol', ['$log','$scope','$rootScope','datahttp',rootctol ]);

   function rootctol($log,$scope,$rootScope,datahttp) {
       $log.debug("rootctol.....",rootctol);
       datahttp.logint();
       $scope.$on("$destroy",function () {
            $log.debug("销毁控制器");
       });

       //监测页面切换
       $rootScope.$on("$routeChangeStart",function (event, next, current) {
            $log.debug("rout加载页面",next,"-",current,"-",event);
       });
       $rootScope.$on("$routeChangeSuccess",function (event, current, previous) {
            $log.debug("rout加载完毕",current,"-",previous,"-",event);
       });
       $rootScope.$on("$routeChangeError",function (event,current) {
            $log.debug("route加载错误",current,"-",event);
       });

   }

})();