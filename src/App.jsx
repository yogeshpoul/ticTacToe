import React, { useEffect, useState } from 'react'
import './App.css'
import Square from './square/Square'

const App = () => {
  const renderFrom = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
  const [gameState, setGameState] = useState(renderFrom);
  const [currentPlayer, setCurrentPlayer] = useState('circle')
  const [finishedState, setFinishedState] = useState(false)
  const [finishedArrayState,setFinishedArrayState]=useState([])

  const checkWinner=()=>{
    for(let row=0;row<gameState.length;row++){
      if( gameState[row][0] ===gameState[row][1] && 
        gameState[row][1]===gameState[row][2] ){
          setFinishedArrayState(row*3+0,row*3+1,row*3+2)
          return gameState[row][0]
        }
    }
    for(let col=0;col<gameState.length;col++){
      if( gameState[0][col] ===gameState[1][col] && 
        gameState[1][col]===gameState[2][col] ){
          return gameState[0][col]
        }
      if( gameState[0][0] ===gameState[1][1] && 
        gameState[1][1]===gameState[2][2] ){
          return gameState[0][0]
        }
      if( gameState[0][2] ===gameState[1][1] && 
        gameState[1][1]===gameState[2][0] ){
          return gameState[0][2]
        }
    }
    const isDrawMatch=gameState.flat().every((e)=>{
      if(e==='circle' || e==='cross') return true
    });
    if(isDrawMatch) return 'draw'
    return null
  }

  useEffect(()=>{
    const winner=checkWinner();
    if(winner==='circle' || winner==='cross' ||winner==='draw'){
      setFinishedState(winner)
      console.log(winner);
    }

  },[gameState])

  return (
    <div className='main-div'>
      <div className='move-detection'>
        <div className='left'>

        </div>
        <div className='right'>

        </div>
      </div>

      <div>
        <h1 className='game-heading water-background'>Tic Tac Toe</h1>
      </div>

      <div className='square-wrapper'>
        {gameState.map((arr,rowIndex) =>
          arr.map((e, colIndex) => {
            return <Square
            finishedArrayState={finishedArrayState}
              id={rowIndex*3+colIndex}
              key={rowIndex*3+colIndex}
              finishedState={finishedState} 
              setFinishedState={setFinishedState} 
              setGameState={setGameState} 
              currentPlayer={currentPlayer} 
              setCurrentPlayer={setCurrentPlayer} />;
          })
        )}
      </div>
      {/* {finishedState && finishedState!=='draw' && (<h1>winner is {finishedState}</h1>)}
      {finishedState && finishedState==='draw' && (<h1>it is {finishedState}</h1>)} */}
      {finishedState && (<h1>{finishedState==='circle'?'winner is circle':finishedState==='cross'?'winner is cross':'its a draw'}</h1>)}


    </div>
  )
}

export default App