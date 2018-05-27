(function () {
  var app=angular.module("controllers");

  app.controller("mask",["$log","$scope","Dataservice","datahttp",mask]);

  function mask($log,$scope,Dataservice,datahttp) {
     $log.debug("controllers.mask");
     $scope.$on("$destroy",function () {
        $log.debug("控制器销毁");
     });

     $scope.add=function () {
       Dataservice.wadlklog("正在加载中");
         datahttp.data("/QianAdd/Index",$scope.vb,function (err,data) {
           Dataservice.hidewardialog();
           if(err)
           {
              Dataservice.setdialog("添加失败");
              return;
           }
           if(data.Souse)
           {
              Dataservice.setdialog("添加成功",function () {
                  
              });
           }
         });
     };
  }
})();