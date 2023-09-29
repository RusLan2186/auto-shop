


const MySelect = ({ defaultValue, options, value, onChange }) => {
   return (
      <select className="select"
         value={value}
         onChange={e => onChange(e.target.value)}
      >
         <option className="option" disabled> {defaultValue} </option>

         {options.map((option) => <option value={option.value} key={option.value}>
            {option.brand} {option.year} {option.price}
         </option>)}
      </select>
   )
}

export default MySelect