﻿var Layout = function () {
    var e = "layouts/layout/img/",
        a = "layouts/layout/css/",
        t = App.getResponsiveBreakpoint("md"),
        i = [],
        s = [],
        o = function () {
            var e, a = $(".page-content"),
                i = $(".page-sidebar"),
                s = $("body");
            if (s.hasClass("page-footer-fixed") === !0 && s.hasClass("page-sidebar-fixed") === !1) {
                var o = App.getViewPort().height - $(".page-footer").outerHeight() - $(".page-header").outerHeight(),
                    n = i.outerHeight();
                n > o && (o = n + $(".page-footer").outerHeight()), a.height() < o && a.css("min-height", o)
            } else {
                if (s.hasClass("page-sidebar-fixed")) e = l(), s.hasClass("page-footer-fixed") === !1 && (e -= $(".page-footer").outerHeight());
                else {
                    var r = $(".page-header").outerHeight(),
                        d = $(".page-footer").outerHeight();
                    e = App.getViewPort().width < t ? App.getViewPort().height - r - d : i.height() + 20, e + r + d <= App.getViewPort().height && (e = App.getViewPort().height - r - d)
                }
                a.css("min-height", e)
            }
        },
        n = function (e, a, i) {
            var s = location.hash.toLowerCase(),
                o = $(".page-sidebar-menu");
            if ("click" === e || "set" === e ? a = $(a) : "match" === e && o.find("li > a").each(function () {
                var e = $(this).attr("ui-sref");
                if (i && e) {
                    if (i.is(e)) return void (a = $(this))
                } else {
                    var t = $(this).attr("href");
                    if (t && (t = t.toLowerCase(), t.length > 1 && s.substr(1, t.length - 1) == t.substr(1))) return void (a = $(this))
                }
            }), a && 0 != a.size() && "javascript:;" != a.attr("href") && "javascript:;" != a.attr("ui-sref") && "#" != a.attr("href") && "#" != a.attr("ui-sref")) {
                parseInt(o.data("slide-speed")), o.data("keep-expanded");
                o.hasClass("page-sidebar-menu-hover-submenu") === !1 ? o.find("li.nav-item.open").each(function () {
                    var e = !1;
                    $(this).find("li").each(function () {
                        var t = $(this).attr("ui-sref");
                        if (i && t) {
                            if (i.is(t)) return void (e = !0)
                        } else if ($(this).find(" > a").attr("href") === a.attr("href")) return void (e = !0)
                    }), e !== !0 && ($(this).removeClass("open"), $(this).find("> a > .arrow.open").removeClass("open"), $(this).find("> .sub-menu").slideUp())
                }) : o.find("li.open").removeClass("open"), o.find("li.active").removeClass("active"), o.find("li > a > .selected").remove(), a.parents("li").each(function () {
                    $(this).addClass("active"), $(this).find("> a > span.arrow").addClass("open"), 1 === $(this).parent("ul.page-sidebar-menu").size() && $(this).find("> a").append('<span class="selected"></span>'), 1 === $(this).children("ul.sub-menu").size() && $(this).addClass("open")
                }), "click" === e && App.getViewPort().width < t && $(".page-sidebar").hasClass("in") && $(".page-header .responsive-toggler").click()
            }
        },
        r = function () {
            $(".page-sidebar-mobile-offcanvas .responsive-toggler").click(function (e) {
                $("body").toggleClass("page-sidebar-mobile-offcanvas-open"), e.preventDefault(), e.stopPropagation()
            }), $("body").hasClass("page-sidebar-mobile-offcanvas") && $(document).on("click", function (e) {
                $("body").hasClass("page-sidebar-mobile-offcanvas-open") && 0 === $(e.target).closest(".page-sidebar-mobile-offcanvas .responsive-toggler").length && 0 === $(e.target).closest(".page-sidebar-wrapper").length && ($("body").removeClass("page-sidebar-mobile-offcanvas-open"), e.preventDefault(), e.stopPropagation())
            }), $(".page-sidebar-menu").on("click", "li > a.nav-toggle, li > a > span.nav-toggle", function (e) {
                var a = $(this).closest(".nav-item").children(".nav-link");
                if (!(App.getViewPort().width >= t && !$(".page-sidebar-menu").attr("data-initialized") && $("body").hasClass("page-sidebar-closed") && 1 === a.parent("li").parent(".page-sidebar-menu").size())) {
                    var i = a.next().hasClass("sub-menu");
                    if (!(App.getViewPort().width >= t && 1 === a.parents(".page-sidebar-menu-hover-submenu").size())) {
                        if (i === !1) return void (App.getViewPort().width < t && $(".page-sidebar").hasClass("in") && $(".page-header .responsive-toggler").click());
                        var s = a.parent().parent(),
                            n = a,
                            r = $(".page-sidebar-menu"),
                            l = a.next(),
                            d = r.data("auto-scroll"),
                            p = parseInt(r.data("slide-speed")),
                            c = r.data("keep-expanded");
                        c || (s.children("li.open").children("a").children(".arrow").removeClass("open"), s.children("li.open").children(".sub-menu:not(.always-open)").slideUp(p), s.children("li.open").removeClass("open"));
                        var h = -200;
                        l.is(":visible") ? ($(".arrow", n).removeClass("open"), n.parent().removeClass("open"), l.slideUp(p, function () {
                            d === !0 && $("body").hasClass("page-sidebar-closed") === !1 && ($("body").hasClass("page-sidebar-fixed") ? r.slimScroll({
                                scrollTo: n.position().top
                            }) : App.scrollTo(n, h)), o()
                        })) : i && ($(".arrow", n).addClass("open"), n.parent().addClass("open"), l.slideDown(p, function () {
                            d === !0 && $("body").hasClass("page-sidebar-closed") === !1 && ($("body").hasClass("page-sidebar-fixed") ? r.slimScroll({
                                scrollTo: n.position().top
                            }) : App.scrollTo(n, h)), o()
                        })), e.preventDefault()
                    }
                }
            }), App.isAngularJsApp() && $(".page-sidebar-menu li > a").on("click", function (e) {
                App.getViewPort().width < t && $(this).next().hasClass("sub-menu") === !1 && $(".page-header .responsive-toggler").click()
            }), $(".page-sidebar").on("click", " li > a.ajaxify", function (e) {
                e.preventDefault(), App.scrollTop();
                var a = $(this).attr("href"),
                    i = $(".page-sidebar ul");
                i.children("li.active").removeClass("active"), i.children("arrow.open").removeClass("open"), $(this).parents("li").each(function () {
                    $(this).addClass("active"), $(this).children("a > span.arrow").addClass("open")
                }), $(this).parents("li").addClass("active"), App.getViewPort().width < t && $(".page-sidebar").hasClass("in") && $(".page-header .responsive-toggler").click(), Layout.loadAjaxContent(a, $(this))
            }), $(".page-content").on("click", ".ajaxify", function (e) {
                e.preventDefault(), App.scrollTop();
                var a = $(this).attr("href");
                App.getViewPort().width < t && $(".page-sidebar").hasClass("in") && $(".page-header .responsive-toggler").click(), Layout.loadAjaxContent(a)
            }), $(document).on("click", ".page-header-fixed-mobile .page-header .responsive-toggler", function () {
                App.scrollTop()
            }), p(), $(".page-sidebar").on("click", ".sidebar-search .remove", function (e) {
                e.preventDefault(), $(".sidebar-search").removeClass("open")
            }), $(".page-sidebar .sidebar-search").on("keypress", "input.form-control", function (e) {
                if (13 == e.which) return $(".sidebar-search").submit(), !1
            }), $(".sidebar-search .submit").on("click", function (e) {
                e.preventDefault(), $("body").hasClass("page-sidebar-closed") && $(".sidebar-search").hasClass("open") === !1 ? (1 === $(".page-sidebar-fixed").size() && $(".page-sidebar .sidebar-toggler").click(), $(".sidebar-search").addClass("open")) : $(".sidebar-search").submit()
            }), 0 !== $(".sidebar-search").size() && ($(".sidebar-search .input-group").on("click", function (e) {
                e.stopPropagation()
            }), $("body").on("click", function () {
                $(".sidebar-search").hasClass("open") && $(".sidebar-search").removeClass("open")
            }))
        },
        l = function () {
            var e = App.getViewPort().height - $(".page-header").outerHeight(!0);
            return $("body").hasClass("page-footer-fixed") && (e -= $(".page-footer").outerHeight()), e
        },
        d = function () {
            var e = $(".page-sidebar-menu");
            return o(), 0 === $(".page-sidebar-fixed").size() ? void App.destroySlimScroll(e) : void (App.getViewPort().width >= t && !$("body").hasClass("page-sidebar-menu-not-fixed") && (e.attr("data-height", l()), App.destroySlimScroll(e), App.initSlimScroll(e), o()))
        },
        p = function () {
            $("body").hasClass("page-sidebar-fixed") && $(".page-sidebar").on("mouseenter", function () {
                $("body").hasClass("page-sidebar-closed") && $(this).find(".page-sidebar-menu").removeClass("page-sidebar-menu-closed")
            }).on("mouseleave", function () {
                $("body").hasClass("page-sidebar-closed") && $(this).find(".page-sidebar-menu").addClass("page-sidebar-menu-closed")
            })
        },
        c = function () {
            $("body").on("click", ".sidebar-toggler", function (e) {
                var a = $("body"),
                    t = $(".page-sidebar"),
                    i = $(".page-sidebar-menu");
                $(".sidebar-search", t).removeClass("open"), a.hasClass("page-sidebar-closed") ? (a.removeClass("page-sidebar-closed"), i.removeClass("page-sidebar-menu-closed"), Cookies && Cookies.set("sidebar_closed", "0")) : (a.addClass("page-sidebar-closed"), i.addClass("page-sidebar-menu-closed"), a.hasClass("page-sidebar-fixed") && i.trigger("mouseleave"), Cookies && Cookies.set("sidebar_closed", "1")), $(window).trigger("resize")
            })
        },
        h = function () {
            $(".page-header").on("click", '.hor-menu a[data-toggle="tab"]', function (e) {
                e.preventDefault();
                var a = $(".hor-menu .nav"),
                    t = a.find("li.current");
                $("li.active", t).removeClass("active"), $(".selected", t).remove();
                var i = $(this).parents("li").last();
                i.addClass("current"), i.find("a:first").append('<span class="selected"></span>')
            }), $(".page-header").on("click", ".search-form", function (e) {
                $(this).addClass("open"), $(this).find(".form-control").focus(), $(".page-header .search-form .form-control").on("blur", function (e) {
                    $(this).closest(".search-form").removeClass("open"), $(this).unbind("blur")
                })
            }), $(".page-header").on("keypress", ".hor-menu .search-form .form-control", function (e) {
                if (13 == e.which) return $(this).closest(".search-form").submit(), !1
            }), $(".page-header").on("mousedown", ".search-form.open .submit", function (e) {
                e.preventDefault(), e.stopPropagation(), $(this).closest(".search-form").submit()
            }), $(document).on("click", ".mega-menu-dropdown .dropdown-menu", function (e) {
                e.stopPropagation()
            })
        },
        u = function () {
            $("body").on("shown.bs.tab", 'a[data-toggle="tab"]', function () {
                o()
            })
        },
        g = function () {
            var e = 300,
                a = 500;
            navigator.userAgent.match(/iPhone|iPad|iPod/i) ? $(window).bind("touchend touchcancel touchleave", function (t) {
                $(this).scrollTop() > e ? $(".scroll-to-top").fadeIn(a) : $(".scroll-to-top").fadeOut(a)
            }) : $(window).scroll(function () {
                $(this).scrollTop() > e ? $(".scroll-to-top").fadeIn(a) : $(".scroll-to-top").fadeOut(a)
            }), $(".scroll-to-top").click(function (e) {
                return e.preventDefault(), $("html, body").animate({
                    scrollTop: 0
                }, a), !1
            })
        },
        f = function () {
            $(".full-height-content").each(function () {
                var e, a = $(this);
                if (e = App.getViewPort().height - $(".page-header").outerHeight(!0) - $(".page-footer").outerHeight(!0) - $(".page-title").outerHeight(!0) - $(".page-bar").outerHeight(!0), a.hasClass("portlet")) {
                    var i = a.find(".portlet-body");
                    App.destroySlimScroll(i.find(".full-height-content-body")), e = e - a.find(".portlet-title").outerHeight(!0) - parseInt(a.find(".portlet-body").css("padding-top")) - parseInt(a.find(".portlet-body").css("padding-bottom")) - 5, App.getViewPort().width >= t && a.hasClass("full-height-content-scrollable") ? (e -= 35, i.find(".full-height-content-body").css("height", e), App.initSlimScroll(i.find(".full-height-content-body"))) : i.css("min-height", e)
                } else App.destroySlimScroll(a.find(".full-height-content-body")), App.getViewPort().width >= t && a.hasClass("full-height-content-scrollable") ? (e -= 35, a.find(".full-height-content-body").css("height", e), App.initSlimScroll(a.find(".full-height-content-body"))) : a.css("min-height", e)
            })
        };
    return {
        initHeader: function () {
            h()
        },
        setSidebarMenuActiveLink: function (e, a) {
            n(e, a, null)
        },
        setAngularJsSidebarMenuActiveLink: function (e, a, t) {
            n(e, a, t)
        },
        initSidebar: function (e) {
            d(), r(), c(), App.isAngularJsApp() && n("match", null, e), App.addResizeHandler(d)
        },
        initContent: function () {
            f(), u(), App.addResizeHandler(o), App.addResizeHandler(f)
        },
        initFooter: function () {
            g()
        },
        init: function () {
            this.initHeader(), this.initSidebar(null), this.initContent(), this.initFooter()
        },
        loadAjaxContent: function (e, a) {
            var t = $(".page-content .page-content-body");
            App.startPageLoading({
                animate: !0
            }), $.ajax({
                type: "GET",
                cache: !1,
                url: e,
                dataType: "html",
                success: function (e) {
                    App.stopPageLoading(), t.html(e);
                    for (var s = 0; s < i.length; s++) i[s].call(e);
                    a.size() > 0 && 0 === a.parents("li.open").size() && $(".page-sidebar-menu > li.open > a").click(), Layout.fixContentHeight(), App.initAjax()
                },
                error: function (e, a, i) {
                    App.stopPageLoading(), t.html("<h4>Could not load the requested content.</h4>");
                    for (var o = 0; o < s.length; o++) s[o].call(e)
                }
            })
        },
        addAjaxContentSuccessCallback: function (e) {
            i.push(e)
        },
        addAjaxContentErrorCallback: function (e) {
            s.push(e)
        },
        fixContentHeight: function () {
            o()
        },
        initFixedSidebarHoverEffect: function () {
            p()
        },
        initFixedSidebar: function () {
            d()
        },
        getLayoutImgPath: function () {
            return App.getAssetsPath() + e
        },
        getLayoutCssPath: function () {
            return App.getAssetsPath() + a
        }
    }
}();
App.isAngularJsApp() === !1 && jQuery(document).ready(function () {
    Layout.init()
});