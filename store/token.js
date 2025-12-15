import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const tokenSlice = createSlice({
	name: "token",
	initialState: { token: "", isAuthenticated: false },
	reducers: {
		authenticate(state, action) {
			state.token = action.payload;
			state.isAuthenticated = true;
			AsyncStorage.setItem("token", action.payload);
		},
		logout(state) {
			state.token = null;
			state.isAuthenticated = false;
			AsyncStorage.removeItem("token");
		},
	},
});

export const authenticate = tokenSlice.actions.authenticate;
export const logout = tokenSlice.actions.logout;
export default tokenSlice.reducer;
