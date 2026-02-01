import { useAppState } from "./state/AppStateContext.jsx";

export function DebugJSON() {

    const { state } = useAppState();

    return (
        <details style={{ marginTop: 16 }}>
            <summary>Debug JSON</summary>
            <pre>{JSON.stringify(state, null, 2)}</pre>
        </details>
    )
}