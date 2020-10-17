import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user-service/user.service';
import { UtilityService } from 'src/app/services/utitilty/utility.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  userId: ''
  type: '',
  mobileNumber: '',
  profileUrl: ''
}
@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  url;
  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
    userId: new FormControl(''),
    mobileNumber: new FormControl(''),
    profileUrl: new FormControl('')
  });
  selectedType = 'add'
  constructor(public UtilityService: UtilityService, private userService: UserService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log('data is ', data);
    this.selectedType = data.type
    this.registerForm.setValue({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      userId: data.userId ? data.userId : '',
      mobileNumber: data.mobileNumber,
      profileUrl: data.profileUrl ? data.profileUrl : ''
    })
    this.url = data.profileUrl ? data.profileUrl : null
  }

  ngOnInit() {
  }
  register() {
    if (this.registerForm.invalid) {
      this.UtilityService.markFormGroupTouched(this.registerForm)
    } else {
      if (this.selectedType == 'add') {
        this.userService.create(this.registerForm.value).subscribe(data => {
          this.UtilityService.openSnackBar(data['message'], 'close')
          this.dialogRef.close(true);

        }, err => {
          this.UtilityService.openSnackBar(err.error.message, 'close')

        })
      } else {
        this.userService.update(this.registerForm.value).subscribe(data => {
          this.UtilityService.openSnackBar(data['message'], 'close')
          this.dialogRef.close(true);

        }, err => {
          this.UtilityService.openSnackBar(err.error.message, 'close')

        })
      }
    }
  }
  getErrorMessage(control: FormControl, alias: string) {
    return this.UtilityService.getErrorMessage(control, alias)
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files);

      this.profileUpdate(event.target.files[0])
    }
  }
  public delete() {
    this.url = null;
  }
  profileUpdate(file) {
    const formData = new FormData();
    formData.append('file', file)
    this.userService.uploadFile(formData).subscribe(data => {
      console.log('data is ', data);
      this.url = data['imageUrl']
      this.registerForm.controls['profileUrl'].setValue(this.url)

    }, err => {
      this.UtilityService.openSnackBar(err.error.message, 'close')

    })
  }
}
