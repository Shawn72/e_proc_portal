using System.Web.Mvc;
using System.Web.Routing;

namespace EProc_On_Metronic
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Homepage", id = UrlParameter.Optional }
            );
        }
    }
}
