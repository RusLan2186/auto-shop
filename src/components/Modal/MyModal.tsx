
import cl from './MyModal.module.scss';

interface MyModalProps {
   visible: boolean;
   children: React.ReactChild | React.ReactNode;
   changeVisible: (visible: boolean) => void;
}


const MyModal: React.FC<MyModalProps> = ({ children, visible, changeVisible }) => {


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
            <div onClick={closeForm} className={cl.modalClose}>X</div>
         </div>
      </div>
   )
}


export default MyModal