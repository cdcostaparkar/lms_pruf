export default function convertMinutes(minutes) {
    if (typeof minutes !== "number" || minutes < 0) {
        return "Invalid input. Minutes must be a non-negative number.";
    }

    let remainingMinutes = minutes;

    const weeks = Math.round(remainingMinutes / (60 * 24 * 7));
    remainingMinutes %= (60 * 24 * 7);

    const days = Math.floor(remainingMinutes / (60 * 24));
    remainingMinutes %= (60 * 24);

    const hours = Math.round(remainingMinutes / 60);
    remainingMinutes %= 60;

    if (weeks > 0) {
        return `${weeks} week${weeks > 1 ? "s" : ""}`;
    } else if (days > 0) {
        return `${days} day${days > 1 ? "s" : ""}`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? "s" : ""}`;
    } else {
        return `${minutes} minute${minutes > 1 ? "s" : ""}`;
    }
}