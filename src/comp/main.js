(function(){
    function nombrar(nombre){
        return nombre;
    }

    function saluda(nombre){
        console.log(nombre, ' hi');
    }

    saluda(nombrar('Fabian Espitia'));
})();