import { View, StyleSheet, Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import { useState } from "react";
import { signUp } from "../util/auth";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../store/token";
import LoadingOverlay from "../components/UI/LoadingOverlay";

export default function SignupScreen() {
	const [isAuthenticating, setIsAuthenticating] = useState(false);
	const dispatch = useDispatch();
	const authenticateToken = useSelector((state) => state.authenticateToken.token);

	async function signUpHandler(email, password) {
		setIsAuthenticating(true);
		try {
			const token = await signUp(email, password);
			// console.log(token);
			dispatch(authenticate(token));
		} catch (error) {
			Alert.alert(
				"註冊失敗",
				"請確認Email是否正確或是否已註冊,密碼長度至少7個字以上"
			);
			setIsAuthenticating(false);
		}
	}

	if (isAuthenticating) {
		<LoadingOverlay message="註冊中..." />;
	}

	return (
		<View style={styles.container}>
			<AuthContent onAuthenticate={signUpHandler} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
	},
});
