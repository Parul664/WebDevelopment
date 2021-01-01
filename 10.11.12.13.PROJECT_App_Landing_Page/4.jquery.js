$(function(){
    
    
var mode= 0;
var timeCounter = 0;
var lapCounter = 0;
var action; //set interval function counter
var LapNumber = 0; // Total Lap Numbers;
var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes,lapSeconds, lapCentiseconds;
    
//    Just after app load
hideshowButtons("#startButton","#lapButton");
  
//   Button Clicks
$("#startButton").click(function(){
    mode = 1;
    hideshowButtons("#stopButton","#lapButton");
    startAction();
});

$("#stopButton").click(function(){
    hideshowButtons("#resumeButton","#resetButton");
    clearInterval(action);
});
    
$("#resumeButton").click(function(){
    hideshowButtons("#stopButton","#lapButton");
    startAction();
});
    
$("#resetButton").click(function(){
    location.reload();
});
    
$("#lapButton").click(function(){
    if(mode){
        clearInterval(action);
        lapCounter = 0;
        addLap();
        startAction();
    }
});
  
    

    
    
//hide all and then show 2 btns with id x and y 
function hideshowButtons(x,y){
    $(".control").hide();
    $(x).show();
    $(y).show();
};
   
//start the counter
function startAction(){
    action = setInterval(function(){
        timeCounter++;
        if(timeCounter == 100*60*100){
            timeCounter = 0;
        }if(lapCounter == 100*60* 100){
            lapCounter = 0;
        }
        lapCounter++;
        updateTime();

    }, 10);
    
}

// Conversion to minutes seconds and centiseconds
    
function updateTime(){
    // 1min = 6,000 centiseconds
    timeMinutes = Math.floor(timeCounter/6000);
    timeSeconds = Math.floor((timeCounter%6000)/100);
    timeCentiseconds=(timeCounter%6000)%100;
    
    lapMinutes = Math.floor(lapCounter/6000);
    lapSeconds = Math.floor((lapCounter%6000)/100);
    lapCentiseconds=(lapCounter%6000)%100;
    
    $("#timeminute").text(format(timeMinutes));
    $("#timesecond").text(format(timeSeconds));
    $("#timecentisecond").text(format(timeCentiseconds));
    
    $("#lapminute").text(format(lapMinutes));
    $("#lapsecond").text(format(lapSeconds));
    $("#lapcentisecond").text(format(lapCentiseconds));
}
   
    
function format(number){
    if(number<10){
        return '0'+number;
    }else{
        return number;
    }
}
     

// Print details inside the lapbox
function addLap(){
    LapNumber += 1;
    var myLapDetails = '<div class="lap">'
                        +'<div class="laptimetitle">'
                        + 'Lap'+LapNumber
                        +'</div>'
                        +'<div class="laptime">'
                        + '<span>'+format(lapMinutes)+'</span>'
                        + ':<span>'+format(lapSeconds)+'</span>'
                        + ':<span>'+format(lapCentiseconds)+'</span>'
                        +'</div>'
                        +'</div>';
    $(myLapDetails).prependTo("#lapse");
}
    
    
});

