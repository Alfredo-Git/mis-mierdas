$( document ).ready(function(){
  $(".fa-pencil-alt").click(function(){
    $(this).parents("li").find(".box-info").css("margin-top","-80px");
    $(this).parents("li").find(".box-info-content").css("height","45px");
  })
  $(".fa-times.close").click(function(){
    $(this).parents("li").find(".box-info").css("margin-top","0");
    $(this).parents("li").find(".box-info-content").css("height","40px");
  });
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
  document.getElementById('burger').addEventListener('click', () => {
    const menu = document.getElementById('menuNav');
    const body = document.querySelector('body');
    menu.classList.add('openMenu');
    body.classList.add('overflowHidden');
  });
  
  //  close menu 
  
  document.getElementById('menuClose').addEventListener('click', () => {
    const menu = document.getElementById('menuNav');
    const body = document.querySelector('body');
    menu.classList.remove('openMenu');
    body.classList.remove('overflowHidden');
  });
  const ul = $('.content ul');
  ul.children().each(function(i,li){ul.prepend(li)})

});

// $( document ).ready(function(){
//   $(".favorite").click(function(){
//     let favoriteId = $(this).find(".favorite-Id").text();
//     axios.post(`/shits/${favoriteId}/favorite`)
//     console.log('pasa')

//   })
// })


 