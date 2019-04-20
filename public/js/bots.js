
/*
  
  * monitorar uma determinada url para verificar mensagens
  * regra enviar mensagem 

*/

ifthen=function(c, t, f) { if (c) return t; else return f;};
atchva=function(){return 'Q0hBVkVBVVRIRU5USUNBQ0FP';};
atdvs=function(){
    var n=new Date();
    var d=  ifthen(n.getDate()<10,'0','')+n.getDate()
            +ifthen((n.getMonth()+1)<10,'0','')+(n.getMonth()+1)
            +n.getFullYear()
            +ifthen(n.getHours()<10,'0','')+n.getHours()
            +ifthen(n.getMinutes()<10,'0','')+n.getMinutes();
            console.log(d);

            var c=$.base64.encode(d); return c;}

var Autenticar = function() {  
  var dados_envio = {
    CHVA: atchva(),
    DVS: atdvs(),
    CDE: 1,
    TPI: 5001,
    IDT: 0
  }

  $.ajax({
    url: '/bots/api/acesso/auth',
    type: 'post',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(dados_envio),
    success: function (data) {
      console.log(data);
      $('#mensagem_retorno').html(data);
    },error:function(data){
      console.log(data);
    }
    
  });
}

$(function() {
    Autenticar();

    var EnviaMensagem = function() {
      $('#mensagem_retorno').html($("#mensagem_enviar").val());
      alert( $("#mensagem_enviar").val() );
    } 

    $("#btenviar").click(function() {
      EnviaMensagem();
    });

    $("#mensagem_enviar").keyup(function( event ) {
      if (event.which != 13 ) return false;
      EnviaMensagem();      
    });

});