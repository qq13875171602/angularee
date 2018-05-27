(function() {
  var app = angular.module("controllers");
  app.controller('plk', ['$log', "$scope", "datahttp", "$rootScope", "Dataservice", plk]);

  function plk($log, $scope, datahttp, $rootScope, Dataservice) {
    $log.debug("plk");
    $scope.$on("$destroy", function() {
      $log.debug("销毁控制器");
    });

    $scope.op = true;
    $scope.bn = true;
    $scope.like = {};
    $scope.shuju = {};
    $scope.query = {};
    $scope.mohu = {};
    $scope.lick = function() {
      $scope.op = false;
    };
    $scope.ke = function() {
      $scope.op = true;
    };
    $scope.zx = function() {
      $scope.bn = false;
    };
    $scope.cv = function() {
      $scope.bn = true;
    };


    /* ===========    分类添加    ============*/
    $scope.add = function() {
      Dataservice.wadlklog("正在进入中");
      datahttp.data("/date/message/add", $scope.shuju, function(err, data) {
        Dataservice.hidewardialog();
        if (err) {
           Dataservice.setdialog('服务器正忙');
          $log.debug("err",err);
          return;
        }
        if (data.success) {
          Dataservice.setdialog("添加成功",function () {
            Dataservice.hidedialog();
          });
          return;
        }else{
          Dataservice.setdialog(data.message);
        }
      });
    };

    //js ctrl+alt+f
    //css ctrl+alt+[
    //html ctrl+shift+alt+f
    /* ============   分类查询       =============*/
    $scope.ag = function() {
      Dataservice.wadlklog("正在进入中");
      datahttp.data("/date/message/query", {}, function(err, data) {
        Dataservice.hidewardialog();
        if (err) {
          Dataservice.setdialog('服务器正忙');
          return;
        }
        if (data.success) {
          Dataservice.setdialog("查询成功");
          $scope.pl = data.dataMap.list;
          return;
        }else{
          Dataservice.setdialog(data.message);
        }
      });
    };
    
    $scope.ag();

    /*===============    图书添加       ========================*/

    $scope.tianjia = function() {
      Dataservice.wadlklog("正在添加中");
      datahttp.data("/data/book/add", $scope.like, function(err, data) {
        Dataservice.hidewardialog();
        if (err) {
          Dataservice.setdialog("添加失败");
          return;
        }
        if (data.success) {
          Dataservice.setdialog("添加成功",function () {
             Dataservice.hidedialog();
          });
          $scope.okl();
          return;
        }else{
          Dataservice.setdialog(data.message);
        }
      });
    };



    /*============    图书查询  分页查询    ================*/


    $scope.okl = function(size,nuber) {
      datahttp.data("/data/book/query", {
        "page.pageSize":4,
        "page.pageNumber": 1
      }, function(err, data) {
        if (err) {
          console.log('查询失败');
          return;
        }
        if (data.success) {
          console.log('查询成功');
          $scope.query = data.dataMap.list;
          $scope.page = data.dataMap.page;
          return;
        }
      });
    };
    $scope.okl();

    $scope.sd = function(adf) {
      datahttp.data("/data/book/query", {
        "page.pageSize": 4,
        "page.pageNumber": adf
      }, function(err, data) {
        if (err) {
          console.log('查询失败');
          return;
        }
        if (data.success) {
          console.log('查询成功');
          $scope.query = data.dataMap.list;
          $scope.page = data.dataMap.page;
          return;
        }
      });
    };

    $scope.qw = function(qwe) {
      datahttp.data("/data/book/query", {
        "page.pageSize": 4,
        "page.pageNumber": qwe
      }, function(err, data) {
        if (err) {
          console.log('查询失败');
          return;
        }
        if (data.success) {
          console.log('查询成功');
          $scope.query = data.dataMap.list;
          $scope.page = data.dataMap.page;
          return;
        }
      });
    };

    $scope.ty = function(asd) {
      datahttp.data("/houtai/select", {
        "page.PageSize": 4,
        "page.PageNumber": asd
      }, function(err, data) {
        if (err) {
          console.log('查询失败');
          return;
        }
        if (data.Souse) {
          console.log('查询成功');
          $scope.query = data.list;
          $scope.page = data.page;
          return;
        }
      });
    };


    //$scope.ty = function(asd) {
      //datahttp.data("/houtai/select", {
        //"page.PageSize": 4,
        //"page.PageNumber": asd
      //}, function(err, data) {
        //if (err) {
          //console.log('查询失败');
          //return;
        //}
        //if (data.Souse) {
          //console.log('查询成功');
          //$scope.query = data.list;
          //$scope.page = data.page;
          //return;
        //}
      //});
    //};


    /*===========   图书删除     ==================*/
    $scope.delete = function(oplk) {
      Dataservice.wadlklog("正在删除中");
      datahttp.data("/data/book/delete", {
        "book.bid": oplk
      }, function(err, data) {
        Dataservice.hidewardialog();
        if (err) {
          Dataservice.setdialog('服务器正忙');
          return;
        }
        if (data.success) {
          Dataservice.setdialog('删除成功',function () {
              $scope.okl();
          });
          return;
        }else{
          Dataservice.setdialog(data.message);
        }
      });
    };

    /*=================== 图书修改    ==================*/
    $scope.chaxunqw=function (poli) {
      datahttp.data("/data/book/miss",{"bid":poli},function (err,data) {
         if(err)
         {
             Dataservice.setdialog("查询失败");
             $log.debug(err);
             return;
         }
         if(data.success)
         {
            Dataservice.showCustomDialog("/html/user/houtai/xiugai.html");
            $rootScope.nbgf=data.dataMap.type;
            return;
         }else{
            Dataservice.setdialog(data.message);
         }
      });
    };


    $scope.xuigai=function (plo) {
        Dataservice.wadlklog("正在修改中");
           datahttp.data("/data/book/update",{"book.bid":plo,"book":$scope.zbvc},function (err,data) {
                Dataservice.hidewardialog();
                if(err)
                {
                   Dataservice.setdialog("服务器正忙");
                   return;
                }
                if(data.success)
                {
                   Dataservice.setdialog("修改成功",function () {
                        Dataservice.hideCustomDialog();
                   });
                   $scope.okl();
                   return;
                }else{
                  Dataservice.setdialog(data.message);
                }
           });
    };
    

  }
})();