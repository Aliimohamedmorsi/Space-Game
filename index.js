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

restartBtn.addEventListener("click", () =>{
    clearInterval(gameInterval);
    document.querySelectorAll(".object").forEach(e => e.remove());
    startGame();
});

let rightArr = document.querySelector(".right");
let leftArr = document.querySelector(".left");


if (window.matchMedia("(max-width: 320px)").matches) {
    console.log("This is a phone screen");
    document.addEventListener("keydown",(e) =>{
        console.log("basketX", basketX)
        if(e.key === "ArrowLeft" && basketX > 0) basketX -=30;
        if(e.key === "ArrowRight" && basketX < 1540) basketX +=30;
        basket.style.left = basketX + "px";
    });
    rightArr.addEventListener("click",() =>{
        basketX +=20;
        basket.style.left = basketX + "px";
    })
    leftArr.addEventListener("click",() =>{
        basketX -=20;
        basket.style.left = basketX + "px";
    })
    basketX = 150;
} else if (window.matchMedia("(min-width:321px) and (max-width: 480px)").matches) {
    console.log("This is a tablet screen");
    document.addEventListener("keydown",(e) =>{
        console.log("basketX", basketX)
        if(e.key === "ArrowLeft" && basketX > 0) basketX -=35;
        if(e.key === "ArrowRight" && basketX < 1540) basketX +=35;
        basket.style.left = basketX + "px";
    });
    rightArr.addEventListener("click",() =>{
        basketX +=30;
        basket.style.left = basketX + "px";
    })
    leftArr.addEventListener("click",() =>{
        basketX -=30;
        basket.style.left = basketX + "px";
    })
    basketX = 220;
} else if (window.matchMedia("(min-width: 481px) and (max-width: 768px)").matches) {
    console.log("This is a tablet screen");
    document.addEventListener("keydown",(e) =>{
        console.log("basketX", basketX)
        if(e.key === "ArrowLeft" && basketX > 0) basketX -=40;
        if(e.key === "ArrowRight" && basketX < 1540) basketX +=40;
        basket.style.left = basketX + "px";
    });
    rightArr.addEventListener("click",() =>{
        basketX +=40;
        basket.style.left = basketX + "px";
    })
    leftArr.addEventListener("click",() =>{
        basketX -=40;
        basket.style.left = basketX + "px";
    })
    basketX = 340;
} else {
    document.addEventListener("keydown",(e) =>{
        console.log("basketX", basketX)
        if(e.key === "ArrowLeft" && basketX > 0) basketX -=70;
        if(e.key === "ArrowRight" && basketX < 1540) basketX +=70;
        basket.style.left = basketX + "px";
    });
    rightArr.addEventListener("click",() =>{
        basketX +=150;
        basket.style.left = basketX + "px";
    })
    leftArr.addEventListener("click",() =>{
        basketX -=150;
        basket.style.left = basketX + "px";
    })
    console.log("This is a desktop screen");
    basketX = 750;
}

startGame();
