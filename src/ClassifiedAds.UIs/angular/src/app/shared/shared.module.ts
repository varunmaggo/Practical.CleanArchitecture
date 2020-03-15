import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StarComponent } from "./star.component";
import { FormsModule } from "@angular/forms";
import { AppendVersionPipe } from "./append-version.pipe";
import { AppendCurrentDateTimePipe } from "./append-current-datetime.pipe";

@NgModule({
  imports: [CommonModule],
  declarations: [StarComponent, AppendVersionPipe, AppendCurrentDateTimePipe],
  exports: [
    StarComponent,
    AppendVersionPipe,
    AppendCurrentDateTimePipe,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule {}
