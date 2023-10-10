import cl from './FormHeader.module.scss'
import { useEffect, useState, useRef } from 'react'
import { emailMessageError, passwordMessageError, incorrectEmail, incorrectPass, passMismatch, showPassLabel, enterProfileTitle, userNameErrorMesssage, reg, userNumberMessageError, okImg } from './headerConstants'

interface RegistrationFormProps{
   regModal:boolean;
  
}
type TypeString= Record <string, string>
type TypeBoolean= {
   emailD: boolean, 
   passwordD: boolean,
    repeatPassD: boolean,
     userNameD: boolean, 
     userNumberD: boolean
}


const RegistrationForm:React.FC<RegistrationFormProps> = ({ regModal }) => {

   const [info, setInfo] = useState<TypeString>({ email: '', password: '', repeatPass: '', userName: '', userNumber: '' })
   const [dirty, setDirty] = useState<TypeBoolean>({ emailD: false, passwordD: false, repeatPassD: false, userNameD: false, userNumberD: false })
   const [error, setError] = useState<TypeString>({ emailError: '', passwordError: '', repeatPassError: '', userNameError: '', userNumberError: '' })
const [formValid, setFormValid] = useState<boolean>(false)
   const [ok, setOk] = useState<TypeString>({ emailOk: '', passOk: '', repeatPassOk: '', userNameOk: '', userNumberOk: '' })
   const [showPass, setShowPass] = useState<any>('password')
   const [showRepeatPass, setShowRepeatPass] = useState<any>('password')

   const passREf = useRef<HTMLInputElement>(showPass);
   const RepeatPassREf = useRef<HTMLInputElement>(showRepeatPass);
const [check, setCheck] = useState<boolean>(false)
   const [checkRepeat, setCheckRepeat] = useState<boolean>(false)

   const showPassword = (e:React.MouseEvent<HTMLInputElement>) => {
      if (showPass === 'password') {
         setShowPass(passREf.current.type = 'text')
}

      else {
         setShowPass(passREf.current.type = 'password')

      }
   }
   const showRepeatPassword = (e:React.MouseEvent<HTMLInputElement>) => {
      if (showRepeatPass === 'password') {
         setShowRepeatPass(RepeatPassREf.current.type = 'text')

      }
      else {
         setShowRepeatPass(RepeatPassREf.current.type = 'password')

      }
   }

const blurHandler = (e:React.FocusEvent<HTMLInputElement>) => {
      switch (e.target.name) {
         case 'email':
            setDirty({ ...dirty, emailD: true })
            break
         case 'password':
            setDirty({ ...dirty, passwordD: true })
            break
         case 'Repeatpass':
            setDirty({ ...dirty, repeatPassD: true })
            break
         case 'userName':
            setDirty({ ...dirty, userNameD: true })
            break
         case 'userNumber':
            setDirty({ ...dirty, userNumberD: true })
            break
      }
   }

   const emailHundler = (e:React.ChangeEvent<HTMLInputElement>) => {
      setInfo({ ...info, email: e.target.value })
      const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (!re.test(String(e.target.value).toLowerCase())) {
         setError({ ...error, emailError: incorrectEmail })
         if (!e.target.value) {
            setError({ ...error, emailError: emailMessageError })
         }
      } else {
         setError({ ...error, emailError: '' })
         setOk({ ...ok, emailOk: okImg })
      }
   }

   const passwordHundler = (e:React.ChangeEvent<HTMLInputElement>) => {
      setInfo({ ...info, password: e.target.value })
      if (e.target.value.length <= 5) {
         setError({ ...error, passwordError: incorrectPass })
         if (!e.target.value) {
            setError({ ...error, passwordError: passwordMessageError })
         }
      }
      else {
         setError({ ...error, passwordError: '' })
         setOk({ ...ok, passOk: okImg })
      }
   }


   const repeatPassHundler = (e:React.ChangeEvent<HTMLInputElement>) => {
      setInfo({ ...info, repeatPass: e.target.value })
      if (e.target.value !== passREf.current.value) {
         setError({ ...error, repeatPassError: passMismatch })
         if (!e.target.value) {
            setError({ ...error, repeatPassError: passwordMessageError })
         }
      }
      else {
         setError({ ...error, repeatPassError: '' })
         setOk({ ...ok, repeatPassOk: okImg })
      }

   }

   const userNameHundler = (e:React.ChangeEvent<HTMLInputElement>) => {
      setInfo({ ...info, userName: e.target.value })
      if (e.target.value.length < 2) {
         setError({ ...error, userNameError: userNameErrorMesssage })
      }
      else {
         setError({ ...error, userNameError: '' })
         setOk({ ...ok, userNameOk: okImg })
      }
   }

   const userNumberHundler = (e:React.ChangeEvent<HTMLInputElement>) => {
      setInfo({ ...info, userNumber: e.target.value })
      const numb = /[0-9, +]/;
      if (!numb.test(e.target.value) || e.target.value.length < 12) {
         setError({ ...error, userNumberError: userNumberMessageError })
      }
      else {
         setError({ ...error, userNumberError: '' })
         setOk({ ...ok, userNumberOk: okImg })
      }
   }

  useEffect(() => {
      if ((error.emailError && error.passwordError && error.repeatPassError && error.userNameError && error.userNumberError && info.email.length === 0 && info.password.length < 5 && info.repeatPass.length < 5 && info.userName.length < 2 && info.userNumber.length < 13) || (error.emailError || error.passwordError && error.repeatPassError && error.userNumberError || error.userNameError || info.email.length === 0 || info.password.length < 5 || info.repeatPass.length < 5 || info.userNumber.length < 13 || info.userName.length < 2)) {
         setFormValid(false)
      } else {
         setFormValid(true)
      }
   }, [error.emailError, error.passwordError, error.repeatPassError, error.userNameError, error.userNumberError, info.email, info.password, info.repeatPass, info.userName, info.userNumber])


 useEffect(() => {
      if (regModal === false) {
         setInfo({ email: '', password: '', repeatPass: '', userName: '', userNumber: '' })
         setError({ emailError: '', passwordError: '', repeatPassError: '', userNameError: '', userNumberError: '' })
         setFormValid(false)
         setCheck(false)
         setCheckRepeat(false)
         setShowPass(passREf.current.type = 'password')
         setShowRepeatPass(RepeatPassREf.current.type = 'password')

      } else {
         setFormValid(false)
      }

   }, [regModal])




   return (
      <div>
         <h1 className={cl.title}>{enterProfileTitle}</h1>
         <form className={cl.formItems}>
            <div className='form'>
               {(dirty.emailD && error.emailError) && <div className='error'>{error.emailError}</div>}
               <div className={cl.inputItem}>
                  <input className={(dirty.emailD && error.emailError) && (error.emailError) ? cl.myInpError : cl.myInput}
                     value={info.email}
                     onChange={e => emailHundler(e)}
                     onBlur={e => blurHandler(e)}
                     type="email"
                     placeholder="Enter your e-mail"
                     name='email'
                     id={'email'}
                     autoComplete='off'
                  />
                  {(dirty.emailD && !error.emailError && info.email.length > 5) && <img className={cl.ok} src={ok.emailOk} alt="ok" />}
               </div>

               {(dirty.passwordD && error.passwordError) && <div className='error'>{error.passwordError}</div>}
               <div className={cl.inputItem}>
                  <input className={(dirty.passwordD && error.passwordError) && (error.passwordError) ? cl.myInpError : cl.myInput}
                     value={info.password}
                     onChange={e => passwordHundler(e)}
                     onBlur={e => blurHandler(e)}
                     type="password"
                     placeholder="Enter your password"
                     name='password'
                     ref={passREf}
                     autoComplete='off'
                  />
                  {(dirty.passwordD && !error.passwordError && info.password.length > 5) && <img className={cl.ok} src={ok.passOk} alt="ok" />}
               </div>
               <div className={cl.check}>
                  <input
                     checked={check}
                     onChange={e => setCheck(!check)}
                     onClick={(prev) => showPassword(prev)} type="checkbox" id='check' />
                  <label htmlFor="check"> {showPassLabel}</label>
               </div>

               {(dirty.repeatPassD && error.repeatPassError) && <div className='error'>{error.repeatPassError}</div>}
               <div className={cl.inputItem}>
                  <input className={(dirty.repeatPassD && error.repeatPassError) && (error.repeatPassError) ? cl.myInpError : cl.myInput}
                     value={info.repeatPass}
                     onChange={e => repeatPassHundler(e)}
                     onBlur={e => blurHandler(e)}
                     type="password"
                     placeholder="Repeat your password"
                     name='Repeatpass'
                     ref={RepeatPassREf}
                     autoComplete='off'

                  />
                  {(dirty.repeatPassD && !error.repeatPassError && info.repeatPass.length > 5) && <img className={cl.ok} src={ok.repeatPassOk} alt="ok" />}
               </div>
               <div className={cl.check}>
                  <input
                     checked={checkRepeat}
                     onChange={e => setCheckRepeat(!checkRepeat)}
                     onClick={(prev) => showRepeatPassword(prev)} type="checkbox" id='check' />
                  <label htmlFor="check">{showPassLabel}</label>
               </div>


               {(dirty.userNameD && error.userNameError) && <div className='error'>{error.userNameError}</div>}
               <div className={cl.inputItem}>
                  <input className={(dirty.userNameD && error.userNameError) && (error.userNameError) ? cl.myInpError : cl.myInput}
                     value={info.userName}
                     onChange={e => userNameHundler(e)}
                     onBlur={e => blurHandler(e)}
                     type="text"
                     placeholder="Enter your name"
                     name='userName'
                     autoComplete='off'
                  />
                  {(dirty.userNameD && !error.userNameError && info.userName.length > 2) && <img className={cl.ok} src={ok.userNameOk} alt="ok" />}
               </div>

               {(dirty.userNumberD && error.userNumberError) && <div className='error'>{error.userNumberError}</div>}
               <div className={cl.inputItem}>
                  <input className={(dirty.userNumberD && error.userNumberError) && (error.userNumberError) ? cl.myInpError : cl.myInput}
                     value={info.userNumber}
                     onChange={e => userNumberHundler(e)}
                     onBlur={e => blurHandler(e)}
                     type="number"
                     placeholder="Enter phone number +38"
                     name='userNumber'
                     autoComplete='off'

                  />
                  {(dirty.userNumberD && !error.userNumberError && info.userNumber.length > 12) && <img className={cl.ok} src={ok.userNumberOk} alt="ok" />}
               </div>

               <button type='submit' disabled={!formValid} className={!formValid ? cl.noActive : cl.myBtn}>{reg}</button>
            </div>
         </form>
      </div>
   )
}

export default RegistrationForm