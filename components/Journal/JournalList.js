import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import JournalItem from "./JournalItem";
import { Colors } from "../../constants/styles";
import { SwipeListView } from "react-native-swipe-list-view";
import IconButton from "../UI/IconButton";
import { deleteJournal } from "../../util/database";

export default function JournalList({
	journals,
	onDeleteJournal,
	onDeleteJournalUndo,
}) {
	if (!journals || journals.length === 0) {
		return (
			<View style={styles.fallbackContainer}>
				<Text style={styles.fallbackText}>開始新增日誌吧！</Text>
			</View>
		);
	}

	async function deleteJournalHandler(item) {
		Alert.alert("刪除日誌", `確定要刪除「${item.title}」嗎？`, [
			{ text: "取消", style: "cancel" },
			{
				text: "刪除",
				style: "destructive",
				onPress: async () => {
					onDeleteJournal(item.id);
					try {
						await deleteJournal(item.id);
					} catch (error) {
						console.log("Delete failed:", error);
						onDeleteJournalUndo(item);
					}
				},
			},
		]);
	}

	return (
		<SwipeListView
			style={styles.list}
			data={journals}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => <JournalItem journal={item} />}
			renderHiddenItem={({ item }) => (
				<View style={styles.hiddenContainer}>
					<View style={styles.trashBin}>
						<IconButton
							icon="trash-bin-outline"
							size={26}
							onPress={async () => await deleteJournalHandler(item)}
						/>
					</View>
				</View>
			)}
			rightOpenValue={-75}
			disableRightSwipe={true}
		/>
	);
}

const styles = StyleSheet.create({
	list: {
		margin: 24,
	},
	fallbackContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	fallbackText: {
		fontSize: 16,
		color: Colors.text,
	},
	hiddenContainer: {
		alignItems: "flex-end",
		justifyContent: "center",
		backgroundColor: Colors.delete,
		borderRadius: 6,
		marginVertical: 12,
	},
	trashBin: {
		width: 75,
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
	},
});
