export const ADMIN_EMAILS = ["fayasamd@gmail.com", "ahamed.bayas@gmail.com", "jupitercab1@gmail.com"];

export const isAdminUser = (email?: string | null) => {
    return email && ADMIN_EMAILS.includes(email);
};
