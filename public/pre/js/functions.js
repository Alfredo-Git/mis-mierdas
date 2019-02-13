console.log('a ver');

$( document ).ready(function(){
  $(".fa-pencil-alt").click(function(){
    $(this).parents("li").find(".box-info").css("margin-top","-25px");
    $(this).parents("li").find(".box-info-content").css("height","45px");
  })
  $(".fa-times.close").click(function(){
    $(this).parents("li").find(".box-info").css("margin-top","0");
    $(this).parents("li").find(".box-info-content").css("height","35px");
  })
});

$(document).ready(function(){
  $('#searchBar').keyup(function(){
     let cacas = $('.h2Names');
     let buscandoCaca = $(this).val().toLowerCase();
     let wc='';
     for( var i = 0; i < cacas.length; i++ ){//<-----Hasta antes de aquí entra
        wc = $(cacas[i]).html().toLowerCase();
          for(var x = 0; x < wc.length; x++ ){
              if( buscandoCaca.length == 0 || wc.indexOf( buscandoCaca ) > -1 ){
                  $(cacas[i]).parents('li').show(); 
              }else{
                   $(cacas[i]).parents('li').hide();
              }
          }
     }
  });
});