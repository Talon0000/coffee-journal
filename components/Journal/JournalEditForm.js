import {
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	KeyboardAvoidingView,
	View,
} from "react-native";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import { Colors } from "../../constants/styles";
import { useState } from "react";
import StarRating from "react-native-star-rating-widget";
import Button from "../UI/Button";
import { Journal } from "../../journals";

export default function JournalEditForm({ journal, onEditJournal }) {
	const [enteredTitle, setEnteredTitle] = useState(journal.title);
	const [selectedImage, setSelectedImage] = useState(journal.imageUri);
	const [pickedLocation, setPickedLocation] = useState({
		address: journal.address,
		lat: journal.lat,
		lng: journal.lng,
	});
	const [enteredNote, setEnteredNote] = useState(journal.note);
	const [rating, setRating] = useState(journal.rating);

	function changeTitleHandler(enteredText) {
		setEnteredTitle(enteredText);
	}

	function takeImageHandler(imageUri) {
		setSelectedImage(imageUri);
	}

	function pickLocationHandler(location) {
		setPickedLocation(location);
	}

	function changeNoteHandler(enteredText) {
		setEnteredNote(enteredText);
	}

	function saveJournalHandler() {
		const journalData = new Journal(
			enteredTitle,
			selectedImage,
			pickedLocation,
			enteredNote,
			rating
		);

		onEditJournal({ ...journalData, id: journal.id });
	}

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior="padding"
			keyboardVerticalOffset={100}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<Text style={styles.titleLabel}>店名</Text>
				<TextInput
					autoCorrect={false}
					style={styles.titleInput}
					value={enteredTitle}
					onChangeText={changeTitleHandler}
				/>
				<Text style={styles.titleLabel}>選張照片吧！</Text>
				<ImagePicker
					onTakeImage={takeImageHandler}
					editImageUri={journal.imageUri}
				/>
				<Text style={styles.titleLabel}>選擇位置</Text>
				<LocationPicker
					onPickLocation={pickLocationHandler}
					editLocation={{ lat: journal.lat, lng: journal.lng }}
				/>
				<Text style={styles.label}>備註</Text>
				<TextInput
					style={[styles.titleInput, { height: 100 }]}
					multiline
					onChangeText={changeNoteHandler}
					value={enteredNote}
					numberOfLines={11}
				/>
				<View style={{ alignItems: "center" }}>
					<Text style={styles.label}>為這家咖啡廳打個分數吧！</Text>
					<StarRating
						style={{ marginVertical: 8 }}
						rating={rating}
						onChange={setRating}
						color={Colors.primary}
						starSize={30}
						enableHalfStar={true}
					/>
				</View>
				<View style={styles.button}>
					<Button onPress={saveJournalHandler}>編輯日誌</Button>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		marginBottom: 50,
	},
	titleLabel: {
		color: Colors.primary,
		fontSize: 20,
	},
	titleInput: {
		marginTop: 8,
		marginBottom: 16,
		paddingHorizontal: 4,
		paddingVertical: 8,
		fontSize: 16,
		borderColor: Colors.accent,
		borderWidth: 2,
		borderRadius: 4,
	},
	label: {
		color: Colors.primary,
		fontSize: 20,
		marginTop: 10,
	},
	button: {
		marginVertical: 12,
	},
});
