var p1 = Math.floor(Math.random() * 6) + 1;
var p2 = Math.floor(Math.random() * 6) + 1;

heading = null;

if(p1 === p2){
    heading = "It's a draw";
} else if (p1 < p2){
    heading = "Player 2 wins!";
} else {
    heading = "Player 1 wins!";
}


document.querySelector(".d1 img").setAttribute("src","images/dice"+p1+".png");
document.querySelector(".d2 img").setAttribute("src","images/dice"+p2+".png");
document.querySelector("h1").textContent = heading;