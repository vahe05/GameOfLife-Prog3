class Hskich extends Base {
    constructor(x, y, index) {
        super(x,y,index);
        this.lastI = 0;
    }


    move() {
        var datarkvandak = this.chooseCell(0);
        var xoterivandak = this.chooseCell(1);
        var Bomb = this.chooseCell(7);
        var kArr = (Bomb.concat(datarkvandak)).concat(xoterivandak);
        var vandak = random(kArr);

        if (vandak) {
            var x = vandak[0];
            var y = vandak[1];

            if (matrix[y][x] == 1) {
                matrix[this.y][this.x] = this.lastI;
                matrix[y][x] = 4;
                this.x = x;
                this.y = y;
                this.lastI = 1;
            } else if (matrix[y][x] == 0) {
                matrix[this.y][this.x] = this.lastI;
                matrix[y][x] = 4;
                this.x = x;
                this.y = y;
                this.lastI = 0;
            } else if (matrix[y][x] == 7) {
                this.die();
            }else if (matrix[y][x] == 8) {
                this.mul();
            }
        }

    }

    beat() {
        var newCellHerbivore = random(this.chooseCell(2));
        var newCellBear = random(this.chooseCell(3));

        if (newCellHerbivore) {
            matrix[newCellHerbivore[1]][newCellHerbivore[0]] = 4;
            matrix[this.y][this.x] = 0;

            for (var e = 0; e < grassEaterArr.length; e++) {
                if (grassEaterArr[e].x == newCellHerbivore[0] && grassEaterArr[e].y == newCellHerbivore[1]) {
                    grassEaterArr.splice(e, 1);
                    break;
                }
            }
            this.x = newCellHerbivore[0];
            this.y = newCellHerbivore[1];

            this.multiply = 0;

        } else if (newCellBear) {
            matrix[newCellBear[1]][newCellBear[0]] = 4;
            matrix[this.y][this.x] = 0;

            for (var e = 0; e < barbarosArr.length; e++) {
                if (barbarosArr[e].x == newCellBear[0] && barbarosArr[e].y == newCellBear[1]) {
                    barbarosArr.splice(e, 1);
                    break;
                }
            }
            this.x = newCellBear[0];
            this.y = newCellBear[1];

        } else {
            this.move();
        }
    }

    die() {
        for (var i in hskichArr) {
            if (hskichArr[i].x == this.x && hskichArr[i].y == this.y) {
                hskichArr.splice(i, 1);
                matrix[this.y][this.x] = 0;

                break;
            }
        }
    }
}
