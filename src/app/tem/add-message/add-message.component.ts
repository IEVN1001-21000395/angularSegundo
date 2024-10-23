import { Component } from '@angular/core';
import { MessageserviceService } from '../messageservice.service';
import { FormsModule, FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-message',
  templateUrl: './add-message.component.html',
  standalone: true,
  imports:[ReactiveFormsModule],
  styles: []
})
export class AddMessageComponent {
  formGrup!: FormGroup;

  constructor(private readonly fb: FormBuilder, public messageService: MessageserviceService) {}
  
  alumno: string = "";

  ngOnInit(): void{
    this.formGrup = this.initForm();
  }

  initForm():FormGroup{
    return this.fb.group({
      nombre:[''],
    })
  }

  addAlumno() {
    let {nombre} = this.formGrup.value;
    this.messageService.add(nombre);
    this.formGrup.get('nombre')?.setValue('')
    //this.alumno = "";  
  }

}

