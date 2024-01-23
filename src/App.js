
import React from 'react'
import Confetti from 'react-confetti'
import Die from './Die'
import {nanoid} from 'nanoid'


export default function App(){

    function generateNewDice() {
        return {value : Math.floor(Math.random() * 6) + 1 , isHeld : false , id: nanoid() }
    }

    function holdDice(id) {
        setRandomArray((oldDice) =>
            oldDice.map((die) =>
                 die.id===id ? {...die , isHeld:!die.isHeld} : die
            )
        )
    }

    function handleArray() {
        setRandomArray((oldDice) =>
            oldDice.map((die) =>
                die.isHeld ? die : generateNewDice()
            )
        )
    }

    function ResetGame() {
        setRandomArray(allNewDice)
        setTenzies(false)
    }
 
    
    function allNewDice() {
        const newDice=[];
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDice())          
        }       
        
        return newDice   
    }

    const [randomArray , setRandomArray] = React.useState(allNewDice());
    
    const [tenzies , setTenzies]=React.useState(false);

    const [confettiVisible , setConfettiVisible] = React.useState(false)

    React.useEffect(() => {
        const allHeld = randomArray.every((die)=> die.isHeld);
        const basicValue=  randomArray[0].value;
        const allSameValue=randomArray.every((die)=>die.value===basicValue)

        if (allHeld && allSameValue) {
            console.log('You Won');
             setTenzies(true)
             setConfettiVisible(true)
             setTimeout(() => {
                setConfettiVisible(false);
            }, 5000);
        }

    }, [randomArray]);
    

    const mapRandomArray = randomArray.map((currentval) => <Die key={currentval.id} id={currentval.id} value={currentval.value} isHeld={currentval.isHeld} holdDice={holdDice}/>
    )
    
    



    return(
        <main>
            {confettiVisible && <Confetti />}
            <h2>Tenzies</h2>
            <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className='container'>
                {mapRandomArray}
            </div>
            <button className='roll-button' onClick={tenzies ? ResetGame : handleArray}>{tenzies ? 'New Game': 'Roll'}</button>
        </main>
    )
}