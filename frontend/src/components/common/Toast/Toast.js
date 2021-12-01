import { toast } from 'react-toastify';

const toastStlye = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}

const progressStlye = {
    position: "bottom-right",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    closeButton: false,
    draggable: false,
    progress: undefined,
}

const progressToast = (message) => {
    toast.info(message, progressStlye);
}
const successToast = (message) => {
    toast.success(message, toastStlye);
}
const errorToast = (errorMsg) => {
    toast.error(`Error: ${errorMsg}`, toastStlye);
}
const infoToast = (errorMsg) => {
    toast.info(`${errorMsg}`, toastStlye);
}

const warningToast = (warningMsg) => {
    toast.warning(`${warningMsg}`, toastStlye);
}

export { successToast, errorToast, warningToast, progressToast, infoToast }