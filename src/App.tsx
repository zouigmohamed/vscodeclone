import { useSelector } from "react-redux";
import "./App.css";
import RecursiveComponent from "./components/RecursiveComponent";
import ResizablePanel from "./components/ResizablePanel";
import { fileTree } from "./data/fileTree";
import { RootState } from "./app/store";
import Preview from "./components/Preview";
import WelcomeTab from "./components/WelcomeTab";

function App() {
  const { openedFiles } = useSelector(({ tree }: RootState) => tree);

  return (
    <div>
      <div className="flex h-screen">
        <ResizablePanel
          showLeftPanel
          leftPanel={
            <div className="w-64 p-2">
              <RecursiveComponent fileTree={fileTree} />
            </div>
          }
          rightPanel={openedFiles.length ? <Preview /> : <WelcomeTab />}
        />
      </div>
    </div>
  );
}

export default App;
