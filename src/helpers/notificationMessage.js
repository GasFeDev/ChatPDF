export const configSuccess = (message) => ({
    position: 'bottom-end',
    icon: 'success',
    showConfirmButton: false,
    toast: true,
    timer: 3000,
    html: message
});

export const configError = (message) => ({
    position: 'bottom-end',
    icon: 'error',
    showConfirmButton: false,
    toast: true,
    timer: 3000,
    html: message
});