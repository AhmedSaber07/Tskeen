import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../../services/account.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-questionnaire-student',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './questionnaire-student.component.html',
  styleUrl: './questionnaire-student.component.css'
})
export class QuestionnaireStudentComponent {
  // questionnaireStudentForm!:FormGroup;
 constructor(private accountService:AccountService,private router:Router){}
 onSubmit() {
  if (this.answers.includes(0)) {  
    Swal.fire({
      icon: "warning",
      text: "الرجاء الإجابة على جميع الأسئلة.",
      // text: "Something went wrong!",
    });
    // alert('Please answer all the questions.');
  } else {
    if(this.accountService.id)
      { 
        const data = {
          "float_input": this.answers
        };
        this.accountService.predict(this.accountService.id, data).subscribe(
          (data) => {
            // console.log(data);
            Swal.fire({
              icon: "success",
              text: "تم التسجيل بنجاح",
            });
            this.router.navigate(['/home-student']);
          },
          (error) => {
            // console.log(error.status);
            Swal.fire({
              icon: "success",
              text: "تم التسجيل بنجاح",
            });
            this.router.navigate(['/home-student']);
          }
        )
      }
  }

  // this.router.navigate(['/home-student']);
}


  questions = [
    { num: 0, text: 'بحب التجمعات سواء العائلية أو مع اصحابي' },
    { num: 1, text: 'أنا مش شخص بتكلم كتير' },
    { num: 2, text: 'بحس إني مرتاح وسط الناس' },
    { num: 3, text: 'ببقي شخص مش بارز لما بكون وسط الناس' },
    { num: 4, text: 'انا ببدأ الكلام مع الناس بسهولة' },
    { num: 5, text: 'بحس ان معنديش كلام اقوله لما بحاول افتح كلام مع الناس' },
    { num: 6, text: 'بتكلم مع ناس مختلفة كتير فالتجمعات' },
    { num: 7, text: 'مبحبش ألفت انتباه الناس ليا' },
    { num: 8, text: 'معنديش مشكله اكون مركز اهتمام الحواليا' },
    { num: 9, text: 'بكون هادي لو موجود مع ناس معرفهاش' },
    { num: 10, text: 'بحس بالتوتر بسهولة' },
    { num: 11, text: 'ببقي حاسس بالراحة النفسية أغلب الوقت' },
    { num: 12, text: 'ببقي حاسس بالقلق تجاه حاجات كتير' },
    { num: 13, text: 'أنا نادرا ما بحس بمشاعر سلبية' },
    { num: 14, text: 'بحس اني بتضايق بسهولة' },
    { num: 15, text: 'بحس ان مشاعري بتتجرح بسهولة' },
    { num: 16, text: 'بحس اني بتأثر بسهولة بالمواقف الل بتحصلي خلال اليوم وده بياثر علي المود بتاعي' },
    { num: 17, text: 'ممكن احس اني فرحان وبعدين زعلان وبعدين متحمس بعدين مكتئب وده كله في نفس اليوم عادي' },
    { num: 18, text: 'بتعصب بسرعه' },
    { num: 19, text: 'بحس غالبا بمشاعر سلبية' },
    {num:20,text:' بحس اني مش مهتم بالناس الل حواليا '},
    {num:21,text:'الناس الل حواليا من اولوياتي'},
    {num:22,text:'بحس اني ساعات ممكن ازعل الناس الل حواليا من غير قصد'},
    {num:23,text:'بقدر مشاعر الناس الل حواليا و بحاول افهمها'},
    {num:24,text:'مش بهتم لو حد بيمر بمشكلة'},
    {num:25,text:'بحس اني طيب'},
    {num:26,text:'بحس اني مش بيفرقلي الناس'},
    {num:27,text:'باخد من وقتي عشان اساعد ال حواليا'},
    {num:28,text:'بحاول اتفهم مشاعر الناس'},
    {num:29,text:'الناس الل حواليا بيحسوا انهم مرتاحين فوجودي'},
    {num:30,text:'بشوف نفسي شخص مبادر'},
    {num:31,text:'بسيب حاجاتي في كل حتة'},
    {num:32,text:'باخد بالي من التفاصيل'},
    {num:33,text:'كل ما بحاول انظم الامور ببوظ الدنيا'},
    {num:34,text:'بحب انجز في الاعمال المنزلية عشان يبقي مكاني دايما نضيف و مرتب'},
    {num:35,text:'بنسي وبكسل ارجع الحاجات في مكانها'},
    {num:36,text:'بحب تننظيم الماكن و ترتيبه'},
    {num:37,text:'بأجل المذاكرة و اي مسئولية عليا'},
    {num:38,text:'بخطط دايما و بمشي عالجدول'},
    {num:39,text:'عندي انظباط في المذاكرة و الدراسة'},
    {num:40,text:'عندي مهارات تواصل قوية'},
    {num:41,text:'بحب النقاشات الواضحة و المحددة'},
    {num:42,text:'بشوف نفسي شخص كريتيف و عندي نظرة مميزة'},
    {num:43,text:'بميل اني أتكلم عن الاحداث و الأنشطة الل بعملها فيومي اكتر مني اني اخوض نقاشات فلسفية'},
    {num:44,text:'انا غالبا عندي اقتراحات و حلول مبتكرة و عملية للمشاكل'},
    {num:45,text:'انا شخص واقعي'},
    {num:46,text:'انا سريع التعلم و بتأقلم مع الظروف الجديدة'},
    {num:47,text:'بستخدم كلمات و مصطلحات معقدة عشان اعبر عن افكاري'},
    {num:48,text:'بحب أحلل الاحداث'},
    {num:49,text:'انا دايما عندي افكار جديدة'}
  ];

  

  
  options = [1, 2, 3, 4, 5];
  answers: (number)[] = new Array(this.questions.length).fill(0);
  onCancel() {
    // Handle the cancel action
  }
}
