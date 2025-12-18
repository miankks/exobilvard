import { useMemo } from "react";

export const useObjectEnabled = (obj) => {
  const isEmpty = useMemo(() => {
    return obj && typeof obj === "object"
      ? Object.keys(obj).length === 0
      : true;
  }, [obj]);

  return {
    isEmpty,
    isEnabled: !isEmpty,
  };
};
