import React, { Component } from 'react';
import config from '../../config';
import { checkresponse, sessioncheck, sendHome, timestampToDateTime } from '../../Comman';

class CashfreeResponse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactiondetail: {}
    };
    sessioncheck();
  }


  componentDidMount() {
    sessioncheck();
    this.getResponseDetail();
  }

  getResponseDetail = () => {
    var formthis = this;
    var orderid = this.props.match.params.orderid;
    //var txid = this.props.match.params.txid;
    var args1 = {
      orderid: orderid
    };
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
    apiUrl = api_url + "/frontapi/gettxbyorderid";

    fetch(apiUrl, object)
      .then(function (response) {
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            if (json.error === false) {
              formthis.setState({
                transactiondetail: json.data
              })
            }
            else {
              formthis.setState({
                transactiondetail: { status: "TXN_FAILED" }
              })
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
                <a onClick={sendHome} className="hd_home" />
              </div>
              <div className="hd_center">Transction Detail</div>

            </div>
            <div className="customerid_main">


              {(this.state.transactiondetail.status === "TXN_SUCCESS") ? (<div>
                <div className="customerleft">
                  <ul><li>Customer Name :</li><li>{sessionStorage.getItem("username")}</li></ul>
                </div>
                <div className="customerleft">
                  <ul><li>Transction Id :</li><li>{this.props.match.params.txid}</li></ul>
                </div>
                <div className="customerleft">
                  <ul><li>Order Id :</li><li>{this.props.match.params.orderid}</li></ul>
                </div>

                <div className="customerleft">
                  <ul><li>Status :</li><li>{this.state.transactiondetail.status}</li></ul>
                </div>
                <div className="customerleft">
                  <ul><li>Payment Mode :</li><li>{this.state.transactiondetail.pmode}</li></ul>
                </div>
                <div className="customerleft">
                  <ul><li>Amount :</li><li>{this.state.transactiondetail.amount}</li></ul>
                </div>
                <div className="customerleft">
                  <ul><li>Date :</li><li>{timestampToDateTime(this.state.transactiondetail.txdate)}</li></ul>
                </div></div>) :
                (<div>
                  <div className="customerleft">
                    <ul><li>Customer Name :</li><li>{sessionStorage.getItem("username")}</li></ul>
                  </div>
                  <div className="customerleft">
                    <ul><li>Transction Id :</li><li>{this.props.match.params.txid}</li></ul>
                  </div>
                  <div className="customerleft">
                    <ul><li>Status :</li><li>{this.state.transactiondetail.status}</li></ul>
                  </div></div>)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CashfreeResponse;
