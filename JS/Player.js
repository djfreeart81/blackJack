
export class Player {
    constructor(name, money){
        this.name = name;
        this.money = money;
        this.id = null;
        this.setId();
        this.cards=[]
    }

    setId(){
        let idCount=0;
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