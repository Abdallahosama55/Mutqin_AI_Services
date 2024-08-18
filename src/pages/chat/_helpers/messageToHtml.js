import showdown from "showdown";

export default function messageToHtml(message) {
    let converter = new showdown.Converter()
    return converter.makeHtml(message);
}