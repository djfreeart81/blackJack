export class Ui {
    /*
    ** player: player
    ** ids: array of the button end of ids
    */
    disableButtonById(player, ids, bool){
        for (let id in ids){
            document.getElementById(`player${player.getId()}-${ids[id]}`).disabled = bool
            //TODO: get a link to the player status to update the button based on the player's status.
        }
    }
    newInfoMessage(message){
        document.getElementById("info").innerHTML = message
   }
   addInfoMessage(message){
        document.getElementById("info").innerHTML += message
   }
    
   hideButtonById(id, bool){
        let el = document.getElementById(id)
        if (bool) {
            el.style.display = "none"
        } else {
            el.style.display = "block"
        }
    }
}
