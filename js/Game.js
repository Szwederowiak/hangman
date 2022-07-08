class Game {
  resultWrapper;
  passwordWrapper;
  categoryWrapper;
  keyboardWrapper;
  category;
  #password;
  hiddenPassword;
  life = 0;
  #lifeLimit = 8;

  constructor({
    resultWrapper,
    passwordWrapper,
    categoryWrapper,
    keyboardWrapper,
  }) {
    this.resultWrapper = resultWrapper;
    this.passwordWrapper = passwordWrapper;
    this.categoryWrapper = categoryWrapper;
    this.keyboardWrapper = keyboardWrapper;

    this.setPassword();
    this.setCategory();
  }

  run() {
    this.renderResult();
    this.setHiddenPassword();
    this.renderHiddenPassword();
    this.renderCategory();
    this.renderKeys();
  }

  renderResult() {
    for (let i = 0; i < this.#lifeLimit; i++) {
      const life = document.createElement("div");
      life.classList.add("mood__state");
      life.classList.add("mood__state-" + i);
      life.textContent = i + 1;

      this.resultWrapper.insertAdjacentElement("beforeend", life);
    }
  }

  renderHiddenPassword() {
    this.passwordWrapper.textContent = this.hiddenPassword;
  }

  renderCategory() {
    this.categoryWrapper.textContent += this.category;
  }

  renderKeys() {
    for (let i = 0; i < 26; i++) {
      const letter = String.fromCharCode(97 + i);
      const button = document.createElement("button");

      button.classList.add("keyboard__button");
      button.textContent = letter;

      button.addEventListener("click", (e) => {
        this.tryClickedLetter(e);
      });

      this.keyboardWrapper.insertAdjacentElement("beforeend", button);
    }
  }

  setPassword() {
    this.#password = prompt("podaj hasło");
  }

  setHiddenPassword() {
    this.hiddenPassword = this.#password.replace(/\S/g, "_");
  }

  setCategory() {
    this.category = ' ' + prompt("Podaj kategorię");
  }

  tryClickedLetter(e) {
    const clickedLetter = e.target.textContent;

    if (this.#password.includes(clickedLetter)) {
      const indexesToUncover = this.getIndexesOfHitLetter(clickedLetter);
      this.uncoverHitLetter(indexesToUncover, clickedLetter);
      this.checkWin();
    } else {
      this.loseLife();
      this.checkLoose();
    }
  }

  getIndexesOfHitLetter(letter) {
    // get indexes
    const hitLettersIndexes = [];
    this.#password.split("").map((currentLetter, index) => {
      if (currentLetter === letter) {
        hitLettersIndexes.push(index);
      }
    });

    return hitLettersIndexes;
  }

  uncoverHitLetter(letterIndexes, letterToReplace) {
    let splittedHiddenPassword = this.hiddenPassword.split("");
    for (let index of letterIndexes) {
      splittedHiddenPassword[index] = letterToReplace;
    }

    this.hiddenPassword = splittedHiddenPassword.join("");

    this.renderHiddenPassword();
  }

  checkWin() {
    if (this.hiddenPassword === this.#password) {
      alert("wygraueś");
    }
    console.log(this.hiddenPassword);
  }

  checkLoose() {
    if (this.life === this.#lifeLimit) {
      alert("przegraueś");
    }
    console.log(this.life);
    console.log(this.#lifeLimit);
  }

  loseLife() {
    this.resultWrapper
      .getElementsByClassName("mood__state-" + this.life)[0]
      .classList.add("mood__state--current");
    this.life++;
  }
}
