import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ServerService } from '../server.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  lststock=[{
    name:'abc',
    id:null
      },
    ]
  strstock = '';
  dctItem :any;
  blnCard=false;

  searchstock: FormControl = new FormControl();

  constructor(private serverService:ServerService) { }

  ngOnInit(): void {
    // this.lststock = JSON.parse(localStorage.getItem('lstStock'))
    this.getData()
    this.searchstock.valueChanges
    // .debounceTime(400)
    .subscribe((strData: string) => {
      if (strData === undefined || strData === null) {
        this.lststock = [];
      } else {
        if (strData.length >= 2) {
          this.serverService
            .postData('stock/',{term:strData})
            .subscribe(
              (response) => {
                this.lststock = response['data'];
              }
            );
  
        }
      }
    }
    );
  }

  getData(){
    this.serverService.getData('itemcached').subscribe(res=>{
      console.log(res,'response');
      if(res['status']==1){
        this.lststock = res['data'];
      }
      else{
        Swal.fire('Error',res['reason'],'error');
      }
    })
  }

  stockChanged(item:any){
    console.log(item,'item');
    this.blnCard =true
    this.dctItem =item;
    // let lstCached = []
    // lstCached = JSON.parse(JSON.stringify(localStorage.getItem('lstStock')))
    // lstCached.push(item)
    // localStorage.setItem('lstStock',lstCached)
    this.serverService.postData('item',{item:item}).subscribe(res=>{
      console.log(res,'response');
      if(res['status']==1){
      }
      else{
        Swal.fire('Error',res['reason'],'error');
      }
    })

    this.getData()
  }

}
