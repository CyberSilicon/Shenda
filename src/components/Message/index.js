import {
  useLayoutEffect,
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import styles from "../../styles/Home.module.css";
import Parse from "../../services/parse";
import { useRouter } from "next/router";
import MessageInput from "./MessageInput";
// import { encodeParseQuery, useParseQuery } from "@parse/react-ssr";

export default function Auth() {
  const [inputMessage, setInputMessage] = useState("");
  const [message, setMessage] = useState("");
  // const { results: messages } = useParseQuery(parseQuery);

  const listRef = useChatScroll(message);

  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    const Message = Parse.Object.extend("Message");
    const newMessage = new Message();
    const res = await newMessage.save({
      content: inputMessage,
      senderName: Parse.User.current().get("username"),
      senderId: Parse.User.current().id,
    });

    setMessage([...message, await res]);
    console.log(await res);
    setInputMessage("");

    const el = document.getElementById("chat-feed");
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  };

  // const order = (messages) => {
  //   return messages.sort((a, b) => {
  //     return a.get("createdAt") - b.get("createdAt");
  //   });
  // };

  const handleGetMessage = useCallback(async () => {
    const parseQuery = new Parse.Query("Message");
    parseQuery.ascending("createdAt");
    // parseQuery.greaterThanOrEqualTo("createdAt", new Date());

    const resultQuery = await parseQuery.find();

    setMessage(resultQuery);
    return true;
  }, [message, setMessage]);

  // const handleTestMessage = useMemo(() => {
  //   console.log(message);
  // }, [message]);

  useLayoutEffect(() => {
    handleGetMessage();
    // handleTestMessage;
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

  const router = useRouter();
  useEffect(() => {
    async function checkUser() {
      const currentUser = await Parse.User.currentAsync();
      if (!currentUser) {
        router.push("/");
      }
    }
    checkUser();
  }, []);

  const handleupdateInput = (e) => {
    setInputMessage(e.currentTarget.value);
  };

  const messageClassName = (id) =>
    id === Parse.User.current().id ? styles.myMessage : null;

  return (
    <div className={styles.container}>
      <div className={styles.messagesContainer}>
        <ul id="chat-feed" ref={listRef}>
          {message &&
            message.map((msg, id) => (
              <div
                key={msg.id}
                className={messageClassName(msg.get("senderId"))}
              >
                <li className={messageClassName(msg.get("senderId"))}>
                  <span className={messageClassName(msg.get("senderId"))}>
                    {msg.get("senderName")}
                  </span>
                  <p>{msg.get("content")}</p>
                </li>
              </div>
            ))}
        </ul>
      </div>
      <form onSubmit={handleSubmitMessage} className={styles.actionsContainer}>
        <input value={inputMessage} onChange={handleupdateInput} />
        <button className="bg-pink-800">send</button>
      </form>
      {/* <MessageInput /> */}
    </div>
  );
}
