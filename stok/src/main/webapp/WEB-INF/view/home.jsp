<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="security"
	uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" type="text/css"
	href="resource/semantic/dist/semantic.min.css">
<link rel="stylesheet" type="text/css" href="resource/common/common.css">
<!-- link rel="stylesheet" type="text/css" href="resource/home/home.css"-->
<script src="https://code.jquery.com/jquery-3.1.1.min.js"
	integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
	crossorigin="anonymous"></script>
<title>Stok</title>
</head>
<body>


	<div class="ui orange inverted top attached demo menu">
		<a class="menuIcon item"> <i class="sidebar icon"></i> Stok
		</a>
		<div class="right menu">
			<div class="ui right aligned category search item">
				<div class="ui icon input">
					<input class="prompt" type="text" id="searchInput"
						placeholder="Search inventory..."> <i
						class="search link icon" onclick="search('searchInput')"></i>
				</div>
			</div>
		</div>

	</div>
	</div>
	<div class="ui bottom attached segment pushable">
		<div
			class="ui inverted labeled icon left inline vertical sidebar menu"
			style="">
			<a class="item" onclick="openProductModal()"> <i
				class="pen square icon"></i> Create
			</a> <a class="item" href="${pageContext.request.contextPath}/logout">
				<i class="power off icon"></i> Logout
			</a>
		</div>
		<div class="pusher">
			<div class="ui basic segment">

				<table
					class="ui fixed single line compact striped orange table desktop"
					id="inventoryTable">
					<thead>
						<tr>
							<th class="six wide">Product</th>
							<th class="two wide">Cost Price</th>
							<th class="two wide">MRP</th>
							<th class="three wide">Company</th>
							<th class="three wide">Payment</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>

				<table
					class="ui fixed single line compact striped orange table mobile"
					id="inventoryMobileTable">
					<thead>
						<tr>
							<th class="wide">Product</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>

			</div>
		</div>
	</div>






	<div class="ui modal" id="createModal">
		<div class="header">Product Details</div>
		<div class="content">

			<form class="ui form" id="createForm">
				<div class="field">
					<label>Product Name</label><input type="text" id="productName" />
				</div>
				<div class="two fields">
					<div class="field">
						<label>Cost Price</label><input type="text" id="costPrice"
							onkeypress="return isNumberKey(event)" />
					</div>
					<div class="field">
						<label>Mrp</label><input type="text" id="mrp"
							onkeypress="return isNumberKey(event)" />
					</div>
				</div>
				<div class="two fields">
					<div class="field">
						<label>Company</label><input type="text" id="company" />
					</div>
					<div class="field">
						<label>Payment</label><input type="text" id="payment" />
					</div>
				</div>
			</form>

		</div>
		<div class="actions">
			<div class="ui button" id="saveProduct"
				onclick="saveProduct(this.id)">Save</div>
			<div class="ui cancel button" onclick="cancelProductSave()">Cancel</div>
		</div>
	</div>




	<div class="ui modal" id="updateModal">
		<div class="header">Product Details</div>
		<div class="content">

			<form class="ui form">
				<div class="field">
					<label>Product Name</label><input type="text" id="uProductName" />
				</div>
				<div class="two fields">
					<div class="field">
						<label>Cost Price</label><input type="text" id="uCostPrice"
							onkeypress="return isNumberKey(event)" />
					</div>
					<div class="field">
						<label>Mrp</label><input type="text" id="uMrp"
							onkeypress="return isNumberKey(event)" />
					</div>
				</div>
				<div class="two fields">
					<div class="field">
						<label>Company</label><input type="text" id="uCompany" />
					</div>
					<div class="field">
						<label>Payment</label><input type="text" id="uPayment" />
					</div>
				</div>
			</form>

		</div>
		<div class="actions">
			<div class="ui button" id="updateProduct"
				onclick="updateProduct(this.id)">Save</div>
			<div class="ui button" onclick="deleteProduct()">Delete</div>
			<div class="ui cancel button" onclick="cancelProductUpdate()">Cancel</div>
		</div>
	</div>


	<div class="ui mini modal" id="deleteModal">
		<div class="ui icon header">Delete Item</div>
		<div class="content">
			<p>Are you sure you want to delete this item?</p>
		</div>
		<div class="actions">
			<div class="ui cancel button">
				<i class="remove icon"></i> No
			</div>
			<div class="ui red inverted button" id="deleteProduct"
				onclick="confirmDelete(this.id)">
				<i class="checkmark icon"></i> Yes
			</div>
		</div>
	</div>




	<script src="resource/semantic/dist/semantic.min.js"></script>
	<script src="resource/common/properties.js"></script>
	<script src="resource/common/class.js"></script>
	<script src="resource/common/common.js"></script>
	<!-- script src="resource/home/home.js"></script-->

</body>
</html>