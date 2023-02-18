import { useState, useRef, useEffect, useCallback } from "react";
import styles from "../../styles/Home.module.css";
import Parse from "../../services/parse";
import { client } from "../../config/LiveQueryClient";
import _ from "lodash";
import { useRecoilValue } from "recoil";
import { currentUserStore } from "../../store/atoms/currentUserStore";

export default function Auth() {
  const [inputMessage, setInputMessage] = useState("");
  const [message, setMessage] = useState("");

  const listRef = useChatScroll(message);

  const { uuid, username } = useRecoilValue(currentUserStore);

  const handleSubmitMessage = async () => {
    const Message = Parse.Object.extend("Message");
    const newMessage = new Message();
    const ss = newMessage.save({
      content: inputMessage,
      senderName: username,
      senderId: uuid,
    });
    console.log(ss);
    setInputMessage("");

    const el = document.getElementById("chat-feed");
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  };

  const handleGetMessage = useCallback(async () => {
    const parseQuery = new Parse.Query("Message");
    parseQuery.ascending("createdAt");
    const resultQuery = await parseQuery.find();

    setMessage(resultQuery);
    return true;
  }, []);

  const handleGetLiveMessage = useCallback(async () => {
    const parseQuery = new Parse.Query("Message");
    parseQuery.ascending("createdAt");

    let subscription = await client.subscribe(parseQuery);

    subscription.on(
      "create",
      async (m) => {
        setMessage((message) => message.concat(m));
      },
      []
    );

    return true;
  }, [message, setMessage]);

  useEffect(() => {
    handleGetMessage();
    handleGetLiveMessage();
  }, []);

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

  // console.log(uuid);
  const messageClassName = (id) => {
    return id.toString() === uuid.toString() ? styles.myMessage : null;
  };

  const handleSendMessageWithKey = (e) => {
    if (inputMessage.trim().length > 0) {
      e.key === "Enter" && handleSubmitMessage();
    }
  };

  return (
    <div className={styles.container}>
      <div
        className="h-auto border-b-2 p-3 border-b-gray-200 top-0 fixed font-bold backdrop-blur-md
 w-full"
      >
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
