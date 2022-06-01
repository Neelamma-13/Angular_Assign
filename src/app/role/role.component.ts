import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  columnDefs: ColDef[] = [
    { field: 'Role' },
    { field: 'Description' }
];

rowData = [
    { Role: 'Admin', Description: 'Admin',  },
    { Role: 'ITOUser', Description: 'user' }
];
}
