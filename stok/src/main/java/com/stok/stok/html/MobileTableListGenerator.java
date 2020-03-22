package com.stok.stok.html;

import java.util.List;

import com.stok.stok.entity.Inventory;

public class MobileTableListGenerator {

	private List<Inventory> products;
	private int pageSize;

	public MobileTableListGenerator(List<Inventory> products, int pageSize) {
		this.products = products;
		this.pageSize = pageSize;
	}

	public List<Inventory> getProducts() {
		return products;
	}

	public void setProducts(List<Inventory> products) {
		this.products = products;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	@Override
	public String toString() {

		String result = "";
		for (Inventory product : products) {
			result += "<tr id=\"m_" + product.getProductId() + "\">";
			result += "<td><a class=\"pointer\" onclick=\"loadProductUpdateModal(" + product.getProductId() + ")\">" + product.getProductName() + "</a></td>";
			result += "</tr>";
		}
		
		if(pageSize == products.size()) {
			result += "<tr><td>";
			result += "<button class=\"ui button\" id=\"loadMoreMobile\" onclick=\"loadMoreProducts(this.id)\">Load More</button>";
			result+= "</td></tr>";
		}

		return result;
	}

}
