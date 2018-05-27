(function () {
  var app=angular.module("controllers");
  app.controller('contr', ['$scope',"$log","datahttp","$location",contr]);
  function contr($scope,$log,datahttp,$location){
    
    $log.debug("contr....");
    $scope.$on("$destroy",function () {
        $log.debug("销毁控制器");
   });
        $scope.user={};

    $scope.dataas=function () {
       datahttp.data("/zhuce/Index",$scope.user,function (dat,errr) {
        if(dat.Souse)
          {
            console.log('添加成功');
            return;
          }
          if(err)
          {
            console.log('添加失败');
            return;
          }
       });
    };

    $scope.kong=function () {
        $scope.user={};
    };


  }
})();