
export class Player {
    constructor(name, money){
        this.name = name
        this.money = money
        this.id = null
        this.setId()
        this.cards=[]
        this.bet = 0
        this.isPlaying = true
        this.hasBet = false
        this.isDone = false
    }

    setId(){
        this.id = ++idCount;
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
    getCardValue(){
        return this.cards.reduce( (acc, card) => acc+card.value,0)
    }

    betMoney(amount){
        if(this.money < amount) {
            alert("not enough money")
            this.playing = false
            return
        }
        this.bet = amount
        this.money -= amount
        let $playerMoney = document.getElementById(`player${this.id}-money`)
        $playerMoney.innerHTML = this.money + " $"
        this.hasBet = true
        document.getElementById(`player${this.getId()}-bet`).disabled = true
        console.log(`player ${this.name} bet ${this.bet}`)
    }

    /**
     * Define the border parameters and manage new-card button status
     * @param {green,red} color 
     */
    setPlayerBorderRed(bool){
        let colors={true: {border: "red", background: "LightCoral"}, false: {border:"green", background: "darkgray"}}

        document.getElementById(`player${this.getId()}`).style.borderColor = colors[bool].border
        document.getElementById(`player${this.getId()}`).style.backgroundColor = "LightCoral"
        document.getElementById(`player${this.getId()}-button-box`).style.borderColor = "red"
        document.getElementById(`player${this.getId()}-new-card`).disabled = bool
    }
    endRound(){
        this.isPlaying = false
        document.getElementById(`player${this.getId()}-done`).disabled = true
        document.getElementById(`player${this.getId()}-bet`).disabled = true
        this.setPlayerBorderRed(true)
    }

}

let idCount=0;
