let app = angular.module('todolistApp', ['ngRoute']);
let baseUrlEmp = "https://to-do-list-a258d.firebaseio.com/employees/.json"
let baseUrlTask = "https://to-do-list-tasks.firebaseio.com/todoList.json"

//main controller
app.controller('loginBegin', function ($scope, getDataService) {
    $scope.login = "Login:"
    $scope.data = [];
    $scope.admin = "Josh";
    $scope.currentUser = {};
    $scope.getData = () =>
        displayTasks(getDataService, $scope);
    $scope.addData = () =>
        createTask(getDataService);

})

app.controller('displayController', function ($scope, getDataService) {
 
})
/*app.controller('taskHandler', function($scope, getDataService, $compile){

    $scope.create = () =>
        createTask(getDataService, $scope);
})*/

//function to grab data
function displayTasks(getServiceData, $scope) {
    let empData = getServiceData.getCall(baseUrlEmp);
    let taskData = getServiceData.getCall(baseUrlTask);
    let user = document.getElementById("login").value;
    //.then part of promise returned in ajaxCall 
    empData.then(function (response) {
        let employees = response.data;
        for (let employee in employees) {
            if (employees[employee].username == user) {
                alert("Welcome to the ToDoList");
                $scope.currentUser = {
                    username: user,
                    name: employees[employee].name
                };
                if (employees[employee].access == "admin") {
                    alert("Admin Privleges");
                }
                break;
            }
        }
    }).catch(function (errorResponse) {
        console.log(errorResponse);
    })
    //get task data of user
    taskData.then(function (response) {
        let taskData = response.data;
        console.log(user);
        //console.log(response.data);
        for (let guid in taskData) {
            if (taskData[guid].username == user) {
                $scope.data.push(taskData[guid]);
                $scope.guidVal = taskData[guid].id;
            }
        }
    })
}

function createTask(getServiceData, $scope) {
    let title = document.getElementById("Title").value;
    let description = document.getElementById("Description").value;
    let newGuid = guid();
    let user = $scope.currentUser.username;
    let name = $scope.currentUser.name;
    let dataInput = {
        title,
        description,
        user,
        name,
        newGuid
    }
    let taskData = getServiceData.updateCall(baseUrlEmp, dataInput);
    taskData.then(function (success) {
            console.log(success);
        }).catch(function (error) {
            console.log(error);
        })
    }

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }