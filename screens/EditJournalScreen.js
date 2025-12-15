import { useEffect, useState } from "react";
import JournalEditForm from "../components/Journal/JournalEditForm";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { fetchedJournalDetails, updateJournal } from "../util/database";

export default function EditJournalScreen({ route, navigation }) {
	const [selectedEditJournal, setSelectedJournal] = useState();

	useEffect(() => {
		async function getJournal() {
			const id = route.params?.selectedJournalId;
			const journal = await fetchedJournalDetails(id);
			setSelectedJournal(journal);
		}
		getJournal();
	}, []);

	async function updateJournalHandler(journal) {
		const updatedJournal = await updateJournal(journal);
		navigation.navigate("JournalDetails", { updatedJournal });
	}

	if (!selectedEditJournal) {
		return <LoadingOverlay>載入日誌中...</LoadingOverlay>;
	}

	return (
		<JournalEditForm
			journal={selectedEditJournal}
			onEditJournal={updateJournalHandler}
		/>
	);
}
