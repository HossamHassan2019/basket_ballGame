// const ball = document.querySelector(".ball");

let collision = [];
class ball {
  constructor(posX, posY) {
    this.currPosX = posX;
    this.currPosY = posY;
    this.ballObj = null;
  }

  createBall() {
    // const ball = document.querySelector(".Player");
    const section = document.querySelector("section");
    this.ballObj = document.createElement("div");
    this.ballObj.className = "ball";
    this.ballObj.style.backgroundColor = "red";
    this.ballObj.style.left = `${this.currPosX}px`;
    this.ballObj.style.bottom = `${this.currPosY}px`;
    section.append(this.ballObj);
  }
}

class player extends ball {
  constructor(posX, posY, increment) {
    super(posX, posY);
    this.increment = increment;
    this.func = null;
    this.invert = false;
  }
  InitMove() {
    // window.addEventListener("keydown", this.MoveHandler.bind(this));
    // // window.addEventListener(
    // //   "keydown",
    // //   function () {
    // //     requestAnimationFrame(this.MoveHandler.bind(this));
    // //   }.bind(this)
    // // );

    // window.addEventListener("keyup", () => {
    //   this.increment = 1;
    this.func = this.MoveHandler.bind(this);
    requestAnimationFrame(this.func);
  }

  MoveHandler() {
    const ball = document.querySelector(".basket");
    // console.log(this);
    // this.increment += 15;
    // if (event.key === "ArrowRight") {
    //   // console.log(this);
    //   this.currPosX += this.increment;
    // } else if (event.key === "ArrowLeft") {
    //   this.currPosX -= this.increment;
    // } else if (event.key === "ArrowUp") {
    //   this.currPosY += this.increment;
    // } else if (event.key === "ArrowDown") {
    //   this.currPosY -= this.increment;
    // }
    if (!this.invert) this.currPosX += this.increment;
    else this.currPosX -= this.increment;
    // this.ballObj.style.bottom = `${this.currPosY}px`;
    // this.posY = this.increment;
    if (this.currPosX > 380) this.invert = true;
    else if (this.currPosX < 1) this.invert = false;

    ball.style.left = `${this.currPosX}px`;
    // ball.style.bottom = `${this.currPosY}px`;
    requestAnimationFrame(this.func);
  }
}

class Enemy extends ball {
  constructor(posX, posY, increment, basket) {
    super(posX, posY);
    this.increment = increment;
    this.invert = false;
    this.func = null;
    this.basket = basket;
    this.score = document.querySelector(".score-content");
  }
  InitEnemy() {
    // setInterval(this.MoveEnemy.bind(this), 5 + this.increment);
    this.func = this.MoveEnemy.bind(this);
    requestAnimationFrame(this.func);
  }
  MoveEnemy() {
    // console.log(this);
    // if (!this.invert) this.currPosY += this.increment;
    // else this.currPosY -= this.increment;
    // this.ballObj.style.bottom = `${this.currPosY}px`;
    // // this.posY = this.increment;
    // if (this.currPosY > 474) this.invert = true;
    // else if (this.currPosY < 0) this.invert = false;
    this.currPosY -= this.increment;
    if (this.ballObj) {
      this.ballObj.style.bottom = `${this.currPosY}px`;
      if (this.currPosY < 0) this.ballObj.className = "";
      else if (
        this.currPosX > this.basket.currPosX + 7 &&
        this.currPosX < this.basket.currPosX + 85 &&
        this.currPosY < 90 &&
        this.currPosY > 85
      ) {
        this.ballObj.className = "";
        const score = +this.score.textContent;
        // console.log(score);
        this.score.textContent = score + 1;
        // delete this.ballObj;
        // console.log(this.basket.currposX);
      }
    }

    requestAnimationFrame(this.func);
  }
}

class ballGenerator {
  constructor() {
    this.enemy = null;
    this.basket = null;
  }

  startGame() {
    this.basket = new player(0, 0, 5);
    this.basket.InitMove();

    const div = document.querySelector(".main-section");
    const pos = div.getBoundingClientRect();
    window.addEventListener("click", (e) => {
      if (e.clientX > pos.left && e.clientX < pos.right) {
        console.log(e.screenX - pos.left);
        this.enemy = new Enemy(e.clientX - pos.left, 474, 5, this.basket);
        this.enemy.createBall();
        this.enemy.InitEnemy();
      }
    });
    // setInterval(() => {
    //   // console.log(this);
    //   this.enemy = new Enemy(
    //     Math.random() * 450,
    //     474,
    //     Math.random() * 5 + 2,
    //     this.basket
    //   );
    //   this.enemy.createBall();
    //   this.enemy.InitEnemy();
    // }, Math.random() * 2000);
  }
}

// const e1 = new Enemy(100, 474, 1, b);
// e1.createBall();
// e1.InitEnemy();

// const e2 = new Enemy(200, 474, 1.1, b);
// e2.createBall();
// e2.InitEnemy();

// const e3 = new Enemy(400, 474, 1.3, b);
// e3.createBall();
// e3.InitEnemy();

// const e4 = new Enemy(50, 474, 0.9, b);
// e4.createBall();
// e4.InitEnemy();

// const e5 = new Enemy(70, 474, 5, b);
// e5.createBall();
// e5.InitEnemy();

const game = new ballGenerator();
game.startGame();
// window.addEventListener("keyup", () => {
//   increment = 1;
// });

// let increment = 0.9;
// // let initRight,
// //   initLeft,
// //   initTop,
// //   initBottom = 0;
// // let stepLeeft = 0;
// // let stepRight = 0;
// // let prevLeft = 0;
// // let prevBottom = 0;
// // let deltaLeft,
// //   deltaBottom = 0;
// setInterval(() => {
//   // choose random position top - left - right - bottom
//   // topLeft - topRight
//   // bottomLeft - bottomRight
//   // deltaLeft = Math.floor(Math.random() * 2) ? 200 : 200;
//   // deltaBottom = Math.floor(Math.random() * 2) ? 2 + 1 : 5;

//   // stepLeft = prevLeft + Math.floor(Math.random() * deltaLeft);
//   // stepBottom = prevBottom + Math.floor(Math.random() * 2 + 1);
//   // if (stepLeft < 800) button.style.left = `${stepLeft}px`;
//   increment *= 1.008;
//   if (increment < 450) button.style.bottom = `${increment}px`;
//   else {
//     increment = 0.9;
//     button.style.top = `${increment}px`;
//   }

//   // prevLeft = stepLeft;
//   // prevBottom = stepBottom;
// }, 1);
