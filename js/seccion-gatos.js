
$(document).ready(function() {

    var nroTotalImagenes = 4;
    var nroColumnasPorFila = 3;
    var selectorTablaHTML = "#lista-gatos"
    var url = "https://api.thecatapi.com/v1/images/search?limit="+nroTotalImagenes

    generar_galeria_imagenes(selectorTablaHTML, nroTotalImagenes, nroColumnasPorFila, url,"Ver Detalle");

// config de los controles select del html
var breed_select = $('select.form-group');
breed_select.change(function() {
  var id = $(this).children(":selected").attr("id");
  getDogByBreed(id)
});
// carga todas las razas de perros 
function getBreeds() {
  ajax_get('https://api.thecatapi.com/v1/breeds', function(data) {
    razas(data)
});   
}
// coloca las razas en el control Seleccionar
function razas(breeds) {
  breed_select.empty().append(function() {
    var output = '';
    $.each(breeds, function(key, value) {
      output += '<option id="' + value.id + '">' + value.name + '</option>';
    });
    return output;
  });
}
// se activa cuando cambia el control de selección de raza
function getDogByBreed(breed_id) {
  // busque imágenes que contengan la raza (Breed_id =) y adjunte el objeto de la raza (include_breed = 1)
  ajax_get('https://api.thecatapi.com/v1/images/search?include_breed=1&breed_id=' + breed_id , function(data) {

    if (data.length == 0) {
      // si no retorna alguna o ninguna imagen
      clearBreed();
      $("#breed_data_table").append("<tr><td>nose encontro ninguna imagen</td></tr>");
    } else {
      //de lo contrario, muestra la imagen y los datos de la raza
      displayBreed(data[0])
    }
  });
}
// borrar la imagen y la mesa
function clearBreed() {
  $('#breed_image').attr('src', "");
  $("#breed_data_table tr").remove();
}
// mostrar la imagen y los datos de la raza
function displayBreed(image,) {
  $('#breed_image').attr('src', image.url);
  $("#breed_data_table tr").remove();

  var breed_data = image.breeds[0]
  $.each(breed_data, function(key, value) {
    // como 'peso' y 'altura' son objetos que contienen propiedades 'métricas' e 'imperiales', simplemente use la cadena métrica
    if (key == 'weight' || key == 'height') value = value.metric
    // agregar una fila a la tabla
    $("#breed_data_table").append("<tr><td>" + key + "</td><td>" + value + "</td></tr>");
  });
}

// hacer una solicitud de Ajax
function ajax_get(url, callback) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      console.log('responseText:' + xmlhttp.responseText);
      try {
        var data = JSON.parse(xmlhttp.responseText);
      } catch (err) {
        console.log(err.message + " in " + xmlhttp.responseText);
        return;
      }
      callback(data);
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}
// llamar a la función getBreeds que cargará todas las razas de perros en el control de selección
getBreeds();






});

function getBtnActionURL() {
    return "https://api.thecatapi.com/v1/images/search?limit=1";
}