function convertTimeAgo(date) {
    const parts = date.split('/');
    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const year = parseInt(parts[2]);

    const yearNow = new Date().getFullYear();
    const monthNow = new Date().getMonth() + 1;
    const dayNow = new Date().getDate();

    let timeAgo = '';
    if (year - yearNow > 0) {
        timeAgo = `${year - yearNow} năm`;
    } else if (month - monthNow > 0) {
        timeAgo = `${month - monthNow} tháng`;
    } else if (day - dayNow > 0) {
        timeAgo = `${day - dayNow} ngày`;
    } else {
        timeAgo = 'Hôm nay';
    }

    return timeAgo;
}

export { convertTimeAgo };
