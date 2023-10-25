const perspectiveData = {
	id: "books",
	name: "books",
	link: "/services/web/babylon-project/ui/index.html",
	order: "100",
	icon: "/services/web/resources/unicons/copy.svg",
};

if (typeof exports !== 'undefined') {
	exports.getPerspective = function () {
		return perspectiveData;
	}
}