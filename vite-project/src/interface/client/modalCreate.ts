export interface ModalCreate {
    open: boolean;
    slug: string;
    title: string;
    id?: string;
    handleClose: (open: boolean) => void;
    // handleOpen: (open: boolean) => void;
}
