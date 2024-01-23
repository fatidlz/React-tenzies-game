import React from 'react'

export default function Die(props) {

    const styles ={
        backgroundColor : props.isHeld ? '#59E391' : "#FFF"
    }
    return(
        <div className='numbers' style={styles}  onClick={()=> props.holdDice(props.id)}>
            <h2 className='die-num'>{props.value}</h2>
        </div>
    )
    
}