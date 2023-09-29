import PostsItem from './PostsItem';
import { useState, useMemo } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import UiInput from '../auto/UI/Input/UiInput';
import UiButton from '../auto/UI/Button/UiButton';
import MyModal from '../Modal/MyModal';
import MySelect from '../auto/UI/Select/MySelect';
import PostsForm from './PostsForm';
import { addPost, notFound, sortedBy } from './postConstans';
import { useDispatch, useSelector } from 'react-redux';

const PostsList = ({ postTitle }) => {
  const [posts, setPosts] = useState([{ id: 1, title: 'Anna', body: 'I like your shop' }]);

  const [post, setPost] = useState({ title: '', body: '' });
  const [modal, setModal] = useState(false);
  const [sortedPost, setSortePost] = useState('');
  const [searchPost, setSearchPost] = useState('');
  const [error, setError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [bodyError, setBodyError] = useState('');

  const deleteUser = (user) => {
    setPosts(posts.filter((p) => p.id !== user.id));
  };

  const postSort = useMemo(() => {
    if (sortedPost) {
      return [...posts].sort((a, b) => a[sortedPost].localeCompare(b[sortedPost]));
    }
    return posts;
  }, [sortedPost, posts]);

  const portedandSearchPost = useMemo(() => {
    return postSort.filter(
      (post) =>
        post.title.toLowerCase().includes(searchPost.toLowerCase()) ||
        post.body.toLowerCase().includes(searchPost.toLowerCase()),
    );
  }, [searchPost, postSort]);

  const sortPost = (sort) => {
    setSortePost(sort);
  };

  const clickPostSearchClear = () => {
    setSearchPost('');
  };

  return (
    <div>
      <h1 className='title'> {postTitle}</h1>

      <div className='posts__search-sort'>
        <UiButton onClick={() => setModal(true)}>{addPost}</UiButton>
        <div className='posts__sort'>
          <span>{sortedBy} </span>
          <MySelect
            value={sortedPost}
            onChange={sortPost}
            defaultValue='Sorrted by:'
            options={[
              { value: 'title', brand: 'Name ' },
              { value: 'body', year: 'Desiption' },
            ]}
          ></MySelect>
        </div>

        <div className='posts__search'>
          <span onClick={clickPostSearchClear} className={searchPost ? 'search__clear' : 'clear'}>
            X
          </span>
          <UiInput
            value={searchPost}
            onChange={(e) => setSearchPost(e.target.value)}
            placeholder='Search...'
          ></UiInput>
        </div>
      </div>
      <div className='posts__search-hid'>
        <span onClick={clickPostSearchClear} className={searchPost ? 'search__clear' : 'clear'}>
          X
        </span>
        <UiInput
          value={searchPost}
          onChange={(e) => setSearchPost(e.target.value)}
          placeholder='Search...'
        ></UiInput>
      </div>

      <MyModal
        visible={modal}
        changeVisible={setModal}
        changeError={setError}
        changePost={setPost}
        changeTitleError={setTitleError}
        changeBodyError={setBodyError}
      >
        <PostsForm
          post={post}
          changePost={setPost}
          error={error}
          changePosts={setPosts}
          posts={posts}
          modal={modal}
          changeModal={setModal}
          changeError={setError}
          titleError={titleError}
          changeTitleError={setTitleError}
          bodyError={bodyError}
          changeBodyError={setBodyError}
        />
      </MyModal>

      {portedandSearchPost.length !== 0 ? (
        <div>
          <TransitionGroup>
            {posts.map((post, index) => (
              <CSSTransition key={post.id} timeout={500} classNames='post'>
                <PostsItem
                  postItem={post}
                  number={index + 1}
                  remove={deleteUser}
                  postsItem={posts}
                  setPostsItem={setPosts}
                  changeError={setError}
                  changePost={setPost}
                  titleError={titleError}
                  changeTitleError={setTitleError}
                  bodyError={bodyError}
                  changeBodyError={setBodyError}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      ) : (
        <h2 className='title'>{notFound}</h2>
      )}
    </div>
  );
};

export default PostsList;
