import React from 'react'
import cl from './FullAuto.module.scss'
import { imagesType } from '../../redux/slices/cartSlice';
import MyModal from '../../modal/MyModal';
import next from '../../img/next.png';



interface CollectionProps {
   images: imagesType[];
   imageStart: string;

}

const Collection: React.FC<CollectionProps> = ({ images, imageStart }) => {



   const [activeImage, setActiveImage] = React.useState<string>(imageStart)
   const [modal, setModal] = React.useState(false)
   const [current, setCurrent] = React.useState(0)

   const length = images.length;


   const showBigPhoto = (image: imagesType) => {
      setActiveImage(image.imgSrc)
   }


   const prevSlide = () => {
      setCurrent(current === 0 ? length - 1 : current - 1)

   }
   const nextSlide = () => {
      setCurrent(current === length - 1 ? 0 : current + 1)

   }
   if (!Array.isArray(images) || images.length <= 0) {
      return null
   }



   return (
      <div>
         <div className={cl.photo}>
            <img onClick={() => setModal(true)} className={cl.image} src={activeImage} alt="auto" />


            <MyModal visible={modal} changeVisible={setModal}>

               {images.map((image: imagesType, i: number) => (
                  // <div className={cl.imageModalWrapper} key={i} >
                  <div className={i === current ? cl.imageModalWrapperActive : cl.imageModalWrapper} key={i} >
                     {i === current && (
                        <>
                           <img src={next} className={cl.btnPrev} onClick={prevSlide} />
                           <img className={cl.imageModal} src={image.imgSrc} />
                           <img src={next} className={cl.btnNext} onClick={nextSlide} />
                        </>)}
                  </div>))}

            </MyModal>
            {/* <MyModal visible={modal} changeVisible={setModal}>
               {images.map((slide, index) => {
                  return (
                     <div
                        className={index === current ? 'slide active' : 'slide'}
                        key={index}
                     >
                        {index === current && (
                           <img src={slide.imgSrc} alt='travel image' />
                        )}
                     </div>
                  );
               })}

            </MyModal> */}

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

