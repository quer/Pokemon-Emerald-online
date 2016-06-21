module.exports = function (data) {
	this.name = data.name;
	this.id = data.id;
	this.weaknesses = [];
	this.setWeaknesses = function (weaknesses) {
		this.weaknesses = weaknesses;
	}
	this.strengths = [];
	this.setStrengths = function (strengths) {
		this.weaknesses = strengths;
	}
}