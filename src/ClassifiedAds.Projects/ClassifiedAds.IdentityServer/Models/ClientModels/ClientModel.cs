using IdentityServer4.EntityFramework.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClassifiedAds.IdentityServer.Models.ClientModels
{
    public class ClientModel : IdentityServer4.Models.Client
    {
        public int Id { get; set; }

        public static ClientModel FromEntity(Client client)
        {
            return new ClientModel
            {
                Id = client.Id,
                ClientId = client.ClientId,
                ClientName = client.ClientName,
            };
        }
    }
}
