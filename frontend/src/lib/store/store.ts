import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "@/features/cart/store/cartSlice";
import checkoutReducer from "@/features/checkout/store/checkoutSlice";
import wishlistReducer from "@/features/wishlist/store/wishlistSlice";
import uiReducer from "@/features/ui/store/uiSlice";

import {
    persistReducer,
    persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";


const rootReducer = combineReducers({
    cart: cartReducer,
    checkout: checkoutReducer,
    wishlist: wishlistReducer,
    ui: uiReducer,
});


const persistConfig = {
    key: "yodhafoods",
    storage,
    whitelist: ["cart", "checkout", "wishlist", "ui"],
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
