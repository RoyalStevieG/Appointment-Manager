import { HttpClient } from '@angular/common/http';
import { Appointment } from './appointment.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppointmentsService {
  private appointments: Appointment[] = [];

  getAppointments() {
    return this.appointments;
  }

  addAppointments(
    id: string,
    vendor_name: string,
    appointment_time: Date,
    client_name: string
  ) {
    const appointment: Appointment = {
      id: id,
      vendor_name: vendor_name,
      appointment_time: appointment_time,
      client_name: client_name,
    };
    this.appointments.push(appointment);
  }
}

// constructor(private http: HttpClient) {}

// getPosts() {
//   this.http
//     .get<{ message: string; posts: Appointment[] }>(
//       'http://localhost:3000/api/posts'
//     )
//     .subscribe((PostData)=>{
//       this.posts = PostData.posts
//       this.postUpdated.next([...this.posts]);

//     });
// }

// addPost(title:string, content:string){
//   const post: Appointment = {id: null , vendor_name: 'testname', appointment_time: new Date(), client_name: "testname2"};
// }
// end of posts.service.ts code
