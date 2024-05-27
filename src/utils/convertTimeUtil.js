function convertTimeAgo(datetime) {
    const datetimeNow = new Date();
    const datetimeInput = new Date(datetime);
    const timeAgo = datetimeNow - datetimeInput;
    if (timeAgo < 0) {
        return '';
    }
    const days = Math.floor(timeAgo / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
    const hours = Math.floor(timeAgo / (1000 * 60 * 60));
    const minutes = Math.floor(timeAgo / (1000 * 60));

    if (years > 0) {
        return `${years} năm`;
    }
    if (months > 0) {
        return `${months} tháng`;
    }
    if (days > 0) {
        return `${days} ngày`;
    }
    if (hours > 0) {
        return `${hours} giờ`;
    }
    if (minutes > 0) {
        return `${minutes} phút`;
    }
    return 'vừa xong';
}

function convertTimeFuture(datetime) {
    const datetimeNow = new Date();
    const datetimeInput = new Date(datetime);
    const timeAgo = datetimeInput - datetimeNow;

    if (timeAgo < 0) {
        return '';
    }
    const days = Math.floor(timeAgo / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
    const hours = Math.floor(timeAgo / (1000 * 60 * 60));
    const minutes = Math.floor(timeAgo / (1000 * 60));

    if (years > 0) {
        return `${years} năm`;
    }
    if (months > 0) {
        return `${months} tháng`;
    }
    if (days > 0) {
        return `${days} ngày`;
    }
    if (hours > 0) {
        return `${hours} giờ`;
    }
    if (minutes > 0) {
        return `${minutes} phút`;
    }
    return 'vừa xong';
}

function convertDateFuture(date) {
    const dateNow = new Date();
    const dateInput = new Date(date);
    const timeAgo = dateInput - dateNow;
    if (timeAgo < 0) {
        return '';
    }
    const days = Math.floor(timeAgo / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
    if (years > 0) {
        return `${years} năm`;
    }
    if (months > 0) {
        return `${months} tháng`;
    }
    if (days > 0) {
        return `${days} ngày`;
    }
    return '';
}

function convertDateAgo(date) {
    const dateNow = new Date();
    const dateInput = new Date(date);
    const timeAgo = dateNow - dateInput;
    if (timeAgo < 0) {
        return '';
    }
    const days = Math.floor(timeAgo / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
    if (years > 0) {
        return `${years} năm`;
    }
    if (months > 0) {
        return `${months} tháng`;
    }
    if (days > 0) {
        return `${days} ngày`;
    }
    return '';
}

function convertDateTime(datetime) {
    const date = new Date(datetime);
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const year = date.getFullYear();
    return `${hours}:${minutes} ${day}/${month}/${year}`;
}

export { convertTimeAgo, convertTimeFuture, convertDateFuture, convertDateAgo, convertDateTime };
