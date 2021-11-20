import { Component, Injectable, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';

interface result {
  responseCode: String,
  responseMessage: String,
  responseBody: any,
}
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE", "Access-Control-Allow-Origin": '*' })
};
const headers = new HttpHeaders({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE'

});
@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.css']
})


export class MainComponentComponent implements OnInit {

  a: any = []
  dropdownValue: String = "Transaction Type";
  name: String = "";
  state: String = "";
  tid: String = "";
  balence: String = "";
  tAmt: String = "";
  i: number = 0;
  constructor(private http: HttpClient) { }
  // 
  ngOnInit(): void {
  }

  clientAction() {
    this.dropdownValue = "Client"
    this.http.get<result>('http://localhost:8080/api/v1/client/showAllClient').subscribe(data => {
      if (data.responseCode == "200") {
        this.a = data.responseBody
        console.log(this.a);
      }

      else {
        const msg = data.responseMessage.split(':')
        this.a = []
        alert(msg[1])
      }
    },
      (error) => {
        alert("Request Failed")
      })

  }
  agentAction() {
    this.dropdownValue = "Agent"
    this.http.get<result>('http://localhost:8080/api/v1/agent/showAllAgent').subscribe(data => {
      if (data.responseCode == "200") {
        this.a = data.responseBody
        console.log(this.a);
      }

      else {
        const msg = data.responseMessage.split(':')
        this.a = []
        alert(msg[1])
      }
    },
      (error) => {
        alert("Request Failed")
      })
  }
  editForm(product: any, idx: number) {
    document.querySelector(".popup")?.classList.add("active");
    this.name = product.name;
    this.state = product.state;
    this.tAmt = product.transactionAmount;
    this.tid = product.transactionID;
    this.balence = product.balence;
    this.i = idx
    console.log(this.a[this.i].clientID)
  }
  closeForm() {
    document.querySelector(".popup")?.classList.remove("active");

  }
  httpDelete(product: any, idx: number) {
    if (this.dropdownValue == "Client") {
      this.http.delete('http://localhost:8080/api/v1/client/deleteCilent/'+this.a[idx].clientID, {
        headers: headers,
      }).subscribe((data:any) => {
        if (data.responseCode == "200") {
          console.log(data)
          alert("Data Deleted");
          this.a.splice(idx)
        }
        else {
          const msg = data.responseMessage.split(':')
          alert(msg)
        }
      },
        (error) => {
          alert("Request Failed")
        });
    }
    else if (this.dropdownValue == "Agent") {
      this.http.request<result>('delete', 'http://localhost:8080/api/v1/agent/deleteAgent', {
        body: {
          agentID: product.agentID,
          name: product.name,
          state: product.state,
          transactionID: product.transactionID,
          balence: product.balence,
          transactionAmount: product.transactionAmount
        }
      }).subscribe(data => {
        if (data.responseCode == "200") {
          console.log(data)
          alert("Data Deleted");
          this.a.splice(idx)
        }
        else {
          const msg = data.responseMessage.split(':')
          alert(msg)
        }
      },
        (error) => {
          alert("Request Failed")
        });
    }
  }
  httpPut(datat: NgForm) {
    console.log("Entered sending form")
    if (this.dropdownValue == "Client") {
      this.http.put<any>('http://localhost:8080/api/v1/client/editClient', {
        clientID: this.a[this.i].clientID,
        name: datat.value.name,
        state: datat.value.state,
        transactionID: datat.value.tid,
        balence: datat.value.balence,
        transactionAmount: datat.value.amt,
      }).subscribe(data => {
        if (data.responseCode == "200") {
          console.log(data)
          alert("Data Updated");
          this.a[this.i].name = datat.value.name
          this.a[this.i].state = datat.value.state
          this.a[this.i].transactionID = datat.value.tid
          this.a[this.i].balence = datat.value.balence
          this.a[this.i].transactionAmount = datat.value.amt
        }

        else {
          const msg = data.responseMessage.split(':')
          alert(msg)
        }
      },
        (error) => {
          alert("Request Failed")
        })
    }
    else if (this.dropdownValue == "Agent") {
      this.http.put<any>('http://localhost:8080/api/v1/agent/editAgent', {
        agentID: this.a[this.i].agentID,
        name: datat.value.name,
        state: datat.value.state,
        transactionID: datat.value.tid,
        balence: datat.value.balence,
        transactionAmount: datat.value.amt,
      }).subscribe(data => {
        if (data.responseCode == "200") {
          alert("Data Updated");
          this.a[this.i].name = datat.value.name
          this.a[this.i].state = datat.value.state
          this.a[this.i].transactionID = datat.value.tid
          this.a[this.i].balence = datat.value.balence
          this.a[this.i].transactionAmount = datat.value.amt
        }
        else {
          const msg = data.responseMessage.split(':')
          alert(msg)
        }
      },
        (error) => {
          alert("Request Failed")
        })
    }
  }

}

