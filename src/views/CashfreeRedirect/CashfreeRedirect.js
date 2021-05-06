import React, { Component } from 'react';
import config from '../../config'
import { checkresponse, sessioncheck } from '../../Comman';

class CashfreeRedirect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checksum: false
    };
    sessioncheck();
  }


  componentDidMount() {
    //sessioncheck();
    //this.paytmRedirect()
    this.checkSumIntegrate();

  }

  paytmRedirect = () => {
    this.checkSumIntegrate().then(result => {
      if (result !== false) {
        var args1 = {
          MID: "qdURhv27172942568806",
          ORDER_ID: (this.props.match.params.orderid),
          CUST_ID: sessionStorage.getItem("username"),
          INDUSTRY_TYPE_ID: "Retail",
          CHANNEL_ID: "WEB",
          TXN_AMOUNT: (this.props.match.params.amount),
          WEBSITE: "WEB_STAGING",
          CHECKSUMHASH: result,
          //CALLBACK_URL:"http://192.168.1.74:3000/Home",
          MSISDN: "9167103769", //Mobile number of customer
          //EMAIL : $EMAIL, //Email ID of customer
          VERIFIED_BY: "EMAIL", //
          IS_USER_VERIFIED: "YES"
        };

        var object = {
          method: 'POST',
          headers: {
            //'Content-Type': 'application/json',
          },
          body: JSON.stringify(args1)
        }

        var apiUrl = "";
        apiUrl = `${config.PAYTM_TXN_URL}`;

        fetch(apiUrl, object)
          .then(function (response) {
            console.log("response===>>>", response);
            var chkresp = checkresponse("Wrong", response.status, response.message, 2);
            // if (chkresp === true) {
            //   response.json().then(json => {
            //     if (json.error === false) {
            //       //window.location.href =HBRout+"/MyAccount";
            //     }
            //     else {
            //       checkresponse("Warning", false, json.msg, 3);
            //     }
            //   })
            // }
          }).catch(error => {
            checkresponse("Wrong", false, error.toString(), 0);
          });
      }
      else {

      }
    })
  }


  checkSumIntegrate = () => {
    let formthis = this;
    return new Promise(function (resolve, redirect) {
      let arg2 = {
        orderid: (formthis.props.match.params.orderid),
        custid: sessionStorage.getItem("username"),
        //industrytypeid: "Retail",
        //channelid: "WEB",
        txnamount: (formthis.props.match.params.amount),
        pcode: (formthis.props.match.params.promocode === "no") ? "" : formthis.props.match.params.promocode
      }
      var object = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
        },
        body: JSON.stringify(arg2)
      }

      var apiUrl = "";
      var api_url = `${config.API_URL}`;
      apiUrl = api_url + "/frontapi/generatechecksum";

      fetch(apiUrl, object)
        .then(function (response) {

          var chkresp = checkresponse("Wrong", response.status, response.message, 2);
          if (chkresp === true) {
            response.json().then(json => {
              console.log("json=", json);
              if (json.error === false) {
                console.log("checkkkkkkkkk-", json.data);

                formthis.setState({ checksum: json.data })
                //sessionStorage.setItem("checksum",json.data);
                resolve(json.data);
                //window.location.href =HBRout+"/MyAccount";
              }
              else {
                resolve(false);
              }
            })
          }
          else {
            resolve(false);
          }
        }).catch(error => {
          resolve(false);
        });

    })
  }


  onChange = (e) => {
    //console.log("e---->>>",e.target)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.checksum.MID &&
      this.state.checksum.ORDER_ID &&
      this.state.checksum.CUST_ID &&
      this.state.checksum.INDUSTRY_TYPE_ID &&
      this.state.checksum.CHANNEL_ID &&
      this.state.checksum.TXN_AMOUNT &&
      this.state.checksum.WEBSITE &&
      this.state.checksum.CALLBACK_URL &&
      this.state.checksum.checksum) {
      document.getElementById('f1').submit();
    }
  }

  render() {
    const formthis = this;
    let CASHFREE_TXN_URL = `${config.CASHFREE_TXN_URL}`;

    return (
      <div>
        <center><h1>Please do not refresh this page...</h1></center>
        {/* <form name="f1" id="f1" method="post" action={PAYTM_TXN_URL}>

          <input type="hidden" id="MID" name="MID" onBeforeInput={this.onChange} value={this.state.checksum.MID} />
          <input type="hidden" id="ORDER_ID" name="ORDER_ID" value={this.state.checksum.ORDER_ID} />
          <input type="hidden" id="CUST_ID" name="CUST_ID" value={this.state.checksum.CUST_ID} />
          <input type="hidden" id="INDUSTRY_TYPE_ID" name="INDUSTRY_TYPE_ID" value={this.state.checksum.INDUSTRY_TYPE_ID} />
          <input type="hidden" id="CHANNEL_ID" name="CHANNEL_ID" value={this.state.checksum.CHANNEL_ID} />
          <input type="hidden" id="TXN_AMOUNT" name="TXN_AMOUNT" value={this.state.checksum.TXN_AMOUNT} />
          <input type="hidden" id="WEBSITE" name="WEBSITE" value={this.state.checksum.WEBSITE} />
          <input type="hidden" id="CALLBACK_URL" name="CALLBACK_URL" value={this.state.checksum.CALLBACK_URL} />
          <input type="hidden" id="CHECKSUMHASH" name="CHECKSUMHASH" value={this.state.checksum.checksum} />

          <input type="submit" id="s1" name="s1" value="Submit" className="hidden" />

        </form> */}
        <form name="f1" id="f1" method="post" action={CASHFREE_TXN_URL}>
          <input type="hidden" name="appId" value="46090abc946257c94ce8edcb609064" />
          <input type="hidden" name="orderId" value="Order1010" />
          <input type="hidden" name="orderAmount" value="100" />
          <input type="hidden" name="orderCurrency" value="INR" />
          <input type="hidden" name="orderNote" value="test" />
          <input type="hidden" name="customerName" value="John Doe" />
          <input type="hidden" name="customerEmail" value="Johndoe@test.com" />
          <input type="hidden" name="customerPhone" value="9999999999" />
          <input type="hidden" name="returnUrl" value="https://www.cashfree.com" />
          <input type="hidden" name="notifyUrl" value="https://www.cashfree.com" />
          <input type="hidden" name="signature" value="thNnmggU2ex3L5XXeMNfxf8Wl8STcVZTxscSFEKSxa0=" />
          <input type="submit" id="s1" name="s1" value="Submit" className="hidden" />
        </form>
      </div>
    );
  }
}

export default CashfreeRedirect;
