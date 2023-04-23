import toast from 'react-hot-toast';

const toasterSetting = { position: 'top-center', duration: 2000 };

export function successToaster(message = 'Success Toaster', settings = toasterSetting) {
    return toast.success(message, settings);
}

export function errorToaster(message = 'Error Toaster', settings = toasterSetting) {
    return toast.error(message, settings);
}