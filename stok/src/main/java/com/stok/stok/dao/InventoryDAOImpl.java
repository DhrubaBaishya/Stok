package com.stok.stok.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import com.stok.stok.entity.Inventory;

@Repository
public class InventoryDAOImpl implements InventoryDAO {

	@PersistenceContext
	private EntityManager entityManager;
	
	@Override
	public Inventory saveProduct(Inventory product) {
		Session session = entityManager.unwrap(Session.class);
		session.saveOrUpdate(product);
		return product;
	}

	@Override
	public Inventory getProduct(Long productId) {
		Session session = entityManager.unwrap(Session.class);
		return session.get(Inventory.class, productId);
	}

	@Override
	public List<Inventory> getAllInventory(int page, int pageSize) {
		Session session = entityManager.unwrap(Session.class);
		Query<Inventory> query = session.createQuery("from Inventory order by creationDate desc",Inventory.class);
		query.setFirstResult((page -1) * pageSize);
		query.setMaxResults(pageSize);
		return query.getResultList();
	}

	@Override
	public List<Inventory> searchInventory(int page, int pageSize, String productName) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Inventory> query = builder.createQuery(Inventory.class);
		Root<Inventory> root = query.from(Inventory.class);
		Predicate likeProductName = builder.like(root.get("productName"), "%" + productName + "%");
		query.where(likeProductName);
		query.orderBy(builder.desc(root.get("creationDate")));
		TypedQuery<Inventory> products = entityManager.createQuery(query.select(root));
		products.setFirstResult((page -1) * pageSize);
		products.setMaxResults(pageSize);
		return products.getResultList();
	}

	@Override
	public Inventory deleteProduct(Long productId) {
		Session session = entityManager.unwrap(Session.class);
		Inventory product = getProduct(productId);
		session.delete(product);
		return product;
	}

}
