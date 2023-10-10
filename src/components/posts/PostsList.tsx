import PostsItem from './PostsItem';
import { useState, useMemo } from 'react';
//@ts-ignore
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import UiInput from '../auto/UI/Input/UiInput';
import UiButton from '../auto/UI/Button/UiButton';
import MyModal from '../modal/MyModal';
import MySelect from '../auto/UI/Select/MySelect';
import PostsForm from './PostsForm';
import { addPost, notFound, sortedBy } from './postConstans';


interface postTitleProps{
  postTitle:string;
}

export interface PostsList{
  id:number;
  title:string;
  body:string;
}


export type AddPostType = Pick <PostsList, 'title' | "body">

  const PostsList:React.FC <postTitleProps> = ({ postTitle }) => {

  const [posts, setPosts] = useState<PostsList[]>([{ id: 1, title: 'Elena', body: 'I like your shop' }]);
 const [post, setPost] = useState<AddPostType>({ title: '', body: '' });
  const [modal, setModal] = useState<boolean>(false);
  const [sortedPost, setSortedPost] = useState<string>('');
  const [searchPost, setSearchPost] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [titleError, setTitleError] = useState<string>('');
  const [bodyError, setBodyError] = useState<string>('');


  const deleteUser = (user:PostsList) => {
    setPosts(posts.filter((p) => p.id !== user.id));
  };

  const postSort = useMemo(() => {
    if (sortedPost) {
// @ts-ignore
   return [...posts].sort((a, b) => a[sortedPost].localeCompare(b[sortedPost])
);
  }    return posts;

    }, [sortedPost, posts]);
  

  const sortedandSearchPost = useMemo(() => {
    return postSort.filter(
      (post) =>
        post.title.toLowerCase().includes(searchPost.toLowerCase()) ||
        post.body.toLowerCase().includes(searchPost.toLowerCase()),
    );
  }, [searchPost, postSort]);

  const sortPost = (sort:string) => {
    setSortedPost(sort);
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
           onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSearchPost(e.target.value)}
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
       onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSearchPost(e.target.value)}
          placeholder='Search...'
        ></UiInput>
      </div>

      <MyModal
        visible={modal}
        changeVisible={setModal}
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

      {sortedandSearchPost.length !== 0 ? (
        <div>
          <TransitionGroup>
            {sortedandSearchPost.map((post, index) => (
              <CSSTransition key={post.id} timeout={500} classNames='post'>
                <PostsItem
                  postItem={post}
                  number={index + 1}
                  remove={deleteUser}
                  postsList1={posts}
                  setPostsItem={setPosts}
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
