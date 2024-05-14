export default function randomId() {
    const datetime = new Date();
    const time = datetime.getTime();
    const random = Math.floor(Math.random() * 1000);
    return time + random;
}
