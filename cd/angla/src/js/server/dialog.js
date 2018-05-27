(function() {
    var app = angular.module("services");
    app.factory('Dataservice', ['$log', "$timeout", Dataservice]);

    function Dataservice($log, $timeout) {
        $log.debug("Dataservice");
        service = {};

        /*==  标题 ==*/
        var Title = "图书管理";
        var dialogtitl = null;

        service.alttitle = function(title) {
            dialogtitl = title;
        };

        service.temptitle = function(title) {
            Title = title;
        };

        /*==========   确认对话框      ====================*/
        var bbtnok = "确认";
        var imok=null;
        service.tempbtnok = function(ok) {
            imok = ok;
        };

        var aletDialog = {
            "huidiao": angular.noop,
            "couhs": false,
        };

        service.artDalog = function(dialog) {
            $log.debug("Dataservice.artDalog",dialog);
            aletDialog.scope = dialog.scope;
            aletDialog.element = dialog.element;
            aletDialog.element.on("hidden.bs.modal", function() {
                var cb = aletDialog.huidiao;
                aletDialog.huidiao = angular.noop;
                cb();
            });
            aletDialog.couhs = true;
        };

        service.setdialog = function(info, cb) {
            if (!aletDialog.couhs) {
                return;
            }

            $timeout(function() {
                aletDialog.huidiao = (cb || angular.noop);
                aletDialog.scope.infos = info;
                aletDialog.scope.atitle = (dialogtitl || Title);
                aletDialog.scope.btnok=(imok || bbtnok);
                imok=null;
                dialogtitl = null;
                aletDialog.element.modal("show");
            });
        };

        service.hidedialog = function() {
            aletDialog.element.modal("hide");
        };


        /*===========    提示对话框   ==============*/

        var warDialog = {
            "huidiao": angular.noop,
            "couhs": false,
        };


        service.warldaloh = function(dialog) {
            $log.debug("Dataservice.warldaloh",dialog);
            warDialog.scope = dialog.scope;
            warDialog.element = dialog.element;
            warDialog.element.on("hidden.bs.modal", function() {
                var cb = warDialog.huidiao;
                warDialog.huidiao = angular.noop;
                cb();
            });
            warDialog.couhs = true;
        };

        service.wadlklog = function(info, cb) {
            if (!warDialog.couhs) {
                $log.debug("wadlklog");
                return;
            }

            $timeout(function() {
                warDialog.huidiao = (cb || angular.noop);
                warDialog.scope.poinfo = info;
                warDialog.scope.otitle = (Title || dialogtitl);
                dialogtitl=null;
                warDialog.element.modal("show");
            });
        };

        service.hidewardialog = function() {
            warDialog.element.modal("hide");
        };



        /*==========    确认取消对话框    ===============*/

        var tempok = "确认";
        var temnok = "取消";
        var tnm = null;
        var tno = null;
        service.pok = function(ok) {
            tempok = ok;
        };

        service.mnok = function(nok) {
            temnok = nok;
        };

        service.wsca = function(ok) {
            tnm = ok;
        };

        service.lpo = function(nkok) {
            tno = nkok;
        };


        var setqwDialog = {
            "yes": angular.nnop,
            "lno": angular.noop,
            "chons": "no",
            "couhs": false,
        };

        service.setqwpdiao = function(dialog) {
            $log.debug("Dataservice.setqwpdiao",dialog);
            setqwDialog.scope = dialog.scope;
            setqwDialog.element = dialog.element;
            setqwDialog.couhs = true;
        };

        service.awstdialog = function(info, cb, no) {
            if (!setqwDialog.couhs) {
                return;
            }
            $timeout(function() {
                setqwDialog.yes = (cb || angular.noop);
                setqwDialog.lno = (no || angular.noop);
                setqwDialog.scope.qwinfo = info;
                setqwDialog.scope.titlesad = (dialogtitl || Title);
                dialogtitl = null;
                setqwDialog.scope.mjbynok = (tempok || tnm);
                tnm = null;
                setqwDialog.scope.qnok = (temnok || tno);
                tno = null;
                setqwDialog.element.on("hidden.bs.modal", function() {
                    var cb = (setqwDialog.chons == "no") ? setqwDialog.yes : setqwDialog.lno;
                    setqwDialog.chons = "no";
                    setqwDialog.yes = angular.noop;
                    setqwDialog.lno = angular.noop;
                    cb();
                });
                setqwDialog.element.modal("show");
            },4000);
        };

        service.wqer = function() {
            setqwDialog.element.modal("hide");
        };


        service.tyshg = function() {
            setqwDialog.chons = "yes";
            setqwDialog.element.modal("hide");
        };

        service.sacha = function() {
            setqwDialog.chons = "no";
            setqwDialog.element.modal("hide");
        };

        /*===========   调换对话框   ===========*/
        var customDialog = {
            "closefn": angular.noop,
            "hasinit": false,
            "data": {}
        };

        service.setCustomDialog = function(dialog) {
            $log.debug("DialogService.setCustomDialog==>", dialog);
            customDialog.scope = dialog.scope;
            customDialog.element = dialog.element;
            customDialog.element.on("hidden.bs.modal", function() {
                var cb = customDialog.closefn;
                customDialog.closefn = angular.noop;
                cb();
            });
            customDialog.hasinit = true;
        };

        service.showCustomDialog = function(page, data, cb) {
            if (!customDialog.hasinit) {
                $log.debug("DialogService.showCustomDialog not init...");
                return;
            }
            $timeout(function() {
                customDialog.scope.customPage = page;
                page = "";
                customDialog.data = (data || {});
                customDialog.closefn = (cb || angular.noop);
                customDialog.scope.customTitle = (dialogtitl || Title);
                dialogtitl = null;
                customDialog.element.modal("show");
            });
        };

        service.hideCustomDialog = function() {
            customDialog.element.modal("hide");
        };

        service.getCustomData = function() {
            var data = customDialog.data;
            customDialog.data = {};
            return data;
        };


        return service;

    }
})();