import React, { useState, useRef, useEffect, useCallback } from "react";
import Parse from "../../services/parse";
import { client } from "../../config/LiveQueryClient";
// import _ from "lodash";
import { useRecoilValue } from "recoil";
import { currentUserStore } from "../../store/atoms/currentUserStore";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  // Get a reference to the message container
  const listRef = useChatScroll(messages);

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
    setMessages(resultQuery);
    return true;
  }, []);

  // Handle subscribing to live messages using Parse LiveQuery
  const handleGetLiveMessage = useCallback(async () => {
    const parseQuery = new Parse.Query("Message");
    parseQuery.ascending("createdAt");

    // const sendSoundMsg = new Audio("send-message.mp3");
    const receiveSoundMsg = new Audio("message-notification.mp3");

    // Subscribe to the Parse LiveQuery and set up event listeners for new messages
    let subscription = await client.subscribe(parseQuery);

    subscription.on(
      "create",
      async (m) => {
        // Update the state variable with the new message

        setMessages((message) => message.concat(m));
        // receiveSoundMsg.play();

        // if (m.get("senderId") !== uuid) {
        //   console.log(m.get("senderId") + " and " + uuid);
        //   return;
        // }

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

  const handleSendMessageWithKey = (e) => {
    if (inputMessage.trim().length > 0) {
      e.key === "Enter" && handleSubmitMessage();
    }
  };

  // const handleSendMessage = (e) => {
  //   e.preventDefault();
  //   if (inputMessage.trim()) {
  //     setMessages([...messages, { text: inputMessage, from: uuid }]);
  //     setInputMessage("");
  //   }
  // };

  return (
    <div className="h-screen flex flex-col flex-auto">
      <div className="h-16 px-7 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">Discussion</h1>
        <button className="hover:text-indigo-800 py-2 px-4 rounded-sm">
          Online users
        </button>
      </div>

      <div id="chat-feed" ref={listRef} className="flex-1 overflow-y-auto p-4">
        {uuid !== undefined &&
          messages &&
          messages.map((message, index) => (
            <div
              key={index}
              className={`${
                message.get("senderId") === uuid
                  ? "justify-end"
                  : "justify-start"
              } flex mb-1`}
            >
              <div
                className={`${
                  message.get("senderId") === uuid
                    ? "bg-gray-100"
                    : "bg-indigo-200"
                } rounded-lg py-2 px-3 max-w-3/4 flex flex-row items-center justify-center`}
              >
                {message.get("senderId") !== uuid && (
                  <span className="text-indigo-600 font-semibold text-sm">
                    {message.get("senderName")} ~&nbsp;
                  </span>
                )}
                <p>{message.get("content")}</p>
              </div>
            </div>
          ))}
      </div>

      <div className="h-16 bg-white px-4 flex items-center border">
        <input
          onKeyUp={(e) => handleSendMessageWithKey(e)}
          placeholder="Enter your message..."
          value={inputMessage}
          onChange={handleupdateInput}
          className="flex-1 bg-transparent outline-none border-r-2   py-2 px-4 mr-2"
        />
        <button
          disabled={inputMessage.trim().length < 1}
          className="py-2 px-2 rounded-md text-slate-900 font-semibold text-lg disabled:text-slate-400"
          onClick={inputMessage.trim().length > 0 ? handleSubmitMessage : null}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Messages;
