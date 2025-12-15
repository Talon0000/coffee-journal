import { View, Image, StyleSheet, Alert, Text } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/styles";
import {
	launchCameraAsync,
	launchImageLibraryAsync,
	useCameraPermissions,
	PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";

export default function ImagePicker({ onTakeImage, editImageUri }) {
	const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
	const [pickedImage, setPickedImage] = useState(editImageUri);

	async function verifyPermissions() {
		if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
			const permissionResponse = await requestPermission();
			return permissionResponse.granted;
		}

		if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
			Alert.alert("權限不足", "需要開啟相機權限來執行應用程式");
			return false;
		}

		return true;
	}

	async function takeImageHandler() {
		const hasPermission = await verifyPermissions();
		if (!hasPermission) {
			return;
		}

		const image = await launchCameraAsync({
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		setPickedImage(image.assets[0].uri);
		onTakeImage(image.assets[0].uri);
	}

	async function selectImageHandler() {
		const hasPermission = await verifyPermissions();
		if (!hasPermission) {
			return;
		}

		const image = await launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		setPickedImage(image.assets[0].uri);
		onTakeImage(image.assets[0].uri);
	}

	let imagePreview = <Text style={styles.text}>沒有選取照片</Text>;
	if (pickedImage) {
		imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
	}

	return (
		<View>
			<View style={styles.imagePreview}>{imagePreview}</View>
			<View style={styles.imageSources}>
				<View style={styles.imageSource}>
					<OutlinedButton icon="camera" onPress={takeImageHandler}>
						拍張照片吧
					</OutlinedButton>
				</View>
				<View style={styles.imageSource}>
					<OutlinedButton icon="images" onPress={selectImageHandler}>
						從相簿中選擇相片
					</OutlinedButton>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	imagePreview: {
		width: "100%",
		height: 275,
		marginVertical: 8,
		justifyContent: "center",
		alignItems: "center",
		borderColor: Colors.accent,
		borderWidth: 2,
		borderRadius: 4,
		overflow: "hidden",
	},
	image: {
		width: "100%",
		height: "100%",
	},
	imageSources: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 8,
		marginBottom: 16,
		marginHorizontal: 14,
	},
	imageSource: {
		flex: 1,
	},
	text: {
		color: Colors.text,
	},
});
