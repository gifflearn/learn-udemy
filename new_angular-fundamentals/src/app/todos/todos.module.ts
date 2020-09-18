import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosListComponent } from './todos-list/todos-list.component';
import { TodosItemComponent } from './todos-item/todos-item.component';

@NgModule({
  imports: [
    CommonModule,
    TodosRoutingModule
  ],
  declarations: [TodosListComponent, TodosItemComponent]
})
export class TodosModule { }
