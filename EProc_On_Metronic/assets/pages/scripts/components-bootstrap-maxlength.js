var ComponentsBootstrapMaxlength = function () {
    var a = function () {
        $("#maxlength_defaultconfig").maxlength({
            limitReachedClass: "label label-danger"
        }), $("#maxlength_thresholdconfig").maxlength({
            limitReachedClass: "label label-danger",
            threshold: 20
        }), $("#maxlength_alloptions").maxlength({
            alwaysShow: !0,
            warningClass: "label label-success",
            limitReachedClass: "label label-danger",
            separator: " out of ",
            preText: "You typed ",
            postText: " chars available.",
            validate: !0
        }),
        $("#txtareaVision").maxlength({
            limitReachedClass: "label label-danger",
            alwaysShow: !0
        }),
        $("#txtareaMision").maxlength({
            limitReachedClass: "label label-danger",
            alwaysShow: !0
        }),
        $("#txtareaNatureofBz").maxlength({
            limitReachedClass: "label label-danger",
            alwaysShow: !0
        }),
        $("#txtareaVision").maxlength({
            limitReachedClass: "label label-danger",
            alwaysShow: !0
        }),

        $("#txtareaVisionTest").maxlength({
            limitReachedClass: "label label-danger",
            alwaysShow: !0,
            placement: App.isRTL() ? "top-right" : "top-left"
        })
    };
    return {
        init: function () {
            a();
        }
    }
}();
jQuery(document).ready(function () {
    ComponentsBootstrapMaxlength.init()
});