// import cl from './MyModal.module.scss';

import cl from '../Modal/MyModal.module.scss'

const HeaderModal = ({ children, visible, changeVisible }) => {

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
            <div onClick={() => changeVisible(false)} className={cl.modalError}>X</div>
         </div>
      </div>
   )
}


export default HeaderModal