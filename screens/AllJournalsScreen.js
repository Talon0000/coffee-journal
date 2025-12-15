import JournalList from "../components/Journal/JournalList";
import { useEffect, useState } from "react";
import { fetchJournals } from "../util/database";
import { useIsFocused } from "@react-navigation/native";
import LoadingOverlay from "../components/UI/LoadingOverlay";

export default function AllJournalsScreen() {
	const [loadedJournals, setLoadedJournals] = useState([]);
	const isFocused = useIsFocused();

	function deleteJournalHandler(id) {
		setLoadedJournals((prevJournals) =>
			prevJournals.filter((journal) => journal.id !== id)
		);
	}

	function deleteJournalUndoHandler(item) {
		setLoadedJournals((prevJournals) => [item, ...prevJournals]);
	}

	useEffect(() => {
		async function loadJournals() {
			const journals = await fetchJournals();
			// console.log(journals);
			setLoadedJournals(journals);
		}

		if (isFocused) {
			loadJournals();
		}
	}, [isFocused]);

	if (!loadedJournals) {
		<LoadingOverlay>載入日誌中...</LoadingOverlay>;
	}

	return (
		<JournalList
			journals={loadedJournals}
			onDeleteJournal={deleteJournalHandler}
			onDeleteJournalUndo={deleteJournalUndoHandler}
		/>
	);
}
