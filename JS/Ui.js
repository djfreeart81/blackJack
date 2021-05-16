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
    //TODO: implement
  }

  drawPlayer(player) {}

  drawPlayer3() {
    let div = document.getElementById("player3");
    div.innerHTML = `<div
class="card text-center border-secondary mb-3"
id="player3"
style="width: 12rem"
>
<div class="row g-0">
  <div class="card-header">
    <h5
      class="card-title text-white bg-success mb-3"
      id="player3-name"
    ></h5>
    <h6
      class="card-subtitle mb-2 BJ-money"
      id="player3-money"
    ></h6>
  </div>
  <!-- body of card -->
  <div class="col-md-8">
    <div class="card-body">
      <h6
        class="card-subtitle mb-2 BJ-score"
        id="player3-score"
      >
        Score
      </h6>
      <h3 class="card-text BJ-cards" id="player3-cards"></h3>
    </div>
  </div>
  <div class="col-md-4">
    <div class="d-grid gap-2">
      <button
        type="button"
        class="btn btn-success btn-sm BJ-btn-hit"
        id="player3-hit"
      >
        Hit
      </button>
      <button
        type="button"
        class="btn btn-success btn-sm BJ-btn-bet"
        id="player3-bet"
      >
        Bet
      </button>
      <button
        type="button"
        class="btn btn-success btn-sm BJ-btn-double"
        id="player3-double"
      >
        Double
      </button>
      <button
        type="button"
        class="btn btn-success btn-sm BJ-btn-split"
        id="player3-split"
      >
        Split
      </button>
      <button
        type="button"
        class="btn btn-success btn-sm BJ-btn-done"
        id="player3-done"
      >
        Done
      </button>
    </div>
  </div>
</div>
</div>`;
    let playerNode = document.getElementById("playerNode");
    playerNode.appendChild(div);
  }
  /*
<div class="col-sm-5">
              <div
                class="card text-center border-secondary mb-3"
                id="player3"
                style="width: 12rem"
              >
                <div class="row g-0">
                  <div class="card-header">
                    <h5
                      class="card-title text-white bg-success mb-3"
                      id="player3-name"
                    ></h5>
                    <h6
                      class="card-subtitle mb-2 BJ-money"
                      id="player3-money"
                    ></h6>
                  </div>
                  <!-- body of card -->
                  <div class="col-md-8">
                    <div class="card-body">
                      <h6
                        class="card-subtitle mb-2 BJ-score"
                        id="player3-score"
                      >
                        Score
                      </h6>
                      <h3 class="card-text BJ-cards" id="player3-cards"></h3>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="d-grid gap-2">
                      <button
                        type="button"
                        class="btn btn-success btn-sm BJ-btn-hit"
                        id="player3-hit"
                      >
                        Hit
                      </button>
                      <button
                        type="button"
                        class="btn btn-success btn-sm BJ-btn-bet"
                        id="player3-bet"
                      >
                        Bet
                      </button>
                      <button
                        type="button"
                        class="btn btn-success btn-sm BJ-btn-double"
                        id="player3-double"
                      >
                        Double
                      </button>
                      <button
                        type="button"
                        class="btn btn-success btn-sm BJ-btn-split"
                        id="player3-split"
                      >
                        Split
                      </button>
                      <button
                        type="button"
                        class="btn btn-success btn-sm BJ-btn-done"
                        id="player3-done"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            */
}
