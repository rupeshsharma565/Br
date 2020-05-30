import React, { Component } from 'react';
import config from './../../config';
import { goBack,sendHome,checkresponse,sessioncheck ,HBRout} from './../../Comman';

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      walletbalance:0,
      wltbns:0,
      wltwin:0,
      withdrawamount:0,
      totalbalance:0,
      exposure:0
    };    
    sessioncheck();
  }


  componentDidMount() {    
    sessioncheck();
    this.getBalance();
  }

  getBalance = () => {
    var formthis = this;
    var args1 = {};
    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      },
      body: JSON.stringify(args1)
    }
    
    var api_url = `${config.API_URL}`;
    var apiUrl = "";
    apiUrl = api_url + "/frontapi/getuserbalance";

    fetch(apiUrl, object)
      .then(function (response) {
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            if (json.error === false) {
              let walletbalance=parseFloat(json.data.walletbalance);
              let wltbns=parseFloat(json.data.wltbns);
              let wltwin=parseFloat(json.data.wltwin);
              let totalbalance=(walletbalance+wltbns+wltwin).toFixed(2);
              let exposure=parseFloat(json.data.exposure);
              formthis.setState({
                walletbalance: walletbalance,
                wltbns: wltbns,
                wltwin: wltwin,
                totalbalance:totalbalance,
                exposure:exposure
              })
            }
            else {
              formthis.setState({
                walletbalance: 0,
                wltbns:0,
                wltwin:0,
                exposure:0
              })
            }
          })
        }
      }).catch(error => {
        checkresponse("Wrong", false, error.toString(), 0);
      });
  }

  addCash=()=>{
    window.location.href =HBRout+"/AddCash";
  }

  onClickWithdraw=()=>{
    let wltwinamount=parseFloat(this.state.wltwin);
    if(wltwinamount<200)
    {
      checkresponse("WIN MORE TO WITHDRAW!", false, "Keep winning and withdraw your winnings once they exceed ₹ 200", 3);
    }
    else
    {
      this.listVerifyCheckSum();
    }
  }


  listVerifyCheckSum = () => {
    var formthis = this;
    var matchid = this.props.match.params.matchid;
    var args1 = {};
    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      },
      body: JSON.stringify(args1)
    }

    var api_url = `${config.API_URL}`;
    var apiUrl = "";
    apiUrl = api_url + "/frontapi/getprofile";

    fetch(apiUrl, object)
      .then(function (response) {
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            if (json.error === false) {
              if(json.data.isbankdverify==="1" && json.data.isemailverify==="1" && json.data.ispanverify==="1" && json.data.isphoneverify)
              {
                window.location.href =HBRout+"/WithdrawCash";
              }
              else
              {
                checkresponse("Warning!", false, "Verify KYC first", 3);
              }
            }
            
          })
        }
      }).catch(error => {
        checkresponse("Wrong", false, error.toString(), 0);
      });
  }


  render() {
    return (
      <div className="fadeIn">
        <div className="left_logincontent profilepadding0">
          <div className="background-cover ng-scope">
            <div className="header_bg">
              <div className="hd_left"> 
              <span onClick={goBack} className="hd_back" /> 
                <span onClick={sendHome} className="hd_home" />
              </div>
              <div className="hd_center">My Account</div>
            </div>
            <div className="my_accountpage">
              <div className="our_accountslist">
                <ul>
                  <li className="active">
                    <div className="myaccount_innerbox">
                      <div className="my_accounttitlept"> <h2>YOUR CURRENT ACCOUNT BALANCE</h2></div>	
                      <div className="my_acountblancept"><p><img src={require("./../../images/rupee_icon.png")} /> {this.state.totalbalance}</p> </div>
                      <div className="myac_bottombtn"><button className="btn-gardient pointer" onClick={this.addCash} >Add Cash</button></div>
                    </div>	
                  </li>
                  <li>
                  
                    <div className="myaccount_innerbox">
                      <div className="my_accounttitlept"> <h2>EXPOSURE</h2></div>	
                      <div className="my_acountblancept"><p><img src={require("./../../images/rupee_icon.png")} /> {this.state.exposure}</p> </div>
                    </div>	
                  </li>
                  <li>
                    <div className="myaccount_innerbox">
                      <div className="my_accounttitlept"> <h2>YOUR WINNINGS</h2></div>	
                      <div className="my_acountblancept"><p><img src={require("./../../images/rupee_icon.png")} /> {this.state.wltwin}</p> </div>
                      <div className="myac_bottombtn"><button className="btn-gardient pointer" onClick={this.onClickWithdraw}>Withdraw</button></div>
                    </div>	
                  </li>
                  
                  <li>
                    <div className="myaccount_innerbox">
                      <div className="my_accounttitlept"> <h2>BONUS CASH</h2></div>	
                      <div className="my_acountblancept"><p><img src={require("./../../images/rupee_icon.png")} /> {this.state.wltbns}</p> </div>
                    </div>	
                  </li>
                </ul>	
              </div>
            </div>
          </div>
        </div>	
      </div>
    );
  }
}

export default MyAccount;
