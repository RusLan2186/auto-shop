import React from 'react'
import cl from './FullAuto.module.scss'
import { imagesType } from '../../redux/slices/cartSlice';
import MyModal from '../../modal/MyModal';



interface CollectionProps {
   images: imagesType[];
   imageStart: string;
}

const Collection: React.FC<CollectionProps> = ({ images, imageStart }) => {

   const [activeImage, setActiveImage] = React.useState<string>(imageStart)
   const [modal, setModal] = React.useState(false)

   const showBigPhoto = (image: imagesType, i: number) => {
      setActiveImage(image.imgSrc)
      console.log(typeof image.imgSrc);
   }



   return (
      <div>
         <div className={cl.photo}>
            <img onClick={() => setModal(true)} className={cl.image} src={activeImage} alt="auto" />
            <MyModal visible={modal} changeVisible={setModal}>
               <div className={cl.imageModalWrapper}>  <img className={cl.imageModal} src={activeImage} alt="auto" /></div>
            </MyModal>
         </div>

         <div className={cl.smallImagesWrapper}>
            {images.map((image: imagesType, i: number) => (<div key={i} className={cl.smallImages} >
               <img onClick={() => showBigPhoto(image, i)} className={cl.imageSmall} src={image.imgSrc} />
            </div>))}
         </div>

      </div>
   )
}

export default Collection

