import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { useEffect, useLayoutEffect, useState } from "react";
import { Colors } from "../constants/styles";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import IconButton from "../components/UI/IconButton";
import { fetchedJournalDetails } from "../util/database";
import LoadingOverlay from "../components/UI/LoadingOverlay";

export default function JournalDetailsScreen({ route, navigation }) {
	const selectedJournal = route.params?.selectedJournal;

	const updatedJournal = route.params?.updatedJournal;

	const journalId = route.params?.journalId;

	const [fetchedJournal, setFetchedJournal] = useState();

	useEffect(() => {
		async function loadJournalData() {
			let journal;
			if (journalId) {
				journal = await fetchedJournalDetails(journalId);
			} else if (updatedJournal) {
				journal = await fetchedJournalDetails(updatedJournal.id);
			}

			if (!journal) return;

			setFetchedJournal(journal);

			navigation.setOptions({
				title: journal.title || "日誌詳情",
				headerRight: ({ tintColor }) => (
					<IconButton
						icon="pencil-outline"
						color={tintColor}
						size={24}
						onPress={editJournalHandler}
					/>
				),
				headerBackTitleVisible: false,
			});
		}

		loadJournalData();
	}, [journalId, updatedJournal, navigation]);

	function editJournalHandler() {
		navigation.navigate("EditJournal", {
			selectedJournalId: journalId || updatedJournal.id,
		});
	}

	function showOnMapHandler() {
		navigation.navigate("Map", {
			initialLat: fetchedJournal.lat,
			initialLng: fetchedJournal.lng,
		});
	}

	//剛從總覽頁來時可以更快顯示title
	useLayoutEffect(() => {
		if (selectedJournal) {
			navigation.setOptions({
				title: selectedJournal?.title,
				headerRight: ({ tintColor }) => (
					<IconButton
						icon="pencil-outline"
						color={tintColor}
						size={24}
						onPress={editJournalHandler}
					/>
				),
				headerBackTitleVisible: false,
			});
		}
	}, [navigation]);

	if (!fetchedJournal) {
		return <LoadingOverlay>獲取日誌資料中...</LoadingOverlay>;
	}

	return (
		<View style={styles.detailsContainer}>
			<ScrollView>
				<View style={styles.imageContainer}>
					<Image style={styles.image} source={{ uri: fetchedJournal.imageUri }} />
				</View>
				<View>
					<View style={styles.container}>
						<Text style={styles.label}>備註：</Text>
						<Text style={styles.text}>{fetchedJournal.note}</Text>
					</View>
					<View style={styles.container}>
						<Text style={styles.label}>評價：</Text>
						<StarRatingDisplay
							rating={fetchedJournal.rating}
							color={Colors.primary}
							starSize={28}
						/>
					</View>
					<View style={styles.container}>
						<Text style={styles.label}>地址：</Text>

						<Text style={styles.text}>{fetchedJournal.address}</Text>
					</View>
					<View style={styles.button}>
						<OutlinedButton icon="eye-outline" onPress={showOnMapHandler}>
							在地圖上查看
						</OutlinedButton>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	detailsContainer: {
		flex: 1,
	},
	imageContainer: {
		alignItems: "center",
		padding: 16,
	},
	image: {
		width: "100%",
		minHeight: 275,
		borderWidth: 2,
		borderColor: Colors.primary,
		borderRadius: 6,
	},
	container: {
		alignItems: "center",
		marginVertical: 12,
	},
	label: {
		marginVertical: 8,
		marginLeft: 16,
		color: Colors.primary,
		fontSize: 16,
	},
	text: {
		color: Colors.text,
		fontSize: 16,
		marginHorizontal: 16,
		textAlign: "center",
	},
	button: {
		alignItems: "center",
		marginTop: 16,
	},
});
