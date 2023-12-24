export interface Enquiry {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
  course: string;
}

export const INITIAL_ENQUIRY: Enquiry = {
  name: '',
  email: '',
  phoneNumber: '',
  message: '',
  course: '',
};
