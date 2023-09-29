
import cl from './MyModal.module.scss';



const MyModal = ({ children, visible, changeVisible }) => {

   const rootClasses = [cl.myModal]
   if (visible) {
      rootClasses.push(cl.active)
   }
   const rootClassesContent = [cl.myModalContent];
   if (visible) {
      rootClassesContent.push(cl.active)
   }


   const closeForm = () => {
      changeVisible(false)

   }

   return (
      <div className={rootClasses.join(' ')} onClick={closeForm} >
         <div className={rootClassesContent.join(' ')} onClick={(e) => e.stopPropagation()}>

            {children}
            <div onClick={closeForm} className={cl.modalError}>X</div>
         </div>
      </div>
   )
}


export default MyModal