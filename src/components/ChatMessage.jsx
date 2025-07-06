export default function ChatMessage({ role, children }) {
  const user = role === "user";
  return (
    <div
      className={`flex items-start gap-2 ${
        user ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[85%] md:max-w-[70%] rounded-xl px-3 py-2 mb-2 text-sm shadow 
        ${
          user
            ? "bg-blue-500 text-white"
            : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
