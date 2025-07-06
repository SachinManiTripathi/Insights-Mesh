import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../redux/slices/sessionSlice";

export default function SessionTags() {
  const filter = useSelector((s) => s.sessions.filter);
  const dispatch = useDispatch();
  const tags = [
    "General",
    "Technology",
    "Science",
    "Health",
    "Business",
    "Education",
    "Entertainment",
    "Politics",
  ];
  return (
    <div className="mb-3 flex flex-wrap gap-2">
      {tags.map((t) => (
        <button
          key={t}
          onClick={() => dispatch(setFilter(t))}
          className={`rounded px-3 py-1 text-sm border
                        ${filter === t ? "bg-blue-600 text-white" : ""}`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
