import { useState } from "react"
import { likeImage, disLikeImage } from './constCounter'


const Counter = () => {

   const [like, setLike] = useState(0)

   const increment = () => {
      setLike(like + 1)
   }

   const decrement = () => {
      setLike(like - 1)
   }

   return (
      <div className="counter">
         <img className='image__like' src={likeImage} onClick={increment} alt="like" />
         <span className="like__counter">{like}</span>
         <img className='image__like' src={disLikeImage} onClick={decrement} alt="dislike" />
      </div>
   )
}

export default Counter