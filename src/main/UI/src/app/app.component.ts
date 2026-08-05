import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private httpClient: HttpClient) {}

  private baseURL: string = 'http://localhost:8080';
  public submitted!: boolean;
  roomsearch!: FormGroup;
  rooms: Room[] = [];
  request!: ReserveRoomRequest;
  presentationTimes: string = '';

  ngOnInit() {
    this.roomsearch = new FormGroup({
      checkin: new FormControl(''),
      checkout: new FormControl('')
    });

    // Fetch presentation times from the backend
    this.httpClient.get(this.baseURL + '/presentation', { responseType: 'text' })
      .subscribe({
        next: (data) => this.presentationTimes = data,
        error: (err) => console.error('Error fetching presentation times:', err)
      });
  }

  onSubmit() {
    const checkin = this.roomsearch.value.checkin ? this.roomsearch.value.checkin.trim() : '';
    const checkout = this.roomsearch.value.checkout ? this.roomsearch.value.checkout.trim() : '';

    if (!checkin || !checkout) {
      alert("Please select both check-in and check-out dates.");
      return;
    }

    this.getAll(checkin, checkout).subscribe({
      next: (response: any) => {
        console.log("Rooms response from server:", response);
        this.rooms = response.content; // Grab the rooms array from Spring Page object
      },
      error: (err) => {
        console.error('Error fetching rooms:', err);
      }
    });
  }

  reserveRoom(roomId: string) {
    const checkin = this.roomsearch.value.checkin;
    const checkout = this.roomsearch.value.checkout;
    this.request = new ReserveRoomRequest(roomId, checkin, checkout);
    this.createReservation(this.request);
  }

  createReservation(body: ReserveRoomRequest) {
    const options = {
      headers: new HttpHeaders().append('key', 'value'),
    };

    this.httpClient.post(this.baseURL + '/room/reservation/v1', body, options)
      .subscribe({
        next: (res) => {
          console.log("Reservation successful:", res);
          alert("Room successfully reserved!");
        },
        error: (err) => {
          console.error('Reservation error:', err);
        }
      });
  }

  getAll(checkin: string, checkout: string): Observable<any> {
    return this.httpClient.get(this.baseURL + '/room/reservation/v1?checkin=' + checkin + '&checkout=' + checkout, { responseType: 'json' });
  }
}

export interface Roomsearch {
  checkin: string;
  checkout: string;
}

export interface Room {
  id: string;
  roomNumber: string;
  price: string;
  links: string;
}

export class ReserveRoomRequest {
  roomId: string;
  checkin: string;
  checkout: string;

  constructor(roomId: string, checkin: string, checkout: string) {
    this.roomId = roomId;
    this.checkin = checkin;
    this.checkout = checkout;
  }
}
