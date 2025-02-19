export const validatePhone = (phone: string) => {
    const re = /^\d{10}$/;
    return re.test(String(phone));
};