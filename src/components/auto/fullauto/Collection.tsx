import React from 'react'
import cl from './FullAuto.module.scss'
import { imagesType } from '../../redux/slices/cartSlice';

interface CollectionProps {
   images: imagesType[];
   imageStart: string;
}

const Collection: React.FC<CollectionProps> = ({ images, imageStart }) => {



   const [activeImage, setActiveImage] = React.useState<string>(imageStart)

   const showBigPhoto = (image: imagesType) => {
      setActiveImage(image.imgSrc)
   }



   return (
      <div>
         <div className={cl.photo}>
            <img className={cl.image} src={activeImage} alt="auto" />
         </div>

         <div className={cl.smallImagesWrapper}>
            {images.map((image: imagesType, i: number) => (<div key={i} className={cl.smallImages} >
               <img onClick={() => showBigPhoto(image)} className={cl.imageSmall} src={image.imgSrc} />
            </div>))}
         </div>

      </div>
   )
}

export default Collection

