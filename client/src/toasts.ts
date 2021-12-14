import { toast } from 'react-hot-toast';

export const notifyCopyLink = (link: string, icon: JSX.Element) => {
  toast("Link copied to clipboard.", {
    duration: 2000,
    position: "top-center",
    className: "text-white bg-gray-800 text-sm max-w-fit",
    icon: icon,
    ariaProps: {
      role: "status",
      "aria-live": "polite",
    },
  });
  navigator.clipboard.writeText(link);
};
export const notifyDelete = (icon: JSX.Element) => {
  toast("Record deleted successfully.", {
    duration: 2000,
    position: "bottom-center",
    className: "text-white bg-gray-800 text-sm max-w-fit",
    icon: icon,
    ariaProps: {
      role: "status",
      "aria-live": "polite",
    },
  });
};

export const notifyRecordLocked = (content: JSX.Element) => {
  if (localStorage.getItem("toastHasBeenShown") === "yes") return;
  toast(content, {
    duration: Infinity,
    position: "bottom-center",
    className: "text-white bg-gray-800 text-sm max-w-fit",
    icon: "☝️",
    ariaProps: {
      role: "status",
      "aria-live": "polite",
    },
  });
  localStorage.setItem("toastHasBeenShown", "yes");
};
