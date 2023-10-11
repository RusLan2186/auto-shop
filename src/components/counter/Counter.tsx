import { useState } from "react"
import  likeImage  from './image/like.png';
import disLikeImage from './image/dislike.png'


const Counter:React.FC = () => {

   const [like, setLike] = useState<number>(0)

   const increment = (e:React.MouseEvent<HTMLImageElement>) => {
      e.preventDefault()
      setLike(like + 1)
   }

   const decrement = (e:React.MouseEvent<HTMLImageElement>) => {
      e.preventDefault()
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