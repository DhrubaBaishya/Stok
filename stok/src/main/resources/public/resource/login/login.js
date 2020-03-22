$(document).ready(function() {
	$('.message .close').on('click', function() {
		$(this).closest('.message').transition('fade');
	});

	$('.ui.form').form({
		fields : {
			username : 'empty',
			password : [ 'minLength[6]', 'empty' ]
		}
	});

});