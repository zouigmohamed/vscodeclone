import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import OpenedFilesTabs from "./OpenedFilesTabs";
import ContextMenu from "./ContextMenu";
import { useState } from "react";
// interface IPropsOpenedFileBar {

// }
const OpenedFileBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const { openedFiles } = useSelector(
    (state: RootState) => state.tree
  );
  return (
    <div className="w-full bg-gray-100">
    <div
      className="flex items-center border-b-[1px] border-[#ffffff1f]"
      onContextMenu={e => {
        e.preventDefault();
        setMenuPosition({ x: e.clientX, y: e.clientY });
        setShowMenu(true);
      }}
    >
      {openedFiles.map(file => (
        <OpenedFilesTabs key={file.id} file={file} />
      ))}
    </div>

    {showMenu && <ContextMenu positions={menuPosition} setShowMenu={setShowMenu} />}
  </div>
  );
};
export default OpenedFileBar;
