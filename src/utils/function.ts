import { IFile } from "../interfaces";

export const doesFileExists = (arr: IFile[], id: string) => {
    return arr.some(obj => obj.id === id)
}