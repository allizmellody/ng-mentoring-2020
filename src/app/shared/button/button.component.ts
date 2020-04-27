import { Component, ContentChild, Input, OnInit } from '@angular/core';

@Component({
  selector: 'agmp-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @ContentChild('child') child;
  @Input() text?: string;

  constructor() {}

  ngOnInit(): void {}
}
