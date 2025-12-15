export class Journal {
	constructor(title, imageUri, { address, lat, lng }, note, rating, id) {
		(this.title = title),
			(this.imageUri = imageUri),
			(this.address = address),
			(this.lat = lat),
			(this.lng = lng),
			(this.rating = rating),
			(this.note = note),
			(this.id = id);
	}
}
