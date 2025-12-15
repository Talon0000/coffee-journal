import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { Alert, StyleSheet, View } from "react-native";
import { login } from "../util/auth";
import { useDispatch } from "react-redux";
import { authenticate } from "../store/token";
import LoadingOverlay from "../components/UI/LoadingOverlay";

export default function LoginScreen() {
	const [isAuthenticating, setIsAuthenticating] = useState(false);
	const dispatch = useDispatch();

	async function loginHandler(email, password) {
		setIsAuthenticating(true);
		try {
			const token = await login(email, password);
			dispatch(authenticate(token));
		} catch (error) {
			Alert.alert("登入失敗", "請確認Email,密碼無誤後再輸入");
			setIsAuthenticating(false);
		}
	}

	if (isAuthenticating) {
		return <LoadingOverlay message="登入中..." />;
	}

	return (
		<View style={styles.container}>
			<AuthContent isLogin={true} onAuthenticate={loginHandler} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
	},
});
