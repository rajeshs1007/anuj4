// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const Record = (props) => (
//   <tr>
//     <td>{props.record.name}</td>
//     <td>{props.record.position}</td>
//     <td>{props.record.level}</td>
//     <td>
//       <Link className="btn btn-link" to={`/edit/${props.record._id}`}>
//         Edit
//       </Link>{" "}
//       |{" "}
//       <button
//         className="btn btn-link"
//         onClick={() => {
//           props.deleteRecord(props.record._id);
//         }}
//       >
//         Delete
//       </button>
//     </td>
//   </tr>
// );

// export default function RecordList() {
//   const [records, setRecords] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     // Fetch records when the component mounts
//     async function fetchRecords() {
//       try {
//         const response = await fetch("http://localhost:5050/record/");
//         if (!response.ok) {
//           throw new Error(`Failed to fetch records: ${response.statusText}`);
//         }
//         const data = await response.json();
//         setRecords(data);
//       } catch (error) {
//         console.error(error);
//         // Handle error, e.g., display an error message to the user
//       }
//     }

//     fetchRecords();
//   }, []);

//   // Delete a record
//   async function deleteRecord(id) {
//     try {
//       const response = await fetch(`http://localhost:5050/record/${id}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to delete record: ${response.statusText}`);
//       }

//       // Update the state to remove the deleted record
//       const newRecords = records.filter((record) => record._id !== id);
//       setRecords(newRecords);
//     } catch (error) {
//       console.error(error);
//       // Handle error, e.g., display an error message to the user
//     }
//   }

//   // Filter records based on the search term
//   const filteredRecords = records.filter(
//     (record) =>
//       record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       record.position.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       <h3>Record List</h3>
//       {/* Search Bar */}
//       <input
//         type="text"
//         placeholder="Search by name or position"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <table className="table table-striped" style={{ marginTop: 20 }}>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Position</th>
//             <th>Level</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredRecords.map((record) => (
//             <Record
//               record={record}
//               deleteRecord={() => deleteRecord(record._id)}
//               key={record._id}
//             />
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }




















// Import necessary libraries and styles
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import "./record.css";

// Record component for rendering each row in the table
const Record = (props) => (
  <tr>
    <td>{props.record.clname}</td>
    <td>{props.record.ucc}</td>
    <td>{props.record.panno}</td>

    <td>
      <button
        className="btn btn-link"
        onClick={() => {
          props.viewRecord(props.record);
        }}
      >
        View
      </button>
    </td>
  </tr>
);

// RecordList component
export default function RecordList() {
  // State variables
  const [records, setRecords] = useState([]);
  const [initialFetchComplete, setInitialFetchComplete] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewRecordDetails, setViewRecordDetails] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [excelDataForView, setExcelDataForView] = useState(null);
  let history = useNavigate();

  // Fetch records on initial mount
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:4000/record/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
      setInitialFetchComplete(true);
    }

    if (!initialFetchComplete) {
      getRecords();
    }

    return;
  }, [initialFetchComplete]);

  // Function to delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:4000/record/${id}`, {
      method: "DELETE",
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // Function to print a record
  function printRecord(record) {
    const printWindow = window.open("");
    printWindow.document.write(` <html>
          <head>
          <title>.</title>
          <style>
      body {
        text-align: center;
        transform: scale(0.8);
        transform-origin: top center;
      }

      table {
        border-collapse: collapse;
        width: 100%;
        margin: 0 auto;
        border: 2px solid black;
      }

      th, td {
        border: 1px solid #dddddd;
        text-align: center;
        padding: 8px;
        border: 2px solid black;
      }

      th {
        background-color: #f2f2f2;
        border: 2px solid black;
      }

      /* Set A4 size paper */
      @media print {
        body {
          width: 210mm;
          height: 297mm;
        }
      }
    </style>

          </head>
          <body>         
          <h4>Closer Information Report For Client Transfer</h4>
    <table  class="1">
      <thead>
        <tr>
          <th>  </th>
          <th>Ucc</th>
          <th>Name</th>
          <th>AP NAME/SERIES</th>
          <th>AP TERMINAL ID</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>INFO.</th>
          <td>${record.ucc|| 'N/A'}</td>
          <td>${record.clname|| 'N/A'}</td>
          <td>${record.brname|| 'N/A'}</td>
          <td>${record.neoid||"Not alloted"},${record.odinid||"Not alloted"}</td>
        </tr>
      </tbody>
    </table>

    <h4>Check POINT - KOTAK -1</h4>
    <table class="2">
    
      <thead>
        <tr>
        <th></th>
        <th>Client A/c Open In Kotak</th>
          <th colSpan="6">Segment activation in kotak</th>
          <th>Esl DP Mapped In Kotak</th>
          <th>Location At Kotak</th>
        </tr>
        <tr>
          <th></th>
          <td></td>
          <th colspan="2">Cash</th>
          <th colspan="2">F&O</th>
          <th colspan="2">Others(cds,mcx,ncdex)</th>
          <th></th>
          <th></th>
        </tr>
        <tr>
          <th></th>
          <td></td>
          <th>ESL</th>
          <th>KSL</th>
          <th>ESL</th>
          <th>KSL</th>
          <th>ESL</th>
          <th>KSL</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
        <th>INFO.</th>
        <td>${record.kslucc|| 'N/A'}</td>
        <td>${record.es_nsecm|| 'N/A'}</td>
        <td>${record.ks_nsecm|| 'N/A'}</td>
          <td>${record.es_nsefo|| 'N/A'}</td>
          <td>${record.ks_nsefo|| 'N/A'}</td>
          <td>${record.es_nsecds|| 'N/A'},${record.es_mcx|| 'N/A'} , ${record.es_ncdex|| 'N/A'}</td>
          <td>${record.ks_nsecds|| 'N/A'},${record.ks_mcx|| 'N/A'} , ${record.ks_ncdex|| 'N/A'}</td>
          <td>${record.esdp_map|| "Not MAP"}</td>
          <td>${record.locationid|| 'N/A'}</td>
        </tr>
        <tr>
        <th>SIGN</th>
        <td></td>
        <td></td>
        <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>


    <h4>Check Point - DP/DMAT - 2</h4>    
    <table class="3">

      <thead>
        <tr>
          <th></th>
          <th>Cash Equivalant Holding</th>
          <th>Pending CORP. Action</th>
          <th>Portfolio Reconsilation</th>
          <th>DP Holding</th>
          <th>Pledge Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>INFO.</th>
          <td>${record.es_ccol|| 'N/A'}</td>
          <td>${record.es_corpact === 1 ? 'True' :'False'}</td>
          <td>${record.es_pfreco|| 'N/A'}</td>
          <td>${record.es_dphldg|| 'N/A'}</td>
          <td>${record.es_pledval|| 'N/A'}</td>
        </tr>
        <tr>
          <th>SIGN</th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>


    <h4>Check Point - FROM CLIENT - 3</h4>
    <table class="4">
   
      <thead>
        <tr>
          <th></th>
          <th>Kotak Bank A/C Add in Client Netbanking</th>
          <th>Pending IPO Application</th>
          <th>Pending Claim Of IEPF/Other</th>
          <th colSpan="2">Existing Trading Platform Information</th>
       
        </tr>
        <tr>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th>Self</th>
        <th>Ap</th>
      
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>INFO.</th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          
        </tr>
        <tr>
          <th>SIGN</th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          
        </tr>
      </tbody>
    </table>



    <h4>Check Point - BEFORE CLOSER - 4</h4>
    <table class="5">
      <thead>
        <tr>
          <th></th>
          <th colSpan="3">Position</th>
          <th colSpan="2">Account Balance ESL</th>
          <th>Last Trade Date </th>
          <th>F&O Margin</th>
          <th>Confirm Correct Mapped</th>
          
        </tr>
        <tr>
        <th></th>
        <th>CASH</th>
        <th>F&O</th>
        <th>MTF</th>
        <th>Dp</th>
        <th>Trading</th>
        <th></th>
        <th></th>
        <th></th>
        
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>INFO.</th>
          <td></td>
          <td>${record.es_opnpos === 1 ? 'True' :'False' || '-'}</td>
          <td>${record.es_mtfpos === 1 ? "True" : "False" || '-'}</td>
          <td>${record.es_dpledg|| 'N/A'}</td>
          <td>${record.es_ledbal|| 'N/A'}</td>
          <td>${record.es_lstrdt|| 'N/A'}</td>
          <td>${record.es_margin||"NIL"}</td>
          <td></td>
          
        </tr>
        <tr>
          <th>SIGN</th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        
        </tr>
        <tr colSpan="9">
        <th colSpan="9"> Note : Checked All Information Now Proceed For Clouser &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input type="text"  placeholder="SIGN"></input></th>
        </tr>
      </tbody>
    </table>


    <h4>Check Point - CLOSER PROCDURED - 5</h4>
    <table class="6">
      <thead>
        <tr>
          <th></th>
          <th>Unpledge Shares</th>
          <th>Suspend Client On ODIN</th>
          <th>DP Closer Transfer</th>
          <th>Realese Of fund From Exchange(If Credit)</th>
          <th>Credit Balance TRF to Client</th>
          <th>Closer A/C In Exchange</th>
          
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>INFO.</th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          
        </tr>
        <tr>
          <th>SIGN</th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          
        </tr>
      </tbody>
    </table>
    
    </body>
           </html>`);
    printWindow.document.close();
    printWindow.print();
  }

  // Function to set the details for viewing a record
  
  function viewRecord(record) {
    setViewRecordDetails(record);
    // Hide search bar and download buttons when viewing record
    setSearchTerm("");
    // document.getElementById("searchBar").classList.add("hidden");
    // document.getElementById("downloadButton").classList.add("hidden");
  }

  // Function to filter records based on search term
  function filteredRecords() {
    if (searchTerm.trim() === "") {
      return null;
    } else {
      return records
        .filter((record) =>
          record.ucc &&
          typeof record.ucc === "string" &&
          record.ucc.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((record) => (
          <Record
            record={record}
            deleteRecord={() => deleteRecord(record._id)}
            printRecord={() => printRecord(record)}
            viewRecord={() => viewRecord(record)}
            key={record._id}
          />
        ));
    }
  }

  // Function to navigate to edit page
  function editRecord(record) {
    history(`/edit/${record.id}`);
  }

  // Function to generate Excel data for all records
  const generateAndDownloadView = () => {
    const data = [
      ["priority",	"barcode",	"brcd",	"ucc",	"kslucc",	"clname",	"ks_dpid_a",	"ksdp_boid",	"dp_ratecd",	"catg",	"panno",	"neoid",	"odinid",	"bossid",	"locationid",	"es_locnid",	"eckyc_no",	"k_platform",	"ks_clusrid",	"ks_ralfno",	"ks_ralncm",	"ks_dpid_b",	"ks_dpboid",	"esdp_map",	"es_dpboid",	"ks_nomn",	"ks_relwapc",	"es_nomn",	"es_relwapc",	"ks_clsts",	"es_clsts",	"ac_closed",	"ks_nsecm",	"es_nsecm",	"is_mtchncm",	"ks_bsecm",	"es_bsecm",	"is_mtchbcm",	"ks_nsefo",	"es_nsefo",	"is_mtchnfo",	"ks_nsecds",	"es_nsecds",	"is_mtchcds",	"ks_mcx",	"es_mcx",	"is_mtchmcx",	"ks_ncdex",	"es_ncdex",	"is_mtchncd",	"ks_emailid",	"es_email",	"is_mtch_em",	"ks_emrel",	"es_emrel",	"ks_mobile",	"es_mobile",	"is_mtch_mo",	"ks_mobrel",	"es_mobrel",	"es_netbkg",	"ks_lstrdt",	"es_lstrdt",	"closer_trf",	"es_mtfpos",	"es_opnpos",	"es_margin",	"es_ledbal",	"es_dpledg",	"es_dphldg",	"es_ccol",	"es_nccol",	"es_pledval",	"es_corpact",	"es_pfreco",	"cmbkgsts",	"fobkgsts",	"cobkgsts",	"cdsbkgsts",	"brname"
      ],
      ...records.map((record) => [record.priority,record.barcode	,record.brcd	,record.ucc	,record.kslucc	,record.clname	,record.ks_dpid_a	,record.ksdp_boid	,record.dp_ratecd	,record.catg	,record.panno	,record.neoid	,record.odinid	,record.bossid	,record.locationid	,record.es_locnid	,record.eckyc_no	,record.k_platform	,record.ks_clusrid	,record.ks_ralfno	,record.ks_ralncm	,record.ks_dpid_b	,record.ks_dpboid	,record.esdp_map	,record.es_dpboid	,record.ks_nomn	,record.ks_relwapc	,record.es_nomn	,record.es_relwapc	,record.ks_clsts	,record.es_clsts	,record.ac_closed	,record.ks_nsecm	,record.es_nsecm	,record.is_mtchncm	,record.ks_bsecm	,record.es_bsecm	,record.is_mtchbcm	,record.ks_nsefo	,record.es_nsefo	,record.is_mtchnfo	,record.ks_nsecds	,record.es_nsecds	,record.is_mtchcds	,record.ks_mcx	,record.es_mcx	,record.is_mtchmcx	,record.ks_ncdex	,record.es_ncdex	,record.is_mtchncd	,record.ks_emailid	,record.es_email	,record.is_mtch_em	,record.ks_emrel	,record.es_emrel	,record.ks_mobile	,record.es_mobile	,record.is_mtch_mo	,record.ks_mobrel	,record.es_mobrel	,record.es_netbkg	,record.ks_lstrdt	,record.es_lstrdt	,record.closer_trf	,record.es_mtfpos	,record.es_opnpos	,record.es_margin	,record.es_ledbal	,record.es_dpledg	,record.es_dphldg	,record.es_ccol	,record.es_nccol	,record.es_pledval	,record.es_corpact	,record.es_pfreco	,record.cmbkgsts	,record.fobkgsts	,record.cobkgsts	,record.cdsbkgsts	,record.brname
      ]),
    ];

    setExcelData(data);
    if (excelData) {
      const ws = XLSX.utils.aoa_to_sheet(excelData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, "records.xls");
    }
  };

  // Function to download Excel for all records


  // Function to generate Excel data for the viewed record

    const generateAndDownloadExcelForView = (record) => {
      const data = [
        ["priority",	"barcode",	"brcd",	"ucc",	"kslucc",	"clname",	"ks_dpid_a",	"ksdp_boid",	"dp_ratecd",	"catg",	"panno",	"neoid",	"odinid",	"bossid",	"locationid",	"es_locnid",	"eckyc_no",	"k_platform",	"ks_clusrid",	"ks_ralfno",	"ks_ralncm",	"ks_dpid_b",	"ks_dpboid",	"esdp_map",	"es_dpboid",	"ks_nomn",	"ks_relwapc",	"es_nomn",	"es_relwapc",	"ks_clsts",	"es_clsts",	"ac_closed",	"ks_nsecm",	"es_nsecm",	"is_mtchncm",	"ks_bsecm",	"es_bsecm",	"is_mtchbcm",	"ks_nsefo",	"es_nsefo",	"is_mtchnfo",	"ks_nsecds",	"es_nsecds",	"is_mtchcds",	"ks_mcx",	"es_mcx",	"is_mtchmcx",	"ks_ncdex",	"es_ncdex",	"is_mtchncd",	"ks_emailid",	"es_email",	"is_mtch_em",	"ks_emrel",	"es_emrel",	"ks_mobile",	"es_mobile",	"is_mtch_mo",	"ks_mobrel",	"es_mobrel",	"es_netbkg",	"ks_lstrdt",	"es_lstrdt",	"closer_trf",	"es_mtfpos",	"es_opnpos",	"es_margin",	"es_ledbal",	"es_dpledg",	"es_dphldg",	"es_ccol",	"es_nccol",	"es_pledval",	"es_corpact",	"es_pfreco",	"cmbkgsts",	"fobkgsts",	"cobkgsts",	"cdsbkgsts",	"brname"
      ],
        [record.priority,record.barcode	,record.brcd	,record.ucc	,record.kslucc	,record.clname	,record.ks_dpid_a	,record.ksdp_boid	,record.dp_ratecd	,record.catg	,record.panno	,record.neoid	,record.odinid	,record.bossid	,record.locationid	,record.es_locnid	,record.eckyc_no	,record.k_platform	,record.ks_clusrid	,record.ks_ralfno	,record.ks_ralncm	,record.ks_dpid_b	,record.ks_dpboid	,record.esdp_map	,record.es_dpboid	,record.ks_nomn	,record.ks_relwapc	,record.es_nomn	,record.es_relwapc	,record.ks_clsts	,record.es_clsts	,record.ac_closed	,record.ks_nsecm	,record.es_nsecm	,record.is_mtchncm	,record.ks_bsecm	,record.es_bsecm	,record.is_mtchbcm	,record.ks_nsefo	,record.es_nsefo	,record.is_mtchnfo	,record.ks_nsecds	,record.es_nsecds	,record.is_mtchcds	,record.ks_mcx	,record.es_mcx	,record.is_mtchmcx	,record.ks_ncdex	,record.es_ncdex	,record.is_mtchncd	,record.ks_emailid	,record.es_email	,record.is_mtch_em	,record.ks_emrel	,record.es_emrel	,record.ks_mobile	,record.es_mobile	,record.is_mtch_mo	,record.ks_mobrel	,record.es_mobrel	,record.es_netbkg	,record.ks_lstrdt	,record.es_lstrdt	,record.closer_trf	,record.es_mtfpos	,record.es_opnpos	,record.es_margin	,record.es_ledbal	,record.es_dpledg	,record.es_dphldg	,record.es_ccol	,record.es_nccol	,record.es_pledval	,record.es_corpact	,record.es_pfreco	,record.cmbkgsts	,record.fobkgsts	,record.cobkgsts	,record.cdsbkgsts	,record.brname
        ],
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

  return (
    <div>
      
      {viewRecordDetails ? null : (
        <div>
          <h3>Record List</h3>
          <input
            type="text"
            placeholder="Search by Position"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            id="searchBar"
          />

<button onClick={() => generateAndDownloadView()}>
            Generate and Download Excel
          </button>
        </div>
      )}

      {viewRecordDetails ? (
        <div>
          <h3>Details for {viewRecordDetails.clname}</h3>
          {/* Displaying record details */}
          <h4>Closer Information Report For Client Transfer</h4>
    <table  class="1">
      <thead>
        <tr>
          <th>  </th>
          <th>Ucc</th>
          <th>Name</th>
          <th>AP NAME/SERIES</th>
          <th>AP TERMINAL ID</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>INFO.</th>
          <td>{(viewRecordDetails.ucc|| 'N/A')}</td>
          <td>{(viewRecordDetails.clname|| 'N/A')}</td>
          <td>{viewRecordDetails.brname|| 'N/A'}</td>
          <td>{(viewRecordDetails.neoid||"Not alloted")},{(viewRecordDetails.odinid||"Not alloted")}</td>
        </tr>
      </tbody>
    </table>

    <h4>Check POINT - KOTAK -1</h4>
    <table class="2">
    
      <thead>
        <tr>
        <th></th>
        <th>Client A/c Open In Kotak</th>
          <th colSpan="6">Segment activation in kotak</th>
          <th>Esl DP Mapped In Kotak</th>
          <th>Location At Kotak</th>
        </tr>
        <tr>
          <th></th>
          <td></td>
          <th colspan="2">Cash</th>
          <th colspan="2">F&O</th>
          <th colspan="2">Others(cds,mcx,ncdex)</th>
          <th></th>
          <th></th>
        </tr>
        <tr>
          <th></th>
          <td></td>
          <th>ESL</th>
          <th>KSL</th>
          <th>ESL</th>
          <th>KSL</th>
          <th>ESL</th>
          <th>KSL</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
        <th>INFO.</th>
        <td>{(viewRecordDetails.kslucc|| 'N/A')}</td>
        <td>{(viewRecordDetails.es_nsecm|| 'N/A')}</td>
        <td>{(viewRecordDetails.ks_nsecm|| 'N/A')}</td>
          <td>{(viewRecordDetails.es_nsefo|| 'N/A')}</td>
          <td>{(viewRecordDetails.ks_nsefo|| 'N/A')}</td>
          <td>{(viewRecordDetails.es_nsecds|| 'N/A')},{(viewRecordDetails.es_mcx|| 'N/A')} , {(viewRecordDetails.es_ncdex|| 'N/A')}</td>
          <td>{(viewRecordDetails.ks_nsecds|| 'N/A')},{(viewRecordDetails.ks_mcx|| 'N/A')} , {(viewRecordDetails.ks_ncdex|| 'N/A')}</td>
          <td>{(viewRecordDetails.esdp_map|| "Not MAP")}</td>
          <td>{(viewRecordDetails.locationid|| 'N/A')}</td>
        </tr>
        <tr>
        <th>SIGN</th>
        <td></td>
        <td></td>
        <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>


    <h4>Check Point - DP/DMAT - 2</h4>    
    <table class="3">

      <thead>
        <tr>
          <th></th>
          <th>Cash Equivalant Holding</th>
          <th>Pending CORP. Action</th>
          <th>Portfolio Reconsilation</th>
          <th>DP Holding</th>
          <th>Pledge Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>INFO.</th>
          <td>{(viewRecordDetails.es_ccol|| 'N/A')}</td>
          <td>{viewRecordDetails.es_corpact === 1 ? 'True' :'False'}</td>
          <td>{(viewRecordDetails.es_pfreco|| 'N/A')}</td>
          <td>{(viewRecordDetails.es_dphldg|| 'N/A')}</td>
          <td>{(viewRecordDetails.es_pledval|| 'N/A')}</td>
        </tr>
        <tr>
          <th>SIGN</th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>


    <h4>Check Point - FROM CLIENT - 3</h4>
    <table class="4">
   
      <thead>
        <tr>
          <th></th>
          <th>Kotak Bank A/C Add in Client Netbanking</th>
          <th>Pending IPO Application</th>
          <th>Pending Claim Of IEPF/Other</th>
          <th colSpan="2">Existing Trading Platform Information</th>
         
        </tr>
        <tr>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th>Self</th>
        <th>Ap</th>
       
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>INFO.</th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
         
        </tr>
        <tr>
          <th>SIGN</th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          
        </tr>
      </tbody>
    </table>



    <h4>Check Point - BEFORE CLOSER - 4</h4>
    <table class="5">
      <thead>
        <tr>
          <th></th>
          <th colSpan="3">Position</th>
          <th colSpan="2">Account Balance ESL</th>
          <th>Last Trade Date </th>
          <th>F&O Margin</th>
          <th>Confirm Correct Mapped</th>
          
        </tr>
        <tr>
        <th></th>
        <th>CASH</th>
        <th>F&O</th>
        <th>MTF</th>
        <th>Dp</th>
        <th>Trading</th>
        <th></th>
        <th></th>
        <th></th>
        
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>INFO.</th>
          <td></td>
          <td>{(viewRecordDetails.es_opnpos === 1 ? 'True' :'False' || '-')}</td>
          <td>{viewRecordDetails.es_mtfpos === 1 ? "True" : "False" || '-'}</td>
          <td>{(viewRecordDetails.es_dpledg|| 'N/A')}</td>
          <td>{(viewRecordDetails.es_ledbal|| 'N/A')}</td>
          <td>{(viewRecordDetails.es_lstrdt|| 'N/A')}</td>
          <td>{(viewRecordDetails.es_margin||"NIL")}</td>
          <td></td>
         
        </tr>
        <tr>
          <th>SIGN</th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          
        </tr>
        <tr colSpan="9">
        <th colSpan="9"> Note : Checked All Information Now Proceed For Clouser &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input type="text"  placeholder="SIGN"></input></th>
        </tr>
      </tbody>
    </table>


    <h4>Check Point - CLOSER PROCDURED - 5</h4>
    <table class="6">
      <thead>
        <tr>
          <th></th>
          <th>Unpledge Shares</th>
          <th>Suspend Client On ODIN</th>
          <th>DP Closer Transfer</th>
          <th>Realese Of fund From Exchange(If Credit)</th>
          <th>Credit Balance TRF to Client</th>
          <th>Closer A/C In Exchange</th>
          
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>INFO.</th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          
        </tr>
        <tr>
          <th>SIGN</th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          
        </tr>
      </tbody>
    </table>

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
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Ucc</th>
              <th>Pan</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{filteredRecords()}</tbody>
        </table>
      )}
    </div>
  );
}






// Secound way to add multiple tables in single file

// ... (other imports and code)

// export default function RecordList() {
//   // ... (other state and functions)

//   // Function to generate and download Excel for the viewed record
//   const generateAndDownloadExcelForView = (record) => {
//     const data = [
//       ["Name", "Ucc", "PAN Number"],
//       [record.ksluccnm, record.ucc, record.panno],
//     ];

//     const ws = XLSX.utils.aoa_to_sheet(data);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

//     // Add similar tables and data to the Excel file (customize as needed)
//     // Table 2
//     const dataTable2 = [
//       ["Header1", "Header2", "Header3"],
//       ["Data1", "Data2", "Data3"],
//     ];
//     const wsTable2 = XLSX.utils.aoa_to_sheet(dataTable2);
//     XLSX.utils.book_append_sheet(wb, wsTable2, "Table2");

//     // Table 3
//     const dataTable3 = [
//       ["HeaderA", "HeaderB", "HeaderC"],
//       ["DataA", "DataB", "DataC"],
//     ];
//     const wsTable3 = XLSX.utils.aoa_to_sheet(dataTable3);
//     XLSX.utils.book_append_sheet(wb, wsTable3, "Table3");

//     // ... Add more tables as needed

//     XLSX.writeFile(wb, "record_details_with_tables.xls");
//   };

//   // ... (other code)

//   return (
//     <div>
//       <h3>Record List</h3>
//       {/* ... (other code) */}

//       {viewRecordDetails ? (
//         <div>
//           <h3>Details for {viewRecordDetails.ksluccnm}</h3>
//           {/* Displaying record details */}
//           {/* ... (other code) */}

//           {/* Buttons for the specific record */}
//           <button onClick={() => editRecord(viewRecordDetails)}>Edit</button>
//           <button onClick={() => printRecord(viewRecordDetails)}>Print</button>

//           {/* Button for generating and downloading Excel for the specific record */}
//           <button onClick={() => generateAndDownloadExcelForView(viewRecordDetails)}>
//             Generate and Download Excel
//           </button>

//           <button onClick={backToList}>Back</button>
//         </div>
//       ) : (
//         <table className="table table-striped" style={{ marginTop: 20 }}>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Ucc</th>
//               <th>Pan</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>{filteredRecords()}</tbody>
//         </table>
//       )}
//     </div>
//   );
// }




























