export default function convertMinutes(minutes) {
    if (typeof minutes !== "number" || minutes < 0) {
      return "Invalid input. Minutes must be a non-negative number.";
    }
  
    const totalHours = minutes / 60;
    const totalDays = totalHours / 24;
    const totalWeeks = totalDays / 7;
  
    if (totalWeeks >= 1) {
      const roundedWeeks =
        Math.floor(totalWeeks) === totalWeeks
          ? totalWeeks
          : parseFloat(totalWeeks.toFixed(1));
      return roundedWeeks + " week" + (roundedWeeks === 1 ? "" : "s");
    } else if (totalDays >= 1) {
      const roundedDays =
        Math.floor(totalDays) === totalDays
          ? totalDays
          : parseFloat(totalDays.toFixed(1));
      return roundedDays + " day" + (roundedDays === 1 ? "" : "s");
    } else if (totalHours >= 1) {
      const roundedHours =
        Math.floor(totalHours) === totalHours
          ? totalHours
          : parseFloat(totalHours.toFixed(1));
      return roundedHours + " hour" + (roundedHours === 1 ? "" : "s");
    } else {
      return minutes + " minutes";
    }
  }
  