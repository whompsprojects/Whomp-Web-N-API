using System;
using System.Linq;
using System.Net;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace DTO.whatapp
{
    public class Twilios
    {
        public static void SendWhatappMsg()
        {
            // Find your Account SID and Auth Token at twilio.com/console
            // and set the environment variables. See http://twil.io/secure
            string accountSid = Constant.TwilioAPiKey;
            string authToken = Constant.TwilioToken;
            TwilioClient.Init(accountSid, authToken);

            var mediaUrl = new[] {
            new Uri("https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80")
        }.ToList();
           ServicePointManager.SecurityProtocol |= SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
            var message = MessageResource.Create(
                from: new Twilio.Types.PhoneNumber("whatsapp:+919792424861"),
                to: new Twilio.Types.PhoneNumber("whatsapp:+919594899802"),
                 body: "Hello world"
            );

            Console.WriteLine(message.Sid);
        }
    }
}
