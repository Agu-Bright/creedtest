class ApiFeatures {
	constructor(query, queryString) {
		this.query = query;
		this.queryString = queryString;
	}
	searchWorker() {
		const search = this.queryString.search
			? {
					//search the users by name
					occupation: {
						$regex: this.queryString.search,
						$options: "i",
					},
			  }
			: {};
		this.query = this.query.find({ ...search });
		console.log({ ...search });
		return this;
	}
	searchTitle() {
		const search = this.queryString.search
			? {
					//search the users by name
					title: {
						$regex: this.queryString.search,
						$options: "i",
					},
			  }
			: {};
		this.query = this.query.find({ ...search });
		console.log({ ...search });
		return this;
	}
	filter() {
		const queryObj = { ...this.queryString };
		const excludedFields = ["page", "sort", "fields", "limit", "search"];
		excludedFields.forEach((el) => delete queryObj[el]);
		let queryString = JSON.stringify(queryObj);
		queryString = queryString.replace(
			/(gte|gt|lte|lt)\b/g,
			(match) => `$${match}`
		);
		this.query.find(JSON.parse(queryString));
		return this;
	}
	sort() {
		if (this.queryString.sort) {
			const sortBy = this.queryString.sort.split(",").join(" ");
			this.query = this.query.sort(sortBy);
		} else {
			this.query = this.query.sort("-createdAt");
		}
		return this;
	}
	limitFields() {
		if (this.queryString.fields) {
			const fields = this.queryString.fields.split(",").join(" ");
			this.query = this.query.select(fields);
		} else {
			this.query = this.query.select("-__v");
		}
		return this;
	}
	paginate() {
		const page = this.queryString.page * 1 || 1;
		const limit = this.queryString.limit * 1 || 10;
		const skip = (page - 1) * limit;
		this.query = this.query.skip(skip).limit(limit);
		return this;
	}
}

module.exports = ApiFeatures;
