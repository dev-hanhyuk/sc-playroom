const displayDuration = (duration) => {
    const d = Math.floor(duration / 1000);
    const m = Math.floor(d / 60 );
    const x = '00';
    const s = String(d - (m * 60));
    return `${m}:${x.slice(0, -s.length) + s}`
}

const displayRemainder = (duration) => {
    const d = duration.toFixed(0);//seconds
    const m = Math.floor(d / 60);
    const x = '00';
    const s = String((d % 60).toFixed(0));
    return `${m}:${x.slice(0, -s.length) + s}`
}

module.exports = { displayDuration, displayRemainder }