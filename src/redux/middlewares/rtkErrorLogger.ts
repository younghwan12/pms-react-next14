import { Middleware, MiddlewareAPI, isRejectedWithValue } from "@reduxjs/toolkit";
import { setError } from "../errorSlice";

interface RejectedActionPayload {
    status: number;
    data: {
        status: string;
        message: string;
    };
}

export const rtkErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        const payload = action.payload as RejectedActionPayload; // 타입을 명시적으로 지정

        if (window !== undefined && payload) {
            if (payload.status === 404) {
                return;
            }
            api.dispatch(
                setError({
                    errorCode: (payload.data && payload?.data?.message) || "알수없는 오류",
                    // errorMessage: payload.data.message || "관리자에게 문의하세요.",
                    errorMessage: "관리자에게 문의하세요.",
                })
            );
        }
    }
    return next(action);
};

export default {};
