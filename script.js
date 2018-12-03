var koxm = 10;
var matrix = [];
var grassArr = [];
var grassEaterArr = [];
var barbarosArr = [];
var hskichArr = [];
var maxBarbaros = 0;
var maxHskich = 0;
var maxbomb= 0;
var n = 45;
var m = 45;
var diverseArr = [1, 1, 0, 0, 0, 1, 1, 0, 8,7, 0, 0, 0, 0, 1, 0, 0, 1, 2,8, 3, 0, 1, 0, 2,8, 1, 0, 1, 1, 1, 0, 1, 0, 1,8, 0, 1, 0, 1, 0, 1, , 7, 0, 1,8, 0, 4, 7];

var yMax=40;
 var xMax=40;
 



var weather = 0;
var winter = document.getElementById("winter");
winter.addEventListener("click", function() {weather = 0; });
var summer = document.getElementById("summer");
summer.addEventListener("click", function() {weather = 1;});

function Radiation() {
    while (grassArr.length != 0) {
        grassArr.pop();
      }
      while (grassEaterArr.length != 0) {
        grassEaterArr.pop();
      }
      while (barbarosArr.length != 0) {
        barbarosArr.pop();
      }


      for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
          if (matrix[y][x] == 0) {
            matrix[y][x] = 1;
            grassArr.push(new Xot(x, y, 1));
          }
          else if (matrix[y][x] == 1) {
            matrix[y][x] = 0;
          }
          else if (matrix[y][x] == 2) {
            matrix[y][x] == 3;
            barbarosArr.push(new Barbaros(x, y, 3));
          }
          else if (matrix[y][x] == 3) {
            matrix[y][x] = 2;
            grassEaterArr.push(new Xotaker(x, y, 2));
          }
        }
}}
var radiation = document.getElementById("radiation");
radiation.addEventListener("click", Radiation);


function setup() {
    frameRate(20);
    for (var y = 0; y < n; y++) {
        matrix[y] = [];
        for (var x = 0; x < m; x++) {
            var d = random(diverseArr);
            if (d == 1) {

                matrix[y][x] = d;
                grassArr.push(new Xot(x, y, 1));
            } else if (d == 0) {

                matrix[y][x] = d

            } else if (d == 2) {

                matrix[y][x] = d;
                grassEaterArr.push(new Xotaker(x, y, 1));
            } else if (d == 3 && maxBarbaros < 30) {
                maxBarbaros++;
                barbarosArr.push(new Barbaros(x, y, 1));
                matrix[y][x] = d;
            } else if (d == 4 && maxHskich < 3) {
                maxHskich++;
                hskichArr.push(new Hskich(x, y, 1))
                matrix[y][x] = d;
            } 
            else if (d == 7 && maxbomb < 3) {
                maxbomb++;
                
                matrix[y][x] = d;
            }else if (d == 8 && maxbomb < 2) {
                maxbomb++;
                
                matrix[y][x] = d;
            }
            else {
                matrix[y][x] = 0;
            }
        }
    }

    createCanvas(xMax * koxm, yMax * koxm);
    background('grey');
}

function draw() {
    // if (frameCount % 500 === 0) {
    //     statistics.timestamp = (new Date()).toString();
    //     statistics.framecount = frameCount;
    //     socket.emit("send data", statistics);
    // }
    
    if (weather == 0) 
        frameRate(3);
    
    else if (weather == 1) 
        frameRate(100)
    
    for (var y = 0; y < xMax; y++) {
        for (var x = 0; x < matrix.length; x++) {
            if (matrix[y][x] == 0) {
                fill('grey');
                rect(x * koxm, y * koxm, koxm, koxm);
            } else if (matrix[y][x] == 1) {
                if (weather == 0) {
                    fill('white');
                }
                else if (weather == 1) {
                    fill('green');
                }
                
                rect(x * koxm, y * koxm, koxm, koxm);
            } else if (matrix[y][x] == 2) {
                fill('yellow');
                rect(x * koxm, y * koxm, koxm, koxm);
            } else if (matrix[y][x] == 3) {
                fill('blue');
                rect(x * koxm, y * koxm, koxm, koxm);
            } else if (matrix[y][x] == 4) {
                fill('black');
                rect(x * koxm, y * koxm, koxm, koxm);
            } else if (matrix[y][x] == 7) {
                fill('red');
                rect(x * koxm, y * koxm, koxm, koxm);
            } else if (matrix[y][x] == 8) {
                fill('#80dfff');
                rect(x * koxm, y * koxm, koxm, koxm);
            }
        }
    }
    for (var i in grassArr) {
        grassArr[i].mul();
    }

    for (var i in grassEaterArr) {
        grassEaterArr[i].eat()
    }

    for (var i in barbarosArr) {
        barbarosArr[i].eat();
    }

    for (var i in hskichArr) {
        hskichArr[i].beat();
    }
}
