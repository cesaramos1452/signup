import React, { useEffect } from "react";
import BlankProfile from "../images/blank-profile.png";
import LikeImg from "../images/likeCandy.png";
import DislikeImg from "../images/dislikeCandy.png";
import "./Messages.css";

import { Avatar, Box, Button, Grommet, InfiniteScroll } from "grommet";
import { grommet } from "grommet/themes";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Dislike, Close } from "grommet-icons";

export const Messages = (props) => {

  const [numberOfMessagesDisplayed, setNumberOfMessagesDisplayed] = useState(
    100
  );
  useEffect(() => {
    props.getMessagesList(numberOfMessagesDisplayed);
  }, [props.likes, numberOfMessagesDisplayed, props.userMessages]);

  const removeLikeHandler = (messageId) => {
    let removedLike = props.likes.filter((like) => {
      if (like !== null) return like.messageId === messageId;
    });
    props.removeLike(removedLike[0].id);
  };

  const deleteMessageHandler = (id) => {
    props.deleteMessage(id);
    setNumberOfMessagesDisplayed(numberOfMessagesDisplayed - 1);
  };

  const getMoreUsers = () => {
    setNumberOfMessagesDisplayed(numberOfMessagesDisplayed + 100);
    props.getMessagesList(numberOfMessagesDisplayed + 100);
  };

  const determineIfPictureIsUploaded = (username) => {
    //fetch user
    //if user .pictureloaction !== null
  };

  return (
    <Grommet style={{ marginBottom: "50px" }} theme={grommet}>
      <Box
        border
        elevation="medium"
        className="messagesList"
        style={{ maxWidth: "610px", marginTop: "30px" }}
      >
        {props.messsages !== [] && (
          <InfiniteScroll
            items={props.messages}
            step={50}
            onMore={getMoreUsers}
          >
            {(item) => (
              <Box
                border
                elevation="medium"
                className="message"
                key={item.username + Math.random()}
              >
                <Box justify="between" direction="row-responsive" >
                <Avatar
                  onError={BlankProfile}
                  className="AvatarImg"
                  src={
                    `https://kwitter-api.herokuapp.com/users/${item.username}/picture` !== {"message":"User does not have a picture","statusCode":404}
                    ? `https://kwitter-api.herokuapp.com/users/${item.username}/picture`
                    : `${BlankProfile}`
                  }
                />
                
                    
                <Link to={`/profiles/${item.username}`}>{item.username}</Link>
                
                  {item.text}
                  <div>
                    Sweetness {item.likes.length}
                  </div>
                  <Button 
                      justify="end"
                      onClick={() => deleteMessageHandler(item.id)}
                      icon={<Close />}
                      secondary
                      color="red"
                    />
                  </Box>
                  <div className="messageContent" style={{ maxWidth: "500px" }}>
                  <div className="theButtons" >
                    {item.likes.every((likedObj) =>
                      props.likes.every((likes) => {
                        if (likes !== null) return likedObj.id !== likes.id;
                      })
                    ) ? (
                      <Button
                        margin="20px"
                        icon={<Avatar src={LikeImg} round="small" />}
                        onClick={() => props.addLike({ messageId: item.id })}
                        primary
                        color="white"
                      />
                      // <button
                      //   onClick={() => props.addLike({ messageId: item.id })}
                      // >
                      //   <Avatar
                      //     className="likeImg"
                      //     src={LikeImg}
                      //   />
                      //   Sweet
                      // </button>
                    ) : (
                      <Button
                        margin="20px"
                        size="small"
                        icon={<Avatar src={DislikeImg} round="small" />}
                        onClick={() => removeLikeHandler(item.id)}
                        primary
                        color="white"
                      />
                      // <button onClick={() => removeLikeHandler(item.id)}>
                      //   <Avatar
                      //     className="likeImg"
                      //     src={DislikeImg}
                      //   />
                      //   Sour
                      // </button>
                    )}
                    
                    {/* <button onClick={() => deleteMessageHandler(item.id)}>
                      Delete
                    </button> */}
                  </div>
                </div>
              </Box>
            )}
          </InfiniteScroll>
        )}
      </Box>
    </Grommet>
  );
};

export default Messages;
