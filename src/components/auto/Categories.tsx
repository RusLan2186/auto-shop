import { useState } from 'react';
import cl from './Categories.module.scss';
//@ts-ignore
import { v4 as uuidv4 } from 'uuid';

interface CategoriesProps{
   activeCategorie:number;
   onClickCategorie:( activeCategorie:number) =>void;
}


const Categories:React.FC<CategoriesProps> = ({activeCategorie, onClickCategorie}) =>{
const categoriesList = ['all','mini cars', 'medium cars', 'larger cars', 'executive cars', 'luxury cars', 'sport cars']
// const[catTitle, setCatTitle] = useState<string[]>([categoriesList[0]])
const[catTitle, setCatTitle] = useState<string>()
const[openCategorie, setOpenCategorie] = useState<boolean>(true)


const clickActiveCategorie = (i:number, categorie:string) =>{
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