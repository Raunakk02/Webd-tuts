var buttons = document.querySelectorAll(".drum");
for(var i=0;i<buttons.length;i++){
    buttons[i].addEventListener("click", function (){
        makeSound(this.innerHTML);

        buttonAnimation(this.innerHTML);
    });
}

document.addEventListener("keydown", function (event){
    makeSound(event.key);

    buttonAnimation(event.key);
});

function makeSound(key) {
    switch (key) {
        case "w":
            var aud = new Audio("sounds/tom-1.mp3");            
            break;
        case "a":
            var aud = new Audio("sounds/tom-2.mp3");            
            break;
        case "s":
            var aud = new Audio("sounds/tom-3.mp3");            
            break;
        case "d":
            var aud = new Audio("sounds/tom-4.mp3");            
            break;
        case "j":
            var aud = new Audio("sounds/snare.mp3");            
            break;
        case "k":
            var aud = new Audio("sounds/crash.mp3");            
            break;
        case "l":
            var aud = new Audio("sounds/kick-bass.mp3");            
            break;
        default:
            break;
    }
    if(aud != undefined)
        aud.play();
}

function buttonAnimation(key) {
    var activeButton = document.querySelector("."+key);
    
    if(activeButton.classList == undefined) return;
    activeButton.classList.add("pressed");
    setTimeout(() => {
        activeButton.classList.remove("pressed");
    }, 100);
}