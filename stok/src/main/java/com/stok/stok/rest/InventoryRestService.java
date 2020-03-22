package com.stok.stok.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stok.stok.entity.Inventory;
import com.stok.stok.html.MobileTableListGenerator;
import com.stok.stok.html.TableListGenerator;
import com.stok.stok.service.InventoryService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class InventoryRestService {
	
	@Autowired
	private InventoryService service;
	
	@GetMapping("/inventory/{productId}")
	public Inventory getProduct(@PathVariable Long productId) {
		return service.getProduct(productId);
	}
	
	@GetMapping(value = "/inventory",params = {"page","pageSize"})
	public List<Inventory> getAllProduct(@RequestParam("page") int page,@RequestParam("pageSize") int pageSize){
		return service.getAllInventory(page, pageSize);
	}
	
	@GetMapping(value ="/inventory",params = {"page","pageSize","productName"})
	public List<Inventory> searchProduct(@RequestParam("page") int page, @RequestParam("pageSize") int pageSize,@RequestParam("productName") String productName){
		return service.searchInventory(page, pageSize, productName);
	}
	
	@PostMapping("/inventory")
	public Inventory createProduct(@RequestBody Inventory product) {
		return service.saveProduct(product);
	}
	
	@PutMapping("/inventory")
	public Inventory updateProduct(@RequestBody Inventory product) {
		return service.saveProduct(product);
	}
	
	@DeleteMapping("/inventory/{productId}")
	public Inventory deleteProduct(@PathVariable Long productId) {
		 return service.deleteProduct(productId);
	}

	@GetMapping(value = "/inventory/table",params = {"page","pageSize"})
	public String getTableListOfProducts(@RequestParam("page") int page,@RequestParam("pageSize") int pageSize) {
		return new TableListGenerator(service.getAllInventory(page, pageSize),pageSize).toString();
	}

	@GetMapping(value = "/inventory/table",params = {"page","pageSize","productName"})
	public String getTableListOfSearchedProducts(@RequestParam("page") int page,@RequestParam("pageSize") int pageSize,@RequestParam("productName") String productName) {
		return new TableListGenerator(service.searchInventory(page, pageSize, productName),pageSize).toString();
	}

	@GetMapping(value = "/inventory/mobileTable",params = {"page","pageSize"})
	public String getMobileTableListOfProducts(@RequestParam("page") int page,@RequestParam("pageSize") int pageSize) {
		return new MobileTableListGenerator(service.getAllInventory(page, pageSize),pageSize).toString();
	}

	@GetMapping(value = "/inventory/mobileTable",params = {"page","pageSize","productName"})
	public String getMobileTableListOfSearchedProducts(@RequestParam("page") int page,@RequestParam("pageSize") int pageSize,@RequestParam("productName") String productName) {
		return new MobileTableListGenerator(service.searchInventory(page, pageSize, productName),pageSize).toString();
	}
	
}
