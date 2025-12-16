export interface Address {
    _id: string;
    label: "home" | "work" | "other";
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    isDefault: boolean;
}
