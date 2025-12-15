import {
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	KeyboardAvoidingView,
	View,
	Alert,
} from "react-native";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import { Colors } from "../../constants/styles";
import { useState } from "react";
import StarRating from "react-native-star-rating-widget";
import Button from "../UI/Button";
import { Journal } from "../../journals";

export default function JournalForm({ onCreateJournal }) {
	const [enteredTitle, setEnteredTitle] = useState();
	const [selectedImage, setSelectedImage] = useState();
	const [pickedLocation, setPickedLocation] = useState();
	const [enteredNote, setEnteredNote] = useState();
	const [rating, setRating] = useState(0);

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
		if (
			!enteredTitle ||
			!selectedImage ||
			!pickedLocation ||
			!enteredNote ||
			!rating
		) {
			Alert.alert("新增錯誤", "請確認欄位都填寫完成再新增日誌");
			return;
		}

		const journalData = new Journal(
			enteredTitle,
			selectedImage,
			pickedLocation,
			enteredNote,
			rating
		);

		onCreateJournal(journalData);
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
				<ImagePicker onTakeImage={takeImageHandler} />
				<Text style={styles.titleLabel}>選擇位置</Text>
				<LocationPicker onPickLocation={pickLocationHandler} />
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
					<Button onPress={saveJournalHandler}>新增日誌</Button>
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
