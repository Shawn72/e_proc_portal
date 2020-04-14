using System;
using System.Configuration;
using System.Net;
using System.Net.Mail;
using EProc_On_Metronic.WebRef;

namespace EProc_On_Metronic.Controllers
{
    public class WsConfig
    {
        public static eprocurement EProcWebRef
        {
            get
            {
                var myWs = new eprocurement();

                try
                {
                    var credentials = new NetworkCredential(ConfigurationManager.AppSettings["W_USER"], ConfigurationManager.AppSettings["W_PWD"], ConfigurationManager.AppSettings["DOMAIN"]);
                    myWs.Credentials = credentials;
                    myWs.PreAuthenticate = true;
                    myWs.Timeout = -1;
                }
                catch (Exception ex)
                {
                    ex.Data.Clear();
                }
                return myWs;
            }
        }

        public static bool MailFunction(string body, string recepient, string subject)
        {
            bool x = false;

            try
            {
                const string fromAddress = "ngutumbuvi8@gmail.com";
                string toAddress = recepient;
                var mail = new MailMessage();
                mail.To.Add(toAddress);
                mail.Subject = subject;
                mail.From = new MailAddress(fromAddress);
                mail.Body = body;
                mail.IsBodyHtml = true;
                var client = new SmtpClient
                {
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential("ngutumbuvi8@gmail.com", "ngutu54321*"),
                    Port = 587,
                    Host = "smtp.gmail.com",
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    EnableSsl = true
                };
                client.Send(mail);
                x = true;
            }
            catch (Exception ex2)
            {
                ex2.Data.Clear();
            }
            return x;
        }
    }
}