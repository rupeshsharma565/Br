import React, { Component } from 'react';
import {
  Col,
  Row,
} from 'reactstrap';
import config from './../../config';
import { goBack,sendHome,checkresponse ,sessioncheck,timestampToDateTime,transactionhistory,securityCall} from './../../Comman';

let swindow=window;
securityCall(swindow);

class BalanceSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getBalanceSheetList:[],
      getDescription:{},
      error: false,
      hasMore: true,
      isLoading: false,
      page:1
    };    
    
    sessioncheck();
  }


  componentDidMount() {    
    sessioncheck();
   this.getBalanceSheetList();
   window.addEventListener('scroll', this.scrollMore, true);
  }
  // Binds our scroll event handler
  scrollMore = () => {
    const {
      getBalanceSheetList,
      state: {
        error,
        isLoading,
        hasMore,
      },
    } = this;
    // Bails early if:
    // * there's an error
    // * it's already loading
    // * there's nothing left to load
    if (error || isLoading || !hasMore) return;

    // Checks that the page has scrolled to the bottom
    if (
      window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
    ) {

      var page_no = this.state.page;
      page_no     = parseInt(page_no)+1;
      //console.log("page no----------",page_no);
      this.setState({
        page:page_no
      },()=>{
        getBalanceSheetList();
      })
    }
  }
  getBalanceSheetList = () => {
    this.setState({ isLoading: true});
    var formthis = this;
    let args1={};
    args1={
      page:this.state.page
    }
    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      },
      body:JSON.stringify(args1)
    }   
    var apiUrl = "";
    var api_url = `${config.API_URL}`; 
    
    apiUrl = api_url + "/frontapi/gettransactions";
    fetch(apiUrl, object)
      .then(function (response) {
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            if (json.error===false) {             
             
              // formthis.setState({
              //   getBalanceSheetList: json.data.list,    
              //   getDescription:json.description              
              // })
              formthis.setState({   
                   getDescription:json.description              
                })
              // Creates a massaged array of user data
              const nextPageRecord = json.data.list;
              // Merges the next record into our existing record
              formthis.setState({
                // Note: Depending on the API you're using, this value may be
                // returned as part of the payload to indicate that there is no
                // additional data to be loaded
                hasMore: (formthis.state.getBalanceSheetList.length < json.data.total),
                isLoading: false,
                getBalanceSheetList: [
                  ...formthis.state.getBalanceSheetList,
                  ...nextPageRecord,
                ],
              });
            }
            else {
              formthis.setState({
                isLoading: false,
                hasMore:false            
              })
            }
          })
        }
      }).catch(error => {
        checkresponse("Wrong", false, error.toString(), 0);
      });
  }


  copyToClipboard = (text, elementId) => {
    const textField = document.createElement('textarea');
    textField.innerText = text;
    const parentElement = document.getElementById(elementId);
    parentElement.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    parentElement.removeChild(textField);
  }

  render() {
    const formthis = this;
    const {
      error,
      hasMore,
      isLoading,
      getBalanceSheetList,
    } = this.state;

    return (
      <div className="fadeIn">
      <div className="left_logincontent profilepadding0 scroll-height">
        <div className="background-cover ng-scope">
          <div className="header_bg">
            <div className="hd_left"> 
                <span onClick={goBack} className="hd_back" /> 
                <span onClick={sendHome} className="hd_home" />
            </div>
            <div className="hd_center">Balance Sheet</div>
          </div>
          <div className="my_accountpage transaction_mainboxtop">
		  <li className="maintoops"> 
              <Row>
                    <Col xs="4">
                      <div className="per_innerboxhistory">
                        <span className="date_ministring"><b>DATE</b></span>
                      </div>	
                    </Col>
                    <Col xs="4">
                      <div className="per_innerboxhistory text-center">	
                        <span className="date_ministring"><b> CREDIT</b></span>
                      </div>
                    </Col>
                    <Col xs="4">
                      <div className="per_innerboxhistory text-center">	
                       
                        <span className="date_ministring"><b>DEBIT</b></span>
                      </div>
                    </Col>
                  </Row>
				  
            </li>
            <ul className="trans_historypt">

             {
               this.state.getBalanceSheetList.map(function(item,index){
               return(
              <li className="firhisfiops" key={index}>
                <div className="contest_table">
                  <Row className={(item.ttype==="cr"?"colorgreentranstion":"colorredtranstion")}>
                    <Col xs="4">
                      <div className="per_innerboxhistory">
                        <span className="date_ministring">{timestampToDateTime(item.txdate)}</span>
                      </div>	
                    </Col>
                    <Col xs="4">
                      <div className="per_innerboxhistory text-center">	
                       
                        <span className="date_ministring"> {(item.ttype==="cr")?item.amount:"-"}</span>
                      </div>
                    </Col>
                    <Col xs="4">
                      <div className="per_innerboxhistory text-center">	
                       
                        <span className="date_ministring">{(item.ttype==="dr")?item.amount:"-"}</span>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="carditor_debitdetails">

                {(item.status==="TXN_PENDING" || item.status==="TXN_SUCCESS")?(<h2>{formthis.state.getDescription[item.atype]} | <span className={(item.status==="TXN_PENDING")?"cancelled":""}>{formthis.state.getDescription[item.status]}</span></h2>):(<h2>{formthis.state.getDescription[item.atype]} | {formthis.state.getDescription[item.wlt]}</h2>)}
                </div>
               </li>	)
              })
             }

              <hr />
                {error &&
                  <li style={{ color: '#900' }}>
                    {error}
                  </li>
                }
                {isLoading &&
                  <li>Loading...</li>
                }
                {!hasMore &&
                  <li className="text-center">No more records</li>
                }

            </ul>	
          </div>
        </div>
      </div>	
      
    </div>
    );
  }
}

export default BalanceSheet;
