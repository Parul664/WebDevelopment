var score = 0;
var MyCounter;
var flag = 0;
var secc = 5;
var counter = secc;
var prev_score ;




function rand(a){
    var x = Math.floor(Math.random()*a);
    return x;
}

function showme(){
    var a1 = rand(10);
    var a2 = rand(10);
    
    document.getElementById("figures").innerHTML = a1+"X"+a2;
    
    var op = [a1*a2,(a1+1)*(a2+2),(a2+1)*(a1+2),(a1+1)*(a2+1)];

    var r = Math.ceil(Math.random()*4);
    var ans = r;
    
    for(i = 0; i <4; i++){
        document.getElementById("op"+r).innerHTML = op[i];
        r++;
        if(r>4){
            r = 1;
        }
    }
    return ans;
}

function buttonFxn(ans,a){
    if(ans == a){
        document.getElementById("wrong").innerHTML = "Correct !"; 
        score+=1;
        clearInterval(MyCounter);
        step();
    }else{
        document.getElementById("wrong").innerHTML = "Wrong !";            
    } 
    var delayedWelcomeMessage = setTimeout(function(){document.getElementById("wrong").innerHTML = "";}, 1000);
    document.getElementById("score").innerHTML = "Score: "+score;
    
}


document.getElementById("button1").onclick=
function(){
    
//    Change the button name from Start Game to Reset Game
    if(flag == 0){
        flag = 1;
        step();
    }else{        
        clearEverything();
    }
        
       
}


function clearEverything(){
    clearInterval(MyCounter);
    prev_score = score;
    score = 0;
    counter = secc;
    document.getElementById("button1").innerHTML = "Start Game";
    document.getElementById("op1").innerHTML = "";
    document.getElementById("op2").innerHTML = "";
    document.getElementById("op3").innerHTML = "";
    document.getElementById("op4").innerHTML = "";
    document.getElementById("figures").innerHTML = "";        
    document.getElementById("score").innerHTML = "Score: "+score;
    document.getElementById("time").innerHTML = "";
    flag = 0;
}

function step() {
    document.getElementById("button1").innerHTML = "Reset Game";
//    var score = 0;
    
        var ans = showme();

        counter = secc;
        document.getElementById("time").innerHTML = "Time  Remanining: "+secc;
        MyCounter = setInterval(function(){
            counter--;
            document.getElementById("time").innerHTML = "Time  Remanining: "+counter;
            if(counter == 0){
                clearEverything(); 
                OutScreen();
            }  
            
        },1000);

        document.getElementById("op1").onclick = function(){
            buttonFxn(ans,1); 
        };
        document.getElementById("op2").onclick = function(){
            buttonFxn(ans,2);  
        };
        document.getElementById("op3").onclick = function(){
            buttonFxn(ans,3);  
        };
        document.getElementById("op4").onclick = function(){
            buttonFxn(ans,4);  
        };
    
}

function OutScreen(){
    document.getElementById("endMsg").style.backgroundColor = 'pink';
    document.getElementById("endMsg").style.top = '20%'; 
    document.getElementById("endMsg").style.left = '10%';
    document.getElementById("endMsg").style.height = '60%';
    document.getElementById("endMsg").style.width = '80%';
    document.getElementById("endMsg").style.border = '10px ridge black';
    document.getElementById("endMsg").innerHTML += 
        "<br /><div id = finalscore> Your Final Score: "+prev_score+" </div>";
    document.getElementById("button2").innerHTML = "continue";
    
    
   
}

function clearEndBox(){
   window.console.log("entered"); document.getElementById("endMsg").style.backgroundColor = 'none';
    document.getElementById("endMsg").style.top = '0'; 
    document.getElementById("endMsg").style.left = '0';
    document.getElementById("endMsg").style.height = '0';
    document.getElementById("endMsg").style.width = '0';
    document.getElementById("endMsg").style.border = '0px ridge black';
    document.getElementById("endMsg").innerHTML = "<button id = button2 onclick=clearEndBox()></button>";
    
}
