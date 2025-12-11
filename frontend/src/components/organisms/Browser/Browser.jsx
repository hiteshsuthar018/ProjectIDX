import { useEffect, useRef, useState } from "react";
import useEditorSocketStore from "../../../store/editorSocketStore";
import { usePortStore } from "../../../store/portStore";
import { FiRefreshCw, FiMaximize, FiMinimize, FiEyeOff } from "react-icons/fi";

const Browser = ({ projectId ,setShowBrowser}) => {
  const browserRef = useRef(null);
  const containerRef = useRef(null);

  const { port } = usePortStore();
  const { editorSocket } = useEditorSocketStore();

  const [isFullscreen, setIsFullscreen] = useState(false);


  useEffect(() => {
    editorSocket?.emit("getPort", {
      containerId: projectId,
    });
  }, [projectId, port, editorSocket]);

  const handleRefreshBrowser = () => {
    if (browserRef.current) {
      browserRef.current.src = browserRef.current.src;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`
        h-full flex flex-col bg-[#0f172a] text-white
        border border-white/10 overflow-hidden
        transition-all duration-300 ease-in-out
        flex-none

        ${isFullscreen ? "rounded-none w-screen" : "rounded-xl"}
      `}
    >
      {/* ===== Top Bar ===== */}
      <div className="flex items-center gap-2 px-2 py-2 bg-[#020617] border-b border-white/10">

        
          <button
            onClick={handleRefreshBrowser}
            className="p-2 rounded-md bg-blue-600 hover:bg-blue-700 transition"
          >
            <FiRefreshCw size={16} />
          </button>
    

  
          <input
            type="text"
            readOnly
            value={`http://localhost:${port}`}
            className="flex-1 bg-[#020617] border border-white/20 px-3 py-1.5 rounded-md text-sm outline-none"
          />
       
 
          <button
            className="p-2 rounded-md bg-slate-700 hover:bg-slate-600 transition"
            onClick={()=>setShowBrowser(false)}
          >
            <FiEyeOff size={16} />
          </button>
        

      
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-md bg-slate-700 hover:bg-slate-600 transition"
          >
            {isFullscreen ? <FiMinimize size={16} /> : <FiMaximize size={16} />}
          </button>
        
      </div>

      {/* ===== iFrame Preview ===== */}
    
        <div className="flex-1 bg-black">
          {port ? (
            <iframe
              ref={browserRef}
              src={`http://localhost:${port}`}
              className="w-full h-full border-none"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-white/50 text-sm">
              Waiting for server to start...
            </div>
          )}
        </div>
    
    </div>
  );
};

export default Browser;
