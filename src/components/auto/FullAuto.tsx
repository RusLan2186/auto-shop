import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router'
import axios from 'axios'
import { AutoType } from './Auto'
import Loader from '../loader/Loader'


const FullAuto:React.FC = () => {
  const [isLoad, setIsload] = useState<boolean>(false)
  const [fullAuto, setFullAuto] = useState<AutoType>()
  const [errorFullAutoLoading, setErrorFullAutoLoading] = useState<string>('')
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
      async function FetchAuto(){
        try{
          setIsload(true)
          const responce = await axios.get<AutoType>('https://64cbc2282eafdcdc85194590.mockapi.io/autos/' + id)
          setFullAuto(responce.data)
          setIsload(false)
          setErrorFullAutoLoading('')
        } catch(e:any) {
          setErrorFullAutoLoading(e.message)
          setIsload(false)
          
        }
     }
     FetchAuto()
    },[])



  return (
    <div>
      {isLoad &&  <Loader/>}
      {errorFullAutoLoading && <div>
        <h2>{errorFullAutoLoading}</h2>
        <button onClick={() => navigate('/')}>Back</button>
        </div>
     }
      {fullAuto &&
       <div>
       <p style={{color:'red'}}>   {errorFullAutoLoading}</p>
    <h1>{fullAuto.brand}</h1>
    <h2>{fullAuto.year}</h2>
    <h2>{fullAuto.price}</h2>
    <img src={fullAuto.imageUrl} alt="" />
     <button onClick={() => navigate('/')}>Back</button>
   </div> }

     
    </div>
  )
}

export default FullAuto
