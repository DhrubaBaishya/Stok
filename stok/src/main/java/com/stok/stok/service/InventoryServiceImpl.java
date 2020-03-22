package com.stok.stok.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stok.stok.dao.InventoryDAO;
import com.stok.stok.entity.Inventory;

@Service
public class InventoryServiceImpl implements InventoryService {
	
	@Autowired
	private InventoryDAO inventory;

	@Override
	@Transactional
	public Inventory saveProduct(Inventory product) {
		return inventory.saveProduct(product);
	}

	@Override
	@Transactional
	public Inventory getProduct(Long productId) {
		return inventory.getProduct(productId);
	}

	@Override
	@Transactional
	public List<Inventory> getAllInventory(int page, int pageSize) {
		return inventory.getAllInventory(page, pageSize);
	}

	@Override
	@Transactional
	public List<Inventory> searchInventory(int page, int pageSize, String productName) {
		return inventory.searchInventory(page, pageSize, productName);
	}

	@Override
	@Transactional
	public Inventory deleteProduct(Long productId) {
		return inventory.deleteProduct(productId);
	}

}
