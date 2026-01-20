import { useEffect, useRef, useState } from "react";
import VisualizationPanel from "./components/VisualizationPanel";
import OptionsPanel from "./components/OptionsPanel";

function App() {
  const [sidebarWidth, setSidebarWidth] = useState(innerWidth/3);
  const isResizing = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing.current) return;

      // 1. CALCULATE WIDTH FROM THE RIGHT
      // Total Screen Width - Mouse X Position = Width of Right Sidebar
      let newWidth = window.innerWidth - e.clientX;

      // 2. CONSTRAINTS
      if (newWidth < 150) newWidth = 150;
      if (newWidth >= window.innerWidth / 2) newWidth = window.innerWidth / 2;

      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      isResizing.current = false;
      document.body.style.cursor = "default";
      document.body.style.userSelect = "auto";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const startResizing = () => {
    isResizing.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* 1. MAIN CONTENT (Now First) */}
      <div className="flex-1 bg-white p-4 overflow-hidden">
        <h1 className="text-2xl font-bold">Algorithm Grid</h1>
        <VisualizationPanel />
      </div>

      {/* 2. THE HANDLE (Middle) */}
      <div
        onMouseDown={startResizing}
        // Changed -ml-1 to -mr-1 so it overlaps the sidebar's border slightly
        className="w-2 -mr-1 cursor-col-resize z-50 flex-shrink-0 hover:bg-blue-500 transition-colors opacity-0 hover:opacity-100"
      />

      {/* 3. RIGHT SIDEBAR (Now Last) */}
      <div
        style={{ width: sidebarWidth }}
        // Changed border-r to border-l (border on the left side of the panel)
        className="bg-gray-100 border-l flex-shrink-0 p-4"
      >
        <h2 className="font-bold text-lg mb-4">Controls</h2>
        <OptionsPanel />
      </div>
    </div>
  );
}

export default App;
