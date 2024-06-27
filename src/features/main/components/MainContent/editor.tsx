import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useCallback, useEffect, useRef, useState } from "react";
import Editor from "@/common/components/static/editor";
import Preview from "@/common/components/static/preview";

interface Draft {
    lastModified: Date;
    xml: string;
}

const MainContent = () => {
    const [doc, setDoc] = useState<string>("");
    const [visible, setVisible] = useState<boolean>(false);
    const [draft, setDraft] = useState<Draft | null>(null);

    const handleDocChange = useCallback((newDoc: string) => {
        setDoc(newDoc);
    }, []);

    const handleEdit = () => {
        setVisible(true);
    };

    const SaveFunction = () => {
        console.log("doc", doc);
    };

    const handleLoad = () => {
        const savedData = localStorage.getItem("diagramData");
        if (savedData) {
            setDoc(savedData);
        }
    };

    const handleSave = (data: string) => {
        localStorage.setItem("diagramData", data);
        setDoc(data);
        setVisible(false);
    };

    useEffect(() => {
        handleLoad();

        const receiveMessage = (event: MessageEvent) => {
            if (typeof event.data === "string" && event.data.length > 0) {
                const msg = JSON.parse(event.data);

                const iframe = document.getElementById("diagram-frame") as HTMLIFrameElement;
                const iframeWindow = iframe?.contentWindow;

                if (!iframeWindow) return;

                if (msg.event === "configure") {
                    iframeWindow.postMessage(
                        JSON.stringify({
                            action: "configure",
                            config: { defaultFonts: ["Humor Sans", "Helvetica", "Times New Roman"] },
                        }),
                        "*"
                    );
                } else if (msg.event === "init") {
                    const diagramElement = document.getElementById("diagram");
                    if (draft) {
                        iframeWindow.postMessage(JSON.stringify({ action: "load", autosave: 1, xml: draft.xml }), "*");
                        iframeWindow.postMessage(JSON.stringify({ action: "status", modified: true }), "*");
                    } else if (diagramElement && diagramElement.firstChild) {
                        const svg = new XMLSerializer().serializeToString(diagramElement.firstChild as Node);
                        iframeWindow.postMessage(JSON.stringify({ action: "load", autosave: 1, xml: svg }), "*");
                    } else {
                        iframeWindow.postMessage(JSON.stringify({ action: "load", autosave: 1, xml: "" }), "*");
                    }
                } else if (msg.event === "export") {
                    const svg = atob(msg.data.substring(msg.data.indexOf(",") + 1));
                    handleSave(svg);
                } else if (msg.event === "autosave") {
                    setDraft({ lastModified: new Date(), xml: msg.xml });
                } else if (msg.event === "save") {
                    iframeWindow.postMessage(
                        JSON.stringify({
                            action: "export",
                            format: "xmlsvg",
                            xml: msg.xml,
                            spin: "Updating page",
                        }),
                        "*"
                    );
                    setDraft({ lastModified: new Date(), xml: msg.xml });
                } else if (msg.event === "exit") {
                    setDraft(null);
                    setVisible(false);
                }
            }
        };

        window.addEventListener("message", receiveMessage);

        return () => {
            window.removeEventListener("message", receiveMessage);
        };
    }, [draft]);

    return (
        <>
            <Button className="mb-3" label="다이어그램 삽입" onClick={handleEdit} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Editor initialDoc={doc} onChange={handleDocChange} />
                <Preview doc={doc} />
            </div>
            <Button className="mb-3" label="저장" onClick={SaveFunction} />
            <Dialog
                header="Header"
                visible={visible}
                style={{ width: "100%", height: "100vh", position: "relative" }}
                onHide={() => setVisible(false)}
            >
                <iframe
                    id="diagram-frame"
                    src="https://embed.diagrams.net/?embed=1&proto=json&spin=1&saveAndExit=1&noSaveBtn=1&noExitBtn=0"
                ></iframe>
            </Dialog>
        </>
    );
};

export default MainContent;
