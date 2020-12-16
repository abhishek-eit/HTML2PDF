import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MainService } from "../services/main.service";

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

@Component({
  selector: "app-root-main",
  templateUrl: "./root.component.html",
  styleUrls: ["./root.component.css"],
})
export class RootComponent implements OnInit {
  firstTableData: any;
  secondTableData: any;
  dataLoaded: boolean = false;
  inputForm: FormGroup;
  total_time: number = 0;
  total_amount: number = 0;
  constructor(private mainService: MainService, private fb: FormBuilder) {
    this.inputForm = this.fb.group({ job_id: [null] });
  }

  ngOnInit(): void {}

  onSubmit() {
    let id = this.inputForm.controls.job_id.value;
    if (id && id > 0) {
      this.mainService.getData(id).subscribe((res: any) => {
        console.log(res);
        if (res.msg != "Something Went Wrong") {
          this.firstTableData = res.jobTableData;
          this.secondTableData = res.secondTableData;
          this.secondTableData.forEach((element) => {
            element.approval_time = Number(
              element.approval_hour + +element.approval_min / 60
            ).toFixed(2);
            element.regular_amount =
              element.approval_time * element.approval_payment;

            this.total_time = this.total_time + +element.approval_time;
            this.total_amount = this.total_amount + +element.regular_amount;
          });
          console.log(this.secondTableData);
          this.dataLoaded = true;
        } else {
          this.dataLoaded = false;
        }
      });
    }
  }

  downloadPDF() {
    let element: HTMLElement = document.querySelector("#pdfExport");
    html2canvas(element).then((canvas) => {
      let imageData = canvas.toDataURL("image/png");
      let imgHeight = (canvas.height * 208) / canvas.width;
      let doc = new jsPDF();
      doc.addImage(imageData, 0, 0, 208, imgHeight);
      doc.save("image.pdf");
    });
  }
}
