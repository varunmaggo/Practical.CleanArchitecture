using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityServer4.EntityFramework.DbContexts;
using Microsoft.AspNetCore.Mvc;

namespace ClassifiedAds.IdentityServer.Controllers
{
    public class ApiResourceController : Controller
    {
        private readonly ConfigurationDbContext _configurationDbContext;

        public ApiResourceController(ConfigurationDbContext configurationDbContext)
        {
            _configurationDbContext = configurationDbContext;
        }

        public IActionResult Index()
        {
            var apis = _configurationDbContext.ApiResources.ToList();
            return View(apis);
        }
    }
}