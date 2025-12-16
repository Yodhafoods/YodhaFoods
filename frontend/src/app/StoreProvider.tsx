"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { makeStore } from "../lib/store/store";

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const storeRef = useRef<ReturnType<typeof makeStore> | null>(null);

    if (!storeRef.current) {
        // Create store + persistor once
        storeRef.current = makeStore();
    }

    const { store, persistor } = storeRef.current;

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}
