import React from 'react'
import barber from '../../pics/barber.jpeg'
import barberFull from '../../pics/barberFull.jpeg'
import bolsa from '../../pics/Bolsa.jpeg'
import bolsaFull from '../../pics/bolsaFull.jpeg'
import cafe from '../../pics/cafe.jpeg'
import cafeFull from '../../pics/cafeFull.jpeg'
import fideos from "../../pics/fideos.jpeg"
import fideosFull from "../../pics/fideosFull.jpeg"
import hojas from "../../pics/hojas.jpeg"
import hojasFull from "../../pics/hojasFull.jpeg"
import salmon from "../../pics/salmon.jpeg"
import salmonFull from "../../pics/salmonFull.jpeg"

const SecretPage = () => {
  const arr=[barber,barberFull,bolsa,bolsaFull,cafe,cafeFull,fideos,fideosFull,hojas,hojasFull,salmon,salmonFull]
  return (
    <div>
      {arr.map(item=>{
        return(
          <img src={item} alt="" />
        )
      })

      }
    </div>
  )
}

export default SecretPage
