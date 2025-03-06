import * as Yup from 'yup';

/**
 * Common validation schemas for forms
 */

// User profile validation schema
export const UserProfileSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  jobTitle: Yup.string().required('Job title is required'),
  phone: Yup.string().matches(/^[0-9\-\+\(\) ]+$/, 'Invalid phone number'),
  emailNotifications: Yup.boolean(),
  pushNotifications: Yup.boolean(),
  theme: Yup.string().oneOf(['light', 'dark', 'system'], 'Invalid theme selection'),
});

// Project validation schema
export const ProjectSchema = Yup.object().shape({
  name: Yup.string().required('Project name is required'),
  number: Yup.string().required('Project number is required'),
  clientId: Yup.string().required('Client is required'),
  type: Yup.string().required('Project type is required'),
  location: Yup.object().shape({
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zipCode: Yup.string().required('Zip code is required'),
  }),
  description: Yup.string(),
});

// Form validation schema (dynamic based on form template)
export function createFormValidationSchema(formFields: any[]) {
  const schemaFields: { [key: string]: any } = {};
  
  formFields.forEach(field => {
    let fieldSchema;
    
    switch (field.type) {
      case 'text':
      case 'textarea':
        fieldSchema = Yup.string();
        break;
      case 'email':
        fieldSchema = Yup.string().email('Invalid email address');
        break;
      case 'number':
        fieldSchema = Yup.number().typeError('Must be a number');
        break;
      case 'date':
        fieldSchema = Yup.date().typeError('Invalid date');
        break;
      case 'select':
        fieldSchema = Yup.string();
        break;
      case 'checkbox':
        fieldSchema = Yup.boolean();
        break;
      case 'file':
        fieldSchema = Yup.mixed();
        break;
      default:
        fieldSchema = Yup.string();
    }
    
    if (field.required) {
      fieldSchema = fieldSchema.required(`${field.label} is required`);
    }
    
    schemaFields[field.id] = fieldSchema;
  });
  
  return Yup.object().shape(schemaFields);
}

// Helper validation functions
export function isValidEmail(email: string): boolean {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
}

export function isValidPhone(phone: string): boolean {
  return /^[0-9\-\+\(\) ]+$/.test(phone);
}

export function isValidZip(zip: string): boolean {
  return /^\d{5}(-\d{4})?$/.test(zip);
}