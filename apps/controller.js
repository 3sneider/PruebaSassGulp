var app = angular.module("ToDo", ["LocalStorageModule"]);

app.factory('todoService', function(localStorageService){ // una factory es una clase
    var todoService = {}; // que contiene objetos que van a ser retornados
    todoService.key = "clave";
    if(localStorageService.get(todoService.key)){
        todoService.activities = localStorageService.get(todoService.key);
    }
    else{
        todoService.activities = [];
    }
    todoService.UpdaLocalStorage = function(){ // estos metodos van en el objeto
        localStorageService.set(todoService.key, todoService.activities);
    };
    todoService.add = function(td){ // y metodos que reciven parametros
        todoService.activities.push(td);
        todoService.UpdaLocalStorage();
    };
    todoService.clean = function(){
        todoService.activities = [ ];
        todoService.UpdaLocalStorage();
        return todoService.getAll();
    };
    todoService.getAll = function(){
        return todoService.activities;
    };
    todoService.removeItem = function(item){
        todoService.activities = todoService.activities.filter(function(act){
            return act !== item;
        });
        todoService.UpdaLocalStorage();
        return todoService.getAll();
    };

    return todoService; // devolbemos un objeto con los metodos creados
});

app.service('personService', function(){ // no retorna, ses mas un constructor

    this.todos = [ ] ;

    this.add = function(todo){ // y metodos que reciven parametros
        this.todos.push(todo);
    };
    this.clean = function(){
        this.todos = [ ];
        return this.getAll();
    };
    this.getAll = function(){
        return this.todos;
    };
    this.removeItem = function(item){
        this.todos = this.todos.filter(function(todo){
            return todo !== item;
        });
        return this.getAll();
    };
});

app.controller("todoController", function($scope, $http, todoService, personService){
    // colores

    /* Funciona pero trae muchos resultados y traba el navegador
    $scope.images = [] ;
    $http({
        method: 'GET',
        url: 'http://jsonplaceholder.typicode.com/photos'
    }).then(function success(response){
        $scope.images = response.data ;
        console.log($scope.images);
    },function error(err){
        console.log(err)
    });
    */

    // post

    $scope.posts = [] ;
    $scope.post = { } ;

    $http({
        method: 'GET',
        url: 'http://jsonplaceholder.typicode.com/posts'
    }).then(function success(response){
        $scope.posts = response.data ;
        console.log($scope.posts);
    },function error(err){
        console.log(err)
    });

    $scope.addPost = function(){
        $http({
            method: 'POST',
            url: 'http://jsonplaceholder.typicode.com/posts',
            data: $scope.post
        }).then(function success(response){
            $scope.posts.push($scope.post);
            console.log($scope.post);
            $scope.post = {}
        },function error(err){
            console.log(err)
        });
    }

    // Este es el ejercicoi de personas
    // implementado mediante un service
    $scope.todo = { };

    $scope.todos = personService.getAll();

    $scope.addTodo = function(){
        personService.getAll();
        personService.add($scope.todo);
        $scope.todo = { } ;
    }

    $scope.cle = function(){
        $scope.todos = personService.clean();

    };

    $scope.rem = function(item){
        $scope.todos = personService.removeItem(item);

    };

    // este es el ejercicio del todo
    // implementado mediante una factory
    $scope.td = { } ;

    $scope.addTd = function(){
        todoService.getAll();
        todoService.add($scope.td);
        $scope.td = { };
    };

    $scope.clean = function(){
        $scope.tds = todoService.clean();

    };

    $scope.remove = function(item){
        $scope.tds = todoService.removeItem(item);

    };

    $scope.tds = todoService.getAll();

    // aplicando filtros

    $scope.mi_html = "<p>aqui hay texto html que no se va a ver</p>"

    // otros filtros no personalizados son "date: 'short'", " json ",
    // "currency:$" con parametr para camiar el tipo de moneda
});

app.filter("delChar", function(){
    return function(texto){
        return String(texto).replace(/<[^>]+>/gm,'');
    }
})
