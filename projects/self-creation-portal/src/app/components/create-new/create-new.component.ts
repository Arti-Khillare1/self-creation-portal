import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { CommentsBoxComponent, FormService, SOLUTION_LIST} from 'lib-shared-modules';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-create-new',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatToolbarModule, MatListModule, MatCardModule, TranslateModule,CommentsBoxComponent,CommonModule],
  templateUrl: './create-new.component.html',
  styleUrl: './create-new.component.scss'
})
export class CreateNewComponent {
  resourceList : any;

  resourceHeader = {
    "title":"PROJECT_NAME",
    "buttons":[
      { title: "SAVE_AS_DRAFT"},
      { title: "PREVIEW"},
      { title: "SEND_FOR_REVIEW"}
    ]
  }

  observationwithrubricsHeader = {
    "title" : "OBSERVATION_FORM",
    "buttons":[
      { title: "PAGINATION"},
      { title: "PROGRESS_STATUS"},
      { title: "SAVE_AS_DRAFT"},
      { title: "PREVIEW"},
      { title: "SEND_FOR_REVIEW"}
    ]
  }

  constructor(private router:Router,private formService:FormService) {
  }

  ngOnInit() {
    this.getsolutionList()
  }

 onCardClick(cardItem: any) {
    this.router.navigate([cardItem.url],{queryParams:{parent:"create"}})
  }

  getsolutionList() {
    this.formService.getPermissions().subscribe((res:any) => {
      this.formService.getForm(SOLUTION_LIST).subscribe((form) =>{
        this.resourceList = form?.result?.data?.fields?.controls
        this.resourceList = this.formService.checkPermissions(this.resourceList,res.result)
        let userRoles:any = localStorage.getItem('user_roles')
        userRoles = JSON.parse(userRoles)
        if(!userRoles.find((item:any)=> item.title == 'content_creator')) {
          this.router.navigate(['/home/up-for-review'])
        }
      })
    })
  }

}
