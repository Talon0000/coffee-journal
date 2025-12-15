import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Alert } from "react-native";
import {
	useForegroundPermissions,
	PermissionStatus,
	getCurrentPositionAsync,
} from "expo-location";
import { useState, useEffect, useLayoutEffect, useCallback } from "react";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import IconButton from "../components/UI/IconButton";

export default function MapScreen({ navigation, route }) {
	//確認是否從Details Page進來的
	const initialLocation =
		route.params?.initialLat != null && route.params?.initialLng != null
			? {
					lat: route.params.initialLat,
					lng: route.params.initialLng,
			  }
			: null;

	//確認是否從Edit Page進來的
	const editLocation =
		route.params?.editLat !== null && route.params?.editLng !== null
			? {
					lat: route.params.editLat,
					lng: route.params.editLng,
			  }
			: null;

	const [selectedLocation, setSelectedLocation] = useState(
		initialLocation || editLocation || null
	);

	const [locationPermissionInformation, requestPermission] =
		useForegroundPermissions();

	//沒初始值或編輯值就用獲得目前位置來顯示
	useEffect(() => {
		async function getInitialPosition() {
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

			const hasPermission = await verifyPermissions();

			if (!hasPermission) {
				return;
			}

			const location = await getCurrentPositionAsync();

			setSelectedLocation({
				lat: location.coords.latitude,
				lng: location.coords.longitude,
			});
		}

		if (!initialLocation && !editLocation) {
			getInitialPosition();
		}
	}, [locationPermissionInformation, initialLocation, editLocation]);

	const region = {
		latitude: initialLocation?.lat ?? editLocation?.lat ?? selectedLocation?.lat,
		longitude: initialLocation?.lng ?? editLocation?.lng ?? selectedLocation?.lng,
		latitudeDelta: 0.001,
		longitudeDelta: 0.001,
	};

	const savePickedLocationHandler = useCallback(() => {
		// console.log(editLocation);
		if (editLocation) {
			navigation.navigate("EditJournal", {
				pickedLat: selectedLocation?.lat,
				pickedLng: selectedLocation?.lng,
			});
			return;
		} else {
			navigation.navigate("AddJournal", {
				pickedLat: selectedLocation?.lat,
				pickedLng: selectedLocation?.lng,
			});
		}
	}, [navigation, selectedLocation, editLocation]);

	useLayoutEffect(() => {
		if (initialLocation) {
			return;
		}

		navigation.setOptions({
			headerRight: ({ tintColor }) => (
				<IconButton
					icon="save"
					size={24}
					color={tintColor}
					onPress={savePickedLocationHandler}
				/>
			),
		});
	}, [navigation, savePickedLocationHandler, initialLocation]);

	function selectLocationHandler(event) {
		if (initialLocation) {
			return;
		}

		setSelectedLocation({
			lat: event.nativeEvent.coordinate.latitude,
			lng: event.nativeEvent.coordinate.longitude,
		});
	}

	if (!selectedLocation) {
		return <LoadingOverlay>獲取定位中...</LoadingOverlay>;
	}

	return (
		<MapView style={styles.map} region={region} onPress={selectLocationHandler}>
			{selectedLocation && (
				<Marker
					coordinate={{
						latitude: initialLocation ? initialLocation?.lat : selectedLocation.lat,
						longitude: initialLocation ? initialLocation?.lng : selectedLocation.lng,
					}}
				/>
			)}
		</MapView>
	);
}

const styles = StyleSheet.create({
	map: {
		width: "100%",
		height: "100%",
	},
});
