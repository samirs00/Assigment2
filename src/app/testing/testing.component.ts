import { Component, OnInit } from '@angular/core';

import { NgxXml2jsonService } from 'ngx-xml2json';

import * as convert from 'xml-js';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {

  hostUrl:any = "http://localhost:9090/Paytronix%20Phase%20I/ussd_endpoint.php";
  enterValue: any = "";
  jsonOutput: any;
  responseOutput: any = "";
  xmlData = '<?xml version="1.0" encoding="utf-8" ?> <request> <headertext>Can you answer the second question?</headertext>     <options> <option command="1" order="1" callback="www.google.com" display="true">This is option one here!</option>  <option command="2" order="2" callback="http://yourdomain.tld/ussdxml.ashx?file=1" display="true">Take me back to the first one!</option> </options> </request>';
  constructor(
    private ngxXml2jsonService: NgxXml2jsonService,
    private apiService: ApiService
  ) { }


  ngOnInit(): void {
  }

  testHandler(form, event) {

    // var result1:any = convert.xml2json(this.xmlData, {compact: true});
    // let result3 = JSON.parse(result1) 
    // console.log("jsonresponse 1:", result3.request);
    // console.log("jsonresponse 2:", result2);
    // return 
    if(this.enterValue != ""){
      if(this.enterValue == '*120*4901'){
        let parameter = {
          url: this.hostUrl + '?msisdn=0731916539&request=' + this.enterValue
        }
        this.getApi(parameter).then(res =>{
          console.log("API response *120*4901 :", res)
          let response:any = res;
          var result1:any = convert.xml2json(response, {compact: true});
          this.jsonOutput = JSON.parse(result1);
          this.responseOutput = "";
          this.responseOutput = this.jsonOutput.request.headertext._text;
          this.responseOutput = this.responseOutput + '\n' + this.addmultiLineData(this.jsonOutput.request.options.option)
          this.enterValue = "";
  
        }).catch(err =>{
          console.log("error in API response :", err)
        })
      }else{
          console.log("else :", this.jsonOutput)
          console.log("api request ::", this.jsonOutput.request.options.option[this.enterValue])
          var peticularRequest:any 
          if(!Array.isArray(this.jsonOutput.request.options.option)){
             peticularRequest = this.jsonOutput.request.options.option
          }else{
            peticularRequest = this.jsonOutput.request.options.option[this.enterValue]
          }
          let parameter = {
            url: peticularRequest._attributes.callback + '&msisdn=0731916539&request=' + this.enterValue
          }
          this.getApi(parameter).then(res =>{
            console.log("API response other :", res)
            let response:any = res;
            var result1:any = convert.xml2json(response, {compact: true});
            this.jsonOutput = JSON.parse(result1);
            this.responseOutput = "";
            this.responseOutput = this.jsonOutput.request.headertext._text;
            this.responseOutput = this.responseOutput + '\n' + this.addmultiLineData(this.jsonOutput.request.options.option)
            this.enterValue = "";
    
          }).catch(err =>{
            console.log("error in API response :", err)
          })
      }
    }


    // return;

    // if(this.enterValue != ""){
    //   let parameter = {
    //     url: this.hostUrl + '?msisdn=0731916539&request=' + this.enterValue
    //   }
    //   this.getApi(parameter).then(res =>{
    //     console.log("API response :", res)
    //     let response:any = res;
    //     const parser = new DOMParser();
    //     const xml = parser.parseFromString(response, 'text/xml');
    //     let jsonresponse:any = this.ngxXml2jsonService.xmlToJson(xml);
    //     console.log("jsonresponse :", jsonresponse);
    //     console.log("parse value :", JSON.stringify(jsonresponse))
    //     this.responseOutput = "";
    //     this.responseOutput = jsonresponse.request.headertext._text;
    //     this.responseOutput = this.responseOutput + '\n' + this.addmultiLineData(jsonresponse.request.options.option)

    //   }).catch(err =>{
    //     console.log("error in API response :", err)
    //   })
    // }




    // if (this.enterValue != "") {
    //   this.responseOutput = "";
    //   if (this.enterValue == '*123*348#') {
    //     this.responseOutput = 'Welcome to Ithuba Online' + '\n' + '1. Registration' + '\n' + '2. Exit';
    //   }
    //   else if (this.enterValue == '1') {
    //     this.responseOutput = "I am above 18 \n 3. Yes \n 4. No";
    //   }
    //   else if (this.enterValue == '2') {
    //     this.responseOutput = "Thank for connecting us";
    //   }
    //   else if (this.enterValue == '3') {
    //     this.responseOutput = "Please create your 5 digit PIN followed by # key";
    //   } else {
    //     this.responseOutput = "Registration successfull !!";
    //   }

    //   this.enterValue = "";
    // }


    // const parser = new DOMParser();
    // const xml = parser.parseFromString(this.xmlData, 'text/xml');
    // let json:any = this.ngxXml2jsonService.xmlToJson(xml);
    // console.log("json data :", json.request);
    // this.responseOutput = "";
    // this.responseOutput = json.request.headertext;
    // this.responseOutput = this.responseOutput + '\n' + this.addmultiLineData(json.request.options.option)



  }
  addmultiLineData(options) {
    let res = "";
    if(!Array.isArray(options)){
      return '1. '+ options._text
    }
    for (let index = 0; index < options.length; index++) {
      res = res + options[index]._attributes.order + '. '+ options[index]._text + '\n'
    }
    console.log("res :" , res)
    return res;
  }

  getApi(data) {
    return new Promise((resolve, reject) => {
      this.apiService.jsonGetApiCallObservableHandler(
        data, (res) => {
          if (res) {
            resolve(res)
          } else {
            reject(null)
          }
        })
    })
  }

}
