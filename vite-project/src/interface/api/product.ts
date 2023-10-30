import { AppDispatch } from "../../store"; //
export type ProductType = {
    state?: any;
    dispatch?: AppDispatch;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
    token?: string;
};
