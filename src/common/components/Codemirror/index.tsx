import { useEffect, useRef, useState } from "react";
// import type { IUseCodeMirrorProps } from "./useCodeMirror.types";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
// import { javascript } from "@codemirror/lang-javascript";
import { basicSetup } from "codemirror";

export const useCodeMirror = <T extends Element>(props: any) => {
    const { initialDoc, editorClassName = "editor" } = props;
    const containerRef = useRef<T>(null);

    const [editorView, setEditorView] = useState<EditorView>();

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        const container = containerRef.current;
        let shadowRoot = container.shadowRoot || undefined;

        if (!shadowRoot) {
            shadowRoot = container.attachShadow({ mode: "open" });
        }

        const div = document.createElement("div");
        div.className = editorClassName;
        shadowRoot.append(div);

        const editorState = EditorState.create({
            doc: initialDoc,
            extensions: [basicSetup, EditorView.editable.of(false)],
        });

        const editorView = new EditorView({
            state: editorState,
            parent: shadowRoot.querySelector(`.${editorClassName}`) || undefined,
            root: shadowRoot,
        });

        setEditorView(editorView);

        return () => {
            editorView.destroy();
        };
    }, [editorClassName, initialDoc]);

    return [containerRef, editorView] as const;
};
