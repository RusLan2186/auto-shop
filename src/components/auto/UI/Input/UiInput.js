import cl from './MyInput.module.scss'


const UiInput = (props) => {
   return (
      <input {...props} className={cl.myInp} />
   )
}

export default UiInput