let height = document.documentElement.clientHeight;
let width = document.documentElement.clientWidth;
document.body.style.setProperty("height",`${height}px`);
document.body.style.setProperty("width",`${width}px`);

let game = document.getElementById("game");
let basket = document.getElementById("basket");
let restartBtn = document.getElementById("restart");
let scoreEL = document.getElementById("score"); 

let score = 0;
let basketX = 700;
let gameInterval;

function startGame (){
    score = 0;
    scoreEL.innerText = "score: 0";
    gameInterval = setInterval(spawnObject , 1500);
}

function spawnObject(){
    const obj = document.createElement("div");
    obj.classList.add("object");
    const items = ["🍎","⭐","💣"];
    obj.innerHTML = items[Math.floor(Math.random() * items.length)];
    obj.style.left = Math.random()* width + "px" ;
    game.appendChild(obj);

    let fall = setInterval(() => {
        let objTop = parseInt(obj.style.top || 0);
        if(objTop < 800){
            obj.style.top = objTop + 20 + "px";
        }else{
            clearInterval(fall);
            game.removeChild(obj);
        }

        let basketRec = basket.getBoundingClientRect();
        let objRec = obj.getBoundingClientRect();

        if(
            objRec.bottom >= basketRec.top &&
            objRec.left >= basketRec.left &&
            objRec.right <= basketRec.right
        ){
            if(obj.innerText === "🍎") score ++;
            if(obj.innerText === "⭐") score +=2;
            if(obj.innerText === "💣") {
                alert("Game Over! Final Score:"+score);
                clearInterval(gameInterval);
                document.querySelectorAll(".object").forEach(e => e.remove());
            }
            scoreEL.innerText = "Score:" + score;
            clearInterval(fall);
            game.removeChild(obj);
        }
    },30);
}

document.addEventListener("keydown",(e) =>{
    console.log("basketX", basketX)
    if(e.key === "ArrowLeft" && basketX > 0) basketX -=50;
    if(e.key === "ArrowRight" && basketX < 1540) basketX +=50;
    basket.style.left = basketX + "px";
});

restartBtn.addEventListener("click", () =>{
    clearInterval(gameInterval);
    document.querySelectorAll(".object").forEach(e => e.remove());
    startGame();
});

let rightArr = document.querySelector(".right");
let leftArr = document.querySelector(".left");

rightArr.addEventListener("click",() =>{
    basketX +=150;
    basket.style.left = basketX + "px";
})
leftArr.addEventListener("click",() =>{
    basketX -=150;
    basket.style.left = basketX + "px";
})

startGame();
