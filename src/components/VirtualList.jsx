import { FixedSizeList as List } from "react-window";
import { useNavigate } from "react-router-dom";
import { memo } from "react";

function Row({ data, index, style }) {
  const { items, navigate } = data;
  const s = items[index];
  return (
    <div
      style={style}
      onClick={() => navigate(`/chat/${s.id}`)}
      className="cursor-point border-b p-3 hover:bg-gray-100 
                        dark:hover:bg-gray-800"
    >
      <h3 className="truncate font-medium">{s.title}</h3>
      <p className="line-clamp-1 text-xs text-gray-500">{s.summary}</p>
      <span className="text-[10px] opacity-60">{s.tag}</span>
    </div>
  );
}

export default memo(function VirtualList({ sessions }) {
  const navigate = useNavigate();

  return (
    <List
      height={560}
      itemCount={sessions.length}
      itemSize={78}
      width="100%"
      itemData={{ items: sessions, navigate }}
    >
      {Row}
    </List>
  );
});
