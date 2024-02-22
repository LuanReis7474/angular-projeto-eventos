import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventosService } from 'src/app/services/eventos.service';
@Component({
  selector: 'app-add-eventos',
  templateUrl: './add-eventos.component.html',
  styleUrls: ['./add-eventos.component.scss']
})
export class AddEventosComponent implements OnInit {

  eventForm: FormGroup;
  idEvent: string | null = "";
  eventSelected: any;
  edit: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private eventosService: EventosService,
    private router: Router,
    private route: ActivatedRoute) {


    this.eventForm = this.formBuilder.group({
      description: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.idEvent = this.route.snapshot.queryParamMap.get('id');
    if (this.idEvent) {
      this.eventosService.getEvent(this.idEvent).subscribe(r => {
        console.log(r);
        this.edit = true;
        this.eventSelected = r;
        this.eventForm.get('description')?.setValue(this.eventSelected.describe_event);
        this.eventForm.get('startTime')?.setValue(this.eventSelected.start_time);
        this.eventForm.get('endTime')?.setValue(this.eventSelected.end_time);
      })
    }
  }

  submitForm(): void {
    if (!this.edit) {
      let id: any = sessionStorage.getItem('id_user');
      id = parseInt(id);
      if (this.eventForm.valid) {
        let body = {
          "startTime": this.eventForm.get('startTime')?.value,
          "endTime": this.eventForm.get('endTime')?.value,
          "describe": this.eventForm.get('description')?.value,
          "idUser": id
        }

        this.eventosService.registerEvent(body).subscribe(r => {
          console.log(r);

          this.router.navigate(['/listar-eventos']);

        }, error => {
          if (error.error.text == 'Já existe evento nesse horário') {
            alert("Já existe evento nesse horário");
          }
        })
      }
    }
    else {
      let id: any = sessionStorage.getItem('id_user');
      id = parseInt(id);
      if (this.eventForm.valid) {
        let body = {
          "startTime": this.eventForm.get('startTime')?.value,
          "endTime": this.eventForm.get('endTime')?.value,
          "describe": this.eventForm.get('description')?.value,
          "idUser": id
        }


        this.eventosService.editEvent(body, this.idEvent).subscribe(r => {
          console.log(r);

          this.router.navigate(['/listar-eventos']);

        }, error => {
          if (error.error.text == 'Já existe evento nesse horário') {
            alert("Já existe evento nesse horário");
          }
        })
      }
    }
  }

}
