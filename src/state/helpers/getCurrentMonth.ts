export const getCurrentMonth = (type: string = "number", offset: number = 0): string | number   => {
    const currentDate: Date = new Date();
    currentDate.setMonth(currentDate.getMonth() + offset);

    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();


    if (type === "string") {
        // Return month name as a string
        const monthNames = [
            "Jan", "Feb", "Mar", "April", "May", "June", 
            "July", "Aug", "Sept", "Oct", "Nov", "Dec"
        ];
        return `${monthNames[month]} ${year}`;
    } else if (type === "timestamp") {
        // Return the timestamp
        return currentDate.getTime();
    } else {
        // Return month as a number (zero-based index)
        return `${month}-${year}`;
    }
};
