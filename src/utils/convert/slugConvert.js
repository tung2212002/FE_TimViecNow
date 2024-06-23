export default function slugConvert(str) {
    return str
        .toLowerCase() // to lower case
        .trim() // remove space at start and end
        .normalize('NFD') // make string to unicode
        .replace(/[\u0300-\u036f]/g, '') // remove unicode
        .replace(/đ/g, 'd') // replace đ to d
        .replace(/Đ/g, 'D') // replace Đ to D
        .replace(/[^a-z0-9]+/g, '-') // replace all non-alphanumeric characters with a hyphen
        .replace(/^-+|-+$/g, ''); // remove hyphen at start and end
}
