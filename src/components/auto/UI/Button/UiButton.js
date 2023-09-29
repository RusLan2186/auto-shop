import cl from './MyButton.module.scss'


const UiButton = ({ children, ...props }) => {
   return (
      <button {...props} className={cl.myBtn}>{children}</button>
   )
}

export default UiButton