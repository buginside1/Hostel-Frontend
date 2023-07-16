import React, { Fragment, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ScrollToBottom from "react-scroll-to-bottom";
import Meta from '../utils/Meta';
import NotFound from './NotFound';
import {io} from 'socket.io-client';


const Chat = () => {
    const { state: hostel } = useLocation();
    const { user } = useSelector((state) => state.userState);
    const [messageList, setMessageList] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");
    const [socket, setSocket] = useState(undefined);

    useEffect(() => {
        if (!socket) {
            setSocket(io('/'))
        }
    }, []) 

    useEffect(() => {
        if (socket) {
            socket.on("receive_message", (data) => {
                setMessageList((list) => [...list, data]);
            });
        }
      }, [socket]);
    
    useEffect(() => {
        if (hostel && socket) {
            socket.emit("join-hostel-chat", hostel._id);
      }
    }, [hostel, socket])

      const sendMessage = async () => {
        if (currentMessage !== "" && socket) {
          const messageData = {
            hostel: hostel._id,
            author: user,
            message: currentMessage,
            time:
              new Date(Date.now()).getHours() +
              ":" +
              new Date(Date.now()).getMinutes(),
          };
    
            
          await socket.emit("send_message", messageData);
          setMessageList((list) => [...list, messageData]);
          setCurrentMessage("");
        }
      };

    return (
        <Fragment>
            { !hostel ? <NotFound /> : (
                <Fragment>
                    <Meta title={ `${hostel?.name}'s Live Chat ` } />
                    <div className="chat-window mx-auto mt-20">
                        <div className="chat-header">
                            <p>you are connected</p>
                        </div>
                        <div className="chat-body">
                            <ScrollToBottom className="message-container">
                            {messageList.map((messageContent, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="message"
                                        id={user?._id === messageContent.author._id ? "you" : "other"}
                                >
                                    <div>
                                    <div className="message-content">
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{messageContent.time}</p>
                                        <p id="author">{ messageContent.author?.name }</p>
                                    </div>
                                    </div>
                                </div>
                                );
                            })}
                            </ScrollToBottom>
                        </div>
                        <div className="chat-footer">
                            <input
                            type="text"
                            value={currentMessage}
                            placeholder="Hey..."
                            onChange={(event) => {
                                setCurrentMessage(event.target.value);
                            }}
                            onKeyPress={(event) => {
                                event.key === "Enter" && sendMessage();
                            }}
                            />
                            <button onClick={sendMessage}>&#9658;</button>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Chat;