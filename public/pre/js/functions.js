$( document ).ready(function(){
  $(".fa-pencil-alt").click(function(){
    $(this).parents("li").find(".box-info").css("margin-top","-80px");
    $(this).parents("li").find(".box-info-content").css("height","45px");
  })
  $(".fa-times.close").click(function(){
    $(this).parents("li").find(".box-info").css("margin-top","0");
    $(this).parents("li").find(".box-info-content").css("height","40px");
  })
});

$(document).ready(function(){
  $('#searchBar').keyup(function(){
     let cacas = $('h2');
     let buscandoCaca = $(this).val().toLowerCase();
     let wc='';
     for( var i = 0; i < cacas.length; i++ ){
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

$( document ).ready(function(){
  $(".favorite").click(function(){
    let favoriteId = $(this).parents("li").find(".favorite-Id").text();
    axios.post(`/shits/${favoriteId}/favorite`)
    console.log('pasa')
    .then(data => console.log(data))
    .catch(err => console.log(err))
  })
})


 