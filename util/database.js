import * as SQLite from "expo-sqlite";
import { Journal } from "../journals";

const database = SQLite.openDatabaseSync("journals.db");

export async function init() {
	return await database.runAsync(`
        CREATE TABLE IF NOT EXISTS journals (
         id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL,
        note TEXT NOT NULL,
        rating REAL NOT NULL
        )
        `);
}

export async function insertJournal(journal) {
	try {
		await database.runAsync(
			`
        INSERT INTO journals (title, imageUri, address, lat, lng, note, rating)
        VALUES(?,?,?,?,?,?,?)
        `,
			[
				journal.title,
				journal.imageUri,
				journal.address,
				journal.lat,
				journal.lng,
				journal.note,
				journal.rating,
			]
		);
	} catch (error) {
		console.error("Insert failed:", error);
	}
}

export async function fetchJournals() {
	try {
		const result = await database.getAllAsync(`SELECT * FROM journals`);

		const journals = [];

		for (let dp of result) {
			journals.push(
				new Journal(
					dp.title,
					dp.imageUri,
					{ address: dp.address, lat: dp.lat, lng: dp.lng },
					dp.note,
					dp.rating,
					dp.id
				)
			);
		}

		return journals;
	} catch (error) {
		console.error("Fetch journals failed:", error);
	}
}

export async function fetchedJournalDetails(id) {
	try {
		const dbJournal = await database.getFirstAsync(
			`
            SELECT * FROM journals WHERE id = ?
            `,
			[id]
		);

		const journal = new Journal(
			dbJournal.title,
			dbJournal.imageUri,
			{ address: dbJournal.address, lat: dbJournal.lat, lng: dbJournal.lng },
			dbJournal.note,
			dbJournal.rating,
			dbJournal.id
		);
		return journal;
	} catch (error) {
		console.error("Fetch journal details failed:", error);
	}
}

export async function deleteJournal(id) {
	try {
		await database.runAsync(
			`
            DELETE FROM journals WHERE id = ?
            `,
			[id]
		);
	} catch (error) {
		console.error("Delete failed:", error);
	}
}

export async function updateJournal(journal) {
	try {
		const result = await database.runAsync(
			`
            UPDATE journals
            SET title = ?, imageUri = ?, address = ?, lat = ?, lng = ?, note = ?, rating = ?
            WHERE id = ?
            `,
			[
				journal.title,
				journal.imageUri,
				journal.address,
				journal.lat,
				journal.lng,
				journal.note,
				journal.rating,
				journal.id,
			]
		);

		// 2️⃣ 如果有更新成功
		if (result.changes > 0) {
			// 再查詢一次拿最新的資料
			const updatedJournal = await database.getFirstAsync(
				`SELECT * FROM journals WHERE id = ?`,
				[journal.id]
			);

			console.log(updatedJournal);
			return updatedJournal; // ✅ 回傳最新的 journal 物件
		} else {
			console.warn("⚠️ 沒有找到要更新的日誌！");
			return null;
		}
	} catch (error) {
		console.error("Update journal failed:", error);
	}
}
