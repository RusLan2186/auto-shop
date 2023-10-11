import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { AutoType } from './Auto'

const FullAuto:React.FC = () => {
  const [fullAuto, setFullAuto] = useState<AutoType>()
  const [error, setError] = useState<string>('')
    const {id} = useParams()

    useEffect(() => {
      async function FetchAuto(){
        try{
          const responce = await axios.get<AutoType>('https://64cbc2282eafdcdc85194590.mockapi.io/autos/' + id)
          setFullAuto(responce.data)
        } catch(e:any) {
          setError(e.message)
          
        }
     }
     FetchAuto()
    },[])

if(!fullAuto){
    return 'loading'
   }
   if(error){
    return "error"
   }

  return (
    <div>
   <p style={{color:'red'}}>   {error}</p>
<h1>{fullAuto.brand}</h1>
<h2>{fullAuto.year}</h2>
<h2>{fullAuto.price}</h2>
<img src={fullAuto.imageUrl} alt="" />
     
    </div>
  )
}

export default FullAuto
