import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./token";

const store = configureStore({
	reducer: {
		authenticateToken: tokenReducer,
	},
});

export default store;
