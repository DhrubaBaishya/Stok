package com.stok.stok.service;

import java.util.List;

import com.stok.stok.entity.Inventory;

public interface InventoryService {
	public Inventory saveProduct(Inventory product);
	public Inventory getProduct(Long productId);
	public List<Inventory> getAllInventory(int page, int pageSize);
	public List<Inventory> searchInventory(int page, int pageSize, String productName);
	public Inventory deleteProduct(Long productId);
}
