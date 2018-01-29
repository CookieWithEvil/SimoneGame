var sim = {
   orderLength: 1,
   order: [],
   index: 0,
   strict: false,
   startedGame: false,
   orderTimer: 0,
   
   getAudio: function(id){
      switch(id){
         case "green": return "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3";
         break;
         case "red": return "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3";
         break;
         case "yellow": return "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3";
         break;
         case "blue": return "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3";
         break;
      }
   },
   getColor: function(id){
      switch(id){
         case "green": return "Lime";
         break;
         case "red": return "#ff4800";
         break;
         case "yellow": return "#ffff42";
         break;
         case "blue": return "DodgerBlue";
         break;
      }
   },
   fillOrder: function(){
      for(var i = 0; i < this.orderLength; i++){
         this.order.push(Math.round(Math.random() * (3 - 0)));
      }
   },
   showOrder: function(index){
         var id="";
         switch(this.order[index]){             
            case 0: id = "green"; break;
            case 1: id = "red"; break;
            case 2: id = "yellow"; break;
            case 3: id = "blue"; break;
         }
         var t = setTimeout(function(){
            $("#"+id).css("background", sim.getColor(id));
            var audio = new Audio();
            audio.src = sim.getAudio(id);
            audio.autoplay = true;        
         },100);
         var t1 = setTimeout(function(){
            $("#"+id).css("background", "")
         }, 500); 
   },
   compareOrders: function(id){
      if(this.order.length == 0) return;
      var num;
      switch(id){             
         case "green": num = 0; break;
         case "red": num = 1; break;
         case "yellow": num = 2; break;
         case "blue": num = 3; break;
      }
      if(this.order[this.index] === num){ 
         this.index++;
         if(this.index === this.orderLength){
            this.order = [];
            this.index = 0;
            this.orderLength++; 
            if(this.orderLength === 21){ 
               this.youWon();
               return;
            }
            round();            
         }
      }else{
         $("#counter").html("!!!!");
         sim.order = [];
         sim.index = 0;
         if(this.strict) this.orderLength = 1;
         var timer = setTimeout(function(){            
            round();
         },1000);         
      }
   },
   youWon: function(){
      $("#counter").html("WIN!");
      sim.order = [];
      sim.index = 0;
      sim.orderLength = 1;
      var timer = setTimeout(function(){            
         round();
      },3000);  
   }
}//END

//CHANGE THE COLOR BUTTON
/*/if(navigator.userAgent.indexOf("Firefox") != -1){ 
   $("#green, #red, #yellow, #blue").click(function(){
      var id = this.id;
      $(this).css("background", sim.getColor(id));
      var audio = new Audio();
      audio.src = sim.getAudio(id);
      audio.autoplay = true; 
      sim.compareOrders(id);      
      var timer = setTimeout(function(){
         $("#"+id).css("background", "");
         sim.compareOrders(id);
      }, 500)
   });
}*/
//else{
   $("#green, #red, #yellow, #blue").mousedown(function(){
      $(this).css("background", sim.getColor(this.id));
      var audio = new Audio();
      audio.src = sim.getAudio(this.id);
      audio.autoplay = true;  
   });
   $("#green, #red, #yellow, #blue").mouseup(function(){      
      $(this).css("background", "");
      sim.compareOrders(this.id);
   });
//}

//SHOW ORDER
function round(){  
   sim.fillOrder();
   var i = 0;
   $("#counter").html(sim.orderLength);
   $("#green, #red, #yellow, #blue").prop("disabled", true);
   sim.orderTimer = setInterval(function(){
      if(i === sim.order.length){         
         clearInterval(sim.orderTimer);
         $("#green, #red, #yellow, #blue").prop("disabled", false);
      }else{
         sim.showOrder(i);
         i++;
      }
   },1400);
}

//START
$("#start").click(function(){
   if(sim.startedGame){
      $("#green, #red, #yellow, #blue").prop("disabled", true);
      clearInterval(sim.orderTimer);
      sim.orderLength = 1;
      sim.order = [];
      sim.index = 0;
      $("#counter").html("----");
      var timer = setTimeout(function(){
         round();
      },1000);
   }else{
      round();
   }
   sim.startedGame = !sim.startedGame;   
});

//STRICT MODE ON-OFF
$("#strict").click(function(){
   (sim.strict) ? $("input[name='strict']").attr("checked",false) :
                  $("input[name='strict']").attr("checked",true);
   sim.strict = !sim.strict;
});

//ON-OFF BUTTONS
$("#off").click(function(){
   clearInterval(sim.orderTimer);   
   sim.orderLength = 1; sim.order = [];
   sim.index = 0; sim.startedGame = false;
   $("#start, #strict").prop("disabled", true);
   $("#counter").html("----");
   $("#counter").css("color", "#2d0140");
   $("#off").css("background", "MistyRose");
   $("#on").css("background", "#1f1f1f");
});
$("#on").click(function(){
   $("#start, #strict").prop("disabled", false);
   $("#counter").css("color", "MediumVioletRed");
   $("#on").css("background", "MistyRose");
   $("#off").css("background", "#1f1f1f");
});