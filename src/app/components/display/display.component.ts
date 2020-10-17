import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { UtilityService } from 'src/app/services/utitilty/utility.service';
export interface PeriodicElement {
  firstName: string;
  lastName: string;
  email: string,
  mobileNo: string,
  profileUrl: string,
  edit: any,
  delete: any
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
// ];
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  constructor(private userService: UserService, private UtilityService: UtilityService) { }
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'mobileNumber', 'profileUrl', 'edit', 'delete'];
  // dataSource = ELEMENT_DATA;
  @Input() userArray = [];
  @Input() noProductCheck = false;
  @Output() messageEvent = new EventEmitter<any>();
  ngOnInit() {
  }
  deleteUser(row) {
    console.log(row);

    this.userService.deleteUser({ userId: row._id }).subscribe(data => {
      this.UtilityService.openSnackBar(data['message'], 'close')
      this.messageEvent.emit({ type: 'delete', data: '' })
    }, err => {
      this.UtilityService.openSnackBar(err.error.message, 'close')

    })
  }
  editUser(row) {
    console.log('row is ', row);

    let dumyProduct = {
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
      mobileNumber: row.mobileNumber ? row.mobileNumber : '',
      profileUrl: row.profileUrl,
      userId: row._id,
      password: row.password,
      type: 'update',

    }
    this.messageEvent.emit({ type: 'update', data: dumyProduct })
  }
}
