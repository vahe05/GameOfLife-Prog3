 class Xot extends Base{
    constructor(x, y, index) {
        super(x,y,index);
        this.multiply = 0;
        
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
        
        
        statistics.grassBirth++;
    }


    mul() {
        if(weather == 0)
        this.multiply+=3;
        else if(weather ==1)
        this.multiply+=7;
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (this.multiply >= 35 && newCell) {
            var newGrass = new Xot(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }

}