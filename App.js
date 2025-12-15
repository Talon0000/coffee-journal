import { StatusBar } from "expo-status-bar";
import LoginScreen from "./screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "./constants/styles";
import SignupScreen from "./screens/SignupScreen";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store/store";
import AllJournalsScreen from "./screens/AllJournalsScreen";
import IconButton from "./components/UI/IconButton";
import { logout } from "./store/token";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authenticate } from "./store/token";
import LoadingOverlay from "./components/UI/LoadingOverlay";
import { Alert } from "react-native";
import AddJournalScreen from "./screens/AddJournalScreen";
import MapScreen from "./screens/MapScreen";
import { init } from "./util/database";
import JournalDetailsScreen from "./screens/JournalDetailsScreen";
import EditJournalScreen from "./screens/EditJournalScreen";

const Stack = createNativeStackNavigator();

function AuthStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: Colors.primary },
				contentStyle: { backgroundColor: Colors.bg },
				headerTintColor: "white",
				headerTitleStyle: {
					fontSize: 20,
				},
			}}>
			<Stack.Screen
				name="Login"
				component={LoginScreen}
				options={{
					title: "登入用戶",
				}}
			/>
			<Stack.Screen
				name="Signup"
				component={SignupScreen}
				options={{
					title: "註冊用戶",
				}}
			/>
		</Stack.Navigator>
	);
}

function AuthenticatedStack() {
	const dispatch = useDispatch();

	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: Colors.primary },
				contentStyle: { backgroundColor: Colors.bg },
				headerTintColor: "white",
				headerTitleStyle: {
					fontSize: 20,
				},
			}}>
			<Stack.Screen
				name="AllJournals"
				component={AllJournalsScreen}
				options={({ navigation }) => ({
					title: "咖啡日誌",
					headerTitleAlign: "center",
					headerLeft: ({ tintColor }) => (
						<IconButton
							icon="exit"
							color={tintColor}
							size={24}
							onPress={() => {
								Alert.alert("您即將登出", "確定是否要登出？", [
									{ text: "取消", style: "destructive" },
									{ text: "確定", onPress: () => dispatch(logout()) },
								]);
							}}
						/>
					),
					headerRight: ({ tintColor }) => (
						<IconButton
							icon="add"
							color={tintColor}
							size={24}
							onPress={() => navigation.navigate("AddJournal")}
						/>
					),
				})}
			/>
			<Stack.Screen
				name="AddJournal"
				component={AddJournalScreen}
				options={{
					title: "新增日誌",
				}}
			/>
			<Stack.Screen
				name="Map"
				component={MapScreen}
				options={{
					title: "選取位置",
					headerBackTitleVisible: false,
				}}
			/>
			<Stack.Screen name="JournalDetails" component={JournalDetailsScreen} />
			<Stack.Screen
				name="EditJournal"
				component={EditJournalScreen}
				options={{
					title: "編輯日誌",
					headerBackTitleVisible: false,
				}}
			/>
		</Stack.Navigator>
	);
}

function Navigation() {
	const authenticateToken = useSelector((state) => state.authenticateToken.token);

	return (
		<NavigationContainer>
			{!authenticateToken && <AuthStack />}
			{authenticateToken && <AuthenticatedStack />}
		</NavigationContainer>
	);
}

function Root() {
	const [isTryingLogin, setIsTryingLogin] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		async function fetchToken() {
			const token = await AsyncStorage.getItem("token");
			if (token) {
				dispatch(authenticate(token));
			} else {
				dispatch(logout());
			}

			setIsTryingLogin(false);
		}

		fetchToken();
	}, []);

	if (isTryingLogin) {
		return <LoadingOverlay message="讀取資料中..." />;
	}

	return <Navigation />;
}

export default function App() {
	const [dbInitialized, setDbInitialized] = useState(false);

	useEffect(() => {
		async function initializedDb() {
			try {
				await init();
				setDbInitialized(true);
			} catch (error) {
				console.log(error);
			}
		}
		initializedDb();
	}, []);

	if (!dbInitialized) {
		return <LoadingOverlay>初始中...</LoadingOverlay>;
	}

	return (
		<>
			<StatusBar style="light" />
			<Provider store={store}>
				<Root />
			</Provider>
		</>
	);
}
