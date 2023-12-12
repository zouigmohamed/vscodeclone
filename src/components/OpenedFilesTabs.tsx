import { useDispatch, useSelector } from "react-redux";
import { IFile } from "../interfaces";
import RenderFileIcon from "./RenderFileIcon";
import CloseIcon from "./SVG/CloseIcon";
import { setClickedFile, setOpenedFile, setTabIdToRemove  } from "../app/features/fileTreeSlice";
import { RootState } from "../app/store";

interface IPropsOpenedFilesTabs {
file:IFile
}

const OpenedFilesTabs = ({ file }: IPropsOpenedFilesTabs) => {
    const dispatch = useDispatch()
    const {clickedFile:{activeTabId} , openedFiles} = useSelector((state:RootState) => state.tree)
    const onclick = () => {
        const {content ,name , id} = file
        dispatch(setClickedFile({ fileName: name, fileContent: content , activeTabId:id }))
    }
    const onRemove = (selectedId: string) => {
        const filtered = openedFiles.filter(file => file.id !== selectedId);
        const lastTab = filtered[filtered.length - 1];
    
        if (!lastTab) {
          dispatch(setOpenedFile([]));
          dispatch(setClickedFile({ activeTabId: null, fileContent: "", fileName: "" }));
          return;
        }
        const { id, name, content } = lastTab;
        dispatch(setOpenedFile(filtered));
        dispatch(setClickedFile({ activeTabId: id, fileContent: content, fileName: name }));
      };
    return (
        <div className="flex items-center " onClick={onclick} style={{borderTop: file.id === activeTabId ? "3px solid grey" :"3px solid transparent"}}>
            <span><RenderFileIcon filename={file.name} /></span>
            <span className="cursor-pointer  flex justify-center items-center w-fit mr-2 p-1 rounded-md">{file.name}</span>
            <span
        className="cursor-pointer bg-slate-500 text-2xl hover:bg-black  duration-300 flex justify-center items-center w-fit mr-2 p-1 rounded-md"
        onClick={e => {
          e.stopPropagation();
          dispatch(setTabIdToRemove(file.id))
          onRemove(file.id);
        }}
      >
                <CloseIcon/>
            </span>
        </div>

    )
}
export default OpenedFilesTabs;