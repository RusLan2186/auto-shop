import UiInput from '../auto/UI/Input/UiInput';
import UiButton from '../auto/UI/Button/UiButton';
import { useState } from 'react';
import { messageTitleError, messageBodyError } from './postConstans';

const PostsEditForm = ({
  changeOpenModal,
  postItem,
  changePostItem,
  postsItem,
  valueTitleError,
  setValueTitleError,
  valueBodyError,
  setValueBodyError,
}) => {
  const [valueTitle, setValueTitle] = useState(postItem.title);
  const [valueBody, setValueBody] = useState(postItem.body);

  const [valueTitleDirty, setValueTitleDirty] = useState(false);
  const [valueBodyDirty, setValueBodyDirty] = useState(false);

  const blurHundler = (e) => {
    switch (e.target.name) {
      case 'valueTitle':
        setValueTitleDirty(true);
        break;
      case 'valueBody':
        setValueBodyDirty(true);
        break;
    }
  };

  const valueTitleHandler = (e) => {
    setValueTitle(e.target.value);
    if (e.target.value.length < 3) {
      setValueTitleError(messageTitleError);
    } else {
      setValueTitleError('');
    }
  };

  const valueBodyHandler = (e) => {
    setValueBody(e.target.value);
    if (e.target.value.length < 5) {
      setValueBodyError(messageBodyError);
    } else {
      setValueBodyError('');
    }
  };

  const savePost = (id) => {
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

  return (
    <div className='form'>
      <h1 className='form__title'>Edit post</h1>
      {valueTitleDirty && valueTitleError && <div className='error'>{valueTitleError}</div>}
      <UiInput
        onBlur={(e) => blurHundler(e)}
        value={valueTitle}
        onChange={(e) => valueTitleHandler(e)}
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
