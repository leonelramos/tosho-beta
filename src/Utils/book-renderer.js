import epub from '../../externals/builds/epub'

export default function(url) {
    const renderWindow = window.open();
    const renderArea = renderWindow.document.getElementsByTagName("body")[0];
    const renderAreaId = "render-area";
    renderArea.id = renderAreaId;
    const book = epub(url);
    const rendition = book.renderTo(renderArea, { method: "continuous", width: "100%", height: "100%" });
    const displayed = rendition.display();
}

