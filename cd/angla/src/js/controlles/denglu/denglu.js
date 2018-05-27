(function() {
  var app = angular.module("controllers");
  app.controller('conpl', ['$log', "$scope", "$location", "datahttp", "$rootScope", "$window","Dataservice", conpl]);

  function conpl($log, $scope, $location, datahttp, $rootScope, $window,Dataservice) {
    $log.debug("conpl");
    $scope.$on("$destroy", function() {
      $log.debug("销毁控制器");
    });

    $scope.data = {};
    $rootScope.name = {};


    $scope.denglu = function() {
      Dataservice.wadlklog("正在登录中");
      datahttp.data("/data/Tbuse/queryo", $scope.data, function(err, data) {
        Dataservice.hidewardialog();
        if (err) {
          Dataservice.setdialog("服务器正忙");
          return;
        }
        if (data.success) {
          Dataservice.setdialog("登录成功");
          $rootScope.name=data.dataMap.tbuser;
          $location.path("/yemian");
          return;
        }else{
          Dataservice.setdialog(data.message);
        }
        
      });
    };


    $scope.plo = function() {
      $scope.data = {};
    };

  }
})();