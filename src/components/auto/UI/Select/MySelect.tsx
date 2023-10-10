

export type OptionsType = {
 value:string;
   title:string;
}

interface MySelectProps{

value:string;

onChange:(e:string) => void;
options:OptionsType[];
// children:React.ReactChild | React.ReactNode;
defaultValue:string;

}

const MySelect:React.FC<MySelectProps> = ({ defaultValue, options, value, onChange }) => {
   return (
      <select className="select"
         value={value}
         onChange={(e) => onChange(e.target.value)}
      >
         <option className="option" disabled> {defaultValue} </option>

         {options.map((option) => <option key={option.value} value={option.value}>  
          {option.title}   
         </option>)}
      </select>
   )
}

export default MySelect