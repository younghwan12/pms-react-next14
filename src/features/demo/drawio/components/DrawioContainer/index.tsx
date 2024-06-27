import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface Draft {
    lastModified: Date;
    xml: string;
}

const DrawioContainer: React.FC = () => {
    const [value, setValue] = useState<string>("");
    const [visible, setVisible] = useState<boolean>(false);
    const [draft, setDraft] = useState<Draft | null>(null);
    const codeMirrorRef = useRef();

    const [doc, setDoc] = useState<string>("# Hello, World!\n");
    const handleDocChange = useCallback((newDoc: string) => {
        setDoc(newDoc);
    }, []);

    const handleEdit = () => {
        setVisible(true);
    };

    const handleLoad = () => {
        const savedData = localStorage.getItem("diagramData");
        if (savedData) {
            setValue(savedData);
        }
    };

    const handleSave = (data: string) => {
        localStorage.setItem("diagramData", data);
        setValue(data);
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

    const handleCodeChange = (newValue: string) => {
        console.log("Updated code:", newValue);
        // 필요한 처리를 여기에 추가
    };

    return (
        <>
            <Button className="mb-3" label="다이어그램 삽입" onClick={handleEdit} />
            <div
                id="wrapper"
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <div style={{ width: "50%" }}>
                    <InputTextarea
                        style={{ width: "100%", height: "100%" }}
                        value={value}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)}
                        rows={5}
                        cols={30}
                    />
                </div>
                <div style={{ width: "50%" }} className="h-96 bg-white">
                    <div id="diagram" dangerouslySetInnerHTML={{ __html: value }} />
                </div>
            </div>
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

export default DrawioContainer;
