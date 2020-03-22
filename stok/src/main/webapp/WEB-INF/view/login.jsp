<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Login To Stok</title>

<link rel="stylesheet" type="text/css"
	href="resource/semantic/dist/semantic.min.css">
<link rel="stylesheet" type="text/css" href="resource/login/login.css">
<script src="https://code.jquery.com/jquery-3.1.1.min.js"
	integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
	crossorigin="anonymous"></script>
<script src="resource/semantic/dist/semantic.min.js"></script>
<script src="resource/login/login.js"></script>
</head>
<body>

	<div class="ui middle aligned center aligned grid">
		<div class="fourteen wide column">
			<h2 class="ui teal image header">
				<div class="content">Login to your account</div>
			</h2>

			<div class="ui fluid card">
				<div class="content">
					<form:form class="ui form"
						action="${pageContext.request.contextPath}/authenticateUser">
						<div class="field">
							<div class="ui left icon input">
								<i class="user icon"></i> <input type="text" name="username"
									placeholder="Username">
							</div>
						</div>
						<div class="field">
							<div class="ui left icon input">
								<i class="lock icon"></i> <input type="password" name="password"
									placeholder="Password">
							</div>
						</div>
						<input type="submit" value="Login"
							class="ui fluid large teal submit button" />
					</form:form>
				</div>

			</div>
			<c:if test="${param.error != null}">
				<div class="ui negative message">
					<i class="close icon"></i>
					<div class="header">Login Failed</div>
					<p>You might have misspelled your username or password!</p>
				</div>
			</c:if>
		</div>
	</div>

</body>
</html>