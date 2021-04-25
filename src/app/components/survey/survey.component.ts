import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Survey } from 'src/app/models/survey';
import { AuthService } from 'src/app/services/auth.service';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  public fg!: FormGroup;
  done:boolean;

  constructor(private fb: FormBuilder,
    private _surveyService:SurveyService,
    private _authService:AuthService,
    private route:Router) {
      this.done = false;
     }

  ngOnInit(): void {

    if ((this._authService.user.token == null || this._authService.user.token == '')) {
      this.route.navigate(['signin'])
    }else{
    this.fg = this.fb.group({
      'nombre': ['', [Validators.required]],
      'apellido': ['', Validators.required],
      'edad': ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      'telefono': ['', [Validators.required, this.noSpecialCharacters, Validators.maxLength(10)]],
      'review': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
      'level': ['', Validators.required],
      'ch-improve-ui': [''],
      'ch-perf-issue': [''],
      'ch-many-bugs': [''],
      'most-enjoyed': [''],
    })
    this.fg.controls['level'].setValue('Buena');
  }
  }

  save() {
    //console.log(this.fg.getRawValue())
    //console.log(this.formGroup.get('nombre').value);
    //console.log(this.fg.controls['nombre'].value);
    //console.log(this.fg)
    if(this.fg.status === 'VALID'){
      let survey = new Survey();
    survey.apellido = this.fg.controls['apellido'].value;
    survey.nombre = this.fg.controls['nombre'].value;
    survey.edad = this.fg.controls['edad'].value;
    survey.email = this._authService.user.email;
    survey.telefono = this.fg.controls['telefono'].value;
    survey.review = this.fg.controls['review'].value;
    survey.level = this.fg.controls['level'].value;
    survey.mostEnjoyed = this.fg.controls['most-enjoyed'].value;
    if(this.fg.controls['ch-improve-ui'].value == true) survey.improves.ui = 'ch-improve-ui';
    if(this.fg.controls['ch-many-bugs'].value == true) survey.improves.bugs = 'ch-many-bugs';
    if(this.fg.controls['ch-perf-issue'].value == true) survey.improves.perf = 'ch-perf-issue';
    survey.improves = JSON.stringify(survey.improves);

    this._surveyService.create(survey);

    this.done = true;

    setTimeout(() => {
      this.route.navigate(['home'])
    }, 1500);

    }else{
      console.log(this.fg.status)
    }
  }

  noSpecialCharacters(control: AbstractControl): null | object {
    const telefono = <string>control.value;
    const ch = (isNaN(Number(telefono)))    
    console.log(ch)
    if (ch) {
      return {
        contieneCaracteresEspeciales: true
      };
    } else {
      return null
    }
  }

}
