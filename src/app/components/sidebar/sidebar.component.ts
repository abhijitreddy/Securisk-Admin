import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() selectedNav: string = '';
  @Output() navChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onNavClick(nav: string) {
    this.navChange.emit(nav);
  }

}
