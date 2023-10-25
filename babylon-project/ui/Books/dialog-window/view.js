const viewData = {
    id: "Books-details",
    label: "Books",
    link: "/services/web/babylon-project/ui/Books/dialog-window/index.html",
    perspectiveName: "books"
};

if (typeof exports !== 'undefined') {
    exports.getDialogWindow = function () {
        return viewData;
    }
}