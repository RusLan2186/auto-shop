import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import axios from 'axios'
import { AutoType } from '../Auto'
import Loader from '../../loader/Loader'
import cl from './FullAuto.module.scss'
import Counter from '../../counter/Counter'
import { useAppDispatch } from '../../redux/store'
import { FullAutoType, addFullCar } from '../../redux/slices/cartSlice'




const FullAuto: React.FC = () => {
  const dispatch = useAppDispatch()
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



  const sendToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (fullAuto) {
      const item = { ...fullAuto };
      dispatch(addFullCar(item));
    }

  };

  return (
    <div className='container'>
      <div className={cl.fetchActions}>
        {isLoad && <Loader />}
        {errorFullAutoLoading && <div>
          <h2>{errorFullAutoLoading}</h2>
          <button className={cl.btn} onClick={() => navigate('/')}>Back</button>
        </div>
        }
      </div>
      <div className={cl.btnWrapper}>
        <button className={cl.btn} onClick={() => navigate('/')}>Back</button>
        <button onClick={sendToCart} className={cl.btnBuy}>Add to cart</button>
      </div>
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
