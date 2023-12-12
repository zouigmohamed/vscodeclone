import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFile } from "../../interfaces";
interface IClickedFile{
    activeTabId:string | null,
    fileName:string,
    fileContent:string | undefined

}
interface IInitialSate{
    openedFiles: IFile[],
    clickedFile: IClickedFile,
    tabIdToRemove:string | null


}
const initialState: IInitialSate = {
    openedFiles: [],
    clickedFile: {
        activeTabId:null,
        fileName:"",
        fileContent:""
    },
    tabIdToRemove:null
}
const fileTreeSlice = createSlice({
    name: "fileTree",
    initialState,
    reducers: {
        setOpenedFile: (state, action:PayloadAction<IFile[]>) => {
            state.openedFiles = action.payload;
        },
        setClickedFile: (state, action:PayloadAction<IClickedFile>) => {
            state.clickedFile= action.payload
        },
        setTabIdToRemove: (state, action:PayloadAction<string | null>) => {
            state.tabIdToRemove= action.payload
        },

    }
})
export const {setOpenedFile ,setClickedFile ,setTabIdToRemove } = fileTreeSlice.actions
export default fileTreeSlice.reducer