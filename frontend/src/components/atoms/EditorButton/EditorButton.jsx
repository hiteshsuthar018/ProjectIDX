
const EditorButton = ({ isActive }) => {

    const style = {
        active: "text-white bg-gradient-to-b from-[#3a3d4e] to-[#2d2f3c] border-t-2 border-blue-500 shadow-[inset_0_-2px_6px_rgba(0,0,0,0.4)]",
        inactive: "text-[#8b90aa] bg-[#262833] hover:bg-[#343746] hover:text-white transition-all duration-200"
    }

    const handleClick = () =>{
        //TODO: Implement handle click
    }
    return (
        <button
            className={`
        group
        relative
        px-4 py-2 w-48 flex items-center gap-2 
        border border-[#3f3f4a] border-b-0 
        rounded-t-md select-none transition-all duration-200
        ${isActive ? style.active : style.inactive}
      `}
        >
            {/* File icon */}
            <span className="text-sm text-yellow-400">●</span>

            {/* File name */}
            <span className="text-sm font-medium">file.js</span>

            {/* Close icon (visible on hover OR active) */}
            <p
                size={16}
                className={`
          absolute right-2
          opacity-0 group-hover:opacity-100
          ${isActive ? "opacity-100" : ""}
          text-gray-400 hover:text-white transition
        `}
            >
                X
            </p>
        </button>
    );
};

export default EditorButton;
