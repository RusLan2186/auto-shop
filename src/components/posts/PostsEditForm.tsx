import UiInput from '../auto/UI/Input/UiInput';
import UiButton from '../auto/UI/Button/UiButton';
import { useEffect, useState } from 'react';
import { messageTitleError, messageBodyError } from './postConstans';
import { PostsList } from './PostsList';


interface PostsEditFormProps {
  changeOpenModal:(OpenModal:boolean) =>void;
  postItem:PostsList;
  changePostItem:( postItem:PostsList[])=>void;
  postsItem:PostsList[];
  valueTitleError:string;
  setValueTitleError:(  valueTitleError:string)=>void;
  valueBodyError:string;
  setValueBodyError:(  valueBodyError:string) =>void;
  openMyModal:boolean;
}


const PostsEditForm:React.FC<PostsEditFormProps> = ({
  changeOpenModal,
  postItem,
  changePostItem,
  postsItem,
  valueTitleError,
  setValueTitleError,
  valueBodyError,
  setValueBodyError,
  openMyModal
}) => {
  const [valueTitle, setValueTitle] = useState<string>(postItem.title);
  const [valueBody, setValueBody] = useState<string>(postItem.body);

  const [valueTitleDirty, setValueTitleDirty] = useState<boolean>(false);
  const [valueBodyDirty, setValueBodyDirty] = useState<boolean>(false);

  const blurHundler = (e:React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    switch (e.target.name) {
      case 'valueTitle':
        setValueTitleDirty(true);
        break;
      case 'valueBody':
        setValueBodyDirty(true);
        break;
    }
  };

  const valueTitleHandler = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValueTitle(e.target.value);
    if (e.target.value.length < 3) {
      setValueTitleError(messageTitleError);
    } else {
      setValueTitleError('');
    }
  };

  const valueBodyHandler = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValueBody(e.target.value);
    if (e.target.value.length < 5) {
      setValueBodyError(messageBodyError);
    } else {
      setValueBodyError('');
    }
  };

  const savePost = (id:number) => {
    let newPost = [...postsItem].map((item) => {
      if (item.id === id && valueTitle.length >= 3 && valueBody.length >= 5) {
        item.title = valueTitle;
        item.body = valueBody;
        changeOpenModal(false);
       
      }
      if (valueTitle.length < 3 || valueBody.length < 5) {
        changeOpenModal(true);
      }
      return item;
    });
    changePostItem(newPost);
  };
  useEffect(() =>{
    if(openMyModal === false){
       setValueTitle(postItem.title);
       setValueBody(postItem.body);
       setValueBodyError('');
       setValueTitleError('');
    }
  },[openMyModal])

  return (
    <div className='form'>
      <h1 className='form__title'>Edit post</h1>
      {valueTitleDirty && valueTitleError && <div className='error'>{valueTitleError}</div>}
      <UiInput
        onBlur={(e:React.FocusEvent<HTMLInputElement>) => blurHundler(e)}
        value={valueTitle}
        onChange={(e:React.ChangeEvent<HTMLInputElement> ) => valueTitleHandler(e)}
        placeholder='Enter name'
        name='valueTitle'
      />
      {valueBodyDirty && valueBodyError && <div className='error'>{valueBodyError}</div>}
      <textarea
        className='textarea'
        onBlur={(e) => blurHundler(e)}
        value={valueBody}
        onChange={(e) => valueBodyHandler(e)}
        placeholder='Enter description'
        name='valueBody'
      />
      <UiButton onClick={() => savePost(postItem.id)}>Save</UiButton>
    </div>
  );
};

export default PostsEditForm;
