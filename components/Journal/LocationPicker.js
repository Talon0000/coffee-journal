import {
	getCurrentPositionAsync,
	useForegroundPermissions,
	PermissionStatus,
} from "expo-location";
import { Alert, Image, Text, View } from "react-native";
import { getAddress, getMapPreview } from "../../util/location";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Colors } from "../../constants/styles";
import OutlinedButton from "../UI/OutlinedButton";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";

export default function LocationPicker({ onPickLocation, editLocation }) {
	const [pickedLocation, setPickedLocation] = useState(editLocation);
	const [locationPermissionInformation, requestPermission] =
		useForegroundPermissions();
	//console.log(pickedLocation);
	const isFocused = useIsFocused();
	const navigation = useNavigation();
	const route = useRoute();

	async function verifyPermissions() {
		if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
			const permissionResponse = await requestPermission();
			return permissionResponse.granted;
		}
		if (locationPermissionInformation.status === PermissionStatus.DENIED) {
			Alert.alert("權限不足", "需要開啟定位權限來執行應用程式");
			return false;
		}

		return true;
	}

	async function getLocationHandler() {
		const hasPermission = await verifyPermissions();

		if (!hasPermission) {
			return;
		}

		const location = await getCurrentPositionAsync();
		// console.log(location);
		setPickedLocation({
			lat: location.coords.latitude,
			lng: location.coords.longitude,
		});
	}

	useEffect(() => {
		if (isFocused && route.params?.pickedLat && route.params?.pickedLng) {
			//console.log(route.params);
			setPickedLocation({
				lat: route.params.pickedLat,
				lng: route.params.pickedLng,
			});
		}
	}, [isFocused, route]);

	useEffect(() => {
		async function handleLocation() {
			if (pickedLocation) {
				const address = await getAddress(pickedLocation.lat, pickedLocation.lng);

				onPickLocation({
					address,
					lat: pickedLocation.lat,
					lng: pickedLocation.lng,
				});
			}
		}
		handleLocation();
	}, [pickedLocation, onPickLocation]);

	function moveToMapHandler() {
		// console.log(editLocation);
		if (editLocation) {
			navigation.navigate("Map", {
				editLat: editLocation.lat,
				editLng: editLocation.lng,
			});
		} else {
			navigation.navigate("Map");
		}
	}

	let locationPreview = <Text style={styles.text}>沒有選取位置</Text>;
	if (pickedLocation) {
		locationPreview = (
			<Image
				style={styles.image}
				source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }}
			/>
		);
	}

	return (
		<View>
			<View style={styles.mapPreview}>{locationPreview}</View>
			<View style={styles.actions}>
				<View style={styles.action}>
					<OutlinedButton icon="location" onPress={getLocationHandler}>
						現在位置
					</OutlinedButton>
				</View>
				<View style={styles.action}>
					<OutlinedButton icon="map" onPress={moveToMapHandler}>
						選取位置
					</OutlinedButton>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	mapPreview: {
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
	actions: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 8,
		marginBottom: 16,
		marginHorizontal: 14,
	},
	action: {
		flex: 1,
	},
	text: {
		color: Colors.text,
	},
});
