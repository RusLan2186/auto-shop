// import cl from './MyModal.module.scss';

import cl from '../modal/MyModal.module.scss'

interface HeaderModalProps {
   visible: boolean;
   children: React.ReactChild | React.ReactNode;
   changeVisible: (visible: boolean) => void;
}

const HeaderModal: React.FC<HeaderModalProps> = ({ children, visible, changeVisible }) => {

   const rootClasses = [cl.myModal]
   if (visible) {
      rootClasses.push(cl.active)
   }
   const rootClassesContent = [cl.myModalContent];
   if (visible) {
      rootClassesContent.push(cl.active)
   }



   return (
      <div className={rootClasses.join(' ')} onClick={() => changeVisible(false)} >
         <div className={rootClassesContent.join(' ')} onClick={(e) => e.stopPropagation()}>
            {children}
            <div onClick={() => changeVisible(false)} className={cl.modalClose}>X</div>
         </div>
      </div>
   )
}


export default HeaderModal