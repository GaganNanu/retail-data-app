import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { RetailDataService } from 'src/app/services/retail-data/retail-data.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  // fileControl = new FormControl();
  typeControl = new FormControl();
  productsFileName = undefined;
  transactionsFileName = undefined;
  householdsFileName = undefined;
  productsFile = undefined;
  transactionsFile = undefined;
  householdsFile = undefined;
  uploading = false;
  fileData: any = new FormData();
  uploadProgress: number;
  uploadSub: Subscription;
  /**
   *
   */
  constructor(private retailDataService: RetailDataService, private toastr: ToastrService) {

  }

  upload() {
    if(this.uploading) return;
    if (!this.productsFile || !this.transactionsFile || !this.householdsFile) {
      this.toastr.error('Choose all three files before uploading');
      return;
    }
    this.uploading = true;

    this.fileData.append("products", this.productsFile);
    this.fileData.append("households", this.householdsFile);
    this.fileData.append("transactions", this.transactionsFile);

    this.retailDataService.upload(this.fileData).subscribe(response => {
      this.uploading = false;
      if (response == true) {
        this.toastr.success('Uploaded Sucessfully.');
      } else {
        this.toastr.error(response as string);
      }
    }, error => {
      this.uploading = false;
      this.toastr.error('Error while uploading please validate your csv columns')
    });
  }


  handleProductsFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.productsFileName = file.name;
      this.productsFile = file;
    }

    for (var p of this.fileData) {
      let name = p[0];
      let value = p[1];

      console.log(name, value)
    }

  }

  handleTransactionsFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.transactionsFileName = file.name;
      this.transactionsFile = file;
    }
    for (var p of this.fileData) {
      let name = p[0];
      let value = p[1];

      console.log(name, value)
    }
  }

  handleHouseHoldsFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.householdsFileName = file.name;
      this.householdsFile = file;
    }
    for (var p of this.fileData) {
      let name = p[0];
      let value = p[1];

      console.log(name, value)
    }
  }

  removeFile() {
    this.productsFileName = undefined;
    this.transactionsFileName = undefined;
    this.householdsFileName = undefined;
    this.fileData = undefined;
  }
}
