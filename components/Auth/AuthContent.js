import { useState } from "react";
import AuthForm from "./AuthForm";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function AuthContent({ isLogin, onAuthenticate }) {
	const navigation = useNavigation();

	const [credentialsInvalid, setCredentialsInvalid] = useState({
		email: false,
		confirmEmail: false,
		password: false,
		confirmPassword: false,
	});

	function submitHandler(credentials) {
		let { email, confirmEmail, password, confirmPassword } = credentials;

		email = email.trim();
		password = password.trim();

		const emailIsValid = email.includes("@");
		const passwordIsValid = password.length > 6;
		const emailsAreEqual = email === confirmEmail;
		const passwordsAreEqual = password === confirmPassword;

		if (
			!emailIsValid ||
			!passwordIsValid ||
			(!isLogin && (!emailsAreEqual || !passwordsAreEqual))
		) {
			// Alert.alert("輸入錯誤", "請再次確認後再輸入");

			if (!isLogin) {
				Alert.alert(
					"註冊失敗",
					"請確認Email是否正確或是否已被註冊，密碼長度至少7個字以上"
				);
				setCredentialsInvalid({
					email: !emailIsValid,
					confirmEmail: !emailIsValid || !emailsAreEqual,
					password: !passwordIsValid,
					confirmPassword: !passwordIsValid || !passwordsAreEqual,
				});
				return;
			}
			Alert.alert("登入失敗", "請確認Email、密碼無誤後再輸入");

			return;
		}
		onAuthenticate(email, password);
	}

	function switchModeHandler() {
		if (isLogin) {
			navigation.replace("Signup");
		} else {
			navigation.replace("Login");
		}
	}

	return (
		<AuthForm
			isLogin={isLogin}
			onSubmit={submitHandler}
			onSwitch={switchModeHandler}
			credentialsInvalid={credentialsInvalid}
		/>
	);
}
