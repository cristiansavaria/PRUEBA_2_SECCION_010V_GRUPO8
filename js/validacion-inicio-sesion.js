jQuery(document).ready(function(){

    $("#username").blur(function(){
        valorIngresado = $("this").val();
        var espacios = false;
        var cont = 0;
    
        console.log("el valor ingresado es: "+valorIngresado) //rescato el valor ingresado
    
        while (!espacios && (cont < valorIngresado.length)) { // recorro el valor ingresado
            if (valorIngresado.charAt(cont) == " "){ 
            espacios = true; //valida los espacios en blanco
            cont++;
            }
        }
    
        if (valorIngresado.trim().length > 8){
            $(this).addClass("error-campo-formulario");
            alert("El nombre de usuario debe tener mas de 8 caracteres y NO debe contener espacios en blanco")
            return false; //valido que tenga +8 caract
        }
        else if (espacios) { 
            alert ("El nombre de usuario no puede contener espacios en blanco"); 
            return false; 
        }
        else{
            $(this).removeClass("error-campo-formulario");
        }
    });
    

    $("#password").blur(function(){
        valorIngresado = $("this").val();
        var number = /([0-9])/;
        var alphabets = /([a-zA-Z])/;

        console.log("el valor ingresado es: "+valorIngresado) //tomo el valor ingresado

        
        if($('#password').val().match(number) && $('#password').val().match(alphabets)){
            $(this).removeClass("error-campo-formulario"); 
        }
        else {
            $(this).addClass("error-campo-formulario");
            alert("La contrasenia debe contener numeros y letras");
            return false;
        }
    });// valido  que la contrasenia tenga numeros y letras


});