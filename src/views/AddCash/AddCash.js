import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import {
  checkresponse,
  goBack,
  sendHome,
  sessioncheck,
  HBRout,
  validation,
  securityCall
} from "./../../Comman";
import config from "../../config";

let swindow = window;
securityCall(swindow);
class AddCash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountadded: 0,
      paymentmodeselected: "paytm"
    };
    sessioncheck();
  }

  componentDidMount() {
    sessioncheck();
  }

  addAmount = e => {
    let lastamount = this.state.amountadded ? this.state.amountadded : 0;
    let amountvalue = e.target.innerHTML ? parseInt(e.target.innerHTML) : 0;
    amountvalue = parseFloat(lastamount) + amountvalue;
    this.setState({ amountadded: amountvalue });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createAddCash = () => {
    if (this.state.amountadded) {
      if (
        this.state.paymentmodeselected === "paytm" ||
        this.state.paymentmodeselected === "razorpay" ||
        this.state.paymentmodeselected === "cashfree"
      ) {
        window.location.href =
          HBRout +
          "/Checkout/" +
          this.state.paymentmodeselected +
          "/" +
          btoa(
            Math.random()
              .toString(36)
              .substring(2)
              .toUpperCase()
          ) +
          "/" +
          btoa(this.state.amountadded);
      } else {
        checkresponse("Warning", false, "Please select payment mode", 3);
      }
    } else {
      checkresponse("Warning", false, "Please add amount", 3);
    }
  };

  selectPaymentMode = e => {
    this.setState({ paymentmodeselected: e.target.id });
  };

  render() {
    var formthis = this;
    return (
      <div className="fadeIn">
        <div className="left_logincontent profilepadding0">
          <div className="background-cover ng-scope">
            <div className="header_bg">
              <div className="hd_left">
                <span onClick={goBack} className="hd_back" />
                <span onClick={sendHome} className="hd_home" />
              </div>
              <div className="hd_center">Add Cash</div>
            </div>
            <AvForm onValidSubmit={this.createAddCash}>
              <div className="my_accountpage">
                <div className="add_cashpart">
                  <h2 className="ad_c">Add Cash to your account</h2>
                  <form className="addcash_formpart">
                    <div className="form-group">
                      <AvField
                        type="text"
                        name="amountadded"
                        className="form-control"
                        min={1}
                        ng-model="amount"
                        onChange={this.onChange}
                        value={this.state.amountadded}
                        placeholder="Add amount"
                        validate={{
                          required: {
                            value: true,
                            errorMessage: "Amount is required"
                          },
                          pattern: {
                            value: validation.username,
                            errorMessage: "Amount is not valid."
                          }
                        }}
                      />
                    </div>

                    <Row>
                      <Col>
                        <a className="ad_cash_b" onClick={this.addAmount}>
                          +100
                        </a>
                      </Col>
                      <Col>
                        <a className="ad_cash_b" onClick={this.addAmount}>
                          +200
                        </a>
                      </Col>
                      <Col>
                        <a className="ad_cash_b" onClick={this.addAmount}>
                          +300
                        </a>
                      </Col>
                    </Row>
                  </form>
                  <div className="addcash_withbox">
                    <div className="adcash_titalm">Add Cash With</div>
                    <div className="ad_otheratage">
                      {/* Math.floor((Math.random() * 10000000000000000) + 1) */}
                      {/* <a className={"t_wallet_panel cursor-pointer "+((this.state.paymentmodeselected==="paytm")?"paymentmethodselect":"")} id="paytm" onClick={this.selectPaymentMode}>
                      <div className="img pointernone"><img className="pointernone" src={require("./../../images/debit_card.png")} /></div>
                      <span className="font-bold pointernone" >Paytm </span>
                      <div className="img pull-right pointernone"><img src={require("./../../images/arrow_right.png")} className="arrow pointernone" /></div>
                    </a> */}

                      <a
                        className={
                          "t_wallet_panel cursor-pointer " +
                          (config.IS_RAZORPAY === false ? "hidden " : " ") +
                          (this.state.paymentmodeselected === "razorpay"
                            ? "paymentmethodselect"
                            : "")
                        }
                        id="razorpay"
                        onClick={this.selectPaymentMode}
                      >
                        <div className="img pointernone">
                          <img
                            className="pointernone"
                            src={require("./../../images/razorpay.jpeg")}
                          />
                        </div>
                        <span className="font-bold pointernone">Razorpay </span>
                        <div className="img pull-right pointernone">
                          <img
                            src={require("./../../images/arrow_right.png")}
                            className="arrow pointernone"
                          />
                        </div>
                      </a>
                    </div>
                    <div className="ad_otheratage">
                      {/* Math.floor((Math.random() * 10000000000000000) + 1) */}
                      {/* <a className={"t_wallet_panel cursor-pointer "+((this.state.paymentmodeselected==="paytm")?"paymentmethodselect":"")} id="paytm" onClick={this.selectPaymentMode}>
                      <div className="img pointernone"><img className="pointernone" src={require("./../../images/debit_card.png")} /></div>
                      <span className="font-bold pointernone" >Paytm </span>
                      <div className="img pull-right pointernone"><img src={require("./../../images/arrow_right.png")} className="arrow pointernone" /></div>
                    </a> */}

                      <a
                        className={
                          "t_wallet_panel cursor-pointer " +
                          (config.IS_CASHFREE === false ? "hidden " : " ") +
                          (this.state.paymentmodeselected === "cashfree"
                            ? "paymentmethodselect"
                            : "")
                        }
                        id="cashfree"
                        onClick={this.selectPaymentMode}
                      >
                        <div className="img pointernone">
                          <img
                            className="pointernone"
                            src={require("./../../images/cashfree.png")}
                          />
                        </div>
                        <span className="font-bold pointernone">Cashfree </span>
                        <div className="img pull-right pointernone">
                          <img
                            src={require("./../../images/arrow_right.png")}
                            className="arrow pointernone"
                          />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
                <a className="all_transaction up_bt">
                  {" "}
                  <button className="savebtn_pencard pointer">
                    Continue{" "}
                  </button>{" "}
                </a>
              </div>
            </AvForm>
          </div>
        </div>
      </div>
    );
  }
}

export default AddCash;
