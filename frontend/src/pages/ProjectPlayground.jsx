import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { FiEye } from "react-icons/fi";
import { Splitter } from "antd";

import EditorComponent from "../components/molecules/EditorComponent/EditorComponent";
import EditorButton from "../components/atoms/EditorButton/EditorButton";
import TreeStructure from "../components/organisms/TreeStructure/TreeStructure";
import BrowserTerminal from "../components/molecules/BrowserTerminal/BrowserTerminal";
import Browser from "../components/organisms/Browser/Browser";

import { useTreeStructureStore } from "../store/treeStructureStore";
import useEditorSocketStore from "../store/editorSocketStore";
import { useTerminalSocketStore } from "../store/terminalSocketStore";
import FileTab from "../components/organisms/FileTab/FileTab";

const ProjectPlayground = () => {
  const { projectId: projectIdFromUrl } = useParams();

  const { setProjectId, projectId } = useTreeStructureStore();
  const { setEditorSocket } = useEditorSocketStore();
  const { terminalSocket, setTerminalSocket } = useTerminalSocketStore();

  const [showBrowser, setShowBrowser] = useState(false);

  useEffect(() => {
    if (!projectIdFromUrl) return;

    setProjectId(projectIdFromUrl);

    // ✅ Editor Socket
    const editorSocketConn = io(
      `${import.meta.env.VITE_BACKEND_URL}/editor`,
      {
        query: { projectId: projectIdFromUrl },
        transports: ["websocket"],
      }
    );

    // ✅ Terminal Socket
    const ws = new WebSocket(
      `ws://localhost:3001/terminal?projectId=${projectIdFromUrl}`
    );

    setTerminalSocket(ws);
    setEditorSocket(editorSocketConn);

    // ✅ CLEANUP (IMPORTANT — prevents memory leaks & UI freeze)
    return () => {
      editorSocketConn?.disconnect();
      ws?.close();
    };
  }, [projectIdFromUrl, setProjectId, setEditorSocket, setTerminalSocket]);

  return (
    <div className="h-screen w-full flex bg-[#262833] overflow-hidden">
      <Splitter className="w-full h-full">
        {/* ===== LEFT SIDEBAR ===== */}
        <Splitter.Panel defaultSize="15%" min="12%" max="25%">
          <div className="h-full w-full bg-[#262833] border-r border-white/10 overflow-hidden">
            {projectId && <TreeStructure />}
          </div>
        </Splitter.Panel>

        {/* ===== MAIN WORKSPACE ===== */}
        <Splitter.Panel>
          <div className="flex flex-col h-full w-full min-w-0">
            {/* ===== TOP BAR ===== */}
            <div className="flex h-12 shrink-0 border-b border-white/10">
             <FileTab/>
            </div>

            {/* ===== EDITOR AREA ===== */}
            <div className="flex-1 min-h-0">
              <Splitter className="h-full">
                {/* ===== EDITOR + TERMINAL ===== */}
                <Splitter.Panel min="55%" defaultSize="72%">
                  <div className="flex flex-col h-full min-h-0 min-w-0">
                    <Splitter vertical className="h-full">
                      <Splitter.Panel min="40%" defaultSize="70%">
                        <EditorComponent showBrowser={showBrowser} />
                      </Splitter.Panel>

                      <Splitter.Panel min="20%">
                        <BrowserTerminal showBrowser={showBrowser} />
                      </Splitter.Panel>
                    </Splitter>
                  </div>
                </Splitter.Panel>

                {/* ===== RIGHT BROWSER ===== */}
                {showBrowser ? (
                  <Splitter.Panel min="20%" defaultSize="28%">
                    {projectIdFromUrl && terminalSocket && (
                      <Browser
                        setShowBrowser={setShowBrowser}
                        projectId={projectIdFromUrl}
                      />
                    )}
                  </Splitter.Panel>
                ) : (
                  <div className="w-12 flex items-center justify-center bg-black border-l border-white/10">
                    <button
                      onClick={() => setShowBrowser(true)}
                      className="text-white hover:text-blue-400 transition"
                    >
                      <FiEye size={20} />
                    </button>
                  </div>
                )}
              </Splitter>
            </div>
          </div>
        </Splitter.Panel>
      </Splitter>
    </div>
  );
};

export default ProjectPlayground;
