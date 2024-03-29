const regexValidator = {
    EMAIL: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/,
    FULLNAME: /^[a-zA-ZÀ-Ỹà-ỹ]+([- ]?[a-zA-ZÀ-Ỹà-ỹ]+)?([ ]?[a-zA-ZÀ-Ỹà-ỹ]+)?$/,
    REGEX_PHONE_NUMBER: /^(84|0[3|5|7|8|9])+([0-9]{8})\b$/,
};

export default regexValidator;
