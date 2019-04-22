
/*
  
  * monitorar uma determinada url para verificar mensagens
  * regra enviar mensagem 

*/

var setvalh=function(n, v) { $('#'+n).html(v); };
var clearh=function(n) { $('#'+n).html(''); };
var ifthen=function(c, t, f) { if (c) return t; else return f;};
var atchva=function(){return 'Q0hBVkVBVVRIRU5USUNBQ0FP';};
var atdvs=function(){var n=new Date();var d=ifthen(n.getDate()<10,'0','')+n.getDate()+ifthen((n.getMonth()+1)<10,'0','')+(n.getMonth()+1)+n.getFullYear()+ifthen(n.getHours()<10,'0','')+n.getHours()+ifthen(n.getMinutes()<10,'0','')+n.getMinutes();var c=$.base64.encode(d); return c;};
var setRelogio=function(){var h=new Date();var d=ifthen(h.getDate()<10,'0','')+h.getDate()+'/'+ifthen((h.getMonth()+1)<10,'0','')+(h.getMonth()+1)+'/'+h.getFullYear()+' '+ifthen(h.getHours()<10,'0','')+h.getHours()+':'+ifthen(h.getMinutes()<10,'0','')+h.getMinutes()+':'+ifthen(h.getSeconds()<10,'0','')+h.getSeconds();setvalh('tmRelogio',d); setTimeout(setRelogio, 1000);};      
var setvalhjb=function(ST,B1,A1B2,B31,B32,B33,B34,B35,B36,B4){var stb=(ST==200);setvalh('statusconexao',ifthen(stb,'Online','OffLine'));setvalh('A1B1',ifthen(stb,B1,''));setvalh('A1B2',ifthen(stb,A1B2,''));setvalh('A1B31',ifthen(stb,B31,''));setvalh('A1B32',ifthen(stb,B32,''));setvalh('A1B33',ifthen(stb,B33,''));setvalh('A1B34',ifthen(stb,B34,''));setvalh('A1B35',ifthen(stb,B35,''));setvalh('A1B36',ifthen(stb,B36,''));setvalh('A1B4',ifthen(stb,B4,''));};
var getalertDanger=function(msg){return '<div class="alert alert-danger" role="alert">'+msg+'</div>';};
var mensagem_retornoSscrollToBottom=function(){$('#mensagem_retorno').scrollTop($('#mensagem_retorno_base').height());};

var getvalhjb=function() {
  return {    
    B1:$('#A1B1').html(),
    B2:$('#A1B2').html(),
    B3:{
      B31:$('#A1B31').text(),
      B32:$('#A1B32').text(),
      B33:$('#A1B33').text(),
      B34:$('#A1B34').text(),
      B35:$('#A1B35').text(),      
      B36:$('#A1B36').text()      
    },
    B4:$('#A1B4').text(),
    C1:$('#MSGIDLAST').html()
  };
   
};


var ExibeMensagens = function() {  
    $.ajax({url:'/bots/api/mensagens',type:'post',dataType:'json',contentType:'application/json',
    data: JSON.stringify(getvalhjb())
    ,success: function (data) {
      console.log('retorno mensagens', data);
      $.each( data.Rows, function( key, value ) {
        var html  = '<p>' + value.mensagem + '</p>';
        $('#mensagem_retorno_base').append(html);

        var html  = '<p>' + value.resposta + '</p>';
        $('#mensagem_retorno_base').append(html);
      });

      setvalh('MSGIDLAST',data.UID);
      
    }
    ,error:function(data){
      console.log('retorno mensagens', data);
    }
  });

  mensagem_retornoSscrollToBottom();
};

var Autenticar = function() {  
    $.ajax({url:'/bots/api/acesso/auth',type:'post',dataType:'json',contentType:'application/json',
    data: JSON.stringify({CHVA:atchva(),DVS:atdvs(),CDE:1,TPI:5001,IDT:'11952550331'})
    ,success: function (data) {console.log(data); clearh('idmsgalert');setvalhjb(data.Status, data.A1.B1, data.A1.B2, data.A1.B3.B31, data.A1.B3.B32,data.A1.B3.B33,data.A1.B3.B34,data.A1.B3.B35,data.A1.B3.B36,data.A1.B4); ExibeMensagens();}
    ,error:function(data){setvalh('idmsgalert',getalertDanger(data.Response));setvalhjb(data.Status,'','','','','','','','','');}
  });
};

var EnviaMensagem = function() {  
  $.ajax({url:'/bots/api/mensagens/enviar',type:'post',dataType:'json',contentType:'application/json',
    data: JSON.stringify({CHVA:atchva(),DVS:atdvs(),CDE:1,TPI:5001,IDT:'11952550331'})
    ,success: function (data) {      
      $('#mensagem_retorno_base').append(data);
    }
    ,error:function(data){
      
    }
  });

  ExibeMensagens();
};


$(function() {
    setRelogio();
    Autenticar();
    clearh('mensagem_retorno_base');    


    $("#btenviar").click(function() {
      EnviaMensagem();
    });

    $("#mensagem_enviar").keyup(function( event ) {
      if (event.which != 13 ) return false;
      EnviaMensagem();      
    });

});