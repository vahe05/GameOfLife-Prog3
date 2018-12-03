 class Xotaker extends Base{
    constructor(x, y, index) {
        super(x,y,index);
        this.energy = 0;
        this.multiply = 0;
        
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
        
    }

    move() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));

        if (newCell) {
            matrix[newCell[1]][newCell[0]] = 2;
            matrix[this.y][this.x] = 0;

            this.multiply = 0;
            this.x = newCell[0];
            this.y = newCell[1];
            this.energy--;
        }
    }

    eat() {
        statistics.grassDie++;
        this.multiply++;
        var newCell = random(this.chooseCell(1));

        if (newCell) {
            matrix[newCell[1]][newCell[0]] = 2;
            matrix[this.y][this.x] = 0;

            for (var e = 0; e < grassArr.length; e++) {
                if (grassArr[e].x == newCell[0] && grassArr[e].y == newCell[1]) {
                    grassArr.splice(e, 1);
                    break;
                }
            }
            
            this.x = newCell[0];
            this.y = newCell[1];

            this.multiply = 0;
            this.energy+=4 ;

        } else {
            this.move();

        }
        if (this.energy >= 5) {
            this.mul()
            this.energy = 0;
        } else if (this.energy <= -5) {
            this.die();

        }


    }
    mul() {
        var newCell = random(this.chooseCell(0));

        if (newCell) {
            matrix[newCell[1]][newCell[0]] = 2;
            var newGrassEater = new Xotaker(newCell[0], newCell[1], this.index);
            grassEaterArr.push(newGrassEater);

        }


    }
    die() {
        if (weather == 0)
        this.energy-= 5;
        else if(weather == 1)
        this.energy-=12;
        for (var c in grassEaterArr) {
            if (grassEaterArr[c].x == this.x && grassEaterArr[c].y == this.y) {
                matrix[this.y][this.x] = 0;
                grassEaterArr.splice(c, 1);
                

                break;
            }
        }
    }
}