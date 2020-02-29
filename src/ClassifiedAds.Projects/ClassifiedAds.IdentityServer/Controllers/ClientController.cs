using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityServer4.EntityFramework.DbContexts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ClassifiedAds.IdentityServer.Controllers
{
    public enum ClientType
    {
        Empty = 0,
        WebHybrid = 1,
        Spa = 2,
        Native = 3,
        Machine = 4,
        Device = 5,
    }

    public class ClientController : Controller
    {
        private readonly ConfigurationDbContext _configurationDbContext;

        public ClientController(ConfigurationDbContext configurationDbContext)
        {
            _configurationDbContext = configurationDbContext;
        }

        public IActionResult Index()
        {
            var clients = _configurationDbContext.Clients
            .Include(x => x.AllowedGrantTypes)
            .Include(x => x.RedirectUris)
            .Include(x => x.PostLogoutRedirectUris)
            .Include(x => x.AllowedScopes)
            .Include(x => x.ClientSecrets)
            .Include(x => x.Claims)
            .Include(x => x.IdentityProviderRestrictions)
            .Include(x => x.AllowedCorsOrigins)
            .Include(x => x.Properties)
            .AsNoTracking()
            .ToList();

            return View(clients);
        }

        public IActionResult Edit(int id)
        {
            var client = _configurationDbContext.Clients
            .Include(x => x.AllowedGrantTypes)
            .Include(x => x.RedirectUris)
            .Include(x => x.PostLogoutRedirectUris)
            .Include(x => x.AllowedScopes)
            .Include(x => x.ClientSecrets)
            .Include(x => x.Claims)
            .Include(x => x.IdentityProviderRestrictions)
            .Include(x => x.AllowedCorsOrigins)
            .Include(x => x.Properties)
            .Where(x => x.Id == id)
            .AsNoTracking()
            .FirstOrDefault();

            return View(client);
        }

        public IActionResult GetScopes()
        {
            var identityResources = _configurationDbContext.IdentityResources
                .Select(x => x.Name).ToList();

            var apiScopes = _configurationDbContext.ApiResources
                .Select(x => x.Name).ToList();

            var scopes = identityResources.Concat(apiScopes).ToList();

            return Ok(scopes);
        }

        public IActionResult GetGrantTypes()
        {
            var allowedGrantypes = new List<string>
                {
                    "implicit",
                    "client_credentials",
                    "authorization_code",
                    "hybrid",
                    "password",
                    "urn:ietf:params:oauth:grant-type:device_code"
                };

            return Ok(allowedGrantypes);
        }
    }
}