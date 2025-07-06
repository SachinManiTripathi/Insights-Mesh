import { useDispatch, useSelector } from "react-redux";
import { FaSun, FaMoon } from "react-icons/fa";
import { toggleTheme } from "../redux/slices/themeSlice";

export default function ThemeToggle() {
  const mode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  return (
    <button
      className="rounded-full p-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300"
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle theme"
    >
      {mode === "dark" ? (
        <FaSun className="text-yellow-500" />
      ) : (
        <FaMoon className="text-blue-500" />
      )}
    </button>
  );
}
