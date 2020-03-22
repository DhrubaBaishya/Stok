restUrls = {
		loadInventoryTable: 'http://localhost:8080/stok/api/inventory/table?page=<page>&pageSize=<pageSize>',
		loadInventoryMobileTable: 'http://localhost:8080/stok/api/inventory/mobileTable?page=<page>&pageSize=<pageSize>',
		searchAndLoadInventoryTable: 'http://localhost:8080/stok/api/inventory/table?page=<page>&pageSize=<pageSize>&productName=<productName>',
		searchAndLoadInventoryMobileTable: 'http://localhost:8080/stok/api/inventory/mobileTable?page=<page>&pageSize=<pageSize>&productName=<productName>',
		saveProduct: 'http://localhost:8080/stok/api/inventory',
		loadProduct: 'http://localhost:8080/stok/api/inventory/<productId>',
		deleteProduct: 'http://localhost:8080/stok/api/inventory/<productId>',
		pageSize: 4
}