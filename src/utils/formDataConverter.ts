import { CreateUserFormData, UpdateUserFormData } from '../types/user';

export const convertToFormData = (data: CreateUserFormData | UpdateUserFormData): FormData => {
  const formData = new FormData();

  // Flatten the object structure to match backend expectations
  const flattenData = {
    firstName: data.firstName,
    lastName: data.lastName,
    dob: data.dob,
    occupation: data.occupation,
    gender: data.gender,
    'contact[email]': data.contact.email,
    'contact[phone]': data.contact.phone,
    ...(data.contact.fax && { 'contact[fax]': data.contact.fax }),
    ...(data.contact.linkedInUrl && { 'contact[linkedInUrl]': data.contact.linkedInUrl }),
    'address[street]': data.address.street,
    'address[city]': data.address.city,
    'address[state]': data.address.state,
    'address[country]': data.address.country,
    'address[zipCode]': data.address.zipCode,
  };

  // Append all flat fields
  Object.entries(flattenData).forEach(([key, value]) => {
    if (value) formData.append(key, value);
  });

  // Append schools array
  data.academics.pastSchools.forEach(school => {
    formData.append('academics[pastSchools][]', school.name);
  });

  // Append photo if exists
  if ('photo' in data && data.photo instanceof FileList && data.photo.length > 0) {
    formData.append('photo', data.photo[0]);
  }

  return formData;
};
