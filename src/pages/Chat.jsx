import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import ChatMessage from "../components/ChatMessage";
import { addChat } from "../redux/slices/chatSlice";
import { updateSession } from "../redux/slices/sessionSlice";
import { askGemini } from "../api/gemini";
import { useEffect, useRef, useState } from "react";
import Modal from "../components/Modal";
import useSecureStorage from "../hooks/useSecureStorage";
import { FaArrowAltCircleLeft } from "react-icons/fa";

export default function Chat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const messages = useSelector((s) => s.chats[id] ?? []);
  const session = useSelector((s) =>
    s.sessions.list.find((sess) => sess.id === id)
  );
  console.log(messages, "Messages in chat component");
  const [persisted, setPersisted] = useSecureStorage(`chat-${id}`, []);
  const [input, setInput] = useState("");
  const [modal, setModal] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => persisted.forEach((m) => dispatch(addChat(m))), []);
  useEffect(() => {
    setPersisted(messages);
  }, [messages]);

  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }));
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && setModal(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  const send = async () => {
    if (!input.trim()) return;

    const userInput = input.trim();

    dispatch(addChat({ sessionId: id, role: "user", content: input }));
    setInput("");

    const raw = await askGemini([
      ...messages,
      { role: "user", content: input },
    ]);

    dispatch(addChat({ sessionId: id, role: "model", content: raw }));
    {
      messages.length === 0 &&
        dispatch(
          updateSession({
            id,
            title: userInput.slice(0, 50),
            summary: raw.slice(0, 100),
            tag: session?.tag || "General",
          })
        );
    }
    console.log("Updating session", {
      id,
      title: raw.slice(0, 40),
      summary: raw.slice(0, 80),
    });
  };

  const Header = (
    <div
      className="flex items-center gap-3
                       border-b bg-white/90 px-4 py-2 backdrop-blur
                       dark:bg-gray-900/90"
    >
      <button
        onClick={() => navigate(-1)}
        className=" flex items-center border rounded px-2 py-1 hover:bg-blue-300 dark:hover:bg-gray-600"
      >
        <FaArrowAltCircleLeft className="inline-block mr-1 text-m" />
      </button>

      <span className="flex-1 font-semibold truncate">
        {session?.title || "New Chat"}
      </span>
      <button
        onClick={() => setModal((m) => !m)}
        className="fixed items-center rounded border right-2 px-2 py-1 text-xs hover:bg-blue-300 dark:hover:bg-gray-600"
      >
        {modal ? "🗖 Full" : "💬 Modal"}
      </button>
    </div>
  );

  const messageForm = (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        send();
      }}
      className="flex gap-2 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3"
    >
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message…"
        autoFocus
        className="
      flex-1 rounded-md
      bg-white  dark:bg-gray-800
      border border-gray-300 dark:border-gray-600
      text-gray-900 dark:text-gray-100
      placeholder-gray-500 dark:placeholder-gray-400
      p-2
      focus:outline-none focus:ring-2 focus:ring-blue-500
      transition-colors
    "
      />

      <button
        disabled={!input.trim()}
        className="
      rounded-md
      bg-blue-600 hover:bg-blue-700
      disabled:opacity-40
      text-white
      px-3 py-2
      focus:outline-none focus:ring-2 focus:ring-blue-500
      transition-colors
    "
      >
        Send
      </button>
    </form>
  );

  const categorySection = (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <label htmlFor="category-select" className="text-sm font-semibold">
        Please tag this chat to a Category:
      </label>
      <select
        id="category-select"
        value={session?.tag || "General"}
        onChange={(e) => {
          dispatch(updateSession({ id, tag: e.target.value }));
        }}
        className="rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-1 
        text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      >
        <option value="General">General</option>
        <option value="Technology">Technology</option>
        <option value="Science">Science</option>
        <option value="Health">Health</option>
        <option value="Business">Business</option>
        <option value="Education">Education</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Politics">Politics</option>
      </select>
    </div>
  );
  const Body = (
    <div className="flex h-full flex-col">
      <div className={!modal ? "sticky top-16 mb-15" : "sticky"}>
        {Header}
        {categorySection}
      </div>

      <main className="flex-1 overflow-y-auto p-5">
        {messages.map(
          (m) => (
            console.log("Rendering message:", m),
            (
              <ChatMessage key={m.id} role={m.role}>
                {m.content}
              </ChatMessage>
            )
          )
        )}
        <div ref={bottomRef} />
      </main>
      {messageForm}
    </div>
  );

  return modal ? (
    <Modal open={modal} onClose={() => setModal(false)}>
      {Body}
    </Modal>
  ) : (
    <div className="flex h-screen flex-col">{Body}</div>
  );
}
