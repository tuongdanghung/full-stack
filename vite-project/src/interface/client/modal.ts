export interface Modal {
    open: boolean;
    item: object;
    brand: object[];
    capacity: object[];
    color: object[];
    category: object[];
    image?: object[];
    ram: any;
    handleOpen: (id: string) => void;
    handleClose: (open: boolean) => void;
    handleEdit: (data: object) => void;
}
