import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );

  const addPost = (userId, title, body, reaction, tags) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        userId,
        title,
        body,
        reaction,
        tags,
      },
    });
    console.log(`${userId},${title},${body},${reaction},${tags}`);
  };
  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId: postId,
      },
    });
    console.log(`deleted ${postId}`);
  };

  return (
    <PostList.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostList.Provider>
  );
};

const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "Going to mumbai",
    body: "Hi Friends, I am to mumbai for my vacations. I hope tp enjoy a lot. Peace out.",
    recations: 79,
    user_id: "user_79",
    tags: ["vacations", "mumbai", "Enjoying"],
  },
  {
    id: "2",
    title: "Pass ho gaye bahi",
    body: "4 saal ki masti ke baad bhi ho gaye hain pass. Hard to believe",
    recations: 97,
    user_id: "user_97",
    tags: ["Graduating", "Unblievable"],
  },
];

export default PostListProvider;
