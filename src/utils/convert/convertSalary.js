function convertSalary(salaryType, minSalary, maxSalary) {
    if (salaryType === 'deal' || (minSalary === 0 && maxSalary === 0)) {
        return 'Thoả thuận';
    }
    if (maxSalary === 0) {
        return salaryType === 'vnd' ? `Trên ${minSalary / 1000000} triệu` : `Trên ${minSalary} USD`;
    }
    if (minSalary === 0 && maxSalary !== 0 && maxSalary !== '') {
        return salaryType === 'vnd' ? `Dưới ${maxSalary / 1000000} triệu` : `Dưới ${maxSalary} USD`;
    }

    return salaryType === 'vnd' ? `${minSalary / 1000000} - ${maxSalary / 1000000} triệu` : `${minSalary} - ${maxSalary} USD`;
}

export { convertSalary };
