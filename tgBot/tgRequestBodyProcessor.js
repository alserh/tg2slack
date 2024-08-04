function tgRequestBodyProcessor(body) {
    const isEdited = body.edited_message != null;
    const m = body.message ?? body.edited_message;
    console.log(m);
    const text = m.text ?? m.caption;
    const file = m.photo !== undefined
        ? m.photo[m.photo.length - 1]
        : m.video ?? m.audio ?? m.document ?? m.sticker ?? m.animation ?? m.voice ?? m.video_note;

    if (m == null) {
        throw new Error(`Unsupported message type from Telegram: check type\n ${JSON.stringify(body)}`);
    } else if (text == null && file == null) {
        throw new Error(`Unsupported message type from Telegram: check content:\n ${JSON.stringify(m)}`);
    }

    return {
        "from": m.from,
        "text": text,
        "file": file,
        "edited": isEdited
    };
}

module.exports = { tgRequestBodyProcessor };