
import { useState } from 'react'
import MyModal from "../Modal/MyModal"

import PostsEditForm from './PostsEditForm'
import { editPostImage, deletePostImage } from './postConstans'
import Counter from '../counter/Counter'



const PostsItem = ({ postItem, number, remove, postsItem, setPostsItem, changePost, changeError, titleError, changeTitleError, bodyError, changeBodyError }) => {

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
         {<MyModal visible={openMyModal} changeVisible={setOpenMyModal} changePost={changePost} changeError={changeError} changeTitleError={changeTitleError} changeBodyError={changeBodyError}>
            <PostsEditForm postItem={postItem} changePostItem={setPostsItem} changeOpenModal={setOpenMyModal} postsItem={postsItem} valueTitleError={titleError} setValueTitleError={changeTitleError} valueBodyError={bodyError} setValueBodyError={changeBodyError} />
         </MyModal>}
      </div>
   )
}

export default PostsItem