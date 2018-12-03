class Barbaros extends Base {
    constructor(x, y, index) {
        super(x,y,index);
        this.energy = 0;
        this.multiply = 0;
        
        
    }



    move() {
        this.multiply++;
        var freeCell = random(this.chooseCell(0));
        var newCellGrass = random(this.chooseCell(1));

        if (freeCell) {
            matrix[freeCell[1]][freeCell[0]] = 3;
            matrix[this.y][this.x] = 0;

            this.multiply = 0;
            this.x = freeCell[0];
            this.y = freeCell[1];
            this.energy--;
        } else if (newCellGrass) {
            matrix[newCellGrass[1]][newCellGrass[0]] = 3;
            matrix[this.y][this.x] = 0;

            this.multiply = 0;
            this.x = newCellGrass[0];
            this.y = newCellGrass[1];
            this.energy--;
        }
    }

    eat() {
        this.multiply++;
        var newCell = random(this.chooseCell(2));

        if (newCell) {
            matrix[newCell[1]][newCell[0]] = 3;
            matrix[this.y][this.x] = 0;

            for (var e = 0; e < grassEaterArr.length; e++) {
                if (grassEaterArr[e].x == newCell[0] && grassEaterArr[e].y == newCell[1]) {
                    grassEaterArr.splice(e, 1);
                    break;
                }
            }
            this.x = newCell[0];
            this.y = newCell[1];

            this.multiply = 0;
            this.energy++;

        } else if (this.energy >= 9) {
            this.mul()
            this.energy = 0;
        } else if (this.energy <= -12) {
            this.die();
        } else {
            this.move();
        }
    }
    mul() {
        var newCell = random(this.chooseCell(0));

        if (newCell) {
            matrix[newCell[1]][newCell[0]] = 3;
            var newBear = new Barbaros(newCell[0], newCell[1], this.index);
            barbarosArr.push(newBear);
        }
    }
    die() {
        if (weather == 0)
        this.energy-= 4;
        else if(weather == 1)
        this.energy-=11;
        for (var c in barbarosArr) {
            if (barbarosArr[c].x == this.x && barbarosArr[c].y == this.y) {
                matrix[this.y][this.x] = 0;
                barbarosArr.splice(c, 1);

                break;
            }
        }
    }
}
