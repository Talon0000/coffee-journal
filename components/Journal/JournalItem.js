import { Image, Pressable, Text, View, StyleSheet } from "react-native";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { Colors } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";

export default function JournalItem({ journal }) {
	const navigation = useNavigation();

	function selectJournalHandler(journal) {
		navigation.navigate("JournalDetails", {
			selectedJournal: journal,
			journalId: journal.id,
		});
	}

	return (
		<View style={styles.itemContainer}>
			<Pressable
				onPress={() => selectJournalHandler(journal)}
				style={({ pressed }) => [styles.item, pressed && styles.pressed]}>
				<Image style={styles.image} source={{ uri: journal.imageUri }} />
				<View style={styles.info}>
					<Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
						{journal.title}
					</Text>
					<Text style={styles.address}>{journal.address}</Text>
					<StarRatingDisplay
						rating={journal.rating}
						color={Colors.secondary}
						starSize={24}
					/>
				</View>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	item: {
		flexDirection: "row",
		borderRadius: 6,
		// marginVertical: 12,
		backgroundColor: Colors.accent,
		elevation: 2,
		shadowColor: "black",
		shadowOpacity: 0.15,
		shadowOffset: { width: 1, height: 1 },
		shadowRadius: 2,
	},
	pressed: {
		opacity: 0.9,
	},
	image: {
		flex: 1,
		borderBottomLeftRadius: 4,
		borderTopLeftRadius: 4,
		minHeight: 100,
	},
	info: {
		flex: 2,
		padding: 14,
	},
	title: {
		fontWeight: "bold",
		fontSize: 16,
		color: Colors.text,
		marginBottom: 4,
	},
	address: {
		fontSize: 12,
		color: Colors.text,
		marginBottom: 4,
	},
	itemContainer: {
		backgroundColor: Colors.secondary,
		borderRadius: 6,
		overflow: "hidden",
		marginVertical: 12,
	},
});
