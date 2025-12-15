import JournalForm from "../components/Journal/JournalForm";
import { insertJournal } from "../util/database";

export default function AddJournalScreen({ navigation }) {
	async function createJournalHandler(journal) {
		await insertJournal(journal);
		navigation.navigate("AllJournals");
	}

	return <JournalForm onCreateJournal={createJournalHandler} />;
}
