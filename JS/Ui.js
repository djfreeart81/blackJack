export class Ui {
    disableButtonById(id,bool){
        document.getElementById(id).disabled = bool
    }
    newInfoMessage(message){
        document.getElementById("info").innerHTML = message
   }
   addInfoMessage(message){
        document.getElementById("info").innerHTML += message
   }
}