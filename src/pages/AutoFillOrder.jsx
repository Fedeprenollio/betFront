/* eslint-disable react/prop-types */
import { useEffect } from "react";

export const AutoFillOrder = ({ values, setFieldValue }) => {
    useEffect(() => {
      const round = values.round;
      if (!isNaN(round)) {
        setFieldValue("order", parseInt(round));
      } else {
        setFieldValue("order", "");
      }
    }, [values.round, setFieldValue]);
  
    return null;
  };
  