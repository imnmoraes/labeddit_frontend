import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserData } from "../../Global/GlobalState";
import PostComponent from "../../Components/PostComponent";
import "./PostPage.css";
import { useNavigate } from "react-router-dom";

export default function PostPage() {
  const [postContnent, setPostContent] = useState("");
  const { userData, setUserData } = useContext(UserData);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const [postData, setPostData] = useState({
    content: "",
  });

  useEffect(() => {
    if (isLoading) {
      axios
        .get("https://labeddit-backend-kcw3.onrender.com/posts", {
          headers: {
            Authorization: userData.jwt,
          },
        })
        .then((response) => {
          setPosts(response.data);
          setIsLoading(false);
          console.log(posts);
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [isLoading, postData, userData, posts]);

  const handleFetchPosts = () => {
    setIsLoading(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://labeddit-backend-kcw3.onrender.com/posts",
        postData,
        {
          headers: {
            Authorization: userData.jwt,
          },
        }
      );
      handleFetchPosts();
      setPostData({ content: "" });
    } catch (err) {
      alert(err);
    }
  };

  const handleLogout = () => {
    setUserData({
      connected: false,
      jwt: null,
    });
    navigate("/");
  };

  return (
    <div className="container">
      <div className="header">
        <div></div>
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.9983 15.2387C14.9983 19.0351 13.5222 22.676 10.8949 25.3605C8.26756 28.0449 4.70412 29.553 0.988495 29.553V15.2387H14.9983Z"
            fill="#F9B24E"
          />
          <path
            d="M29.0115 15.2387C29.0115 17.1185 28.6491 18.9799 27.9451 20.7166C27.241 22.4533 26.209 24.0313 24.9081 25.3605C23.6072 26.6897 22.0627 27.7441 20.363 28.4634C18.6633 29.1828 16.8415 29.553 15.0017 29.553V15.2387H29.0115Z"
            fill="#A8BBC6"
          />
          <path
            d="M14.9983 15.2281C14.9978 13.3479 15.36 11.486 16.0641 9.7489C16.7682 8.01177 17.8005 6.43343 19.1018 5.10408C20.4032 3.77474 21.9482 2.72044 23.6486 2.00145C25.3489 1.28246 27.1713 0.912864 29.0115 0.91379V15.2281H14.9983Z"
            fill="#45525B"
          />
          <path
            d="M0.988495 15.2281C0.988042 13.3482 1.35009 11.4866 2.05399 9.74971C2.75789 8.01281 3.78982 6.43462 5.09084 5.10532C6.39186 3.77602 7.93647 2.72166 9.63642 2.00246C11.3364 1.28326 13.1583 0.913326 14.9983 0.913788V15.2281H0.988495Z"
            fill="#FE7E02"
          />
        </svg>
        <button className="link" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <form className="loginFormInput" onSubmit={handleFormSubmit}>
        <textarea
          className="postArea"
          placeholder="Escreva seu post..."
          name="content"
          id="postContent"
          cols="30"
          rows="10"
          value={postData.content}
          onChange={handleInputChange}
        ></textarea>
        <button className="button1" type="submit">
          Postar
        </button>
      </form>
      <div className="posts">
        {posts ? (
          posts.slice().reverse().map((post, k) => (
            <PostComponent post={post} key={k}></PostComponent>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
