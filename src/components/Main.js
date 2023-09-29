import Auto from "./auto/Auto"
import Posts from "./posts/Posts"





const Main = () => {
   return (
      <div className="container">
         <div className="main">
            <div className="autos">
               <Auto />
            </div>
            <div className="posts" >
               <Posts />
            </div>
         </div>
      </div>
   )
}

export default Main