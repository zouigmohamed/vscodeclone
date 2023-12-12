import { useState } from "react";
import { IFile } from "../interfaces";
import RenderFileIcon from "./RenderFileIcon";
import BottomArrowIcon from "./SVG/Bottom";
import RightArrowIcon from "./SVG/Right";
import { useDispatch, useSelector } from "react-redux";
import { setOpenedFile , setClickedFile} from "../app/features/fileTreeSlice";
import { RootState } from "../app/store";
import { doesFileExists } from "../utils/function";

interface IPropsRecursiveComponent {
  fileTree: IFile;
}

const RecursiveComponent = ({ fileTree }: IPropsRecursiveComponent) => {
  const dispatch = useDispatch()
  const {openedFiles } = useSelector((state : RootState) => state.tree)
  const [isOpen, setIsOpen] = useState<boolean>(false);
  //**handlers */
  const toggle = () => setIsOpen((prev) => !prev);
  const onFileClicked = () => {
    const exist = doesFileExists(openedFiles , fileTree.id)
    dispatch(setClickedFile({ fileName: fileTree.name, fileContent: fileTree.content ,activeTabId:fileTree.id}))
    if (exist) return;
    dispatch(setOpenedFile([...openedFiles, fileTree]))

  }
  return (
    <div className="ml-5 cursor-pointer p-[1px] rounded-sm ">
      <div className="flex items-center mb-1 ml-3">
        {fileTree.isFolder ? (
          <div onClick={toggle} className="flex items-center space-x-1">
            {isOpen ? <BottomArrowIcon /> : <RightArrowIcon />}
            <RenderFileIcon filename={fileTree.name} isFolder={fileTree.isFolder} isOpen={isOpen} />
            <span>{fileTree?.name}</span>
          </div>
        ) : (
          <div className="ml-5 flex items-center bg-blue-200 rounded-md p-1 w-full" onClick={onFileClicked}>
            <RenderFileIcon filename={fileTree.name}  />
            <span className="ml-2">{fileTree?.name}</span>
          </div>
        )}
      </div>
      <>
        {isOpen &&
          fileTree?.children &&
          fileTree.children.map((file, idx) => (
            <RecursiveComponent fileTree={file} key={idx} />
          ))}
      </>
    </div>
  );
};

export default RecursiveComponent;
