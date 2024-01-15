import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import "./record.css";

// Record component for rendering each row in the table
const LeftRecord = (props) => (
  <tr>
    
    <td>{props.record.clname}</td>
    <td>{props.record.kslucc}</td>
    <td>{props.record.ks_panno}</td>
  </tr>
);

const RightRecord = (props) => (
  <tr>
    <td>
      <input
        type="checkbox"
        onChange={(e) => {
          props.toggleSelectedRecord(props.record, e.target.checked);
        }}
      />
    </td>
    <td>{props.record.clname}</td>
    <td>{props.record.kslucc}</td>
    <td>{props.record.ks_panno}</td>
  </tr>
);


// RecordList component
export default function RecordList() {
  // State variables
  const [records, setRecords] = useState([]);
  const [initialFetchComplete, setInitialFetchComplete] = useState(false);
 
  const [viewRecordDetails, setViewRecordDetails] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [excelDataForView, setExcelDataForView] = useState(null);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const [leftSearchTerm, setLeftSearchTerm] = useState("");
  const [rightSearchTerm, setRightSearchTerm] = useState("");
  const [leftRecords, setLeftRecords] = useState([]);
  const [rightRecords, setRightRecords] = useState([]);

  let history = useNavigate();

  // Fetch records on initial mount
  useEffect(() => {
    async function getRecords() {
      try {
        setLoading(true); // Set loading to true before starting the fetch
        const response = await fetch(`http://202.54.6.99:4000/record/`);
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
        const records = await response.json();
        setRecords(records);
        setInitialFetchComplete(true);
      } finally {
        setLoading(false); // Set loading to false after fetch completes (success or error)
      }
    }

    if (!initialFetchComplete) {
      getRecords();
    }

    return;
  }, [initialFetchComplete]);

  // Function to delete a record
  async function deleteRecord(id) {
    await fetch(`http://202.54.6.99:4000/record/${id}`, {
      method: "DELETE",
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }


  function toggleSelectedRecord(record, isChecked) {
    if (isChecked) {
      setSelectedRecords((prev) => [...prev, record]);
    } else {
      setSelectedRecords((prev) => prev.filter((r) => r._id !== record._id));
    }
  }

  
  // Function to print a record
  function printRecord(records) {
    // If only one record is selected, convert it to an array
    if (!Array.isArray(records)) {
      records = [records];
    }
  
    const printWindow = window.open("", "_blank");
    if (printWindow && printWindow.document) {
      records.forEach((record, index) => {
        printWindow.document.write(`
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <title></title>
                <meta name="description" content="">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="">
                <style>
                    body {
                    text-align: left;
                    margin-left: 50px;
                    margin-right: 50px;
                    }
            </style>
            </head>
            <body>
                
                <section>
                    <p><strong>Annexure 1- Format of Authorization Letter:</strong></p>
                    <p><strong>Date:</strong> January 12, 2024</p>
                    
                    <p>To,<br/>
                        Kotak Securities Ltd. Kotak Infinity 8th Floor.<br/>
                        Bldg No.21<br/>
                        Infinity Park, Off Western Exp. Highway Malad (E), Mumbai -<br/>
                        400097</p><br/>
                    <h4 style={{ textAlign : "center"}}>AUTHORISATION LETTER</h4>
            
                    <p><strong>Dear Sir/Madam,</strong></p>
            
                    
            
                    <p>I/We,  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;       residing at        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
                    having trading account with you under client code no. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;      I do hereby authorise Mr/Ms.    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        who *is / is not a PEP (Politically Exposed person) or Related to PEP.  <br/>
        Please confirm – Yes PEP or No PEP , relation &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        residing at  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        having contact no &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &  Email Id  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        (whose specimen signature is as attested below) to act as my / our Authorized Representative to do
        following acts,deeds and things for and on my behalf: </p>
        
        
        
            
                   
            
                    <ol>
                        <li>To sell, purchase, endors, negotiate and for otherwise deal in securities and / or sign and to
                            execute all transfer deeds whether as transferor or transferee and such other instruments,
                            application and documents as may be necessary for the purpose of acquiring or transferring the
                            same, marking pledge/lien on such securities or otherwise deal, negotiate or trade in securities
                            on my behalf including in the Futures & Options segment.</li>
                        <li>For the aforesaid purpose to sign contracts, agreements, transfers, acceptances, receipts,
                            acquaintances or other instruments, documents and forms, to accept and carry out
                            correspondence with such person(s) or authority/authorities or department(s) and to do all
                            lawful acts required for effecting the same.</li>
                        <li>To accept and give valid discharges for acceptances and submission of contract notes, bills,
                            ledger statements, transaction statements and all correspondence and communications
                            including all trade related communications on my behalf.</li>
                        <li>. I/We am/are aware that the Authority Letter cannot be executed in favour of <br/> a) Authorize
                            Person/ Franchisee and its employees and <br/> b) R eferrers, except for accounts belonging to the
                            relatives of such persons.</li>
                        
                    </ol>
        
        
        
            
                    <p>In case Referrer of the account is the same as Authorized Representative, the following clause is
                        applicable and I/We agree and accept the following: I/We am/ are aware and informed that
                        Exchanges have issued circulars on incentives/referral schemes which inter alia restricts the
                        Referrer from undertaking certain activities. I/We have read and understood all the circulars,
                        guidelines, clarifications etc., issued by Regulators from time-to-time and am aware of the risks
                        and implications in authorizing the R eferrer to act as my Authorized Representative. However,
                        I/We still wish to authorize as submitted vide my/ our above request and I/We therefore request
                        you to register the same in your records.</p>
            
                    <p>I/we hereby confirm and declare that my/our relation with the Authorized representative as 
        mentioned above is true and correct.</p>
            
                    <p>I / we hereby agree, ratify and confirm all acts, deeds and things of whatsoever nature done 
        by my / our authorized representative by virtue of this authority.</p>
        
                    <p>Accepted by the Authorized Representative:-</p>
                    <p>I hereby con rm the authority vested upon me by (name of the client) and agree to take all
                        ac on in good faith of the client.</p>
                    <input type="text" style="
                    width: 170px;
                    height: 60px;
                " />   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <input type="text" style="
                width: 170px;
                height: 60px;
            " />
                    <p>Client Signature   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   Specimen Signature of Authorized</p>
                    <p>Please affix photo of Authorized Representive duly signed across
                      <strong> *</strong> strike off whichever is not applicable.<input type="text" style="
                      width: 150px;
                      height: 180px;
                  " placeholder="Authorized Representative's Photograph duly
                  signed across" />
                       <ul>     • As a proof of iden a on & address of the aforemen oned Authorized representative, I/we
                        hereby enclose certified true copy of the following:
                        <li>- PAN card of the Authorized representative containing photo and signature (PANCARD ONLY). If signature
                        on PAN is not clear, than alternate signature proof to be provided along with PAN</li>
                        <li>- Address Proof (Passport/Driving License/Voters ID card</li></ul></p>
                </section>
                
        
        
        
        
        
        
        
        
        <br/><br/><br/><br/><br/><br/>
       
        
        <div style="page-break-after: always;"></div> <!-- Page break after each record -->
        
        <section>
        
            <p><strong><h4>Annexure 2</h4></strong></p>
                    
        
            <p><strong>Details of Authority Letter to be put on backside of AL by person collecting AL from the
                client</strong></p>
        
                <p>Name of the Client:   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/></P>
        
        
                    <p>Trading Code:<textarea id="w3review" name="w3review" rows="1" cols="1"></textarea></p>
        
        
        
            <p>Employee/Authorized Person Name (collecting this letter): </p>
        
            <p>Employment Code & Division /AP registration no.:</p>
            <p>Employee's/Authorized Person's/Authorized Contact Details:</p>
            <p>Employee Reporting To/ Franchisee RM:</p>
            <p>Date of Collection of this Letter:</p>
            <p>I hereby declare that this Authority Letter has been collected by me personally from
                the client.</p>
            <p>Date : </p>
            <p>Place: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (Signature of the Employee/Authorized Person)</p>
        
        </section>
        
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        
        <div style="page-break-after: always;"></div> <!-- Page break after each record -->
        <section>
            <p><strong>Annexure 3- Format of Board Resolution in case of corporate clients</strong></p>
            <p>CERTIFIED TRUE COPY OF THE RESOLUTION PASSED AT THE MEETING OF THE</p>
            <p></p>
            <p></p>
            <p>RESOLVED THAT the company be registered as CLIENT with Kotak Securities Ltd. Member of
                the Stock Exchange, Mumbai, Bombay Stock Exchange Limited (BSE), National Stock Exchange
                of India Ltd_(NSE), Metropolitan Stock Exchange of India (MSE), Multi Commodity Exchange
                (MCX) and National Commodity and Derivatives Exchange (NCDEX) and to authorize the
                under noted Authorized signatories, for the purpose of dealing in equities, derivatives ,
                commodities, debentures , debt & other products and the said member be and is hereby
                Authorized to honour instruction oral or written, given on behalf of the Company:-</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;SrNo. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Designation</p>
                <ol>
                    <li></li><br/>
                    <li></li>
                </ol>
                <p>who are/is Authorized to sell, purchase, transfer endorse, negotiate and / or otherwise deal with
                    / through Kotak Securities Ltd. on behalf of the company.</p>
                <p>RESOLVED FURTHER THAT Mr./Ms. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; and&nbsp;&nbsp;&nbsp;&nbsp; /&nbsp;&nbsp;&nbsp;&nbsp; or&nbsp;&nbsp;
                    Mr./Ms.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    . Directors of the company be and are hereby Authorized to sign,
                    execute and submit such applications, undertakings, agreements and other required
                    documents, writings and deeds as may deemed necessary or expedient to give effect to this
                    resolution.</p>
                <p>RESOLVED FURTHER THAT rights of the person who were previously Authorized
                    fordealing through/with, willcontinue withthe authority given toMr./Ms.   ............. . ................ (Name of above stated person) to deal with/through, Kotak
                    Securities Ltd.</p>
                <p>AND RESOLVED FURTHER THAT, the Common Seal of the Company be affixed, wherever
                    necessary, in the presence of all the directors and Company Secretary, who shall sign the same
                    intoken oftheir presence.</p>
                <p>For&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Ltd&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><br/><br/>
                <p>Company Secretary / Director of the company</p>
                <p>Specimen Signatures of the Authorized Rrepresentative/s</p>
                <p>Sr.No.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Specimen Signatures</p>
                <p>These signatures to be attested by the person signing the resolution for account opening on
                    behalf ofthe Company.</p>
        
        </section>
        
                <script src="" async defer></script>
                <div style="page-break-after: always;"></div> <!-- Page break after each record -->
            </body>
        </html>`);
              });
              printWindow.document.close();
              printWindow.onload = function() {
                printWindow.print();
              }
            } else {
              console.log("Failed to open print window.");
            }
          }
  // Function to set the details for viewing a record
  
  function viewleftRecord(record) {
    setViewRecordDetails(record);
    // Hide search bar and download buttons when viewing record
   setLeftSearchTerm("")
   
    // document.getElementById("searchBar").classList.add("hidden");
    // document.getElementById("downloadButton").classList.add("hidden");
  }
  function viewrightRecord(record) {
    setViewRecordDetails(record);
    // Hide search bar and download buttons when viewing record

   setRightSearchTerm("")
    // document.getElementById("searchBar").classList.add("hidden");
    // document.getElementById("downloadButton").classList.add("hidden");
  }

// Function to filter records based on search term
function filteredRecords(rightSearchTerm) {
  const selectedRecordsSet = new Set(selectedRecords.map((record) => record._id));

  if (!rightSearchTerm || rightSearchTerm.trim() === "") {
    const filtered = (rightRecords)
      .sort((a, b) => {
        const aIsSelected = selectedRecordsSet.has(a._id);
        const bIsSelected = selectedRecordsSet.has(b._id);

        if (aIsSelected && !bIsSelected) {
          return -1;
        } else if (!aIsSelected && bIsSelected) {
          return 1;
        } else {
          return 0;
        }
      });

    return filtered.map((record) => (
        <RightRecord
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          printRecord={() => printRecord(record)}
          viewRecord={() => viewrightRecord(record)}
          toggleSelectedRecord={toggleSelectedRecord}
          key={record._id}
        />
    ));
  } else {
    const terms = rightSearchTerm.split(',').map((term) => term.trim()); // Ensure terms is an array of trimmed strings
    const filtered = records
      .filter((record) =>
        record.kslucc && // Add a null check here
        typeof record.kslucc === "string" &&
        terms.some((term) => record.kslucc.trim().toLowerCase().includes(term.toLowerCase()))
      )
      .sort((a, b) => {
        const aIsSelected = selectedRecordsSet.has(a._id);
        const bIsSelected = selectedRecordsSet.has(b._id);

        if (aIsSelected && !bIsSelected) {
          return -1;
        } else if (!aIsSelected && bIsSelected) {
          return 1;
        } else {
          return 0;
        }
      });

      return filtered.map((record) => (
          <RightRecord
            record={record}
            deleteRecord={() => deleteRecord(record._id)}
            printRecord={() => printRecord(record)}
            viewRecord={() => viewrightRecord(record)}
            toggleSelectedRecord={toggleSelectedRecord}
            key={record._id}
          />
        
      ));
  }
}

function filteredRecord(leftSearchTerm) {
  const selectedRecordsSet = new Set(selectedRecords.map((record) => record._id));

  if (!leftSearchTerm || leftSearchTerm.trim() === "") {
    const filtered = (leftRecords)
      .sort((a, b) => {
        const aIsSelected = selectedRecordsSet.has(a._id);
        const bIsSelected = selectedRecordsSet.has(b._id);

        if (aIsSelected && !bIsSelected) {
          return -1;
        } else if (!aIsSelected && bIsSelected) {
          return 1;
        } else {
          return 0;
        }
      });

    return filtered.map((record) => (
        <LeftRecord
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          printRecord={() => printRecord(record)}
          viewRecord={() => viewleftRecord(record)}
          toggleSelectedRecord={toggleSelectedRecord}
          key={record._id}
        />
      
    ));
  } else {
    
    const filtered = records
      .filter((record) =>
        record.kslucc && // Add a null check here
        typeof record.kslucc === "string" &&
         record.kslucc.trim().toLowerCase().includes(leftSearchTerm.toLowerCase())
      )
      .sort((a, b) => {
        const aIsSelected = selectedRecordsSet.has(a._id);
        const bIsSelected = selectedRecordsSet.has(b._id);

        if (aIsSelected && !bIsSelected) {
          return -1;
        } else if (!aIsSelected && bIsSelected) {
          return 1;
        } else {
          return 0;
        }
      });

      return filtered.map((record) => (
          <LeftRecord
            record={record}
            deleteRecord={() => deleteRecord(record._id)}
            printRecord={() => printRecord(record)}
            viewRecord={() => viewleftRecord(record)}
            toggleSelectedRecord={toggleSelectedRecord}
            key={record._id}
          />
        
      ));
  }
}


  // Function to navigate to edit page
  function editRecord(record) {
    history(`/edit/${record.id}`);
  }


  // Function to generate Excel data for selected records
const generateAndDownloadView = () => {
  const data = [
    ["priority", "barcode", "brcd", "ucc", "kslucc"],
    ...selectedRecords.map((record) => [record.priority, record.barcode, record.brcd, record.ucc, record.kslucc]),
  ];

  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, "selected_records.xls");
};


  // Function to generate Excel data for the viewed record

    const generateAndDownloadExcelForView = (record) => {
      const data = [
        ["priority",	"barcode",	"brcd",	"ucc",	"kslucc"],
        [record.priority,record.barcode,record.brcd,record.ucc,record.kslucc],
      ];
  
      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, "tables.xls");
  };

  // Function to go back to the list view
  const backToList = () => {
    // Show search bar and download buttons when going back to the list
    setSearchTerm("");
    setViewRecordDetails(null);
  };

// Function to replace empty or undefined values with "-"
// const  = (value) => (value && value.trim() !== "" ? value.trim() : "---");
function clearSearchAndSelection() {
  setSearchTerm(""); // Clear the search field
  setSelectedRecords([]); // Uncheck all checkboxes
  setLeftSearchTerm("")
}
function clearSearchAndSelections() {
  setSearchTerm(""); // Clear the search field
  setSelectedRecords([]); // Uncheck all checkboxes
  setRightSearchTerm("")
}

function updateSearchBar(selectedRecords) {
  const searchValue = selectedRecords.map((record) => record.ucc).join(', ');
  setSearchTerm(searchValue);
}

// Function to clear selected records
function clearSelectedRecords() {
  setSelectedRecords([]);
  setSearchTerm("");
}


const handleSubmit = () => {
  // Check if there is a left search term
  if (leftSearchTerm.trim() !== "") {
    // Filter records based on left search term
    const filteredRecords = records.filter(
      (record) =>
        record.kslucc &&
        typeof record.kslucc === "string" &&
        record.kslucc.trim().toLowerCase().includes(leftSearchTerm.toLowerCase())
    );

    // Check if there's exactly one matching record
    if (filteredRecords.length === 1) {
      setViewRecordDetails({
        left: {
          name: filteredRecords[0].clname,
          // Add other left details
        },
        right: {
          ucc: "",
          // Add other right details
        },
      });
      return; // Exit the function to prioritize left search term
    } else {
      // Handle the case where more or fewer than one record is found
      // You may want to display a message or take appropriate action
      window.alert("Please provide a more specific left search term.");
      return; // Exit the function
    }
  }

  // Check if there is a right search term
  if (rightSearchTerm.trim() !== "") {
    // Filter records based on right search term
    const filteredRecords = records.filter(
      (record) =>
        record.kslucc &&
        typeof record.kslucc === "string" &&
        record.kslucc.trim().toLowerCase().includes(rightSearchTerm.toLowerCase())
    );

    // Check if there's exactly one matching record
    if (filteredRecords.length === 1) {
      setViewRecordDetails({
        left: {
          name: "",
          // Add other left details
        },
        right: {
          ucc: filteredRecords[0].kslucc,
          // Add other right details
        },
      });
      return; // Exit the function to prioritize right search term
    } else {
      // Handle the case where more or fewer than one record is found
      // You may want to display a message or take appropriate action
      window.alert("Please provide a more specific right search term.");
      return; // Exit the function
    }
  }

  // Handle the case where both left and right search terms are empty
  // You may want to display a message or take appropriate action
  window.alert("Please provide either a left or right search term.");
};



return (
  
  <div>
      
    {viewRecordDetails ? (
      <div>
       <section>
            <p><strong>Annexure 1- Format of Authorization Letter:</strong></p>
            <p><strong>Date:</strong> January 12, 2024</p>
            
            <p>To,<br/>
                Kotak Securities Ltd. Kotak Infinity 8th Floor.<br/>
                Bldg No.21<br/>
                Infinity Park, Off Western Exp. Highway Malad (E), Mumbai -<br/>
                400097</p><br/>
            <h4 style={{ textAlign : "center"}}>AUTHORISATION LETTER</h4>
    
            <p><strong>Dear Sir/Madam,</strong></p>
    
            
    
            <p>I/We,  {viewRecordDetails.clname}       residing at        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
            having trading account with you under client code no. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;      I do hereby authorise Mr/Ms.    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
who *is / is not a PEP (Politically Exposed person) or Related to PEP.  <br/>
Please confirm – Yes PEP or No PEP , relation &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
residing at  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
having contact no &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &  Email Id  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
(whose specimen signature is as attested below) to act as my / our Authorized Representative to do
following acts,deeds and things for and on my behalf: </p>



    
           
    
            <ol>
                <li>To sell, purchase, endors, negotiate and for otherwise deal in securities and / or sign and to
                    execute all transfer deeds whether as transferor or transferee and such other instruments,
                    application and documents as may be necessary for the purpose of acquiring or transferring the
                    same, marking pledge/lien on such securities or otherwise deal, negotiate or trade in securities
                    on my behalf including in the Futures & Options segment.</li>
                <li>For the aforesaid purpose to sign contracts, agreements, transfers, acceptances, receipts,
                    acquaintances or other instruments, documents and forms, to accept and carry out
                    correspondence with such person(s) or authority/authorities or department(s) and to do all
                    lawful acts required for effecting the same.</li>
                <li>To accept and give valid discharges for acceptances and submission of contract notes, bills,
                    ledger statements, transaction statements and all correspondence and communications
                    including all trade related communications on my behalf.</li>
                <li>. I/We am/are aware that the Authority Letter cannot be executed in favour of <br/> a) Authorize
                    Person/ Franchisee and its employees and <br/> b) R eferrers, except for accounts belonging to the
                    relatives of such persons.</li>
                
            </ol>



    
            <p>In case Referrer of the account is the same as Authorized Representative, the following clause is
                applicable and I/We agree and accept the following: I/We am/ are aware and informed that
                Exchanges have issued circulars on incentives/referral schemes which inter alia restricts the
                Referrer from undertaking certain activities. I/We have read and understood all the circulars,
                guidelines, clarifications etc., issued by Regulators from time-to-time and am aware of the risks
                and implications in authorizing the R eferrer to act as my Authorized Representative. However,
                I/We still wish to authorize as submitted vide my/ our above request and I/We therefore request
                you to register the same in your records.</p>
    
            <p>I/we hereby confirm and declare that my/our relation with the Authorized representative as 
mentioned above is true and correct.</p>
    
            <p>I / we hereby agree, ratify and confirm all acts, deeds and things of whatsoever nature done 
by my / our authorized representative by virtue of this authority.</p>

            <p>Accepted by the Authorized Representative:-</p>
            <p>I hereby con rm the authority vested upon me by (name of the client) and agree to take all
                ac on in good faith of the client.</p>
            <input type="text" style={{width:170,
            height:60}}/>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <input type="text" style={{width:170,
              height:60}}/>
            <p>Client Signature   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   Specimen Signature of Authorized</p>
            <p>Please affix photo of Authorized Representive duly signed across
              <strong> *</strong> strike off whichever is not applicable.<input type="text" style={{width:150,
            height:180}} placeholder="Authorized Representative's Photograph duly
          signed across" />
               <ul>     • As a proof of iden a on & address of the aforemen oned Authorized representative, I/we
                hereby enclose certified true copy of the following:
                <li>- PAN card of the Authorized representative containing photo and signature (PANCARD ONLY). If signature
                on PAN is not clear, than alternate signature proof to be provided along with PAN</li>
                <li>- Address Proof (Passport/Driving License/Voters ID card</li></ul></p>
        </section>
        








<br/><br/><br/><br/><br/><br/>



<section>

    <p><strong><h4>Annexure 2</h4></strong></p>
            

    <p><strong>Details of Authority Letter to be put on backside of AL by person collecting AL from the
        client</strong></p>

        <p>Name of the Client:   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/></p>


            <p>Trading Code:<textarea id="w3review" name="w3review" rows="1" cols="1"></textarea></p>



    <p>Employee/Authorized Person Name (collecting this letter): </p>

    <p>Employment Code & Division /AP registration no.:</p>
    <p>Employee's/Authorized Person's/Authorized Contact Details:</p>
    <p>Employee Reporting To/ Franchisee RM:</p>
    <p>Date of Collection of this Letter:</p>
    <p>I hereby declare that this Authority Letter has been collected by me personally from
        the client.</p>
    <p>Date : </p>
    <p>Place: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (Signature of the Employee/Authorized Person)</p>

</section>

<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>


<section>
    <p><strong>Annexure 3- Format of Board Resolution in case of corporate clients</strong></p>
    <p>CERTIFIED TRUE COPY OF THE RESOLUTION PASSED AT THE MEETING OF THE</p>
    <p></p>
    <p></p>
    <p>RESOLVED THAT the company be registered as CLIENT with Kotak Securities Ltd. Member of
        the Stock Exchange, Mumbai, Bombay Stock Exchange Limited (BSE), National Stock Exchange
        of India Ltd_(NSE), Metropolitan Stock Exchange of India (MSE), Multi Commodity Exchange
        (MCX) and National Commodity and Derivatives Exchange (NCDEX) and to authorize the
        under noted Authorized signatories, for the purpose of dealing in equities, derivatives ,
        commodities, debentures , debt & other products and the said member be and is hereby
        Authorized to honour instruction oral or written, given on behalf of the Company:-</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;SrNo. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Designation</p>
        <ol>
            <li></li><br/>
            <li></li>
        </ol>
        <p>who are/is Authorized to sell, purchase, transfer endorse, negotiate and / or otherwise deal with
            / through Kotak Securities Ltd. on behalf of the company.</p>
        <p>RESOLVED FURTHER THAT Mr./Ms. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; and&nbsp;&nbsp;&nbsp;&nbsp; /&nbsp;&nbsp;&nbsp;&nbsp; or&nbsp;&nbsp;
            Mr./Ms.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            . Directors of the company be and are hereby Authorized to sign,
            execute and submit such applications, undertakings, agreements and other required
            documents, writings and deeds as may deemed necessary or expedient to give effect to this
            resolution.</p>
        <p>RESOLVED FURTHER THAT rights of the person who were previously Authorized
            fordealing through/with, willcontinue withthe authority given toMr./Ms.   ............. . ................ (Name of above stated person) to deal with/through, Kotak
            Securities Ltd.</p>
        <p>AND RESOLVED FURTHER THAT, the Common Seal of the Company be affixed, wherever
            necessary, in the presence of all the directors and Company Secretary, who shall sign the same
            intoken oftheir presence.</p>
        <p>For&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Ltd&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><br/><br/>
        <p>Company Secretary / Director of the company</p>
        <p>Specimen Signatures of the Authorized Rrepresentative/s</p>
        <p>Sr.No.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Specimen Signatures</p>
        <p>These signatures to be attested by the person signing the resolution for account opening on
            behalf ofthe Company.</p>

</section>
    


          {/* Buttons for the specific record */}
          {/* <button onClick={() => editRecord(viewRecordDetails)}>Edit</button> */}
          <button onClick={() => printRecord(viewRecordDetails)}>Print</button>

          {/* Button for generating and downloading Excel for the specific record */}
          <button onClick={() => generateAndDownloadExcelForView(viewRecordDetails)}>
            Generate and Download Excel
          </button>

          <button onClick={backToList}>Back</button>
      </div>
    ) : (
      <div>
        <h3>Exclusive Record List</h3>
        <div style={{ float: "left", width: "50%" }}>
        <input
          type="text"
          placeholder="Search by UCC (Left)"
          value={leftSearchTerm}
          onChange={(e) => setLeftSearchTerm(e.target.value)}
        />
        <button onClick={clearSearchAndSelection}>Clear</button>

        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
             
              <th>Name</th>
              <th>Ucc</th>
              <th>Pan</th>&nbsp;
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>{filteredRecord(leftSearchTerm)}
          </tbody>
        </table>
        {loading && (
        <div className="loading-central-circle"></div>
      )}
        
      </div>

      <div style={{ float: "left", width: "50%" }}>
        <input
          type="text"
          placeholder="Search by UCC (Right)"
          value={rightSearchTerm}
          onChange={(e) => setRightSearchTerm(e.target.value)}
        />
        {selectedRecords.length > 0 && (
          <div>
            <strong>Selected Records:</strong> {selectedRecords.map((record) => record.ucc).join(', ')}
            <button onClick={clearSelectedRecords}>Clear Selection</button>
          </div>
        )}

        <button onClick={clearSearchAndSelections}>Clear</button>

        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Select</th>
              <th>Name</th>
              <th>Ucc</th>
              <th>Pan</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>{filteredRecords(rightSearchTerm)}
          </tbody>
        </table>
        {loading && (
        <div className="loading-central-circle"></div>
      )}
        
      </div>
      <button  onClick={handleSubmit}>Submit</button>


      </div>
    )}
  </div>
);
}

