import epub from 'epubjs'
import { RenditionOptions } from 'epubjs/types/rendition';
// TODO: Move book creation to own function

export default function (url: string) {
    const renderArea = document.getElementById('book-render-area');
    if (renderArea) {
        const book = epub(url);
        const renditionOptions: RenditionOptions = {
            manager: "continuous",
            flow: "scrolled",
            width: '100%',
            height: '100%'
        }
        const rendition = book.renderTo(renderArea, renditionOptions);
        const displayed = rendition.display();
    } else {
        console.log(`Error! Could not find render area element.`);
        alert(`Failed to open book!`);
    }
}

