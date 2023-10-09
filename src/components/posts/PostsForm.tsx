import UiButton from '../auto/UI/Button/UiButton';
import { useState, useEffect } from 'react';
import {
  messageTitleError,
  messageBodyError,
  messageFieldError,
  addComm,
  formPostTitle,
} from './postConstans';
import cl from '../header/FormHeader.module.scss';
import { AddPostType, PostsList } from './PostsList';

interface PostFormProps{
  post:AddPostType;
  changePost:(post:AddPostType) =>void;
  error:string;
  changePosts:(posts:PostsList[]) =>void;
  posts:PostsList[];
  modal:boolean;
  changeModal:(modal:boolean) =>void;
  changeError:(error:string) => void;
  changeTitleError:(titleError:string) =>void;
  titleError:string;
  bodyError:string;
  changeBodyError:(bodyError:string) =>void;

}

const PostsForm:React.FC<PostFormProps> = ({
  post,
  changePost,
  error,
  changePosts,
  posts,
  modal,
  changeModal,
  changeError,
  titleError,
  changeTitleError,
  bodyError,
  changeBodyError,
}) => {
  const [titleDirty, setTitleDirty] = useState<boolean>(false);
  const [bodyDirty, setBodyDirty] = useState<boolean>(false);

  const blurHundler = (e:React.FocusEvent<HTMLTextAreaElement | HTMLInputElement >) => {
    switch (e.target.name) {
      case 'title':
        setTitleDirty(true);
        break;
      case 'body':
        setBodyDirty(true);
        break;
    }
  };

  const titleHundler = (e:React.ChangeEvent<HTMLInputElement>) => {
    changePost({ ...post, title: e.target.value });
    if (e.target.value.length < 3) {
      changeTitleError(messageTitleError);
    } else {
      changeTitleError('');
    }
  };
  const bodyHundler = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    changePost({ ...post, body: e.target.value });
    if (e.target.value.length < 5) {
      changeBodyError(messageBodyError);
    } else {
      changeBodyError('');
    }
  };

  useEffect(() => {
    if (post.title.length >= 3 || post.body.length >= 5) {
      changeError('');
    }
  }, [post.title, post.body, titleError]);

  const addPost = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (post.title.length >= 3 && post.body.length >= 5) {
      changePosts([...posts, { ...post, id: Date.now() }]);
      changePost({ title: '', body: '' });
      changeModal(false);
      changeError('');
    }
    if (post.title.length < 3 || post.body.length < 5) {
      changeError(messageFieldError);
    }
  };

  useEffect(() => {
    if (modal === false) {
      changePost({ title: '', body: '' });
      changeTitleError('');
      changeBodyError('');
      changeError('');
    }
  }, [modal]);

  return (
    <form className='form'>
      <h1 className='form__title'> {formPostTitle}</h1>
      <h2 className='error'>{error}</h2>
      {titleDirty && titleError && <div className='error'>{titleError}</div>}
      <input
        className={cl.myInput}
        onBlur={(e) => blurHundler(e)}
        value={post.title}
        onChange={(e) => titleHundler(e)}
        placeholder='Enter name...'
        name='title'
      ></input>
      {bodyDirty && bodyError && <div className='error'>{bodyError}</div>}
      <textarea
        className='textarea'
        onBlur={(e) => blurHundler(e)}
        value={post.body}
        onChange={(e) => bodyHundler(e)}
        placeholder='Enter description...'
        name='body'
        maxLength={100}
      ></textarea>
      <UiButton onClick={addPost}>{addComm}</UiButton>
    </form>
  );
};

export default PostsForm;
