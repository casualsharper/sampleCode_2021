import React, { useState } from 'react';
import getSudokuBoard, { SudokuFieldProps } from './sudoku/sudokuboard';
import './App.css';

const App = () => {
  const [sudokuGrid, setSudokuGrid] = useState(getSudokuBoard());

  function isNumeric(str: any) {
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

  const onSolveClicked = () => {
    console.log("solving");
  }

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>, sudokuField: SudokuFieldProps | undefined) => {
    const newValue = Array.from(event.target.value).pop();

    if(newValue && isNumeric(newValue) && sudokuField){
      const newNumber = parseInt(newValue);

      if(newNumber > 9 || newNumber < 1)
      {
        return;
      }

      sudokuField.value = newNumber;

      const tempSudoku = [...sudokuGrid];

      setSudokuGrid(tempSudoku);
    }
  }

  const drawSudokuGrid = (sudokuGrid : SudokuFieldProps[]) => {

    const tbodies = [];
    let rows = [];

    for (let row = 0; row < 9; row++) {
        const rowFields = [];

        for(let column = 0; column < 9; column++) {
          const field = sudokuGrid?.find(f => { return f.column === column && f.row === row});
          rowFields.push(<td key={column}><input onChange={(event) => {onFieldChange(event, field)}} value={field?.value ?? ""}></input></td>)
        }
        
        rows.push(<tr key={rows.length + 1}>{rowFields}</tr>);

        if((row + 1) % 3 === 0)
        {
          tbodies.push(<tbody key={tbodies.length + 1}>{rows}</tbody>);
          rows = [];
        }
    }

    const sudokuGridFields = <>{tbodies}</>;

    return sudokuGridFields;
  }

  return (
    <div className="App">
      <table><caption>Sudoku solver 3000</caption>
        <colgroup><col/><col/><col/></colgroup>
        <colgroup><col/><col/><col/></colgroup>
        <colgroup><col/><col/><col/></colgroup>
        {drawSudokuGrid(sudokuGrid)}
      </table>
      <button onClick={onSolveClicked}>Solve</button>
    </div>);
}

export default App;
