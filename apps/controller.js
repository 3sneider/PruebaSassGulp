var app = angular.module("ToDo", ["LocalStorageModule"]);

app.controller("todoController", function($scope, $http, localStorageService){
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

    // Personas

    $scope.todos = [{ }];

    $scope.addTodo = function(){
        console.log($scope.todo);
        $scope.todos.push($scope.todo);
        $scope.todo = {} ;
    }

    // todo
    if(localStorageService.get("clave-todo")){
        $scope.tds = localStorageService.get("clave-todo");
    }else{
        $scope.tds = [ ];
    }

    $scope.td = {} ;

    $scope.addTd = function(){
        $scope.tds.push($scope.td);
        $scope.td = { } ;
    }

    $scope.clean = function(){
        $scope.tds = [] ;

    }

    $scope.$watchCollection('tds', function(newValue, oldValue){
        localStorageService.set("clave-todo", $scope.tds);
    });

    $scope.mi_html = "<p>aqui hay texto html que no se va a ver</p>"

    // otros filtros no personalizados son "date: 'short'", " json ",
    // "currency:$" con parametr para camiar el tipo de moneda
});

app.filter("delChar", function(){
    return function(texto){
        return String(texto).replace(/<[^>]+>/gm,'');
    }
})


