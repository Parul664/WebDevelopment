$(function(){
    
$("#slider").slider({
    min: 3,
    max: 30,
    slide: function(event, ui){
        $("#circle").height(ui.value);
        $("#circle").width(ui.value);
        
    }
});


var paint = false; //painting/erasing or not
var paint_erase = "paint"; //painting or erasing
// getting the canvas and context
var canvas = document.getElementById("paint");
var ctx = canvas.getContext('2d');
    
// get canvas container
var container = $("#container");
var mouse = {x: 0,y:0};

    
// Load from local storage
if(localStorage.getItem("imgCanvas")!=null){
    var img = new Image();
    img.onload = function(){
        ctx.drawImage(img,0,0);
    }
    img.src = localStorage.getItem("imgCanvas");
}    
    
    
// Setting the parameters
ctx.lineWidth = 3;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
    
// Clicking inside the container
container.mousedown(function(e){
    paint = true;
    // intiation of drawing
    ctx.beginPath();
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    ctx.moveTo(mouse.x,mouse.y);
});
    
    //move the mouse while holding mouse key
    container.mousemove(function(e){
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        if(paint == true){
            if(paint_erase == 'paint'){
                //get color input   
                ctx.strokeStyle = $("#paintColor").val();
            }else{
                //white color 
                ctx.strokeStyle = "white";
            }
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    });
    
container.mouseup(function(){
    paint = false;
});
    
// If we leave the container we are drawing in
container.mouseleave(function(){
   paint = false; 
    
});
    
// reset button
$("#reset").click(function(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    paint_erase = "paint";
    $("#erase").removeClass("eraseMode");
});
    
    
    //erase button
$("#erase").click(function(){
    if(paint_erase =='paint'){
        paint_erase ='erase';
    }else{
        paint_erase = 'paint';
    }
    $(this).toggleClass("eraseMode");
});
    
    
// Click on the save button

$("#save").click(function(){
    if(typeof(localStorage)!=null){
        localStorage.setItem("imgCanvas",canvas.toDataURL());
    }else{
        window.alert("Your browse does not support local storage");
    };
});
    
//change line Width
$("#slider").slider({
    min: 3,
    max: 30,
    slide: function(event, ui){
        $("#circle").height(ui.value);
        $("#circle").width(ui.value);
        ctx.lineWidth = ui.value;
        
    }
});
    
$("#paintColor").change(function(){
    $("#circle").css("background-color",$(this).val());
    
})
    
})

// there are 2 types of storage- localStorage and the sessionStorage. Once the user closes the session, all the sessionsstorage is lost.