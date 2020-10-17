import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilityService } from 'src/app/services/utitilty/utility.service';
import { Router } from '@angular/router';
import { UserCreateComponent } from '../user-create/user-create.component';
import { UserService } from 'src/app/services/user-service/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);
  mobileQuery: MediaQueryList;
  userArray = [];
  categoryArray = [];
  userData = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    type: 'add',
    mobileNumber: ''
  }
  noProductCheck = false;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public dialog: MatDialog,
    private UtilityService: UtilityService, private UserService: UserService,
    private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit() {
    // this.getProducts()
    // this.getAllCategory()
    this.getUser()
  }
  // getAllCategory() {
  //   this.productService.getAllCategory().subscribe(data => {
  //     this.categoryArray = data['data']
  //   }, err => {
  //     this.UtilityService.openSnackBar(err.error.message, 'close')

  //   })
  // }
  getUser() {
    this.noProductCheck = false;
    this.UserService.getAllUser().subscribe(data => {
      this.userArray = data['data']
    }, err => {
      this.UtilityService.openSnackBar(err.error.message, 'close')

    })
  }
  addUpdateUser(data = this.userData): void {
    const dialogRef = this.dialog.open(UserCreateComponent, {
      width: '500px',
      data: data,
      panelClass: 'addUpdate'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.getUser()
      }
      // this.animal = result;
    });
  }
  update(data) {
    if (data.type == 'delete') {
      this.getUser()
    } else if (data.type == 'update') {
      this.addUpdateUser(data.data)
    }
  }
  filter(categoryName) {
    // console.log('filter ', categoryName);
    // this.noProductCheck = false;
    // this.productService.getProductByCategory(categoryName).subscribe(data => {
    //   console.log('all product', data);
    //   this.product = data['data']
    //   this.noProductCheck = true;

    // }, err => {
    //   console.log('err product', err);

    // })
  }
  addCategory() {
    // const dialogRef = this.dialog.open(AddCategoryComponent, {
    //   width: '400px',

    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   if (result) {
    //     this.getAllCategory()
    //   }
    //   // this.animal = result;
    // });
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigateByUrl('login')
  }
}
