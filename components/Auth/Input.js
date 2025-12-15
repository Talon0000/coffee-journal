import { Text, TextInput, View, StyleSheet } from "react-native";
import { Colors } from "../../constants/styles";

export default function Input({
	label,
	keyboardType,
	onUpdateValue,
	secure,
	value,
	isInvalid,
}) {
	return (
		<View style={styles.inputContainer}>
			<Text style={[styles.label, isInvalid && styles.invalidLabel]}>{label}</Text>
			<TextInput
				style={[styles.input, isInvalid && styles.invalidInput]}
				keyboardType={keyboardType}
				autoCapitalize="none"
				autoCorrect={false}
				secureTextEntry={secure}
				onChangeText={onUpdateValue}
				value={value}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	inputContainer: {
		marginVertical: 8,
	},
	label: {
		color: "white",
		fontSize: 18,
		marginBottom: 8,
	},
	invalidLabel: {
		color: Colors.error500,
	},
	input: {
		paddingVertical: 10,
		paddingHorizontal: 8,
		borderRadius: 4,
		backgroundColor: Colors.secondary,
		fontSize: 16,
	},
	invalidInput: {
		borderWidth: 2,
		borderColor: Colors.error500,
		backgroundColor: Colors.error100,
	},
});
