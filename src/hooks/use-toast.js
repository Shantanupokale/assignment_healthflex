import toast from 'react-hot-toast';

export function useToast() {
  return {
    toast: {
      success: (message, options = {}) => toast.success(message, options),
      error: (message, options = {}) => toast.error(message, options),
      loading: (message, options = {}) => toast.loading(message, options),
      custom: (component, options = {}) => toast.custom(component, options),
      dismiss: (toastId) => toast.dismiss(toastId),
      promise: (promise, messages, options = {}) =>
        toast.promise(promise, messages, options),
    },
    dismiss: (toastId) => toast.dismiss(toastId),
  };
}
