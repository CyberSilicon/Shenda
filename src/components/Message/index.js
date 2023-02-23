import { useState, useRef, useEffect, useCallback } from "react";
import styles from "../../styles/Home.module.css";
import Parse from "../../services/parse";
import { client } from "../../config/LiveQueryClient";
import _ from "lodash";
import { useRecoilValue } from "recoil";
import { currentUserStore } from "../../store/atoms/currentUserStore";

export default function Message() {
  const [inputMessage, setInputMessage] = useState("");
  const [message, setMessage] = useState("");

  // Get a reference to the message container
  const listRef = useChatScroll(message);

  // Get current user data from Recoil

  const { uuid, username } = useRecoilValue(currentUserStore);

  const handleSubmitMessage = async () => {
    // Create a new Parse object for the message

    const Message = Parse.Object.extend("Message");
    const newMessage = new Message();
    // Save the message with the sender's information

    newMessage.save({
      content: inputMessage,
      senderName: username,
      senderId: uuid,
    });
    setInputMessage("");

    // Scroll to the bottom of the message container
    const el = document.getElementById("chat-feed");
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  };

  // Handle getting all messages from Parse

  const handleGetMessage = useCallback(async () => {
    const parseQuery = new Parse.Query("Message");
    parseQuery.ascending("createdAt");

    // Execute the Parse query and set the state variable
    const resultQuery = await parseQuery.find();
    setMessage(resultQuery);
    return true;
  }, []);

  // Handle subscribing to live messages using Parse LiveQuery
  const handleGetLiveMessage = useCallback(async () => {
    const parseQuery = new Parse.Query("Message");
    parseQuery.ascending("createdAt");

    const sendSoundMsg = new Audio("send-message.mp3");
    const receiveSoundMsg = new Audio("message-notification.mp3");

    // Subscribe to the Parse LiveQuery and set up event listeners for new messages
    let subscription = await client.subscribe(parseQuery);

    subscription.on(
      "create",
      async (m) => {
        // Update the state variable with the new message
        setMessage((message) => message.concat(m));
        // console.log(m.get("senderId") + " and " + uuid);

        // Play a sound if the message is not from the current user
        if (m.get("senderId") !== uuid) {
          receiveSoundMsg.play();
          return;
        }
        sendSoundMsg.play();
      },
      []
    );

    return () => {
      client.unsubscribe(parseQuery);
    };
  }, [message, setMessage]);

  useEffect(() => {
    handleGetMessage();
    handleGetLiveMessage();
  }, []);

  // Custom hook to scroll to the bottom of the message container
  function useChatScroll(dep) {
    const ref = useRef();
    useEffect(() => {
      if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight;
      }
    }, [dep]);
    return ref;
  }

  const handleupdateInput = useCallback(
    (e) => {
      setInputMessage(e.currentTarget.value);
    },
    [inputMessage]
  );

  // Determine the class name for a message based on the sender's ID
  const messageClassName = (id) => {
    return id === uuid ? styles.myMessage : null;
  };

  const handleSendMessageWithKey = (e) => {
    if (inputMessage.trim().length > 0) {
      e.key === "Enter" && handleSubmitMessage();
    }
  };

  return (
    <div className={styles.container}>
      <div className="h-auto border-b-2 p-3 border-b-gray-200 top-0 fixed font-bold backdrop-blur-md w-full">
        Discussions
      </div>
      <div className={styles.messagesContainer}>
        <ul id="chat-feed" ref={listRef}>
          {uuid !== undefined &&
            message &&
            message.map((msg) => (
              <div
                key={msg.id}
                className={messageClassName(msg.get("senderId"))}
              >
                <li className={messageClassName(msg.get("senderId"))}>
                  <span className={messageClassName(msg.get("senderId"))}>
                    {msg.get("senderName")} ~
                  </span>
                  <p>{msg.get("content")}</p>
                </li>
              </div>
            ))}
        </ul>
      </div>
      <div className="p-1 bg-transparent">
        <div className={styles.actionsContainer}>
          <input
            onKeyUp={(e) => handleSendMessageWithKey(e)}
            placeholder="Enter your message..."
            value={inputMessage}
            onChange={handleupdateInput}
          />
          <button
            disabled={inputMessage.trim().length <= 0}
            className="text-slate-900 font-semibold text-lg disabled:text-slate-400"
            onClick={
              inputMessage.trim().length > 0 ? handleSubmitMessage : null
            }
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
