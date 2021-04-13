
export class Player {
    constructor(name, money){
        this.name = name;
        this.money = money;
        this.id = null;
        this.setId();
        this.cards=[]
    }

    setId(){
        this.id = ++idCount;
    }

    updateMoney(change){
        this.money += change;
    }

    getName(){
        return this.name;
    }

    getMoney(){
        return this.money;
    }

    getId(){
        return this.id;
    }
}

let idCount=0;
