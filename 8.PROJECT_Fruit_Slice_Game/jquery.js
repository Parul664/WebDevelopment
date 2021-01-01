//click on the start-reset button
    // are we playing
        //yes
            // reload the page
        //no
            //show the trails left box
            // change button text to reset game
            // 1.create a random fruit
            // random step to use for the fruit spped
            // 2.move the fruit down by one step in loop every 30 second
            // check fuit too low?
                // no
                    // repeat 2
                // yes
                    //any trials left
                        //yes
                            //repeat 1
                        //no
                            //gameover
                            //button to start games

//slice a fruit
    //play soung
    ///explode the fruit

var playing = false;
var score = 0;
var trialsleft;
var fruits = ['apple','banana','pineapple','strawberry'];
var step;
var action;

$(function(){
    
$("#startreset").click(function(){

   if(playing==true){
       location.reload();
   }else{
       playing = true;
       score = 0;

       $("#scorevalue").html(score);
       $("#trialsleft").css("display","block");

       trialsleft = 3;
       addHearts();

       $("#gameOver").hide();

       $("#startreset").html("Reset Game");
       $("#trailsleft").hide();

       startAction();



   }
}); 
    
    
$("#fruit1").mouseover(function(){
    score+=1;
    $("#scorevalue").html(score);
    
    // Adding audio
    document.getElementById("slicesound").play();
    // if you use the Jquery Selector, then it redurns an array out of which the first element is audio, so use it as
    // $("#slicesound")[0].play();
    
    //stop the fruit from going gown
    clearInterval(action);
    
    //hide through animation
    $("#fruit1").hide("explode", 500);
    
    // If we donot do the Timeout then even before the animation finished startAction would execute, we want to wait till the Animation is over.
    setTimeout(startAction,500);
    
})


function addHearts(){
    //empty the trials already there
    $("#trialsleft").empty();
    
    for(i = 0; i< trialsleft; i++){
       $("#trialsleft").append('<img src = "images/heart.jpg" class = life>');
   }
}

function startAction(){
//    $("#fruitContainer").append('<img src = "images/apple.png" class = fruit>');
    
    $("#fruit1").show();
    chooseFruit();
    $("#fruit1").css({'left':Math.round(Math.random()*550),'top':-50});
    // since fruitContainer:650px width, want left to be in between 0 and 550
    
    //genarate a random step for speed
    step = Math.round(Math.random()*5)+1;
    
    action = setInterval(function(){
        $("#fruit1").css("top",$("#fruit1").position().top + step);
        
        if($("#fruit1").position().top>$("#fruitContainer").height()){
            
            if(trialsleft>1){
                $("#fruit1").show();
                chooseFruit();                $("#fruit1").css({'left':Math.round(Math.random()*550),'top':-50});
                // since fruitContainer:650px width, want left to be in between 0 and 550

                //genarate a random step for speed
                step = Math.round(Math.random()*5)+1;
                
                trialsleft-=1;
                addHearts();
                
            }else{
                playing = false;
                $("#startreset").html("Start Game");
                $("#gameOver").show();
                $("#gameOver").html('<p>game Over!</p><p>Your score is '+score+'</p>');
                stopAction();
                
            }
        }
        
    },10);
    
}

function chooseFruit(){
   var random = Math.floor(Math.random()*4);
   $("#fruit1").attr('src','images/'+fruits[random]+'.png');
}

function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
}
 
    
    
});