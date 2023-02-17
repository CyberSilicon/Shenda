import {
  useLayoutEffect,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import styles from "../../styles/Home.module.css";
import Parse from "../../services/parse";
import { useRouter } from "next/router";
import { client } from "../../config/LiveQueryClient";
import _ from "lodash";

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
    newMessage.save({
      content: inputMessage,
      senderName: Parse.User.current().get("username"),
      senderId: Parse.User.current().id,
    });

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
    const resultQuery = await parseQuery.find();

    setMessage(resultQuery);
    return true;
  }, []);

  const handleGetLiveMessage = useCallback(async () => {
    const parseQuery = new Parse.Query("Message");
    parseQuery.ascending("createdAt");

    let subscription = await client.subscribe(parseQuery);

    // subscription.on("open", (msgs) => {
    // setMessage(msgs);
    // });
    const newArr = _.cloneDeep(message);
    const dd = [...newArr];

    subscription.on(
      "create",
      async (m) => {
        setMessage((dd) => dd.concat([m]));
        // setMessage(newArr, m);
      },
      []
    );
    // return () => subscription.unsubscribe();
    // parseQuery.greaterThanOrEqualTo("createdAt", new Date());

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
      <div className="p-1 bg-transparent">
        <form
          onSubmit={handleSubmitMessage}
          className={styles.actionsContainer}
        >
          <input
            placeholder="Enter your message..."
            value={inputMessage}
            onChange={handleupdateInput}
          />
          <button className="text-pink-900 text-lg">Send</button>
        </form>
      </div>
    </div>
  );
}
