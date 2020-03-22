$(document).ready(function() {

	$("body").css("overflow", "hidden");

	$('.ui.sidebar').sidebar({
		context : $(' .bottom.segment')
	}).sidebar('attach events', '.menu .menuIcon');

	loadAllData();
	addEnterEventListener("searchInput");

	$('.ui.form').form({
		fields : {
			productName : 'empty'
		}
	});

});

var tableLoadedFlag = false;
var loadMorePerformed = false;
var searchTerm = '';
var searchClicked = false;
var page = 1;
var currentProduct = null;

function openProductModal() {
	$('#createModal').modal('setting', 'closable', false).modal('show');
}

function closeProductModal() {
	$('.modal').modal('hide');
}

function toggleSideBar() {
	$('.ui.sidebar').sidebar('toggle');
}

function cancelProductSave() {
	clearForm();
	toggleSideBar();
}

function cancelProductUpdate() {
	clearForm();
}

function loadProductUpdateModal(productId) {
	loadProduct(productId, [ "loadProductDataForUpdate",
			"openProductUpdateModal" ], []);
}

function openProductUpdateModal() {
	$('#updateModal').modal('setting', 'closable', false).modal('show');
}

function loadProductDataForUpdate() {
	if (currentProduct != null) {
		$("#uProductName").val(currentProduct.productName);
		$("#uCostPrice").val(currentProduct.costPrice);
		$("#uMrp").val(currentProduct.mrp);
		$("#uCompany").val(currentProduct.company);
		$("#uPayment").val(currentProduct.payment);
	}
}

function deleteProduct(elementId) {
	$('#deleteModal').modal('setting', 'closable', false).modal('show');
}

function confirmDelete(elementId) {
	confirmDeleteProduct(elementId, [ "closeProductModal", "clearForm",
			"deleteTableRow" ], [ "", "", currentProduct.productId ]);
}

function deleteTableRow(rowId) {
	var row = document.getElementById(rowId);
	row.parentNode.removeChild(row);
	var row = document.getElementById("m_" + rowId);
	row.parentNode.removeChild(row);
}

function confirmDeleteProduct(buttonId, callbackMethodNames,
		callbackMethodParams) {
	var key = [ "productId" ];
	var value = [ currentProduct.productId ];
	var url = "deleteProduct";
	addLoaderToButton(buttonId);
	$
			.ajax({
				type : "DELETE",
				url : getUrl(url, key, value),
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				data : JSON.stringify(currentProduct),
				success : function(data) {

					setTimeout(
							function() {

								if (callbackMethodNames != null) {
									for (var i = 0; i < callbackMethodNames.length; i++) {
										window[callbackMethodNames[i]]
												(callbackMethodParams[i]);
									}
								}
								removeLoaderFromButton(buttonId);

							}, 2000);

					// closeTaskCreation();
					// removeLoaderFromButton(buttonId);
					// emptyInput(['#taskName','#taskDescription']);
				},
				failure : function(errMsg) {
				}
			});
}

function loadProduct(productId, callbackMethodNames, callbackMethodParams) {
	var key = [ "productId" ];
	var value = [ productId ];
	var url = "loadProduct";
	$.ajax({
		type : 'GET',
		url : getUrl(url, key, value),
		success : function(data) {
			currentProduct = data;
			if (callbackMethodNames != null) {
				for (var i = 0; i < callbackMethodNames.length; i++) {
					window[callbackMethodNames[i]](callbackMethodParams[i]);
				}
			}
		},
		error : function() {
			alert(getUrl(url, key, value) + " is down");
		}

	});
}

function updateProduct(buttonId) {
	var productName = $("#uProductName").val();
	var costPrice = $("#uCostPrice").val();
	var mrp = $("#uMrp").val();
	var company = $("#uCompany").val();
	var payment = $("#uPayment").val();
	var product = new Product(currentProduct.productId, productName, costPrice,
			mrp, company, payment);
	if ($('#updateForm').form('is valid')) {
		commitProduct("update", product, buttonId, [ "closeProductModal",
				"clearForm" ], [ "", "" ]);
	} else {
		alert(1);
		return false;
	}
}

function saveProduct(buttonId) {
	var productName = $("#productName").val();
	var costPrice = $("#costPrice").val();
	var mrp = $("#mrp").val();
	var company = $("#company").val();
	var payment = $("#payment").val();
	var product = new Product(null, productName, costPrice, mrp, company,
			payment);
	if ($('#createForm').form('is valid')) {
		commitProduct("save", product, buttonId, [ "closeProductModal",
				"toggleSideBar", "clearForm" ], [ "", "", "" ]);
	} else {
		alert(1);
		return false;
	}
}

function commitProduct(action, product, buttonId, callbackMethodNames,
		callbackMethodParams) {
	if (action == "save")
		action = "POST";
	else if (action == "update")
		action = "PUT";
	addLoaderToButton(buttonId);
	$
			.ajax({
				type : action,
				url : restUrls.saveProduct,
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				data : JSON.stringify(product),
				success : function(data) {

					setTimeout(
							function() {

								if (callbackMethodNames != null) {
									for (var i = 0; i < callbackMethodNames.length; i++) {
										window[callbackMethodNames[i]]
												(callbackMethodParams[i]);
									}
								}

								removeLoaderFromButton(buttonId);

							}, 2000);
					// closeTaskCreation();
					// removeLoaderFromButton(buttonId);
					// emptyInput(['#taskName','#taskDescription']);
				},
				failure : function(errMsg) {
				}
			});
}

function loadAllData() {
	var key = [ "page", "pageSize" ];
	var value = [ page, restUrls.pageSize ];
	var url = 'loadInventoryTable';
	loadTable(url, key, value);
	url = "loadInventoryMobileTable";
	loadMobileTable(url, key, value);
}

function loadMobileTable(url, key, value) {
	var mobileTableBody = $("#inventoryMobileTable tbody");

	if (!loadMorePerformed) {
		placeContentLoader(mobileTableBody, 1);
		page = 1;
		for (var i = 0; i < key.length; i++) {
			if (key[i] == "page")
				value[i] = page;
		}
	}

	$.ajax({
		type : 'GET',
		url : getUrl(url, key, value),
		success : function(data) {

			setTimeout(function() {
				if (!loadMorePerformed) {
					$("#inventoryMobileTable tbody tr").remove();
				}
				// loadMorePerformed = false;
				if ($("#loadMoreMobile") != null)
					$("#loadMoreMobile").parent().parent().remove();

				if (data.length == 0 && page == 1) {
					mobileTableBody.append(setEmptyPlaceHolder(1));
				} else {
					mobileTableBody.append(data);
				}

			}, 1000);
		},
		error : function() {
			alert(getUrl(url, key, value));
		}

	});
}

function loadTable(url, key, value) {
	var tableBody = $("#inventoryTable tbody");

	if (!loadMorePerformed) {
		placeContentLoader(tableBody, 5);
		page = 1;
		for (var i = 0; i < key.length; i++) {
			if (key[i] == "page")
				value[i] = page;
		}
	}

	$.ajax({
		type : 'GET',
		url : getUrl(url, key, value),
		success : function(data) {

			setTimeout(function() {

				if (!loadMorePerformed) {
					$("#inventoryTable tbody tr").remove();
				}
				// loadMorePerformed = false;
				if ($("#loadMore") != null)
					$("#loadMore").parent().parent().remove();

				if (data.length == 0 && page == 1) {
					tableBody.append(setEmptyPlaceHolder(5));
				} else {
					tableBody.append(data);
				}

			}, 1000);
		},
		error : function() {
			alert(getUrl(url, key, value));
		}

	});
}

function search(elementId) {
	searchClicked = true;
	var key = [ "page", "pageSize", "productName" ];
	var value = [ page, restUrls.pageSize, searchTerm ];
	var url = 'searchAndLoadInventoryTable';
	loadTable(url, key, value);
	var url = 'searchAndLoadInventoryMobileTable';
	loadMobileTable(url, key, value);
}

function getUrl(restUrl, key, value) {
	var url = restUrls[restUrl];
	for (var i = 0; i < key.length; i++) {
		url = url.replace("<" + key[i] + ">", value[i]);
	}
	return url;
}

function loadMoreProducts(elementId) {
	addLoaderToButton(elementId);
	loadMorePerformed = true;
	page++;
	setTimeout(function() {
		if (searchClicked)
			search(elementId);
		else
			loadAllData();

	}, 500);
	// loadTask(taskStatus);
}

function removeLoaderFromButton(elementId) {
	document.getElementById(elementId).className = "ui button";
}

function addLoaderToButton(elementId) {
	document.getElementById(elementId).className += " loading";
}

function setEmptyPlaceHolder(column) {
	var row = '<tr><td colspan="' + column + '">';
	row += '<div class="ui placeholder segment">';
	row += '<div class="ui icon grey header">';
	row += '<i class="exclamation circle icon"></i>';
	row += 'No Items Available.';
	row += '</div>';
	row += '</div></td></tr>';
	return row;
}

function placeContentLoader(tableBody, column) {
	var loader = '<tr>';
	for (var i = 0; i < column; i++) {
		loader += '<td><div class="ui placeholder"><div class="line"></div></div><br></td>';
	}
	loader += '<tr>';
	tableBody.append(loader);
}

function addEnterEventListener(elementId) {

	var input = document.getElementById(elementId);

	input.addEventListener("keyup", function(event) {
		if (event.keyCode == 13) {
			event.preventDefault();
			searchTerm = $("#" + elementId).val();
			loadMorePerformed = false;
			if (searchTerm == '') {
				page = 1;
				searchClicked = false;
				loadAllData();
			} else {
				search(elementId);
			}
		}
	});
}

function isNumberKey(evt) {
	var charCode = (evt.which) ? evt.which : evt.keyCode
	if (charCode > 31 && (charCode < 48 || charCode > 57))
		return false;
	return true;
}

function clearForm() {
	clearInput("productName");
	clearInput("costPrice");
	clearInput("mrp");
	clearInput("company");
	clearInput("payment");

	clearInput("uProductName");
	clearInput("uCostPrice");
	clearInput("uMrp");
	clearInput("uCompany");
	clearInput("uPayment");
}

function clearInput(elementId) {
	$("#" + elementId).val('');
}