package com.stok.stok.html;

import java.util.List;

import com.stok.stok.entity.Inventory;

public class TableListGenerator {

	private List<Inventory> products;
	private int pageSize;

	public TableListGenerator(List<Inventory> products, int pageSize) {
		this.products = products;
		this.pageSize = pageSize;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public List<Inventory> getProducts() {
		return products;
	}

	public void setProducts(List<Inventory> products) {
		this.products = products;
	}

	@Override
	public String toString() {

		String result = "";
		for (Inventory product : products) {
			result += "<tr id=\"" + product.getProductId() + "\">";
			result += "<td><a class=\"pointer\" onclick=\"loadProductUpdateModal(" + product.getProductId() + ")\">" + product.getProductName() + "</a></td>";
			result += "<td>" + (product.getCostPrice() == null ? " -" : product.getCostPrice()) + "</td>";
			result += "<td>" + (product.getMrp() == null ? " -" : product.getMrp()) + "</td>";
			result += "<td>" + (product.getCompany() == null || product.getCompany().length() == 0 ? " -" : product.getCompany()) + "</td>";
			result += "<td>" + (product.getPayment() == null || product.getPayment().length() == 0 ? " -" : product.getPayment()) + "</td>";
			result += "</tr>";
		}
		
		if(pageSize == products.size()) {
			result += "<tr><td></td><td></td><td></td><td></td><td>";
			result += "<button class=\"ui button\" id=\"loadMore\" onclick=\"loadMoreProducts(this.id)\">Load More</button>";
			result+= "</td></tr>";
		}

		return result;

	}

}
