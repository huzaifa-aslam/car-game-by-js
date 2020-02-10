console.log('this is car game ');
let gamearea = document.querySelector('.gamearea');
let startscreen = document.querySelector('.startscreen');
let score = document.querySelector('.score');


//keyup event
document.addEventListener('keyup', keyUp);
//keyup event
document.addEventListener('keydown', keyDown);
//click event
document.addEventListener('click', start);
let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false

}
let player = {
    speed: 5,
    score: 0
};

function keyUp(e) {
    e.preventDefault();
    //console.log(e.key);
    keys[e.key] = false;
    //console.log(keys);
}

function keyDown(e) {
    e.preventDefault();
    //console.log(e.key);
    keys[e.key] = true;
    //console.log(keys);
}

function moveLines() {
    let roadlines = document.querySelectorAll('.roadlines');
    // console.log(roadlines+"hl");
    roadlines.forEach(function(item) {
        if (item.y >= 290) {
            item.y -= 600;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";

    })
}

function isCollide(car, enemy) {
    let mycar = car.getBoundingClientRect();
    let myenemy = enemy.getBoundingClientRect();
    return !((mycar.top > myenemy.bottom) || (mycar.bottom < myenemy.top) || (mycar.right < myenemy.left) || (mycar.left > myenemy.right));
}

function moveEnemy(car) {
    let enemy = document.querySelectorAll('.enemy');
    // console.log(roadlines+"hl");
    enemy.forEach(function(item) {
        if (isCollide(car, item)) {
            console.log(`you was hit the car`);
            endgame();

        }
        if (item.y >= 900) {
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";

    })
}

function endgame() {
    player.start = false;
    startscreen.classList.remove('hide');
    startscreen.innerHTML = `GAME OVER!! <br> YOUR FINAL SCORE IS ${player.score} <br> PRESS HERE TO RESTART THE GAME`;


}

function enemyCarColor() {
    function c() {
        let hex = Math.floor(Math.random() * 256).toString(16);
        return ("0" + String(hex)).substr(-2);
        //return (`0 ${String(hex).substr(-2)}`)
    }

    return "#" + c() + c() + c();
}





function start() {

    //gamearea.classList.remove('hide');
    startscreen.classList.add('hide');
    gamearea.innerHTML = "";
    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(playgame);
    // generating lines on road
    // for (x = 0; x < 5; x++) {
    //     let lines = document.createElement('div');
    //     lines.setAttribute('class', 'roadlines');
    //     player.y = (x * 30);
    //     lines.style.top = player.y + "px";
    //     gamearea.appendChild(lines);
    // }
    for (x = 0; x < 5; x++) {
        let lines = document.createElement('div');
        lines.setAttribute('class', 'roadlines');
        lines.y = (x * 50);
        lines.style.top = lines.y + "px";

        gamearea.appendChild(lines);
    }

    let car = document.createElement('div');
    car.setAttribute('class', 'car');

    gamearea.appendChild(car);
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    // generating cars
    for (x = 0; x < 3; x++) {
        let enemycar = document.createElement('div');
        enemycar.setAttribute('class', 'enemy');
        // enemycar.y = ((x + 1) * 100) * -1;
        enemycar.y = (x * 150);
        enemycar.style.top = enemycar.y + "px";
        enemycar.style.backgroundColor = enemyCarColor();
        enemycar.style.left = Math.floor(Math.random() * 350) + "px";
        gamearea.appendChild(enemycar);
    }

    // console.log(`${ player.x}`);
    //console.log(`car.offset`);

}

function playgame() {
    //console.log('im clicked');
    let car = document.querySelector('.car');
    let road = gamearea.getBoundingClientRect();
    //console.log(road);
    if (player.start) {

        moveLines();
        moveEnemy(car);

        if (keys.ArrowUp && player.y > (road.top + 110)) { player.y -= player.speed }
        if (keys.ArrowDown && player.y < (road.bottom - 120)) { player.y += player.speed }
        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }
        if (keys.ArrowRight && player.x < (road.width - 50)) { player.x += player.speed }
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        window.requestAnimationFrame(playgame);
        console.log(player.score++);
        player.score++
            let ps = player.score - 2;
        score.innerHTML = `Your Score is: ${ps}`;


    }
}