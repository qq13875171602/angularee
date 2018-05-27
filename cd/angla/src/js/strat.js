(function () {
  angular.element(document).ready(function () {
    var app=angular.module("myapp");
    app.run(["$rootScope","$log",function ($rootScope,$log) {
        $log.info("测试模块");
        $rootScope.title="网站项目";
    }]);

    angular.bootstrap(document,["myapp"]);

  });
})();