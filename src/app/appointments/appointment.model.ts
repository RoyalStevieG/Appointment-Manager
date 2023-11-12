export interface Appointment {
  id: string | null;
  vendor_name: string;
  appointment_time: Date;
  time_string: string;
  client_name: string;
  booked: boolean;
}
