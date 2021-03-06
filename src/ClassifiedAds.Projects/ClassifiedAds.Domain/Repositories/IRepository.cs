﻿using ClassifiedAds.Domain.Entities;
using System.Linq;

namespace ClassifiedAds.Domain.Repositories
{
    public interface IRepository<TEntity, TKey>
        where TEntity : AggregateRoot<TKey>
    {
        IUnitOfWork UnitOfWork { get; }

        IQueryable<TEntity> GetAll();

        void Add(TEntity entity);

        void Delete(TEntity entity);
    }
}
