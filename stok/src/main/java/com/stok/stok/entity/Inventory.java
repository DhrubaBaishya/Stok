package com.stok.stok.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "inventory")
public class Inventory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "product_id")
	private Long productId;

	@Column(name = "product_name")
	private String productName;

	@Column(name = "cost_price")
	private Long costPrice;

	@Column(name = "mrp")
	private Long mrp;

	@Column(name = "company")
	private String company;

	@Column(name = "payment")
	private String payment;

	@CreationTimestamp
	@Column(name = "creation_date", updatable = false)
	private Timestamp creationDate;

	public Inventory() {
	}

	public Inventory(String productName, Long costPrice, Long mrp, String company, String payment) {
		this.productName = productName;
		this.costPrice = costPrice;
		this.mrp = mrp;
		this.company = company;
		this.payment = payment;
	}

	public Timestamp getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Timestamp creationDate) {
		this.creationDate = creationDate;
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public Long getCostPrice() {
		return costPrice;
	}

	public void setCostPrice(Long costPrice) {
		this.costPrice = costPrice;
	}

	public Long getMrp() {
		return mrp;
	}

	public void setMrp(Long mrp) {
		this.mrp = mrp;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getPayment() {
		return payment;
	}

	public void setPayment(String payment) {
		this.payment = payment;
	}

}
