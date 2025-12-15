import { Pressable, Text, View, StyleSheet } from "react-native";

export default function FlatButton({ onPress, children }) {
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
		elevation: 2,
		shadowColor: "black",
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.25,
		shadowRadius: 2,
	},
	pressed: {
		opacity: 0.35,
	},
	buttonText: {
		color: "#dbc8c8",
		textAlign: "center",
		fontSize: 18,
	},
});
