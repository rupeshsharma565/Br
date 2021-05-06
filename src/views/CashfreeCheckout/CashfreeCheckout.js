import React, { Component } from 'react';
import { goBack, sendHome, sessioncheck, HBRout, checkresponse, overrideLoaderCss, loaderColorCode, securityCall } from '../../Comman';
import { Button } from "reactstrap";
import config from '../../config';
import { ClipLoader } from 'react-spinners';

let swindow = window;
securityCall(swindow);

class CashfreeCheckout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      txtpromocode: "",
      responsePC: "",
      isLoading: false
    };
    this.onClickApplyPCode = this.onClickApplyPCode.bind(this);
    this.onClickVerifyPCode = this.onClickVerifyPCode.bind(this);
    this.onChange = this.onChange.bind(this);
    sessioncheck();
  }


  componentDidMount() {
    sessioncheck();

  }

  onClictSubmit = () => {
    if (this.state.isVisible) {
      if (this.state.txtpromocode) {
        if (this.state.responsePC === "Applied") {
          if (this.props.match.params.payment_method === "paytm") {
            window.location.href = HBRout + "/CashfreeRedirect/" + atob(this.props.match.params.orderid) + "/" + atob(this.props.match.params.amount) + "/" + (this.state.txtpromocode);
          } else if (this.props.match.params.payment_method === "razorpay") {
            window.location.href = HBRout + "/RazorpayCheckout/razorpay/" + atob(this.props.match.params.amount) + "/" + btoa(this.state.txtpromocode);
          }
        }
      }
      else {
        checkresponse("Required", false, "Please enter promocode", 3);
      }
    }
    else {
      if (this.props.match.params.payment_method === "paytm") {
        window.location.href = HBRout + "/CashfreeRedirect/" + atob(this.props.match.params.orderid) + "/" + atob(this.props.match.params.amount) + "/no";
      } else if (this.props.match.params.payment_method === "razorpay") {
        window.location.href = HBRout + "/RazorpayCheckout/razorpay/" + atob(this.props.match.params.amount) + "/no";
      }
    }
  }

  onClickApplyPCode = () => {
    if (this.state.isVisible) {
      this.setState({
        isVisible: !this.state.isVisible,
        txtpromocode: "",
        responseMessage: ""
      });
    }
    else {
      this.setState({ isVisible: !this.state.isVisible });
    }

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onClickVerifyPCode = () => {
    let formthis = this;
    formthis.setState({
      isLoading: true
    });
    //var matchid = this.props.match.params.matchid;
    var api_url = `${config.API_URL}`;
    if (this.state.txtpromocode && this.props.match.params.amount && sessionStorage.getItem("id")) {
      var reqapi = "";
      var args1 = {
        pcode: this.state.txtpromocode,
        amount: atob(this.props.match.params.amount),
        //userid:sessionStorage.getItem("id")
      };
      reqapi = api_url + "/frontapi/promocode/validchk";
      var object = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
        },
        body: JSON.stringify(args1)
      }

      fetch(reqapi, object)
        .then(function (response) {
          formthis.setState({
            isLoading: false
          });
          var chkresp = checkresponse("Wrong", response.status, "", 2);
          if (chkresp === true) {
            response.json().then(json => {
              if (json.error === false) {

                formthis.setState({
                  responsePC: "Applied",
                  responseMessage: json.msg
                });
                //checkresponse("Changed", 200, json.msg, 1);
              }
              else {
                //formthis.setState({ joinlist: [] });
                formthis.setState({
                  responsePC: "Wrong",
                  responseMessage: json.msg
                });
                //checkresponse("Not changed", false, json.msg, 3);
              }
            })
          }

        }).catch(error => {
          formthis.setState({
            isLoading: false
          });
          checkresponse("Wrong", false, error.toString(), 0);
        });
    }
    else {

    }
  }
  render() {
    return (
      <div className="fadeIn">
        {/** loader section start */}
        <div className={"loaderdiv" + ((this.state.isLoading === true) ? "" : " hidden")}>
          <ClipLoader
            css={overrideLoaderCss}
            sizeUnit={"px"}
            size={60}
            color={loaderColorCode}
            loading={this.state.isLoading}
          />
        </div>
        {/** loader section end */}
        <div className="left_logincontent profilepadding0">
          <div className="background-cover ng-scope">
            <div className="header_bg">
              <div className="hd_left">
                <span onClick={goBack} className="hd_back" />
                <span onClick={sendHome} className="hd_home" />
              </div>
              <div className="hd_center">Checkout</div>

            </div>
            <div className="notification_nofounde">
              <p>PLEASE CHECK YOUR DETAILS</p>
            </div>
            <div className="customerid_main">
              <div className="customerleft">
                <ul>
                  <li>Customer ID :</li>
                  <li>{sessionStorage.getItem("username")}</li>
                </ul>
              </div>
              <div className="customerleft">
                <ul>
                  <li>Amount :</li>
                  <li>{atob(this.props.match.params.amount)}</li>
                </ul>
              </div>
              <div className="havpromocode">

                <button onClick={this.onClickApplyPCode}>HAVE A PROMOCODE?</button>

              </div>
              <div className={"customerleft " + ((this.state.isVisible === false) ? "hidden" : "") + ""}>
                <ul>
                  <li><span className="apply_indbutton">
                    <input type="text" className="form-control" name="txtpromocode" onChange={this.onChange} value={this.state.txtpromocode} placeholder="Promocode" />

                  </span>
                  </li>
                  <li><Button className="isverifybtn" onClick={this.onClickVerifyPCode}>APPLY</Button>

                  </li>
                </ul>
                <p className={(this.state.responsePC === "Applied") ? "text-success" : "text-danger"}>{this.state.responseMessage} </p>
              </div>
            </div>

            <a onClick={this.onClictSubmit} name="checkout" className="all_transaction up_bt pointer"> <button className="savebtn_pencard pointernone">Checkout </button> </a>
          </div>
        </div>

      </div>
    );
  }
}

export default CashfreeCheckout;
