$(document).ready(function() {

	loadOneTask();

});
var taskData = null;

function loadOneTask(){
	var taskId = getUrlVars()['taskId'];
	var key = ['taskId'];
	var value = [taskId];
	showHideEditButton(false);
	$.ajax({
        type: 'GET',
        url: getUrl('loadTask',key,value),
        success: function(data){
        	taskData = data;
        	updateTaskFields(data);
        	showHideEditButton(true);
        },
        error:function(){
        }

    });
}

function showHideEditButton(flag){
	var elem = document.getElementById("editTask");
	if(flag){
		elem.className = "ui top right attached label pointer";
	}
	else{
		elem.className += " hidden";
	}
}

function updateTask(buttonId){
	var taskName = $("#taskName").val();
	var taskDescription = $("#taskDescription").val();
	var privateFlag = $("#privateFlag").prop("checked") == true ? "Y" : "N";
	var status = $("#statusLOV").children("option:selected").val();
	var priority = $("#priorityLOV").children("option:selected").val();

	var updatedTask = new Task(getUrlVars()['taskId'],taskName,taskDescription,userId,status,priority,privateFlag);

	checkIfUpdated(updatedTask,buttonId);
}

function checkIfUpdated(updatedTask,buttonId){
	if(taskData.taskName != updatedTask.taskName || taskData.taskDescription != updatedTask.taskDescription
		|| taskData.privateFlag != updatedTask.privateFlag || taskData.status != updatedTask.status
		|| taskData.priority != updatedTask.priority){
		commitTask("update",updatedTask,buttonId,["updateTaskFields","showReadOnlySegment","loadOneTask"],[updatedTask,"",""]);
		//updateTaskFields(updatedTask);
		//showReadOnlySegment();
	}
}

function update(){
	updateTaskFields(taskData);
	showEditSegment();
}

function cancelUpdateTask(){
	showReadOnlySegment();
}


function showEditSegment(){
	document.getElementById("readOnlySegment").className += " hidden";
	document.getElementById("editSegment").className = "ui very padded segment";
}

function showReadOnlySegment(){
	document.getElementById("readOnlySegment").className = "ui very padded segment";
	document.getElementById("editSegment").className += " hidden";
}

function updateTaskFields(data){
	updateFields('taskName',data.taskName);
	updateFields('taskDescription',data.taskDescription);
	updateFields('status',data.status);
	updateFields('priority',data.priority);
	updateFields('privateFlag',data.privateFlag);
}

function updateFields(name,value){
	if(name == 'privateFlag'){
		var elems = document.getElementsByName(name);
		for(elem of elems){
			if(elem.nodeName == 'DIV'){
				if(value == 'Y')
					elem.className = "field";
				else
					elem.className += " hidden";
			}
			else if(elem.nodeName == 'INPUT'){
				if(value == 'Y')
					$(elem).prop('checked', true);
				else
					$(elem).prop('checked', false);
			}
		}
	}
	else if(name == 'status' || name == "priority"){
		var elems = document.getElementsByName(name);
		for(elem of elems){
			if(elem.nodeName == 'P')
				elem.innerHTML = value;			
			else if(elem.nodeName == 'SELECT')
				loadLOVS(name,value);
		}
	}
	else{
		var elems = document.getElementsByName(name);
		for(elem of elems){
			if(elem.nodeName == 'INPUT' || elem.nodeName == 'TEXTAREA'){
				elem.value = value;
			}
			else if(elem.nodeName == 'P'){
				if(value != ''){
					elem.parentElement.className = "field";
					elem.innerHTML = value;
				}
				else{
					elem.parentElement.className += " hidden";
					elem.innerHTML = value;
				}
			}
		}		
	}
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
