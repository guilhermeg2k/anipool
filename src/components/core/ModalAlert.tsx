import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { atom, useAtom } from 'jotai';
import { Fragment, ReactNode } from 'react';
import { v4 as uuid } from 'uuid';
import Button from './Button/Button';

type Alert = {
  id: string;
  component: ReactNode;
};

type AlertType = 'CONFIRMATION';

type AlertOptions = {
  onConfirm: () => void;
};

const alertsAtom = atom(Array<Alert>());

export const AlertsElements = () => {
  const [alerts] = useAtom(alertsAtom);
  return <>{alerts.map((alert) => alert.component)}</>;
};

export const useAlert = () => {
  const [alerts, setAlerts] = useAtom(alertsAtom);

  const hideAlert = (id: string) => {
    const newAlerts = alerts.filter((alert) => alert.id != id);
    setAlerts(newAlerts);
  };

  const showAlert = (type: AlertType, text: string, options: AlertOptions) => {
    // In the future add more alert types
    if (type) {
      const id = uuid();

      const newAlerts = [
        ...alerts,
        {
          id,
          component: (
            <ModalAlert
              key={id}
              text={text}
              open
              onConfirm={() => {
                options.onConfirm();
                hideAlert(id);
              }}
              onClose={() => hideAlert(id)}
            />
          ),
        },
      ];

      setAlerts(newAlerts);
    }
  };

  return {
    show: (type: AlertType, text: string, options: AlertOptions) =>
      showAlert(type, text, options),
  };
};

const ModalAlert = ({
  open,
  text,
  onConfirm,
  onClose,
}: {
  open: boolean;
  text: string;
  onConfirm: () => void;
  onClose: () => void;
}) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-out duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-sm bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="mt-2">
                  <div className="flex flex-col gap-4 items-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 text-yellow-500">
                        <ExclamationTriangleIcon />
                      </div>
                      {text}
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        color="gray"
                        name="Cancel import"
                        onClick={onClose}
                      >
                        Cancel
                      </Button>
                      <Button
                        color="red"
                        name="Confirm import"
                        onClick={onConfirm}
                      >
                        Confirm
                      </Button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
