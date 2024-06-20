// ErrorDialog.tsx
import React, { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { clearError } from "@/redux/errorSlice";
import { useTimeout } from "primereact/hooks";

const ErrorDialog: React.FC = () => {
    const dispatch = useDispatch();
    const { errorCode, errorMessage } = useSelector((state: RootState) => state.error);

    //3초뒤 꺼지게
    useEffect(() => {
        if (errorCode) {
            const timer = setTimeout(() => {
                dispatch(clearError());
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [errorCode, dispatch]);

    const onHide = () => {
        dispatch(clearError());
    };

    return (
        <Dialog header={`Error ${errorCode}`} visible={!!errorCode} style={{ width: "50vw" }} onHide={onHide}>
            <p className="m-0">{errorMessage}</p>
        </Dialog>
    );
};

export default ErrorDialog;
