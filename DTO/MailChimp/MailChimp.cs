using MailChimp.Net;
using MailChimp.Net.Core;
using MailChimp.Net.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.MailChimp
{
    public class MailChimp
    {

        private const string ApiKey = "21b6e21e40f73a526d678d55d9a26282-us14";
        private const string ListId = "hisandeepmaurya@gmail.com";
        private const int TemplateId = 9999; // (your template id)
        private MailChimpManager _mailChimpManager = new MailChimpManager(ApiKey);
        private Setting _campaignSettings = new Setting
        {
            ReplyTo = "your@email.com",
            FromName = "The name that others will see when they receive the email",
            Title = "Your campaign title",
            SubjectLine = "The email subject",
        };

        // `html` contains the content of your email using html notation
        public void CreateAndSendCampaign(string html)
        {
            try
            {
                var campaign = _mailChimpManager.Campaigns.AddAsync(new Campaign
                {
                    Settings = _campaignSettings,
                    Recipients = new Recipient { ListId = ListId },
                    Type = CampaignType.Regular
                }).Result;
                var timeStr = DateTime.Now.ToString();
                var content = _mailChimpManager.Content.AddOrUpdateAsync(
                 campaign.Id,
                 new ContentRequest()
                 {
                     Template = new ContentTemplate
                     {
                         Id = TemplateId,
                         Sections = new Dictionary<string, object>()
                        {
                       { "body_content", html },
                       { "preheader_leftcol_content", $"<p>{timeStr}</p>" }
                        }
                     }
                 }).Result;
                _mailChimpManager.Campaigns.SendAsync(campaign.Id).Wait();
            } catch(Exception ex)
            {
                throw ex;
            }
           
        }
    }

}
