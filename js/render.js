import { FieldState } from "./field.js";
import { Stage } from "./state.js";

export function render(state)
{
    return `
    ${renderStage(state.stage)}
    ${renderTable(state.board)}
    `;
}

function renderStage(stage)
{
    return `<spam>${stage === Stage.VICTORY ? '😎' : (stage === Stage.GAME_OVER ? '😭' : '😀')}</spam>`
    
}

function renderTable(board)
{
    return `<table>${board.map(renderRow).join('')}</table>`;
}

function renderRow(row)
{
    return `<tr>${row.map(renderField).join('')}</tr>`;
}

function renderField(field)
{
    if(field.state === FieldState.REVEALED)
    {
        return `
            <td>${field.isMine 
                ? (field.isBlownUp ? '❌' : '💣') 
                : ( field.neighborCount > 0 ? field.neighborCount : '')}
            </td>
        `;
    }
    else
    {
        return `
            <td>
                <button>${field.state === FieldState.FLAGGED ? 'F' : ''}</button>
            </td>
        `;
    }
}