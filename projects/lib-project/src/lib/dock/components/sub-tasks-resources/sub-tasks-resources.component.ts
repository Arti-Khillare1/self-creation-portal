import { Component, OnInit } from '@angular/core';
import { HeaderComponent, SideNavbarComponent, DialogModelComponent } from 'lib-shared-modules';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule }  from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; 
import { TranslateModule } from '@ngx-translate/core';
import { FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'lib-sub-tasks-resources',
  standalone:true,
  imports: [
    HeaderComponent,
    SideNavbarComponent,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  templateUrl: './sub-tasks-resources.component.html',
  styleUrl: './sub-tasks-resources.component.scss'
})
export class SubTasksResourcesComponent implements OnInit{
  backButton : boolean = true;
  subHeader : any;
  headerData : any = {};
  selctedCardItem : any;
  titleObj = {
    "title" : "CREATION_PORTAL",
    "sub-title" : "SUBTASKS_AND_RESOURCES",
    "btn-info" : "ADD_COMBINATION_INFO"
  }
  inputControl = new FormControl('');

  public sidenavData = [
    { title: 'CREATE_NEW', action: "", icon: 'add', url: 'create-new',},
    { title: 'BROWSE_EXISTING', action: "", icon: 'search', url: 'browse-existing'},
    { title: 'DRAFTS', action: "", icon: 'drafts', url: 'drafts' },
    { title: 'SUBMITTED_FOR_REVIEW', action: "", icon: 'send', url: 'submit-for-review'},
    { title: 'PUBLISHED', action: "", icon: 'published', url: 'published'},
    { title: 'UP_FOR_REVIEW', action: "", icon: 'pending', url: 'up-for-review' }
  ];

  taskData : any[] = [];

  constructor(private dialog : MatDialog) {
  }

  ngOnInit() {
      for (let i = 0; i < 5; i++) {
      this.taskData.push({
        header: `Task Description for task ${i + 1}`,
        buttons: ['Add observation', 'Add learning resource(s)', 'Add subtask(s)'],
        showSubtaskInput: false,
        subtaskInput: ''
      });
    }
  }
  
  onButtonClick(buttonTitle: string) {
  }

  onAction(button : string, taskIndex: number) {
    console.log(this.taskData[taskIndex])
      switch (button) {
        case 'Add observation':
          console.log(button);
          break;
  
        case 'Add learning resource(s)':
          const dialogRef = this.dialog.open(DialogModelComponent, { 
            data : {
            header: 'ADD_LEARNING_RESOURCE',
            labelname: 'RESOURCE_NAME',
            resourceName:'Name',
            labellink: 'RESOURCE_LINK',
            resourceLink:'Link',
            cancelButton: 'CANCEL',
            saveButton: 'SAVE',
            addResource: 'ADD_LEARNING_RESOURCE'
            }
            });
        
            dialogRef.afterClosed().subscribe(result => {
            });
          console.log(button);
          break;
  
        case 'Add subtask(s)':
          this.taskData[taskIndex].showSubtaskInput = true
          console.log(button);
          break;
  
        default:
          break;
      }
  }

  addSubTask(taskIndex: number) {
    const subtaskInputValue = this.inputControl.value;
    if (subtaskInputValue) {
      this.taskData[taskIndex].subtaskInput = subtaskInputValue;
      this.taskData[taskIndex].showSubtaskInput = false;
      this.inputControl.reset();
    }
  }

  onDelete(taskIndex: number) {
    this.inputControl.reset();
    this.taskData[taskIndex].subtaskInput = '';
    this.taskData[taskIndex].showSubtaskInput = false;
  }
}
