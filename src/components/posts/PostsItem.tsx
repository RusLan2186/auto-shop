
import { useState } from 'react'
import MyModal from "../modal/MyModal"

import PostsEditForm from './PostsEditForm'
import { editPostImage, deletePostImage } from './postConstans'
import Counter from '../counter/Counter'
import { PostsList } from './PostsList'

interface PostsItemProps{
   number:number;
   postItem:PostsList;
   postsList1:PostsList[];
   titleError:string;
   bodyError:string;
   changeBodyError:(bodyError:string) =>void;
   changeTitleError:(titleError:string) =>void;
   setPostsItem:(posts:PostsList[]) =>void;
   remove:(user:PostsList) => void; 
 


}

const PostsItem:React.FC<PostsItemProps> = ({ postItem, number, remove, postsList1, setPostsItem,  titleError, changeTitleError, bodyError, changeBodyError }) => {

   const [openMyModal, setOpenMyModal] = useState(false)


   return (

      <div className='post__item'>
         <div className='post__item_discription'>
            <div className='post__header'>
               <span className='number'> {number}.</span>
               <span className='post__title'>  {postItem.title}</span>
            </div>
            <p className='post__body'> {postItem.body}</p>
         </div>
         <div className='buttons'>
            <img className='image__edit' src={editPostImage} onClick={() => setOpenMyModal(true)} />
            <img className='image__edit' src={deletePostImage} onClick={() => remove(postItem)} />
         </div>
         <div className="posts__item_counter">
            <Counter />
         </div >
         {<MyModal visible={openMyModal} changeVisible={setOpenMyModal}>
            <PostsEditForm openMyModal={openMyModal} postItem={postItem} changePostItem={setPostsItem} changeOpenModal={setOpenMyModal} postsItem={postsList1} valueTitleError={titleError} setValueTitleError={changeTitleError} valueBodyError={bodyError} setValueBodyError={changeBodyError} />
         </MyModal>}
      </div>
   )
}

export default PostsItem