(() => {
  const form = document.getElementById('first-move-form');
  const inputX = document.getElementById('guess-x');
  const inputO = document.getElementById('guess-o');
  const randomResult = document.getElementById('random-result');
  const boardEl = document.getElementById('board');
  const statusEl = document.getElementById('status');
  const resetBtn = document.getElementById('reset-btn');
  const langButtons = document.querySelectorAll('.lang-switch__btn');

  const titleEl = document.getElementById('title');
  const subtitleEl = document.getElementById('subtitle');
  const step1TitleEl = document.getElementById('step1-title');
  const step1HintEl = document.getElementById('step1-hint');
  const labelXEl = document.getElementById('label-x');
  const labelOEl = document.getElementById('label-o');
  const firstMoveBtnEl = document.getElementById('first-move-btn');
  const step2TitleEl = document.getElementById('step2-title');
  const step2HintEl = document.getElementById('step2-hint');
  const footerTextEl = document.getElementById('footer-text');

  const translations = {
    ru: {
      pageTitle: 'Крестики-нолики на Node.js',
      title: 'Крестики-нолики',
      subtitle: 'Выберите, кто ходит первым, загадав числа от 1 до 100, затем играйте с красивой анимацией ходов.',
      step1Title: '1. Выбор первого хода',
      step1Hint:
        'Игрок за <span class="mark mark--x">X</span> и игрок за <span class="mark mark--o">O</span> загадывают числа от 1 до 100. Игра генерирует случайное число, и тот, чьё число ближе, ходит первым.',
      labelX: 'Число игрока <span class="mark mark--x">X</span>',
      labelO: 'Число игрока <span class="mark mark--o">O</span>',
      btnDetermine: 'Определить, кто ходит первым',
      btnReset: 'Начать заново',
      step2Title: '2. Игра',
      step2Hint: 'Кликайте по свободным ячейкам. Фигуры появляются с плавной анимацией. Победная линия подсвечивается.',
      footer: 'Node.js Tic-Tac-Toe',
      placeholder: '1–100',
      playerName: { X: 'X (крестики)', O: 'O (нолики)' },
      statusNeedFirst: 'Сначала выберите, кто ходит первым (шаг 1).',
      statusErrorChooseFirst: 'Сначала выберите, кто ходит первым, заполнив числа в шаге 1.',
      statusInvalidNumbers: 'Ошибка ввода чисел. Убедитесь, что оба игрока ввели числа от 1 до 100.',
      statusTieFirstMove: 'Ничья при выборе первого хода. Введите новые числа и попробуйте ещё раз.',
      statusTurn: (player) => `Ходит игрок ${player === 'X' ? 'X (крестики)' : 'O (нолики)'} — выберите свободную ячейку.`,
      statusDraw: 'Ничья! Все клетки заняты. Нажмите «Начать заново», чтобы сыграть ещё раз.',
      statusWin: (player) =>
        `Победа игрока ${player === 'X' ? 'X (крестики)' : 'O (нолики)'}! Нажмите «Начать заново», чтобы сыграть ещё раз.`,
      randomInvalidNumbers: 'Пожалуйста, введите корректные числа от 1 до 100 для обоих игроков.',
      randomTie: (randomNumber) =>
        `Случайное число: <span class="random-result__number">${randomNumber}</span><br />
        Оба игрока оказались на одинаковом расстоянии от случайного числа.
        Попробуйте ещё раз — загадайте новые числа и нажмите кнопку снова.`,
      randomWinner: ({ randomNumber, diffX, diffO, firstPlayer }) =>
        `Случайное число: <span class="random-result__number">${randomNumber}</span><br />
        Расстояние игрока X: <strong>${diffX}</strong><br />
        Расстояние игрока O: <strong>${diffO}</strong><br />
        <span class="random-result__player">Первым ходит игрок ${
          firstPlayer === 'X' ? 'X (крестики)' : 'O (нолики)'
        }.</span>`,
    },
    en: {
      pageTitle: 'Tic-Tac-Toe on Node.js',
      title: 'Tic-Tac-Toe',
      subtitle: 'Pick who goes first by choosing numbers from 1 to 100, then play with smooth move animations.',
      step1Title: '1. Decide who goes first',
      step1Hint:
        'Player <span class="mark mark--x">X</span> and player <span class="mark mark--o">O</span> each choose a number from 1 to 100. The game rolls a random number; whoever is closer starts first.',
      labelX: 'Number for player <span class="mark mark--x">X</span>',
      labelO: 'Number for player <span class="mark mark--o">O</span>',
      btnDetermine: 'Decide who goes first',
      btnReset: 'Restart',
      step2Title: '2. Game',
      step2Hint: 'Click any empty cell. Marks appear with smooth animation. Winning line highlights.',
      footer: 'Node.js Tic-Tac-Toe',
      placeholder: '1–100',
      playerName: { X: 'X (crosses)', O: 'O (noughts)' },
      statusNeedFirst: 'Choose who goes first (step 1).',
      statusErrorChooseFirst: 'First decide who goes first by filling the numbers in step 1.',
      statusInvalidNumbers: 'Input error. Make sure both players enter numbers from 1 to 100.',
      statusTieFirstMove: 'Tie while deciding the first move. Enter new numbers and try again.',
      statusTurn: (player) =>
        `Player ${player === 'X' ? 'X (crosses)' : 'O (noughts)'} goes now — click a free cell.`,
      statusDraw: 'Draw! All cells are filled. Press “Restart” to play again.',
      statusWin: (player) =>
        `Player ${player === 'X' ? 'X (crosses)' : 'O (noughts)'} wins! Press “Restart” to play again.`,
      randomInvalidNumbers: 'Please enter valid numbers from 1 to 100 for both players.',
      randomTie: (randomNumber) =>
        `Random number: <span class="random-result__number">${randomNumber}</span><br />
        Both players are equally close. Try again — enter new numbers and press the button.`,
      randomWinner: ({ randomNumber, diffX, diffO, firstPlayer }) =>
        `Random number: <span class="random-result__number">${randomNumber}</span><br />
        Distance for player X: <strong>${diffX}</strong><br />
        Distance for player O: <strong>${diffO}</strong><br />
        <span class="random-result__player">Player ${
          firstPlayer === 'X' ? 'X (crosses)' : 'O (noughts)'
        } goes first.</span>`,
    },
  };

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let currentLang = 'ru';
  let board = Array(9).fill(null);
  let currentPlayer = null;
  let gameActive = false;
  let firstMoveChosen = false;
  let randomContext = null;

  const t = (key) => translations[currentLang][key];

  function setStatus(message, type) {
    statusEl.textContent = message;
    statusEl.className = 'status';
    if (type) {
      statusEl.classList.add(`status--${type}`);
    }
  }

  function setRandomResult(html, modifierClass) {
    randomResult.innerHTML = html;
    randomResult.className = 'random-result';
    if (modifierClass) {
      randomResult.classList.add(modifierClass);
    }
  }

  function renderRandomContext() {
    if (!randomContext) {
      randomResult.classList.add('hidden');
      return;
    }

    randomResult.classList.remove('hidden');

    if (randomContext.type === 'invalidNumbers') {
      setRandomResult(t('randomInvalidNumbers'), 'random-result--error');
      return;
    }

    if (randomContext.type === 'tie') {
      setRandomResult(t('randomTie')(randomContext.randomNumber), 'random-result--error');
      return;
    }

    if (randomContext.type === 'winner') {
      setRandomResult(t('randomWinner')(randomContext), 'random-result--winner');
    }
  }

  function clearBoardUI() {
    const cells = boardEl.querySelectorAll('.cell');
    cells.forEach((cell) => {
      cell.className = 'cell';
      cell.innerHTML = '';
    });
  }

  function resetGame(fullResetFirstMove = true, keepRandomResult = true) {
    board = Array(9).fill(null);
    gameActive = false;

    clearBoardUI();

    if (!keepRandomResult) {
      randomContext = null;
      randomResult.classList.add('hidden');
    } else {
      renderRandomContext();
    }

    if (fullResetFirstMove) {
      firstMoveChosen = false;
      currentPlayer = null;
      setStatus(t('statusNeedFirst'));
      return;
    }

    if (currentPlayer) {
      gameActive = true;
      setStatus(t('statusTurn')(currentPlayer), 'turn');
    } else {
      setStatus(t('statusNeedFirst'));
    }
  }

  function checkWinner() {
    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], combo };
      }
    }
    if (board.every((cell) => cell !== null)) {
      return { winner: null, combo: null, draw: true };
    }
    return null;
  }

  function renderMark(cellEl, player) {
    const content = document.createElement('div');
    content.className = 'cell__content';
    content.textContent = player;

    cellEl.classList.add('cell--filled', player === 'X' ? 'cell--x' : 'cell--o');

    void content.offsetWidth;

    cellEl.appendChild(content);

    requestAnimationFrame(() => {
      cellEl.classList.add('cell--placed');
    });
  }

  function highlightWinningCombo(combo) {
    combo.forEach((index) => {
      const cellEl = boardEl.querySelector(`.cell[data-index="${index}"]`);
      if (cellEl) {
        cellEl.classList.add('cell--win');
      }
    });
  }

  function handleCellClick(event) {
    const cellEl = event.target.closest('.cell');
    if (!cellEl) return;

    const index = parseInt(cellEl.dataset.index, 10);
    if (!firstMoveChosen) {
      setStatus(t('statusErrorChooseFirst'), 'error');
      return;
    }
    if (!gameActive) {
      return;
    }
    if (board[index] !== null) {
      return;
    }

    board[index] = currentPlayer;
    renderMark(cellEl, currentPlayer);

    const result = checkWinner();
    if (result) {
      gameActive = false;
      if (result.draw) {
        setStatus(t('statusDraw'), 'draw');
        return;
      }

      highlightWinningCombo(result.combo);
      setStatus(t('statusWin')(result.winner), 'win');
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    setStatus(t('statusTurn')(currentPlayer), 'turn');
  }

  function updateStatusLocalized() {
    const result = checkWinner();
    if (result) {
      if (result.draw) {
        setStatus(t('statusDraw'), 'draw');
      } else {
        setStatus(t('statusWin')(result.winner), 'win');
      }
      return;
    }

    if (!firstMoveChosen) {
      setStatus(t('statusNeedFirst'));
      return;
    }

    if (gameActive) {
      setStatus(t('statusTurn')(currentPlayer), 'turn');
      return;
    }

    setStatus(t('statusNeedFirst'));
  }

  function applyStaticTexts() {
    document.documentElement.lang = currentLang;
    document.title = t('pageTitle');

    titleEl.textContent = t('title');
    subtitleEl.textContent = t('subtitle');
    step1TitleEl.textContent = t('step1Title');
    step1HintEl.innerHTML = t('step1Hint');
    labelXEl.innerHTML = t('labelX');
    labelOEl.innerHTML = t('labelO');
    inputX.placeholder = t('placeholder');
    inputO.placeholder = t('placeholder');
    firstMoveBtnEl.textContent = t('btnDetermine');
    step2TitleEl.textContent = t('step2Title');
    step2HintEl.textContent = t('step2Hint');
    resetBtn.textContent = t('btnReset');
    footerTextEl.textContent = t('footer');
  }

  function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;

    langButtons.forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.lang === lang);
    });

    applyStaticTexts();
    renderRandomContext();
    updateStatusLocalized();
  }

  function initLanguageSwitcher() {
    langButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        setLanguage(btn.dataset.lang);
      });
    });
  }

  function initBoardListeners() {
    boardEl.addEventListener('click', handleCellClick);
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const valueX = Number(inputX.value);
    const valueO = Number(inputO.value);

    if (
      Number.isNaN(valueX) ||
      Number.isNaN(valueO) ||
      valueX < 1 ||
      valueX > 100 ||
      valueO < 1 ||
      valueO > 100
    ) {
      randomContext = { type: 'invalidNumbers' };
      renderRandomContext();
      setStatus(t('statusInvalidNumbers'), 'error');
      return;
    }

    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const diffX = Math.abs(randomNumber - valueX);
    const diffO = Math.abs(randomNumber - valueO);

    if (diffX === diffO) {
      randomContext = { type: 'tie', randomNumber };
      renderRandomContext();
      firstMoveChosen = false;
      currentPlayer = null;
      gameActive = false;
      resetGame(true, true);
      setStatus(t('statusTieFirstMove'), 'error');
      return;
    }

    const firstPlayer = diffX < diffO ? 'X' : 'O';
    currentPlayer = firstPlayer;
    firstMoveChosen = true;
    randomContext = { type: 'winner', randomNumber, diffX, diffO, firstPlayer };
    renderRandomContext();

    resetGame(false, true);
  });

  resetBtn.addEventListener('click', () => {
    resetGame(false, true);
  });

  function init() {
    applyStaticTexts();
    initLanguageSwitcher();
    initBoardListeners();
    resetGame(true, false);
    renderRandomContext();
  }

  init();
})();

