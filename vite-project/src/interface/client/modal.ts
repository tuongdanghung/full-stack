export interface Modal {
    open: boolean;
    id: number | null;
    brand: object[];
    capacity: object[];
    color: object[];
    category: object[];
    image?: object[];
    handleOpen: (id: string) => void;
    handleClose: (open: boolean) => void;
}
