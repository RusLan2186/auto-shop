import { useState } from 'react';
import cl from './Categories.module.scss';
import { v4 as uuidv4 } from 'uuid';


const Categories = ({activeCategorie, onClickCategorie}) =>{

const categoriesList = ['all','mini cars', 'medium cars', 'larger cars', 'executive cars', 'luxury cars', 'sport cars']

// const [activeCategorie, setActiveCategorie] = useState(0)

const[catTitle, setCatTitle] = useState([categoriesList[0]])

const[openCategorie, setOpenCategorie] = useState(true)

const clickActiveCategorie = (i, categorie) =>{
 onClickCategorie(i)
   setOpenCategorie(true)
   setCatTitle(categorie);
   }

  const showCatTitle = ( ) =>{
setOpenCategorie(!openCategorie)
  }


   return(
      <div>
         <h2 onClick={() =>showCatTitle() } className={cl.title}> Choose categorie:<span> {catTitle}</span></h2>
         <ul className={openCategorie ? cl.list : cl.active__list}>
            {categoriesList.map((categorie, i) => <li key={uuidv4()} onClick={() => clickActiveCategorie(i, categorie) } className={activeCategorie === i ? cl.active : ''}>{categorie}</li>)}
         </ul>
      </div>
   )
}

export default Categories