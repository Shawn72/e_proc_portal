using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(EProc_On_Metronic.Startup))]
namespace EProc_On_Metronic
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
