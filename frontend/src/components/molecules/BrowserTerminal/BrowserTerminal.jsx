import { Terminal } from "@xterm/xterm"
import { FitAddon } from "@xterm/addon-fit"
import "@xterm/xterm/css/xterm.css"
import { useEffect, useRef } from "react"
import { AttachAddon } from "@xterm/addon-attach"
import { useTerminalSocketStore } from "../../../store/terminalSocketStore"
const BrowserTerminal = ({showBrowser}) => {
    const terminalRef = useRef(null);

 const {terminalSocket} = useTerminalSocketStore();


    useEffect(() => {
        const term = new Terminal({
            cursorBlink: true,
            theme: {
                background: '#1e1e1e',
                foreground: '#ffffff',
                cursor: '#ffffff',
                cursorAccent: '#000000',
                red: '#ff5c57',
                green: '#5af78e',
                yellow: '#f3f99d',
                blue: '#57c7ff',
                cyan: '#9aedfe',
                white: '#f1f1f0',
            },
            fontSize: 16,
            fontFamily: 'Ubuntu Mono, monospace',
        })
        term.open(terminalRef.current);
        let fitAddon = new FitAddon();
        term.loadAddon(fitAddon);
         setTimeout(() => {
      fitAddon.fit();
    }, 0);
        console.log(terminalSocket)
         if (terminalSocket) {
      if (terminalSocket.readyState === WebSocket.OPEN) {
        const attachAddon = new AttachAddon(terminalSocket);
        term.loadAddon(attachAddon);
      } else {
        terminalSocket.onopen = () => {
          const attachAddon = new AttachAddon(terminalSocket);
          term.loadAddon(attachAddon);
        };
      }
    }
        return ()=>{
            term.dispose();
        }

    }, [terminalSocket])

    return (
        <div
            ref={terminalRef}
            className={`h-full overflow-auto`}>

        </div>
    )
}

export default BrowserTerminal