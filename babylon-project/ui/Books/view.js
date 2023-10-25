const viewData = {
    id: "Books",
    label: "Books",
    factory: "frame",
    region: "center",
    link: "/services/web/babylon-project/ui/Books/index.html",
    perspectiveName: "books"
};

if (typeof exports !== 'undefined') {
    exports.getView = function () {
        return viewData;
    }
}
