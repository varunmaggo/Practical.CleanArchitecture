using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ClassifiedAds.IdentityServer.Models.IdentityResourceModels;
using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace ClassifiedAds.IdentityServer.Controllers
{
    public class IdentityResourceController : Controller
    {
        private readonly ConfigurationDbContext _configurationDbContext;

        public IdentityResourceController(ConfigurationDbContext configurationDbContext)
        {
            _configurationDbContext = configurationDbContext;
        }

        public IActionResult Index()
        {
            var itentities = _configurationDbContext.IdentityResources.ToList();
            return View(itentities.ToModels().ToList());
        }

        public IActionResult Edit(int id)
        {
            var identity = _configurationDbContext.IdentityResources
                .Include(x => x.UserClaims)
                .FirstOrDefault(x => x.Id == id);
            return View(identity.ToModel());
        }

        [HttpPost]
        public IActionResult Edit(IdentityResourceModel model)
        {
            var identity = _configurationDbContext.IdentityResources
                .Include(x => x.UserClaims)
                .FirstOrDefault(x => x.Id == model.Id);

            model.UpdateEntity(identity);
            identity.UserClaims.Clear();

            if (!string.IsNullOrEmpty(model.UserClaimsItems))
            {
                model.UserClaims = JsonConvert.DeserializeObject<List<string>>(model.UserClaimsItems);

                identity.UserClaims.AddRange(model.UserClaims.Select(x => new IdentityClaim
                {
                    Type = x,
                }));
            }

            _configurationDbContext.SaveChanges();

            return RedirectToAction(nameof(Edit), new { id = model.Id });
        }

        public IActionResult PropertiesList(int id)
        {
            var identity = _configurationDbContext.IdentityResources
                .Include(x => x.Properties)
                .FirstOrDefault(x => x.Id == id);
            return View(PropertiesListModel.FromEntity(identity));
        }

        [HttpPost]
        public IActionResult AddProperty(PropertiesListModel model)
        {
            var identity = _configurationDbContext.IdentityResources
                .Include(x => x.Properties)
                .FirstOrDefault(x => x.Id == model.IdentityResourceId);

            identity.Properties.Add(new IdentityResourceProperty
            {
                Key = model.Key,
                Value = model.Value,
            });

            _configurationDbContext.SaveChanges();

            return RedirectToAction(nameof(PropertiesList), new { id = identity.Id });
        }

        [HttpGet]
        public IActionResult DeleteProperty(int id)
        {
            var prop = _configurationDbContext.Set<IdentityResourceProperty>()
                .Include(x => x.IdentityResource)
                .FirstOrDefault(x => x.Id == id);
            return View(IdentityResourcePropertyModel.FromEntity(prop));
        }

        [HttpPost]
        public IActionResult DeleteProperty(IdentityResourcePropertyModel model)
        {
            var identity = _configurationDbContext.IdentityResources
                            .Include(x => x.Properties)
                            .FirstOrDefault(x => x.Id == model.IdentityResource.Id);
            var prop = identity.Properties.FirstOrDefault(x => x.Id == model.Id);
            identity.Properties.Remove(prop);
            _configurationDbContext.SaveChanges();

            return RedirectToAction(nameof(PropertiesList), new { id = identity.Id });
        }

        public IActionResult GetClaims()
        {
            // http://openid.net/specs/openid-connect-core-1_0.html#StandardClaims
            var standardClaims = new List<string>
            {
                "name",
                "given_name",
                "family_name",
                "middle_name",
                "nickname",
                "preferred_username",
                "profile",
                "picture",
                "website",
                "gender",
                "birthdate",
                "zoneinfo",
                "locale",
                "address",
                "updated_at",
            };

            return Ok(standardClaims);
        }
    }
}