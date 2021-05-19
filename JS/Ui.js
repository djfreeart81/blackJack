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
      document.getElementById(`player${player.getId()}-${ids[id]}`).disabled =
        bool;
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
    let info = document.getElementById("info");
    info.innerHTML = "";
    this.addInfoMessage(message);
  }
  addInfoMessage(message) {
    let info = document.getElementById("info");
    let newPar = document.createElement("p");
    newPar.innerText = message;
    info.appendChild(newPar);
  }

  hideButtonById(id, bool) {
    let el = document.getElementById(id);
    if (bool) {
      el.style.display = "none";
    } else {
      el.style.display = "block";
    }
  }

  hideButtonByClass(classId, bool) {
    let elements = document.querySelectorAll(classId);
    elements.forEach((el) => {
      console.log(el);
      if (bool) {
        el.style.display = "none";
      } else {
        el.style.display = "block";
      }
    });
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

  drawSplit(player) {
    let playerWithId = `player${player.getId()}-splitView`;
    let div = document.createElement("div");
    div.className = "col-sm-5 bg-transparent";
    div.id = playerWithId;
    div.innerHTML = `<div
    class="card text-center border-secondary mb-3"
    id="${playerWithId}"
    style="width: 12rem"
    >
    <div class="row g-0">
      <div class="card-header">
        <h5
          class="card-title text-white bg-success mb-3"
          id="${playerWithId}-name"
        ></h5>
        <h6
          class="card-subtitle mb-2 BJ-money"
          id="${playerWithId}-money"
        ></h6>
      </div>
    <div class="col-md-8">
    <div class="card-body">
      <h6
        class="card-subtitle mb-2 BJ-score"
        id="${playerWithId}-score"
      >
        Score
      </h6>
      <h3 class="card-text BJ-cards" id="${playerWithId}-cards"></h3>
    </div>
  </div>
  <div class="col-md-4">
    <div class="d-grid gap-2">
      <button
        type="button"
        class="btn btn-success btn-sm BJ-btn-hit"
        id="${playerWithId}-hit"
      >
        Hit
      </button>
      <button
        type="button"
        class="btn btn-success btn-sm BJ-btn-double"
        id="${playerWithId}-double"
      >
        Double
      </button>
      <button
        type="button"
        class="btn btn-success btn-sm BJ-btn-done"
        id="${playerWithId}-done"
      >
        Done
      </button>
    </div>
  </div>
</div>
</div>`;
    let playerDiv = document.getElementById(`player${player.getId()}`);
    playerDiv.appendChild(div);
    document.getElementById(
      `${playerWithId}-name`
    ).innerText = `${player.name}-split`;
    console.log(`player ${playerWithId}-splitView created in DOM`);
  }

  drawPlayer(player) {
    let playerWithId = `player${player.getId()}`;
    let div = document.createElement("div");
    div.className = "col-sm-5 bg-transparent";
    div.id = playerWithId;
    div.innerHTML = `<div
class="card text-center border-secondary mb-3"
id="${playerWithId}"
style="width: 12rem"
>
<div class="row g-0">
  <div class="card-header">
    <h5
      class="card-title text-white bg-success mb-3"
      id="${playerWithId}-name"
    ></h5>
    <h6
      class="card-subtitle mb-2 BJ-money"
      id="${playerWithId}-money"
    ></h6>
  </div>
  <!-- body of card -->
  <div class="col-md-8">
    <div class="card-body">
      <h6
        class="card-subtitle mb-2 BJ-score"
        id="${playerWithId}-score"
      >
        Score
      </h6>
      <h3 class="card-text BJ-cards" id="${playerWithId}-cards"></h3>
    </div>
  </div>
  <div class="col-md-4">
    <div class="d-grid gap-2">
      <button
        type="button"
        class="btn btn-success btn-sm BJ-btn-hit"
        id="${playerWithId}-hit"
      >
        Hit
      </button>
      <button
        type="button"
        class="btn btn-success btn-sm BJ-btn-bet"
        id="${playerWithId}-bet"
      >
        Bet
      </button>
      <button
        type="button"
        class="btn btn-success btn-sm BJ-btn-double"
        id="${playerWithId}-double"
      >
        Double
      </button>
      <button
        type="button"
        class="btn btn-success btn-sm BJ-btn-split"
        id="${playerWithId}-split"
      >
        Split
      </button>
      <button
        type="button"
        class="btn btn-success btn-sm BJ-btn-done"
        id="${playerWithId}-done"
      >
        Done
      </button>
    </div>
  </div>
</div>
</div>`;
    let playerNode = document.getElementById("playerNode");
    playerNode.appendChild(div);
    console.log(`player ${playerWithId} created in DOM`);
  }
}
