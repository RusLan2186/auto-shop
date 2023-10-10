import cl from './MyInput.module.scss'


interface UiInputProps{
   value:string;
//   children:React.ReactChild | React.ReactNode
  onChange:(e:React.ChangeEvent<HTMLInputElement>) =>void;
  onBlur?:(e:React.FocusEvent<HTMLInputElement>) =>void;
  placeholder:string;
  name?:string;
}


const UiInput:React.FC<UiInputProps> = (props) => {
   return (
      <input {...props} className={cl.myInp} />
   )
}

export default UiInput