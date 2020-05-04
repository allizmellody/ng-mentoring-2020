import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'courses-search',
  templateUrl: './courses-search.component.html',
  styleUrls: ['./courses-search.component.scss'],
})
export class CoursesSearchComponent implements OnInit {
  @Output() search = new EventEmitter<string>();
  public searchForm;

  constructor(private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({ input: '' });
  }

  ngOnInit(): void {}

  public onSubmit(data) {
    this.search.emit(data.input);
    this.searchForm.reset();
  }
}
