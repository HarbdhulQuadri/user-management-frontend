export interface Contact {
  email: string;
  phone: string;
  fax?: string | null;
  linkedInUrl?: string | null;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string; // Changed from postalCode to match backend
}

export interface PastSchool {
  name: string;
  year: string;
}

export interface Academics {
  pastSchools: PastSchool[]; // Changed from string[] to PastSchool[]
}

export interface BaseUserFormData {
  firstName: string;
  lastName: string;
  dob: string;
  occupation: string;
  gender: string;
  contact: Contact;
  address: Address;
  academics: Academics;
}

export interface CreateUserFormData extends BaseUserFormData {
  photo: FileList;
}

export interface UpdateUserFormData extends BaseUserFormData {
  id: number;
  photo?: FileList | null;
}

export interface User extends BaseUserFormData {
  id: number;
  photoPath: string;
}