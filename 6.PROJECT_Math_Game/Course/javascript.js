// if we click on the start-reset button
    // If we are playing then
        //releoad the page
    //If not playing
        //set score to 0;
        //show the countdown box
        //start reducing time by 1sec every sec in loop
            //time left?
                //yes -> continue;
                //No -> Game over
        //change button to reset
        //generate new Q&A

//If we click on answer box
    //If playing 
        //correct 
            //increase the score by 1
            //correct box show for 1 sec
            // generate new question and answer
        //wrong
            //Try again box for 1 sec;
var playing = false;
var score;
var timeremaining;
var action;
var correctAnswer;

document.getElementById("startreset").onclick = function(){
    // If we are playing
    if(playing == true){
        // This just reloads the page. Good coz I did so much work resetting.
        location.reload();
    }else{
        playing = true;
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
       show("timeremaining");
        
        timeremaining = 60;        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        
        // It does not disappear if you play for the second time.
        hide("gameover");
        
        document.getElementById("startreset").innerHTML = "Reset Game";
        
        
        //start countdown
        startcountdown();
        
        //generate question and answers
        generatequestionandanswer();
        
    }
}

for(i = 1; i<5; i++){
    document.getElementById("box"+i).onclick = function(){
        if(playing == true){
            // this refers to the element that we picked on
            if(this.innerHTML == correctAnswer){
                //increase score by one
                score++;
                document.getElementById("scorevalue").innerHTML = score;

                //show the correct box and hide wrong box
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                },1000);
                generatequestionandanswer();

            }else{
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                },1000);
            }
        }else{

        }
    }
}

function startcountdown(){
    action = setInterval(function(){
        timeremaining-=1;        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        
        if(timeremaining == 0){
            stopcountdown();
            show("gameover");
            document.getElementById("gameover").innerHTML = "<p>game over!<p><p>Your score is "+score+"</p>";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
            
        }
    }, 1000);
}

function stopcountdown(){
    clearInterval(action);
}

function hide(id){
    document.getElementById(id).style.display = 'none';
}
function show(id){
    document.getElementById(id).style.display = 'block';
}

function generatequestionandanswer(){
    // [1,10]
    var x = 1+Math.round(9*Math.random());
    var y = 1+Math.round(9*Math.random());
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x+"x"+y;
     var correctPosition = 1+Math.round(3*Math.random());
    
        // fill one box with correct answer
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer;
    
    var answers = [correctAnswer];
    
    for(i = 1; i<5; i++){
        if(i!=correctPosition){
            var wrongAnswer;
            do{
                wrongAnswer = 1+Math.round(9*Math.random())*1+Math.round(9*Math.random());
            }
            while(answers.indexOf(wrongAnswer)>-1);
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
        
}

// === : equal value and types
// ==  : equal value
// =   : assigning the values