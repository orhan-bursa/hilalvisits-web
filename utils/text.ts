export const shortenText = (text: string, lengthThreshold: number, wordCount: number) => {
    if (text.length > lengthThreshold) {
        const words = text.split(" ")
        const _result = words.length > wordCount ?
            words.slice(0, wordCount).join(" ") + "..." :
            words.join(" ")

        return _result
    }
    return text
}

function extractHashtags(caption: string) {
    const regex = /#(\w+)/g;
    const hashtags = caption.match(regex);
    return hashtags ? hashtags.map(tag => tag.replace('#', '')) : [];
}
