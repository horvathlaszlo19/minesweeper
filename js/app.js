import { FieldState } from "./field.js";
import { render } from "./render.js";
import { AppState, Stage } from "./state.js";

const state = new AppState();
const game = document.querySelector('#game');
const button = document.querySelector('button');
const widthInput = document.querySelector('#width');
const heightInput = document.querySelector('#height');
const mineCountInput = document.querySelector('#mineCount');

function handleNewGameButton()
{
    const width = parseInt(widthInput.value);
    const height = parseInt(heightInput.value);
    const mineCount = parseInt(mineCountInput.value);

    if(mineCount >= width * height) return;

    state.init(width, height, mineCount);
    game.innerHTML = render(state);
}

button.addEventListener('click', handleNewGameButton);

function handleFieldClick(event)
{
    if(!event.target.matches('button')) return;

    if(state.stage !== Stage.PLAYING) return;

    const td = event.target.parentNode;
    const tr = td.parentNode;
    const x = td.cellIndex;
    const y = tr.rowIndex;

    state.reveal(x, y);
    state.checkForVictory();
    game.innerHTML = render(state);
}

game.addEventListener('click', handleFieldClick);

function handleRightClick(event)
{
    event.preventDefault();

    if(!event.target.matches('button')) return;

    if(state.stage !== Stage.PLAYING) return;

    const td = event.target.parentNode;
    const tr = td.parentNode;
    const x = td.cellIndex;
    const y = tr.rowIndex;

    state.toggleFlag(x, y);

    game.innerHTML = render(state);

}

game.addEventListener('contextmenu', handleRightClick);

function handleLeftClick(event)
{
    if (!event.target.matches('button')) {
        return;
      }
    
      if (state.stage !== Stage.PLAYING) {
        return;
      }
    
      const td = event.target.parentNode;
      const tr = td.parentNode;
      const x = td.cellIndex;
      const y = tr.rowIndex;
    
      state.reveal(x, y);
      state.checkForVictory();
    
      game.innerHTML = render(state);

}

game.addEventListener('click', handleLeftClick);

function handleFieldDoubleClick(event)
{
    if (event.buttons !== 3) return;

    if (!event.target.matches('td')) return;

    if(state.stage !== Stage.PLAYING) return;

    const td = event.target;
    const tr = td.parentNode;
    const x = td.cellIndex;
    const y = tr.rowIndex;

    const flagsNearby = state.countFlagsNearby(x, y);
    const neighborCount = state.board[y][x].neighborCount;

    if(flagsNearby === neighborCount)
    {
        state.board[y][x].neighborCount = 0;
        state.board[y][x].state = FieldState.UNREVEALED;
        state.reveal(x, y);
        state.board[y][x].neighborCount = neighborCount;
    }

    state.checkForVictory();

    game.innerHTML = render(state);
}

game.addEventListener('mousedown', handleFieldDoubleClick);
