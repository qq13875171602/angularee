(function() {
  var app = angular.module("controllers");
  app.controller("dengl", ["$log", "$scope","Dataservice", "datahttp", dengl]);

  function dengl($log, $scope, Dataservice, datahttp) {
    $log.debug("controller.dengl");
    $scope.$on("$destroy", function() {
      $log.debug("销毁控制器");
    });

    $scope.po = {};

    $scope.deng = function() {
      Dataservice.wadlklog("正在登录中");
      datahttp.data("/data/Tbuse/queryo", $scope.po, function(err, data) {
        Dataservice.hidewardialog();
        if (err) {
          Dataservice.setdialog("登录失败");
          return;
        }
        if (data.success) {
          Dataservice.setdialog("登录成功", function() {
            Dataservice.hideCustomDialog();
          });
        } else {
          Dataservice.setdialog(data.message);
        }

      });
    };

    $scope.chongzi = function() {
      $scope.po = {};
    };


  }
})();