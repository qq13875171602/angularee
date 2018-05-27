(function () {
   var app=angular.module("controllers");

   app.controller('tuichu', ['$scope','$log','$location','datahttp',"Dataservice", tuichu]);
   function tuichu($scope,$log,$location,datahttp) {
       $log.debug("tuichu...");
       $scope.$on("$destroy",function () {
           $log.debug("销毁控制器");
       });
       
       $scope.close=function () {
           Dataservice.setdialog("正在退出中");
           datahttp.deletelogint();
           datahttp.data("/denglu/Index",{},function (err,data) {
               Dataservice.hidedialog();
               $location.path("/denglu.html");
           });
       };

   }
})();