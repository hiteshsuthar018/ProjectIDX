import { FaGitAlt, FaHtml5, FaJs, FaReact, FaPython, FaJava } from "react-icons/fa";
import { ImSvg } from "react-icons/im";
import { IoLogoCss3 } from "react-icons/io";
import { VscJson, VscMarkdown, VscTerminal } from "react-icons/vsc";
import { SiTypescript, SiCplusplus, SiMongodb, SiNextdotjs } from "react-icons/si";
import { GrDocumentPdf } from "react-icons/gr";

const FILE_ICONS = {
  js: { icon: FaJs, color: "yellow" },
  jsx: { icon: FaReact, color: "#61dbfb" },
  ts: { icon: SiTypescript, color: "#3178c6" },
  tsx: { icon: FaReact, color: "#61dbfb" },

  html: { icon: FaHtml5, color: "orange" },
  css: { icon: IoLogoCss3, color: "blue" },
  svg: { icon: ImSvg, color: "orange" },

  json: { icon: VscJson, color: "yellow" },
  md: { icon: VscMarkdown, color: "white" },

  gitignore: { icon: FaGitAlt, color: "orange" },
  env: { icon: VscTerminal, color: "green" },

  pdf: { icon: GrDocumentPdf, color: "red" },

  py: { icon: FaPython, color: "#ffd43b" },
  java: { icon: FaJava, color: "#f89820" },
  cpp: { icon: SiCplusplus, color: "#00599c" },

  next: { icon: SiNextdotjs, color: "white" },
  mongo: { icon: SiMongodb, color: "#00ed64" },
};

const Fileicon = ({ extention }) => {
  const item = FILE_ICONS[extention];
  if (!item) return null;

  const Icon = item.icon;

  return <Icon color={item.color} size={18} />;
};

export default Fileicon;
