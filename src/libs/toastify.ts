import { toast } from 'react-toastify';

export const toastError = (message: string) => {
  toast(message, {
    type: 'error',
    autoClose: 2000,
  });
};

export const toastSuccess = (message: string) => {
  toast(message, {
    type: 'success',
    autoClose: 2000,
  });
};

export const toastPromise = (
  fn: Promise<unknown>,
  messages: {
    pending: string;
    success: string;
    error: string;
  }
) => {
  const { pending, success, error } = messages;
  return toast.promise(
    fn,
    {
      pending,
      success,
      error,
    },
    {
      autoClose: 2000,
    }
  );
};
