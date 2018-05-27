(function() {
  var app = angular.module("controllers");
  app.controller("denglu", ["$log", "$scope", "Dataservice", denglu]);

  function denglu($log, $scope, Dataservice) {
    $log.debug("controllers.denglu");
    $scope.$on("$destroy", function() {
      $log.debug("denglu,销毁控制台");
    });

    $scope.add = function() {
      Dataservice.showCustomDialog("/html/user/qiantai/denglu.html");
    };


    $scope.zhuce = function() {
      Dataservice.showCustomDialog("/html/user/qiantai/zhuce.html");
    };

  }

})();