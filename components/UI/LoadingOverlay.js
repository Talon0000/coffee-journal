import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/styles";

export default function LoadingOverlay({ message }) {
	return (
		<View style={styles.rootContainer}>
			<Text style={styles.message}>{message}</Text>
			<ActivityIndicator size="large" />
		</View>
	);
}

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		justifyContent: "center",
		alignContent: "center",
		padding: 32,
	},
	message: {
		textAlign: "center",
		color: Colors.primary,
		fontSize: 16,
		marginBottom: 12,
	},
});
