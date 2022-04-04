import { useEffect, useState } from "react";
import PostService from "../API/PostService";
import { useFetching } from "../components/hooks/useFetching";
import { usePosts } from "../components/hooks/usePosts";
import PostFilter from "../components/PostFilter";
import PostForm from "../components/PostForm";
// import PostItem from "./components/PostItem";
import PostList from "../components/PostList";
import MyButton from "../components/UI/button/MyButton";
import Loader from "../components/UI/Loader/Loader";
import MyModal from "../components/UI/MyModal/MyModal";
import Pagination from "../components/UI/pagination/Pagination";
import "../styles/App.css";
import { getPageCount } from "../utils/pages";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  //Другий варіант створення пагінації передати значення limit, page у функцію знизу, і при виклику передавати значення ще туди
  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const responce = await PostService.getAll(limit, page);
    setPosts(responce.data);
    const totalCount = responce.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
  });
  console.log(totalPages);
  useEffect(() => {
    fetchPosts();
  }, [page]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };
  const changePage = (page) => {
    setPage(page);
  };

  return (
    <div className="App">
      {/* <button onClick={fetchPosts}>Get posts</button> */}
      <MyButton style={{ marginTop: "30px" }} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {postError && <h2>Произошла ошибка ${postError}</h2>}
      {isPostsLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Loader />
        </div>
      ) : (
        <PostList
          remove={removePost}
          posts={sortedAndSearchedPosts}
          title="Список постов 1"
        />
      )}
      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
}

export default Posts;
