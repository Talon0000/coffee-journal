import { Pressable, Text, View, StyleSheet } from "react-native";
import { Colors } from "../../constants/styles";

export default function Button({ onPress, children }) {
	return (
		<View style={styles.button}>
			<Pressable
				style={({ pressed }) => pressed && styles.pressed}
				onPress={onPress}>
				<Text style={styles.buttonText}>{children}</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 6,
		backgroundColor: Colors.accent,
		elevation: 2,
		shadowColor: "black",
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.25,
		shadowRadius: 2,
	},
	pressed: {
		opacity: 0.7,
	},
	buttonText: {
		textAlign: "center",
		color: "white",
		fontSize: 18,
	},
});
