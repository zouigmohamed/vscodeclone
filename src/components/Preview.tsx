import { useSelector } from "react-redux";
import FileSyntaxHighlighter from "./FileSyntaxHighlighter";
import { RootState } from "../app/store";
import OpenedFileBar from "./OpenedFileBar";

const Preview = () => {
  const {
    clickedFile: { fileContent },
  } = useSelector(({ tree }: RootState) => tree);

  return (
    <>
      <OpenedFileBar/>
      <FileSyntaxHighlighter content={fileContent} />
    </>
  );
};

export default Preview;
