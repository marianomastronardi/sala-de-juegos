import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  answers: any = [];
  resultado: number = 0;
  questions: any = [];
  showResult: boolean = false;
  isInvalid: boolean = false;

  constructor(private _authService: AuthService,
    private route: Router) {
    this.answers.push('o1');
    this.answers['o1'] = '';
    this.answers.push('o2');
    this.answers['o2'] = '';
    this.answers.push('o3');
    this.answers['o3'] = '';
    this.answers.push('o4');
    this.answers['o4'] = '';
    this.answers.push('o5');
    this.answers['o5'] = '';
    this.answers.push('o6');
    this.answers['o6'] = '';
    this.answers.push('o7');
    this.answers['o7'] = '';
    this.answers.push('o8');
    this.answers['o8'] = '';
    this.answers.push('o9');
    this.answers['o9'] = '';
    this.answers.push('10');
    this.answers['10'] = '';

    this.questions.push(
      {
        q: '1. ¿En que año se jugó el primer Mundial de Futbol?',
        model: 'o1',
        o1: { id: 'p1o1', value: '1928' },
        o2: { id: 'p1o2', value: '1930' },
        o3: { id: 'p1o3', value: '1932' },
        o4: { id: 'p1o4', value: '1934' }
      },
      {
        q: '2. ¿Quien fue el segundo fundador de Buenos Aires?',
        model: 'o2',
        o1: { id: 'p2o1', value: 'Juan Manuel de Rosas' },
        o2: { id: 'p2o2', value: 'Juan de Garay' },
        o3: { id: 'p2o3', value: 'Pedro de Mendoza' },
        o4: { id: 'p2o4', value: 'Justo Jose de Urquiza' }
      },
      {
        q: '3. ¿Cual es la capital de Australia?',
        model: 'o3',
        o1: { id: 'p3o1', value: 'Queens' },
        o2: { id: 'p3o2', value: 'Sidney' },
        o3: { id: 'p3o3', value: 'Melbourne' },
        o4: { id: 'p3o4', value: 'Camberra' }
      },
      {
        q: '4. ¿Cual es el simbolo del Hierro?',
        model: 'o4',
        o1: { id: 'p4o1', value: 'He' },
        o2: { id: 'p4o2', value: 'Hi' },
        o3: { id: 'p4o3', value: 'Fe' },
        o4: { id: 'p4o4', value: 'Fi' }
      },
      {
        q: '5. ¿Que Papa tuvo el Pontificado mas breve del siglo XX?',
        model: 'o5',
        o1: { id: 'p5o1', value: 'Juan Pablo I' },
        o2: { id: 'p5o2', value: 'Juan XXIII' },
        o3: { id: 'p5o3', value: 'Pío XI' },
        o4: { id: 'p5o4', value: 'Benedicto XVI' }
      },
      {
        q: '6. ¿De que nacionalidad era Wolfgang Amadeus Mozart?',
        model: 'o6',
        o1: { id: 'p6o1', value: 'Alemán' },
        o2: { id: 'p6o2', value: 'Rumano' },
        o3: { id: 'p6o3', value: 'Austríaco' },
        o4: { id: 'p6o4', value: 'Húngaro' }
      },
      {
        q: '7. ¿Que longitud total tiene la frontera EEUU-México?',
        model: 'o7',
        o1: { id: 'p7o1', value: '1234 km' },
        o2: { id: 'p7o2', value: '2730 km' },
        o3: { id: 'p7o3', value: '3169 km' },
        o4: { id: 'p7o4', value: '4166 km' }
      },
      {
        q: '8. ¿Que ley expresa la magnitud de la fuerza electromagnética?',
        model: 'o8',
        o1: { id: 'p8o1', value: 'Ley de Coulomb' },
        o2: { id: 'p8o2', value: 'Ley de Faraday' },
        o3: { id: 'p8o3', value: 'Ley de Volta' },
        o4: { id: 'p8o4', value: 'Ley de Ampere' }
      },
      {
        q: '9. ¿A que país nórdico pertenece la ciudad de Malmö?',
        model: 'o9',
        o1: { id: 'p9o1', value: 'Dinamarca' },
        o2: { id: 'p9o2', value: 'Noruega' },
        o3: { id: 'p9o3', value: 'Suecia' },
        o4: { id: 'p9o4', value: 'Finlandia' }
      },
      {
        q: '10. ¿En que fecha se libró la batalla de San Lorenzo?',
        model: 'o10',
        o1: { id: 'p10o1', value: '5 de mayo de 1811' },
        o2: { id: 'p10o2', value: '17 de noviembre de 1812' },
        o3: { id: 'p10o3', value: '3 de febrero de 1813' },
        o4: { id: 'p10o4', value: '4 de julio de 1815' }
      }
    );
  }

  ngOnInit(): void {
    if ((this._authService.user.token == null || this._authService.user.token == '')) {
      this.route.navigate(['signin'])
    }
  }

  checkAnswers() {
    if (!this.noEmptyAnswers()) {
      this.resultado = 0;
      if (this.answers['o1'] == '1930') this.resultado++;
      if (this.answers['o2'] == 'Juan de Garay') this.resultado++;
      if (this.answers['o3'] == 'Camberra') this.resultado++;
      if (this.answers['o4'] == 'Fe') this.resultado++;
      if (this.answers['o5'] == 'Juan Pablo I') this.resultado++;
      if (this.answers['o6'] == 'Austríaco') this.resultado++;
      if (this.answers['o7'] == '3169 km') this.resultado++;
      if (this.answers['o8'] == 'Ley de Coulomb') this.resultado++;
      if (this.answers['o9'] == 'Suecia') this.resultado++;
      if (this.answers['o10'] == '3 de febrero de 1813') this.resultado++;

      this.showResult = true;
    } else {
      this.isInvalid = true;
      setTimeout(() => {
        this.isInvalid = false;
      }, 3000);
    }
  }

  noEmptyAnswers(): boolean {
    let isEmpty: boolean = false;
    if (this.answers['o1'] == '') { isEmpty = true };
    if (this.answers['o2'] == '') { isEmpty = true };
    if (this.answers['o3'] == '') { isEmpty = true };
    if (this.answers['o4'] == '') { isEmpty = true };
    if (this.answers['o5'] == '') { isEmpty = true };
    if (this.answers['o6'] == '') { isEmpty = true };
    if (this.answers['o7'] == '') { isEmpty = true };
    if (this.answers['o8'] == '') { isEmpty = true };
    if (this.answers['o9'] == '') { isEmpty = true };
    if (this.answers['o10'] == '') { isEmpty = true };
    return isEmpty;
  }

  startAgain() {
    this.showResult = false;
    this.answers['o1'] = '';
    this.answers['o2'] = '';
    this.answers['o3'] = '';
    this.answers['o4'] = '';
    this.answers['o5'] = '';
    this.answers['o6'] = '';
    this.answers['o7'] = '';
    this.answers['o8'] = '';
    this.answers['o9'] = '';
    this.answers['o10'] = '';
  }

}
