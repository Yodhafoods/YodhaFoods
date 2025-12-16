import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import checkoutReducer from "./features/checkout/checkoutSlice";

import {
    persistReducer,
    persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";


const rootReducer = combineReducers({
    cart: cartReducer,
    checkout: checkoutReducer,
});


const persistConfig = {
    key: "yodhafoods",
    storage,
    whitelist: ["cart", "checkout"],
};


const persistedReducer = persistReducer(
    persistConfig,
    rootReducer
);


export const makeStore = () => {
    const store = configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),
    });

    const persistor = persistStore(store);

    return { store, persistor };
};


export type AppStore = ReturnType<typeof makeStore>["store"];
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
