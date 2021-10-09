import { useToast } from "@chakra-ui/react";

export type NotificationProps = {
  title: string;
  description: string;
  status: "info" | "warning" | "success" | "error";
};

export const useNotification = () => {
  const toast = useToast();
  const notify = ({ title, description, status }: NotificationProps) =>
    toast({
      title,
      description,
      status,
      position: "top",
      duration: 9000,
      isClosable: true,
    });

  return {
    notify,
  };
};
