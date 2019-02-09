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