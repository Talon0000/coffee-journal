import { StyleSheet, View } from "react-native";
import { useState } from "react";
import Input from "./Input";
import { Colors } from "../../constants/styles";
import Button from "../UI/Button";
import FlatButton from "../UI/FlatButton";

export default function AuthForm({
	isLogin,
	onSubmit,
	onSwitch,
	credentialsInvalid,
}) {
	const [enteredEmail, setEnteredEmail] = useState("");
	const [enteredConfirmEmail, setEnteredConfirmEmail] = useState("");
	const [enteredPassword, setEnteredPassword] = useState("");
	const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

	function updateInputValueHandler(inputType, enteredValue) {
		switch (inputType) {
			case "email":
				setEnteredEmail(enteredValue);
				break;
			case "confirmEmail":
				setEnteredConfirmEmail(enteredValue);
				break;
			case "password":
				setEnteredPassword(enteredValue);
				break;
			case "confirmPassword":
				setEnteredConfirmPassword(enteredValue);
				break;
		}
	}

	function submitHandler() {
		onSubmit({
			email: enteredEmail,
			confirmEmail: enteredConfirmEmail,
			password: enteredPassword,
			confirmPassword: enteredConfirmPassword,
		});
	}

	return (
		<View style={styles.form}>
			<Input
				label="Email"
				keyboardType="email-address"
				onUpdateValue={updateInputValueHandler.bind(this, "email")}
				isInvalid={credentialsInvalid.email}
				value={enteredEmail}
			/>
			{!isLogin && (
				<Input
					label="確認Email"
					keyboardType="email-address"
					onUpdateValue={updateInputValueHandler.bind(this, "confirmEmail")}
					isInvalid={credentialsInvalid.confirmEmail}
					value={enteredConfirmEmail}
				/>
			)}
			<Input
				label={`密碼${!isLogin ? "(長度至少7個字元以上)" : ""}`}
				keyboardType="password"
				onUpdateValue={updateInputValueHandler.bind(this, "password")}
				isInvalid={credentialsInvalid.password}
				secure={true}
				value={enteredPassword}
			/>
			{!isLogin && (
				<Input
					label="確認密碼"
					keyboardType="password"
					onUpdateValue={updateInputValueHandler.bind(this, "confirmPassword")}
					isInvalid={credentialsInvalid.confirmPassword}
					secure={true}
					value={enteredConfirmPassword}
				/>
			)}
			<View style={styles.button}>
				<Button onPress={submitHandler}>{isLogin ? "登入" : "註冊"}</Button>
			</View>
			<View style={styles.button}>
				<FlatButton onPress={onSwitch}>
					{isLogin ? "註冊新用戶" : "登入用戶"}
				</FlatButton>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	form: {
		padding: 18,
		marginTop: 70,
		marginHorizontal: 16,
		borderRadius: 8,
		backgroundColor: Colors.primary,
		elevation: 2,
		shadowColor: "black",
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.35,
		shadowRadius: 4,
	},
	button: {
		marginTop: 12,
	},
});
