import axios from "axios";
import React, { useContext, useState } from "react";
import { UserData } from "../Global/GlobalState";
import "./PostComponent.css";

export default function PostComponent(props) {
  const post = props.post;

  const [postLikes, setPostLikes] = useState(post.likes);
  const [postDislikes, setPostDislikes] = useState(post.dislikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  const { userData, setUserData } = useContext(UserData);

  const handleLike = async () => {
    if (hasLiked == false) {
      setPostLikes(postLikes + 1);
      setHasLiked(true);
      setHasDisliked(false);

      await axios
        .put(
          `https://labeddit-backend-kcw3.onrender.com/posts/${post.id}/like`,
          {
            like: true,
          },
          {
            headers: {
              Authorization: userData.jwt,
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  const handleDislike = async () => {
    if (hasDisliked == false) {
      setPostDislikes(postDislikes + 1);
      setHasDisliked(true);
      setHasLiked(false);

      await axios
        .put(
          `https://labeddit-backend-kcw3.onrender.com/posts/${post.id}/like`,
          {
            like: false,
          },
          {
            headers: {
              Authorization: userData.jwt,
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  return (
    <div className="postCard">
      <p className="postCardUser">Enviado por: {post.creator.name}</p>
      <p className="postCardContent">{post.content}</p>
      <div className="postCardButtons">
        <button onClick={handleLike}>
          <svg 
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path className="upvotesvg"
              d="M9.09076 1.53713C9.82256 0.613071 11.2243 0.611345 11.9581 1.53392L17.0657 7.95526C17.8337 8.92048 17.1539 10.3466 15.9208 10.3587L14.5331 10.3725L14.5318 15.0372C14.5318 15.2776 14.4844 15.5156 14.3923 15.7377C14.3002 15.9598 14.1652 16.1616 13.9951 16.3315C13.825 16.5014 13.6231 16.6361 13.4009 16.728C13.1788 16.8198 12.9407 16.867 12.7002 16.8668L8.34195 16.8628C7.85699 16.8623 7.39208 16.6692 7.04935 16.3261C6.70662 15.983 6.51408 15.5179 6.51404 15.033L6.51355 10.3735L5.15815 10.3727C3.91958 10.372 3.22869 8.94266 3.99698 7.97177L9.09076 1.53713ZM11.2758 2.07618C11.1859 1.96317 11.0717 1.87192 10.9416 1.80926C10.8115 1.7466 10.6689 1.71414 10.5245 1.7143C10.3801 1.71447 10.2376 1.74726 10.1076 1.81022C9.97768 1.87318 9.86363 1.96469 9.77401 2.07791L4.68022 8.51255C4.36399 8.91259 4.64818 9.50094 5.15839 9.50143L6.94958 9.50217C7.0068 9.50217 7.06347 9.51343 7.11635 9.53533C7.16922 9.55723 7.21727 9.58933 7.25773 9.62979C7.2982 9.67026 7.3303 9.7183 7.3522 9.77118C7.37409 9.82405 7.38536 9.88072 7.38535 9.93795L7.38511 15.033C7.38518 15.287 7.4861 15.5307 7.6657 15.7104C7.84529 15.89 8.08888 15.9911 8.34293 15.9913L12.7012 15.9952C12.8271 15.9953 12.9518 15.9706 13.0682 15.9225C13.1846 15.8744 13.2903 15.8038 13.3794 15.7148C13.4685 15.6258 13.5392 15.5201 13.5874 15.4038C13.6356 15.2875 13.6605 15.1628 13.6605 15.0369L13.6618 9.94091C13.6617 9.82609 13.707 9.71591 13.7878 9.63431C13.8686 9.55271 13.9783 9.50628 14.0931 9.50513L15.9121 9.48738C16.4199 9.48245 16.6996 8.89509 16.3836 8.49776L11.2758 2.07618Z"
              fill="#6F6F6F"
            />
          </svg>
        </button>
        <p>{postLikes - postDislikes}</p>
        <button onClick={handleDislike}>
          <svg 
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path className="downvotesvg"
              d="M11.9092 18.3491C11.1774 19.2731 9.7757 19.2748 9.04192 18.3523L3.93434 11.9309C3.1663 10.9657 3.8461 9.53956 5.07924 9.52748L6.46693 9.51368L6.46817 4.84902C6.46822 4.6086 6.51565 4.37054 6.60773 4.14846C6.69982 3.92637 6.83477 3.72461 7.00487 3.5547C7.17496 3.38478 7.37687 3.25005 7.59906 3.1582C7.82124 3.06635 8.05935 3.01918 8.29977 3.01939L12.6581 3.02333C13.143 3.0239 13.6079 3.21693 13.9507 3.56003C14.2934 3.90314 14.4859 4.36825 14.486 4.85321L14.4865 9.5127L15.8419 9.51343C17.0804 9.51417 17.7713 10.9435 17.003 11.9144L11.9092 18.3491ZM9.72418 17.81C9.81407 17.923 9.92833 18.0143 10.0584 18.0769C10.1885 18.1396 10.3311 18.172 10.4755 18.1719C10.6199 18.1717 10.7624 18.1389 10.8924 18.076C11.0223 18.013 11.1364 17.9215 11.226 17.8083L16.3198 11.3736C16.636 10.9736 16.3518 10.3852 15.8416 10.3847L14.0504 10.384C13.9932 10.384 13.9365 10.3727 13.8837 10.3509C13.8308 10.329 13.7827 10.2969 13.7423 10.2564C13.7018 10.2159 13.6697 10.1679 13.6478 10.115C13.6259 10.0621 13.6146 10.0055 13.6146 9.94823L13.6149 4.85321C13.6148 4.59916 13.5139 4.35552 13.3343 4.17583C13.1547 3.99614 12.9111 3.89509 12.6571 3.89489L8.29878 3.89095C8.17286 3.89085 8.04816 3.91557 7.93179 3.96369C7.81542 4.0118 7.70968 4.08237 7.62059 4.17136C7.53151 4.26036 7.46083 4.36603 7.41259 4.48235C7.36436 4.59867 7.33951 4.72335 7.33948 4.84927L7.33825 9.94527C7.33827 10.0601 7.29297 10.1703 7.2122 10.2519C7.13143 10.3335 7.02171 10.3799 6.9069 10.381L5.08787 10.3988C4.58012 10.4037 4.30036 10.9911 4.61635 11.3884L9.72418 17.81Z"
              fill="#6F6F6F"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
