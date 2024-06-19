import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questionnaire-student',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './questionnaire-student.component.html',
  styleUrl: './questionnaire-student.component.css'
})
export class QuestionnaireStudentComponent {
  // questionnaireStudentForm!:FormGroup;
 constructor(private accountService:AccountService,private router:Router){}
  onSubmit(){
        this.accountService.removeFirstRegisterStudent();
        // console.log(this.accountService.FirstRegisterStudent);
        
        this.router.navigate(['/home-student']);
    // if(this.questionnaireStudentForm.valid)
    //   {
    //     this.accountService.removeFirstRegisterStudent();
    //   }
  }
}
