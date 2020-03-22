package com.stok.stok.dao;

import java.util.List;

import com.stok.stok.entity.Inventory;

public interface InventoryDAO {
	public Inventory saveProduct(Inventory product);
	public Inventory getProduct(Long productId);
	public List<Inventory> getAllInventory(int page, int pageSize);
	public List<Inventory> searchInventory(int page, int pageSize, String productName);
	public Inventory deleteProduct(Long productId);
}
