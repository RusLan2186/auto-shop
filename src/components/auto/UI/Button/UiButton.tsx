import cl from './MyButton.module.scss'

interface UiButtonProps{
   children:React.ReactChild | React.ReactNode
   onClick:(e:React.MouseEvent<HTMLButtonElement>)=>void;
}


const UiButton:React.FC<UiButtonProps> = ({ children, ...props }) => {
   return (
      <button {...props} className={cl.myBtn}>{children}</button>
   )
}

export default UiButton