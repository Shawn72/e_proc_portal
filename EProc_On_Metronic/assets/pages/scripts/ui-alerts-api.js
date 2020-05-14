var UIAlertsApi = function () {
    var e = function () {
            $("#alert_show").click(function() {
                App.alert({
                    container: $("#alert_container").val(),
                    place: $("#alert_place").val(),
                    type: $("#alert_type").val(),
                    message: $("#alert_message").val(),
                    close: $("#alert_close").is(":checked"),
                    reset: $("#alert_reset").is(":checked"),
                    focus: $("#alert_focus").is(":checked"),
                    closeInSeconds: $("#alert_close_in_seconds").val(),
                    icon: $("#alert_icon").val()
                });
            });
        }
    return {
        init: function () {
            e();
        }
    }
}();
jQuery(document).ready(function () {
    UIAlertsApi.init();
});