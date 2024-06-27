import { useCallback } from "react";
import { useStore, getStraightPath } from "reactflow";

import { getEdgeParams } from "../../utils/getEdgeParams";

// 타입 찾아서 수정요망..
interface IFloatingEdgeTypes {
    id: any;
    source: any;
    target?: any;
    markerEnd?: any;
    style?: any;
}

function FloatingEdge({ id, source, target, markerEnd, style }: IFloatingEdgeTypes) {
    const sourceNode = useStore(useCallback((store) => store.nodeInternals.get(source), [source]));
    const targetNode = useStore(useCallback((store) => store.nodeInternals.get(target), [target]));

    if (!sourceNode || !targetNode) {
        return null;
    }

    const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);

    const [edgePath] = getStraightPath({
        sourceX: sx,
        sourceY: sy,
        targetX: tx,
        targetY: ty,
    });

    return <path id={id} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} style={style} />;
}

export default FloatingEdge;
