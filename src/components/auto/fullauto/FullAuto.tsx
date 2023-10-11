import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import axios from 'axios'
import { AutoType } from '../Auto'
import Loader from '../../loader/Loader'
import cl from './FullAuto.module.scss'
import Counter from '../../counter/Counter'

export type FullAutoType = {
  id: number;
  brand: string;
  price: string;
  imageUrl: string;
  year: string;
  numberPrice: number;
  raiting: number;
  discription: string;
  motor: string;
  transmission: string;
}


const FullAuto: React.FC = () => {
  const [isLoad, setIsload] = useState<boolean>(false)
  const [fullAuto, setFullAuto] = useState<FullAutoType>()
  const [errorFullAutoLoading, setErrorFullAutoLoading] = useState<string>('')
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function FetchAuto() {
      try {
        setIsload(true)
        const responce = await axios.get<FullAutoType>('https://64cbc2282eafdcdc85194590.mockapi.io/autos/' + id)
        setFullAuto(responce.data)
        setIsload(false)
        setErrorFullAutoLoading('')
      } catch (e: any) {
        setErrorFullAutoLoading(e.message)
        setIsload(false)

      }
    }
    FetchAuto()
  }, [])



  return (
    <div className='container'>
      <div className={cl.fetchActions}>
        {isLoad && <Loader />}
        {errorFullAutoLoading && <div>
          <h2>{errorFullAutoLoading}</h2>
          <button onClick={() => navigate('/')}>Back</button>
        </div>
        }
      </div>
      <button className={cl.btn} onClick={() => navigate('/')}>Back</button>
      {fullAuto &&
        <div>
          <div className={cl.wrapper}>
            <div className={cl.info}>
              <h1 className={cl.brand}>Brand: <span>{fullAuto.brand}</span></h1>
              <h2 className={cl.year}>Year:<span> {fullAuto.year}</span></h2>
              <h2 className={cl.price}>Price:<span> {fullAuto.price}$</span></h2>
              <h2 className={cl.price}>Motor:<span> {fullAuto.motor}</span></h2>
              <h2 className={cl.price}>Transmission:<span> {fullAuto.transmission}</span></h2>

            </div>
            <div className={cl.photos}>
              <img className={cl.image} src={fullAuto.imageUrl} alt="" />
            </div>
          </div>
          <h3 className={cl.discription}>{fullAuto.discription}</h3>
        </div>}

    </div>
  )
}

export default FullAuto
