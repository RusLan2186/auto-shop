import cl from './FormHeader.module.scss'
import { useEffect, useState, useRef } from 'react'
import { emailMessageError, passwordMessageError, incorrectEmail, incorrectPass, enterProfileTitle, enter, okImg } from './headerConstants'

interface ReferingPass {
   showPass:string
  setShowPass: HTMLInputElement
}

interface FormHeaderProps{
   openModal:boolean
}

const FormHeader:React.FC<FormHeaderProps> = ({ openModal }) => {
   const [email, setEmail] = useState<string>('')
   const [password, setPassword] = useState<string>('')
   const [emailDirty, setEmailDirty] = useState<boolean>(false)
   const [passwordDirty, setPasswordDirty] = useState<boolean>(false)
   const [emailError, setEmailError] = useState<string>(emailMessageError)
   const [passwordError, setPasswordError] = useState<string>(passwordMessageError)
   const [formValid, setFormValid] = useState<boolean>(false)
   const [showPass, setShowPass] = useState<any>('password')
   const [passOk, setPassOk] = useState<string>('')
   const [mailOk, setMailOk] = useState<string>('')
   const [check, setCheck] = useState<boolean>(false)

   // const passREf = useRef<HTMLInputElement>(showPass);
   const passREf = useRef<ReferingPass>(null);


   const showPassword = (e:React.MouseEvent<HTMLInputElement>) => {
      if (showPass === 'password') {
         setShowPass(passREf.current.type = 'text')

      }
      else {
         setShowPass(passREf.current.type = 'password')

      }
   }

   const blurHandler = (e:React.FocusEvent<HTMLInputElement>) => {
      switch (e.target.name) {
         case 'email':
            setEmailDirty(true)
            break
         case 'password':
            setPasswordDirty(true)
            break
      }
   }

   const enailHundler = (e:React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value)
      const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (!re.test(String(e.target.value).toLowerCase())) {
         setEmailError(incorrectEmail)
         if (!e.target.value) {
            setEmailError(emailMessageError)
         }
      } else {
         setEmailError('')
         setMailOk(okImg)
      }
   }
   const passwordHundler = (e:React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value)
      if (e.target.value.length < 5) {
         setPasswordError(incorrectPass)
         if (!e.target.value) {
            setPasswordError(passwordMessageError)
            setPassOk('')
         }
      }
      else {
         setPasswordError('')
         setPassOk(okImg)
      }
   }
   useEffect(() => {
      if (emailError && passwordError && email.length < 5 && password.length < 5 || emailError || passwordError || email.length < 5 || password.length < 5) {
         setFormValid(false)
      } else {
         setFormValid(true)
      }

   }, [emailError, passwordError, email, password])

   useEffect(() => {
      if (openModal === false) {
         setEmail('')
         setPassword('')
         setEmailError('')
         setPasswordError('')
         setFormValid(false)
         setCheck(false)
      
  } else {
         setFormValid(false)
      }

   }, [openModal])



   return (
      <div>
         <h1 className={cl.title}>{enterProfileTitle}</h1>
         <form className={cl.formItems}>
            <div className={cl.form}>
               {(emailDirty && emailError) && <div className='error'>{emailError}</div>}
               <div className={cl.inputItem} >
                  <input className={(emailDirty && emailError) && { emailError } ? cl.myInpError : cl.myInput}
                     value={email}
                     onChange={e => enailHundler(e)}
                     onBlur={e => blurHandler(e)}
                     type="email"
                     placeholder="Enter your e-mail"
                     name='email'
                  />
                  {(emailDirty && !emailError && email.length > 5) && <img className={cl.ok} src={mailOk} alt="ok" />}

               </div>
               {(passwordDirty && passwordError) && <div className='error'>{passwordError} </div>}
               <div className={cl.inputItem}>
                  <input className={(passwordDirty && passwordError) && { passwordError } ? cl.myInpError : cl.myInput}
                     value={password}
                     onChange={e => passwordHundler(e)}
                     onBlur={e => blurHandler(e)}
                     type="password"
                     placeholder="Enter your password"
                     name='password'
                     ref={passREf}
                  />
                  {(!passwordError && password.length > 4) && <img className={cl.ok} src={passOk} alt="ok" />}
               </div>
               <div className={cl.check}>
                  <input
                     checked={check}
                     onChange={e => setCheck(!check)}
                     onClick={(prev) => showPassword(prev)} type="checkbox" id='check' />
                  <label htmlFor="check">Show password</label>
               </div>
               <button type='submit' disabled={!formValid} className={!formValid ? cl.noActive : cl.myBtn}>{enter}</button>
            </div>

         </form>

      </div>
   )
}

export default FormHeader