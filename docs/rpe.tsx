import React, { useState } from 'react';

const rpes = [10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5];
const reps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const initialPercentages = [
  [100, 98, 96, 94, 92, 91, 89, 88],
  [96, 94, 92, 91, 89, 88, 86, 85],
  [92, 91, 89, 88, 86, 85, 84, 82],
  [89, 88, 86, 85, 84, 82, 81, 80],
  [86, 85, 84, 82, 81, 80, 79, 77],
  [84, 82, 81, 80, 79, 77, 76, 75],
  [81, 80, 79, 77, 76, 75, 74, 72],
  [79, 77, 76, 75, 74, 72, 71, 69],
  [76, 75, 74, 72, 71, 69, 68, 67],
  [74, 72, 71, 69, 68, 67, 65, 64]
];

export default function OneRMCalculator() {
  const [percentages, setPercentages] = useState(initialPercentages);
  const [oneRM, setOneRM] = useState(100);

  const recalculatePercentages = (newOneRM) => {
    return initialPercentages.map(row => 
      row.map(cell => Math.round((cell / 100) * newOneRM))
    );
  };

  const handleCellChange = (rowIndex, colIndex, value) => {
    const percentage = initialPercentages[rowIndex][colIndex];
    const newOneRM = Math.round((value / percentage) * 100);
    setOneRM(newOneRM);
    setPercentages(recalculatePercentages(newOneRM));
  };

  return (
    <div style={{padding: '1rem'}}>
      <h1 style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem'}}>Interactive 1RM Calculator</h1>
      <p style={{marginBottom: '1rem'}}>Estimated 1RM: {oneRM} lbs</p>
      <table style={{borderCollapse: 'collapse', width: '100%'}}>
        <thead>
          <tr>
            <th style={{border: '1px solid #ddd', padding: '8px'}}>Reps</th>
            {rpes.map(rpe => (
              <th key={rpe} style={{border: '1px solid #ddd', padding: '8px'}}>RPE {rpe}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {percentages.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td style={{border: '1px solid #ddd', padding: '8px'}}>{reps[rowIndex]}</td>
              {row.map((cell, colIndex) => (
                <td key={colIndex} style={{border: '1px solid #ddd', padding: '8px'}}>
                  <input
                    type="number"
                    value={cell}
                    onChange={(e) => handleCellChange(rowIndex, colIndex, parseInt(e.target.value))}
                    style={{width: '100%', padding: '4px', boxSizing: 'border-box'}}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
