import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'agmp-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() placeholder: string;
  @Input() name: string;
  @Input() label?: string;

  constructor() {}

  ngOnInit(): void {}
}
