export class Ui {
  constructor() {
    this.progressBarObj = { value: 0 };
  }
  /*
   ** player: player
   ** ids: array of the button end of ids
   */
  disableButtonById(player, ids, bool) {
    for (let id in ids) {
      document.getElementById(
        `player${player.getId()}-${ids[id]}`
      ).disabled = bool;
    }
  }

  disableButtonByClass(classId, bool) {
    let elements = document.querySelectorAll(classId);
    elements.forEach((el) => {
      console.log(el);
      el.disabled = bool;
    });
  }

  newInfoMessage(message) {
    document.getElementById("info").innerHTML = message;
  }
  addInfoMessage(message) {
    document.getElementById("info").innerHTML += message;
  }

  hideButtonById(id, bool) {
    let el = document.getElementById(id);
    if (bool) {
      el.style.display = "none";
    } else {
      el.style.display = "block";
    }
  }
  hideClass(classId, bool) {
    let param = bool ? "none" : "block";
    let elements = document.getElementsByClassName(classId);
    for (let el of elements) {
      el.style.display = param;
    }
  }

  //TODO: change %progress into seconds remaining
  updateProgressBar(percentage) {
    let $progressBar = document.getElementById("progress-bar");
    this.progressBarObj.value = Math.min(
      100,
      this.progressBarObj.value + percentage
    );
    $progressBar.style.width = this.progressBarObj.value + "%";
    $progressBar.valuenow = this.progressBarObj.value;
    $progressBar.innerText = this.progressBarObj.value + "%";
  }
}
