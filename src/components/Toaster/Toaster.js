import { toast } from "react-hot-toast";

export default function Toaster(variant, message) {
  if (variant === "error") {
    toast.error(message, { id: "error" });
  } else {
    toast.success(message, { id: "success" });
  }
}
