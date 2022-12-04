import React, { useEffect, useState }  from "react";
import { db } from "../../../Firebase/firebase-config";
import { collection, getDocs} from "firebase/firestore";
import Sidebar from "../../../Components/Sidebar";
import "./styles.scss";
import {Html5QrcodeScanner} from "html5-qrcode"

const MobileScanner = () => {

  function qr(){
    
    let html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: {width: 250, height: 250} },
      /* verbose= */ false);
      html5QrcodeScanner.render(onScanSuccess, onScanFailure);
  }
  function onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);
  }
  
  function onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
  }
  
    return(
      <>
      <div id="reader" width="600px">
        <button onClick={qr}>a</button>
      </div>

      </>
    )
  }
  
  export default MobileScanner;