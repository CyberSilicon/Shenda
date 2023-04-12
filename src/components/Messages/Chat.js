import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
} from "react";
import Parse from "../../services/parse";
import { client } from "../../config/LiveQueryClient";
import { useRecoilValue } from "recoil";
import { currentUserStore } from "../../store/atoms/currentUserStore";
import FlipMove from "react-flip-move";

// import "../../styles/Message.module.css";

const Chat = forwardRef((ref) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  // const [lastMessageRef, setLastMessageRef] = useState(null);

  // Get a reference to the message container
  const listRef = useChatScroll(messages);

  // Get current user data from Recoil
  const { uuid, username } = useRecoilValue(currentUserStore);

  const handleSubmitMessage = async (e) => {
    try {
      e.preventDefault();

      const newUser = new Parse.Query(Parse.User);
      newUser.equalTo("objectId", uuid);
      const ParseUser = await newUser.find();

      const Message = Parse.Object.extend("Message");
      const newMessage = new Message();

      // Save the message with the sender's information
      await newMessage.save({
        content: inputMessage,
        senderName: username,
        creator: ParseUser[0],
        // delivered: true,
      });

      setInputMessage("");

      // Scroll to the bottom of the message container
      const el = document.getElementById("chat-feed");
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  // Handle getting all messages from Parse

  const handleGetMessage = useCallback(async () => {
    const parseQuery = new Parse.Query("Message");
    parseQuery.ascending("createdAt");
    parseQuery.include("creator");

    // Execute the Parse query and set the state variable
    const resultQuery = await parseQuery.find();
    setMessages(resultQuery);
    return true;
  }, []);

  // Handle subscribing to live messages using Parse LiveQuery
  const handleGetLiveMessage = useCallback(async () => {
    //*
    const parseQuery = new Parse.Query("Message");
    parseQuery.ascending("createdAt");

    // const sendSoundMsg = new Audio("send-message.mp3");
    // const receiveSoundMsg = new Audio("message-notification.mp3");

    // Subscribe to the Parse LiveQuery and set up event listeners for new messages
    let subscription = await client.subscribe(parseQuery);
    subscription.on(
      "create",
      async (newMsg) => {
        // Update the state variable with the new message
        setMessages((message) => message.concat(newMsg));

        // setMessages([...messages, { text: inputMessage, from: uuid }]);
      },
      []
    );

    return () => {
      client.unsubscribe(parseQuery);
    };
  }, [messages, setMessages]);

  useEffect(() => {
    handleGetMessage();
    handleGetLiveMessage();
  }, []);

  //*Animation on send msg

  // Custom hook to scroll to the bottom of the message container
  function useChatScroll() {
    const ref = useRef();
    useEffect(() => {
      if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight;
      }
    }, [messages]);

    return ref;
  }

  const handleupdateInput = useCallback(
    (e) => {
      setInputMessage(e.currentTarget.value);
    },
    [inputMessage]
  );

  // const handleSendMessage = (e) => {
  //   e.preventDefault();
  //   if (inputMessage.trim()) {
  //     setMessages([...messages, { text: inputMessage, from: uuid }]);
  //     setInputMessage("");
  //   }
  // };

  // function parseMessageToChatMessage(parseMessage) {
  //   return {
  //     id: parseMessage.id,
  //     messages: parseMessage.get("content"),
  //     senderName: parseMessage.get("senderName"),
  //     timestamp: parseMessage.createdAt.toLocaleTimeString().toString(),
  //     avatar: parseMessage.get("creator").get("avatar")
  //       ? parseMessage.get("creator").get("avatar").url()
  //       : undefined,
  //     // Add any other properties that the ChatMessage component needs here
  //   };
  // }

  return (
    <div className="h-screen flex flex-col flex-auto">
      <div className="h-16 px-7 flex items-center justify-between border-b shadow-sm">
        <h1 className="text-xl font-bold">Discussion</h1>
        <button
          className="hover:text-indigo-800 py-2 px-3 rounded-sm"
          title="Active users"
        >
          Active users
        </button>
      </div>

      <div id="chat-feed" ref={listRef} className="flex-1 overflow-y-auto p-4">
        <FlipMove enterAnimation="fade" appearAnimation="fade">
          {uuid !== undefined &&
            messages &&
            messages.map((message, index) => (
              <div key={index} className={`flex flex-row mb-1 `}>
                <span className=" inline-block relative mr-2 self-start">
                  <img
                    className={`
                     flex h-8 w-8 rounded-full`}
                    src={
                      message.get("creator").get("avatar") &&
                      message.get("creator").get("avatar").url()
                    }
                    alt="avatar"
                  />
                  {/* <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-green-400"></span> */}
                </span>

                <div
                  className={`bg-slate-50 rounded-2xl border py-1 px-2 max-w-[85%]`}
                >
                  <div className="mx-2 items-start justify-start flex flex-row">
                    <span
                      className={`${
                        message.get("creator")?.id === uuid
                          ? "text-red-500"
                          : "text-indigo-600"
                      }  font-semibold text-xs `}
                    >
                      <div className="flex flex-row items-start justify-start py-1">
                        <p>{message.get("senderName")}</p>
                        <p>~&nbsp;</p>
                        {"  "}
                      </div>
                    </span>

                    <p className="break-all text-[15px] text-slate-800 self-center">
                      {message.get("content")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </FlipMove>
      </div>

      <form className="h-16 bg-white px-2 flex flex-row items-center border">
        <input
          placeholder="Enter your message..."
          value={inputMessage}
          onChange={handleupdateInput}
          className="flex-1 bg-transparent outline-none py-1 px-2 break-words"
        />
        <button
          type="submit"
          disabled={!inputMessage}
          className="flex-shrink-0 border-l-2 justify-center pl-4 pr-2  text-slate-900 font-semibold text-lg disabled:text-slate-400"
          onClick={handleSubmitMessage}
        >
          Send
        </button>
      </form>
    </div>
  );
});

export default Chat;
