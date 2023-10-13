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
   const [current, setCurrent] = React.useState(1)

   const length = images.length;


   const showBigPhoto = (image: imagesType, i: number) => {
      setActiveImage(image.imgSrc)
   }


   const prevSlide = () => {
      setCurrent(current === 0 ? length - 1 : current - 1)
      console.log(length);
   }
   const nextSlide = () => {
      setCurrent(current === length - 1 ? 0 : current + 1)
      console.log(length);

   }
   if (!Array.isArray(images) || images.length <= 0) {
      return null
   }



   return (
      <div>
         <div className={cl.photo}>
            <img onClick={() => setModal(true)} className={cl.image} src={activeImage} alt="auto" />
            {/* <MyModal visible={modal} changeVisible={setModal}>
               <div className={cl.imageModalWrapper}>
                  <img className={cl.imageModal} src={activeImage} alt="auto" />
               </div>
             
            </MyModal> */}

            <MyModal visible={modal} changeVisible={setModal}>


               {images.map((image: imagesType, i: number) => (<div className={cl.imageModalWrapper} key={i} >
                  {i === current && (
                     <div >
                        <button className={cl.btnPrev} onClick={prevSlide}>Prev</button>
                        <img className={cl.imageModal} src={image.imgSrc} />
                        <button className={cl.btnNext} onClick={nextSlide}>Next</button>
                     </div>)}
               </div>))}



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

