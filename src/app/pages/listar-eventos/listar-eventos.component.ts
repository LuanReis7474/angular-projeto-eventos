import { Component, OnInit } from '@angular/core';
import { EventosService } from 'src/app/services/eventos.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-listar-eventos',
  templateUrl: './listar-eventos.component.html',
  styleUrls: ['./listar-eventos.component.scss']
})
export class ListarEventosComponent implements OnInit {

  events: any;
  id: any;
  constructor(private eventosService: EventosService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.id = sessionStorage.getItem('id_user');
    this.eventosService.getEventsByUserId(this.id).subscribe(r => {
      this.events = r;
      console.log(this.events);
    });
  }

  deleteEvent(id: any) {
    this.eventosService.deleteEvent(id).subscribe(r => {
      console.log(r);
      location.reload();
    })
  }

  addEvent() {
    this.router.navigate(['/add-eventos']);
  }

  editEvent(id: any) {
    this.router.navigate(['/add-eventos'], { queryParams: { id: id } });
  }

  closePage() {
    this.authService.logout();
    location.reload();
  }
}
