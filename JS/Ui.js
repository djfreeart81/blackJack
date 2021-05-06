export class Ui {
    disableButtonById(id,bool){
        document.getElementById(id).disabled = bool
    }
    
    /*
    ** playerId: id of the player
    ** buttonId: array of the button ids to update
    */
    updateButtonById(player, buttonIds){
        for (let buttonId in buttonIds){
            document.getElementById(buttonId).disabled = player.buttonId
            //TODO: get a link to the player status to update the button based on the player's status.
        }
    }
    newInfoMessage(message){
        document.getElementById("info").innerHTML = message
   }
   addInfoMessage(message){
        document.getElementById("info").innerHTML += message
   }
}
