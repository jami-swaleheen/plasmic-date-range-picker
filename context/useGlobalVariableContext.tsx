"use client";

import React, { useEffect, useMemo, useState } from "react";
import { DataProvider, GlobalActionsProvider } from "@plasmicapp/host";

// Users will be able to set these props in Studio, if needed.
interface GlobalVariablesProps {
  initialFromDate?: Date | null; // Optional initial value for `fromDate`
  initialToDate?: Date | null; // Optional initial value for `toDate`
}

export const GlobalVariablesContext = ({
  children,
  initialFromDate = null,
  initialToDate = null,
}: React.PropsWithChildren<GlobalVariablesProps>) => {
  // State variables for `fromDate` and `toDate`
  const [fromDate, setFromDate] = useState<Date | null>(initialFromDate);
  const [toDate, setToDate] = useState<Date | null>(initialToDate);

  // Memoized actions to avoid re-creation on each render
  const actions = useMemo(
    () => ({
      setFromDate: (date: Date | null) => setFromDate(date),
      setToDate: (date: Date | null) => setToDate(date),
    }),
    []
  );

  // Optional side effects or initializations can be added here, if needed.
  useEffect(() => {
    // Example: log updates to dates
    console.log("fromDate updated:", fromDate);
    console.log("toDate updated:", toDate);
  }, [fromDate, toDate]);

  return (
    <GlobalActionsProvider
      contextName="GlobalVariablesContext"
      actions={actions}
    >
      <DataProvider name="globalVariables" data={{ fromDate, toDate }}>
        {children}
      </DataProvider>
    </GlobalActionsProvider>
  );
};
