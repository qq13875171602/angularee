(function() {
  var app = angular.module("directives");

  var tempdiv = "<div class='modal' style='z-index:1900;' role='dialog' tabindex='-1' data-backgrop='static' data-keyborad='false' >                 <div class='modal-dialog'>                      <div class='modal-content'>                       <div class='modal-header'>              <button type='button' class='close' data-dismiss='modal' aria-label='Close' >&times;</button>                      <span class='modal-title' ng-bind='atitle'></span>          </div>                          <div class='modal-body'>                 <span ng-bind='infos'></span>          </div>                    <div class='modal-footer'>           <button type='button' data-dismiss='modal' class='btn btn-primary' ng-bind='btnok'></button>     </div>       </div    </div>     </div>";

  app.directive("aletDialog", ["$log", "Dataservice", function($log, Dataservice) {
    return {
      "restrict": 'AE',
      "template": tempdiv,
      "replace": true,
      "link": function($scope, element, attr) {
        $scope.$on("$destroy", function() {
          $log.debug("销毁控制器");
        });

        $log.debug("aldiog", element);
        Dataservice.artDalog({
          "scope": $scope,
          "element": element
        });
      }
    };
  }]);

  var temlko = "<div class='modal' role='dialog' data-backgrop='static' tabindex='-1' data-keyborad='false' style='z-index:1995'>     <div class='modal-dialog'>       <div class='modal-content'>             <div class='modal-header'>        <button type='button' class='close' data-dismiss='modal' aria-label='Close' >&times;</button>      <span  ng-bind='otitle'></span>                           </div>          <div class='modal-body'>     <span ng-bind='poinfo'></span>         </div>                                                                                 </div>                    </div>                        </div>";

  app.directive("warDialog", ["$log", "Dataservice", function($log,Dataservice) {
    return {
      "restrict": 'AE',
      "template": temlko,
      "replace": true,
      "link": function($scope, element, attr) {
        $scope.$on("$destroy", function() {
          $log.debug("控制器销毁");
        });

        $log.debug("warDialog",element);
        Dataservice.warldaloh({
          "scope": $scope,
          "element": element
        });
      }
    };
  }]);



  var temzxc = "<div class='modal' role='dialog' data-backgrop='static' tabindex='-1' data-keyborad='false' style='z-index:1998'>     <div class='modal-dialog'>    <div class='modal-content'>      <div class='modal-header'>           <button type='button' class='close' data-dismiss='modal'  aria-label='Close'>&times;</button>        <span  ng-bind='titlesad'></span>                                       </div>                 <div class='modal-body'>    <span ng-bind='qwinfo'></span>     </div>                  <div class='modal-footer'>     <button type='button' data-dismiss='modal' class='btn btn-primary' ng-click='comlp()'  ng-bind='mjbynok'></button>        <button type='button' data-misdiss='modal' class='btn btn-info' ng-click='nolkp()' ng-bind='qnok' ></button>                                  </div>                                           </div>                                     </div>                        </div>";

  app.directive("setqwDialog", ["$log","Dataservice", function($log, Dataservice) {
    return {
      "restrict": "AE",
      "template": temzxc,
      "replace": true,
      "link": function($scope, element, attr) {
        $scope.$on("$destroy", function() {
          $log.debug("控制器销毁");
        });

        $log.debug("setqwDialog",element);
        Dataservice.setqwpdiao({
          "scope": $scope,
          "element": element
        });

        $scope.comlp=Dataservice.tyshg;
        $scope.nolkp=Dataservice.sacha;

      }
    };
  }]);

  var customDialogTemplate = "<div class='modal' data-backdrop='static' data-keyboard='false' tabindex='-1' role='dialog' style='z-index: 1500;'>    <div class='modal-dialog' role='document'>        <div class='modal-content'>            <div class='modal-header'>    <button type='button' class='close' data-dismiss='modal'  aria-label='Close'>&times;</button>            <div class='modal-title' ng-bind='customTitle'></div>            </div>            <div class='modal-body'>                <div ng-include='customPage'></div>            </div>        </div>    </div></div>";

    app.directive("customDialog", ["$log", "Dataservice", function($log, Dataservice) {
        $log.debug("directive custom-dialog...");

        return {
            "restrict": "AE",
            "template": customDialogTemplate,
            "replace": true,
            "link": function($scope, element, attr) {
                $scope.$on("$destroy", function() {
                    $log.debug("directive custom-dialog destroy...");
                });

                $log.debug("directive custom-dialog init==>", element);
                Dataservice.setCustomDialog({
                    "scope": $scope,
                    "element": element
                });
            }
        };
    }]);

})();