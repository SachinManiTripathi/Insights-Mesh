import { useDispatch, useSelector } from "react-redux";
import { addSession } from "../redux/slices/sessionSlice";
import { useNavigate } from "react-router-dom";
import SessionTags from "../components/SessionTags";
import { useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import VirtualList from "../components/VirtualList";
import useSecureStorage from "../hooks/useSecureStorage";
import InsightsMeshLogo from "../assets/InsightsMesh.png";
import { FaArrowCircleUp } from "react-icons/fa";
import { FaFileArrowDown } from "react-icons/fa6";

export default function Sessions() {
  const { list, filter } = useSelector((s) => s.sessions);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [persisted, setPersisted] = useSecureStorage("insights-sessions", []);

  useEffect(() => {
    persisted.forEach((session) => {
      const exists = list.some((s) => s.id === session.id);
      if (!exists) dispatch(addSession(session));
    });
  }, []);
  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    setPersisted(list);
  }, [list]);

  const visible = list.filter((s) => filter === "ALL" || s.tag === filter);

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify({ sessions: list })], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    Object.assign(document.createElement("a"), {
      href: url,
      download: `insights-${uuid()}.json`,
    }).click();
    URL.revokeObjectURL(url);
  };

  const importJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const { sessions } = JSON.parse(ev.target.result);
        setPersisted(sessions);
        window.location.reload();
      } catch {
        alert("Invalid JSON");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-4">
      <header className="mb-4 flex flex-wrap items-center justify-between">
        <div className="flex gap-3 mr-8">
          <label className="flex cursor-pointer items-center gap-2 rounded border px-4 py-3 text-sm shadow">
            <FaFileArrowDown className="text-base" /> Import
            <input
              hidden
              type="file"
              accept="application/json"
              onChange={importJSON}
            />
          </label>

          <button
            onClick={exportJSON}
            className=" flex cursor-pointer items-center gap-2 rounded border px-3 py-2 text-sm shadow"
          >
            <FaArrowCircleUp className="text-base" /> Export
          </button>
          <button
            className="rounded bg-blue-600 px-3 py-2 text-white shadow shadow"
            onClick={() => {
              const action = addSession();
              dispatch(action);
              navigate(`/chat/${action.payload.id}`);
            }}
          >
            + New Chat
          </button>
        </div>
      </header>

      <SessionTags />

      {visible.length > 100 ? (
        <VirtualList sessions={visible} />
      ) : (
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((s) => (
            <div
              key={s.id}
              onClick={() => navigate(`/chat/${s.id}`)}
              className="cursor-pointer rounded border p-4 shadow
                         transition hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <h3 className="truncate font-semibold">{s.title}</h3>
              <p className="line-clamp-2 text-xs text-gray-500">{s.summary}</p>
              <span className="text-[10px] opacity-60">{s.tag}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
