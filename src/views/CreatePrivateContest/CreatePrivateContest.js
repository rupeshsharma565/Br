import React, { Component } from "react";
import {
  AvForm,
  AvField,
  AvCheckboxGroup,
  AvCheckbox
} from "availity-reactstrap-validation";
import config from "./../../config";
import {
  goBack,
  sendHome,
  checkresponse,
  validation,
  sessioncheck,
  HBRout,
  priceOnPercent,
  toastMessage
} from "./../../Comman";
import axios from "axios";
import $ from "jquery";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';
class CreatePrivateContest extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      contestName: "",
      contestSize: "",
      totalPrizePool: "",
      privateContestInfo: {},
      minWinPrize: 0,
      maxWinPrize: 1000,
      minContestSize: 2,
      maxContestSize: 100,
      admincommission: 0,
      entryFees: 0,
      isPrizeBreakUp: false,
      isMultipleTeam: false,
      winPrizeBrkUpData: {},
      winnerSlabs: [],
      stepNo: 1,
      selectedPrizeBreakUp: {},
      selectedBreakUpId: "",
      isClicked: false,
      minEntryFees: 5,
      isDisabled: true,
      createdMatchCount: 0,
      isNotify: false,
      walletdetail: {
        btnname: "",
        eventtype: "",
        fees: 0,
        paybalwlt: 0,
        paybnswlt: 0,
        paywinwlt: 0,
        walletbalance: 0,
        wltbns: 0,
        wltwin: 0,
        entryfees: 0
      }
    };
    sessioncheck();
    this.onChange = this.onChange.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.getUserTeamDetail = this.getUserTeamDetail.bind(this);
    this.toggleNotification = this.toggleNotification.bind(this);
  }

  componentDidMount() {
    sessioncheck();
    this.getPrivateContestInfo();
    this.getUserTeamDetail();
  }

  toggleNotification() {
    this.setState({
      isNotify: !this.state.isNotify
    });
  }

  getPrivateContestInfo = () => {
    this._isMounted = true;
    var formthis = this;
    let args = { atype: "pvtcontest" };
    var object = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("jwt") + ""
      },
      body: JSON.stringify(args)
    };
    var api_url = `${config.API_URL}`;

    var apiUrl = "";
    apiUrl = api_url + "/frontapi/appsettings";

    formthis.setState({
      privateContestInfo: {}
    });

    fetch(apiUrl, object)
      .then(function(response) {
        var chkresp = checkresponse(
          "Wrong",
          response.status,
          response.message,
          2
        );
        if (chkresp === true) {
          response.json().then(json => {
            if (json.error === false) {
              if (formthis._isMounted) {
                formthis.setState({
                  privateContestInfo: json.data,
                  minWinPrize: json.data.pvtcontest
                    ? json.data.pvtcontest.winprize.min
                    : 0,
                  maxWinPrize: json.data.pvtcontest
                    ? json.data.pvtcontest.winprize.max
                    : 1000,
                  minContestSize: json.data.pvtcontest
                    ? json.data.pvtcontest.cnstsize.min
                    : 2,
                  maxContestSize: json.data.pvtcontest
                    ? json.data.pvtcontest.cnstsize.max
                    : 100,
                  admincommission: json.data.pvtcontest
                    ? json.data.pvtcontest.adminchrg
                    : 0,
                  minEntryFees: json.data.pvtcontest
                    ? json.data.pvtcontest.min_entry_fees
                    : 0
                });
              }
            } else {
              if (formthis._isMounted) {
                formthis.setState({
                  privateContestInfo: {}
                });
              }
            }
          });
        }
      })
      .catch(error => {
        checkresponse("Wrong", false, error.toString(), 0);
      });
  };

  getWinningPrize = () => {
    var formthis = this;
    let matchid = this.props.match.params.matchid;
    let contestName = formthis.state.contestName
      ? formthis.state.contestName
      : "";
    const formData = new FormData();
    formData.append("name", contestName);
    formData.append("contestsize", formthis.state.contestSize);
    formData.append("tolwinprize", formthis.state.totalPrizePool);
    formData.append("type", formthis.state.isMultipleTeam);

    if (
      formthis.state.entryFees < formthis.state.minEntryFees &&
      formthis.state.totalPrizePool !== "0"
    ) {
      toastMessage(
        "error",
        "Entry fee can not be less than Rs " + formthis.state.minEntryFees
      );
      return true;
    }
    var api_url = `${config.API_URL}`;
    var apiUrl = "";
    apiUrl = api_url + "/frontapi/pvtcnstprzbrk";

    const configdata = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Bearer " + sessionStorage.getItem("jwt") + ""
      }
    };
    axios
      .post(apiUrl, formData, configdata)
      .then(response => {
        if (response.data.error === false) {
          if (response.data.data) {
            window.scrollTo(0, 0);
            formthis.setState(
              {
                winPrizeBrkUpData: response.data.data,
                winnerSlabs: response.data.data.winnerslabs,
                selectedPrizeBreakUp:
                  response.data.data.winnerslabs &&
                  response.data.data.winnerslabs.length > 0
                    ? response.data.data.winnerslabs[0]
                    : {},
                stepNo: 2
              },
              () => {
                this.setState({
                  selectedBreakUpId: this.state.selectedPrizeBreakUp
                    ? this.state.selectedPrizeBreakUp._id.$oid
                    : ""
                });
              }
            );
          }
          //checkresponse("Save", 200, response.data.msg, 1);
        } else {
          checkresponse("Warning", false, response.data.msg, 3);
        }
      })
      .catch(error => {});
  };

  onChange = e => {
    const formthis = this;
    let { name, value } = e.target;

    formthis.setState({
      [name]: value
    });
    this.calculateEntryFees();
  };
  handleCheckBox = e => {
    let isMultipleTeam;
    if (e.target.checked === true) {
      isMultipleTeam = true;
    } else {
      isMultipleTeam = false;
    }
    this.setState({
      isMultipleTeam: isMultipleTeam
    });
  };

  calculateEntryFees = () => {
    let entryFees = 0;
    let contestSize =
      this.state.contestSize > 0 ? parseInt(this.state.contestSize) : 0;
    let totalPrizePool =
      this.state.totalPrizePool > 0 ? parseInt(this.state.totalPrizePool) : 0;
    let admincommission =
      this.state.admincommission > 0
        ? parseFloat(this.state.admincommission)
        : 0;
    if (totalPrizePool > 0 && contestSize > 0) {
      var perTeam = 0;
      perTeam = totalPrizePool / contestSize;
      entryFees =
        parseFloat(perTeam) + parseFloat((perTeam * admincommission) / 100);
      if (entryFees > 1) {
        entryFees = Math.ceil(entryFees);
      } else {
        entryFees = 0;
      }
      this.setState({
        entryFees: entryFees
      });
    } else {
      this.setState({
        entryFees: 0
      });
    }
  };

  changeWinningBrkUp = () => {
    window.scrollTo(0, 0);
    this.setState({
      stepNo: 3
    });
  };

  selectPrizeBrkUp = () => {
    window.scrollTo(0, 0);
    var formthis = this;
    var id = "";
    var selectedPrizeBreakUp = {};
    $(".prizeBreakUpCheckbox").on("change", function() {
      $(".prizeBreakUpCheckbox")
        .not(this)
        .prop("checked", false);
      id = $(this).val();
      if (id) {
        selectedPrizeBreakUp = {};
        selectedPrizeBreakUp = formthis.searchByKeyArray(
          id,
          formthis.state.winnerSlabs
        );
        formthis.setState({
          stepNo: 2,
          selectedBreakUpId: id,
          selectedPrizeBreakUp: selectedPrizeBreakUp
        });
      } else {
        formthis.setState({
          stepNo: 2
        });
      }
    });
  };

  searchByKeyArray = (nameKey, array) => {
    for (var i = 0; i < array.length; i++) {
      if (array[i]._id.$oid == nameKey) {
        return array[i];
      }
    }
  };

  goBack = () => {
    var stepNo = this.state.stepNo;
    if (stepNo === 3) {
      stepNo = 2;
    } else if (stepNo === 2) {
      stepNo = 1;
    } else {
      window.history.back();
    }
    this.setState({
      stepNo: stepNo
    });
  };

  createContest = () => {
    var formthis = this;
    if (this.state.entryFees < 0) return;
    let matchid = this.props.match.params.matchid;

    if (formthis.state.createdMatchCount > 0) {
      //////
      this.calculateEntryFees();

      let contestName = formthis.state.contestName
        ? formthis.state.contestName
        : "";
      let obj = {
        name: contestName,
        contestsize: formthis.state.contestSize,
        winningprize: formthis.state.totalPrizePool,
        ismultiple: formthis.state.isMultipleTeam ? 1 : 0,
        prizebreakid: formthis.state.selectedBreakUpId,
        joinfees: formthis.state.entryFees,
        matchid: matchid,
        atype: "prejoin",
        winners: this.state.selectedPrizeBreakUp.winner
      };

      var api_url = `${config.API_URL}`;
      var apiUrl = "";
      apiUrl = api_url + "/frontapi/createpvtcntst";

      var object = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("jwt") + ""
        },
        body: JSON.stringify(obj)
      };
      fetch(apiUrl, object)
        .then(response => {
          /////////////
          formthis.setState({
            isLoading: false
          });
          var chkresp = checkresponse(
            "Wrong",
            response.status,
            response.message,
            2
          );
          if (chkresp === true) {
            response.json().then(json => {
              if (json.error === false) {
                formthis.setCreateTeam(json.data, "1");
                //checkresponse("Save", 200, json.msg, 1);
              } else {
                checkresponse("Warning", false, json.msg, 3);
              }
            });
          }
        })
        .catch(error => {
          formthis.setState({
            isLoading: false
          });
        });
      //////
    } else {
      swal({
        title: "Are you sure?",
        text: "For joining, you have to create team.",
        icon: "warning",
        buttons: ["No, cancel it!", "Yes, Create Team!"],
        dangerMode: true
      }).then(function(isConfirm) {
        if (isConfirm) {
          window.location.href =
            HBRout +
            "/CreateTeams/" +
            matchid +
            "?redirecturl=CreatePrivateContest/" +
            matchid +
            "";
        } else {
        }
      });
    }
  };

  getUserTeamDetail = () => {
    var formthis = this;
    let obj = {
      matchid: this.props.match.params.matchid
    };

    var api_url = `${config.API_URL}`;
    var apiUrl = "";
    apiUrl = api_url + "/frontapi/getuserteam";

    var object = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("jwt") + ""
      },
      body: JSON.stringify(obj)
    };
    fetch(apiUrl, object)
      .then(response => {
        /////////////
        formthis.setState({
          isLoading: false
        });
        var chkresp = checkresponse(
          "Wrong",
          response.status,
          response.message,
          2
        );
        if (chkresp === true) {
          response.json().then(json => {
            if (json.error === false) {
              formthis.setState({ createdMatchCount: json.data.total });
            } else {
              formthis.setState({ createdMatchCount: 0 });
            }
          });
        }
      })
      .catch(error => {
        formthis.setState({ createdMatchCount: 0 });
      });
  };

  btnNotification = () => {
    let formthis = this;
    let matchid = this.props.match.params.matchid;
    let poolid = "prvtec";
    let joincost = this.state.selectjoincost;

    let contestName = formthis.state.contestName
      ? formthis.state.contestName
      : "";
    let obj = {
      name: contestName,
      contestsize: formthis.state.contestSize,
      winningprize: formthis.state.totalPrizePool,
      ismultiple: formthis.state.isMultipleTeam ? 1 : 0,
      prizebreakid: formthis.state.selectedBreakUpId,
      joinfees: formthis.state.entryFees,
      matchid: matchid,
      atype: "join",
      winners: this.state.selectedPrizeBreakUp.winner
    };

    let responsejoin = btoa(JSON.stringify(obj));

    if (this.state.eventtype === "addbalanceAddCash") {
      window.location.href = HBRout + "/AddCash";
    }

    if (this.state.eventtype === "addbalanceChooseTeam") {
      window.location.href =
        HBRout + "/ChoosePrivateTeam/" + matchid + "/" + responsejoin;
    }

    if (this.state.eventtype === "join_contest") {
      window.location.href =
        HBRout + "/ChoosePrivateTeam/" + matchid + "/" + responsejoin;
    }
  };

  setCreateTeam = (result, poolid) => {
    //event.stopPropagation();
    let formthis = this;
    let joincost = formthis.state.entryFees;
    let matchid = this.props.match.params.matchid;

    if (this.state.createdMatchCount > 0) {
      //this.balanceAmountDetailCheck(joincost,poolid).then(result=>{
      if (joincost > this.state.freeamount) {
        //change
        if (result.data.fees > 0) {
          result.eventtype = "addbalance";
          result.btnname = "Add Balance";
          result.entryfees = joincost;
          formthis.setState({
            eventtype: "addbalanceAddCash",
            //selectpoolid:poolid,
            selectjoincost: joincost
          });
          formthis.callnotification(result);
        } else {
          result.eventtype = "join_contest";
          result.btnname = "Join Contest";
          result.entryfees = joincost;
          formthis.setState({
            eventtype: "addbalanceChooseTeam",
            //selectpoolid:poolid,
            selectjoincost: joincost
          });
          formthis.callnotification(result);
        }
      } else {
        result.eventtype = "join_contest";
        result.btnname = "Join Contest";
        result.entryfees = joincost;
        formthis.setState({
          eventtype: "join_contest",
          selectpoolid: poolid,
          selectjoincost: joincost
        });
        formthis.callnotification(result);
      }
    } else {
      swal({
        title: "Are you sure?",
        text: "For joining, you have to create team.",
        icon: "warning",
        buttons: ["No, cancel it!", "Yes, Create Team!"],
        dangerMode: true
      }).then(function(isConfirm) {
        if (isConfirm) {
          let matchid = formthis.props.match.params.matchid;
          window.location.href = HBRout + "/CreateTeams/" + matchid;
        }
      });
    }
  };

  balanceAmountDetailCheck(joinamount, poolid) {
    let formthis = this;
    return new Promise(function(resolve, reject) {
      var matchid = formthis.props.match.params.matchid;
      // var poolid = poolid;
      var joincost = joinamount;
      //let teamid =0;  //formthis.state.checkid;
      var api_url = `${config.API_URL}`;
      var reqapi = "";

      var args1 = {
        matchid: matchid,
        poolcontestid: poolid,
        //uteamid: teamid,
        fees: joinamount,
        atype: "prejoin" ///"prejoin"
      };

      reqapi = api_url + "/frontapi/joincontest";

      var object = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("jwt") + ""
        },
        body: JSON.stringify(args1)
      };

      fetch(reqapi, object)
        .then(function(response) {
          var chkresp = checkresponse("Wrong", response.status, "", 2);
          if (chkresp === true) {
            response.json().then(json => {
              if (json.error === false) {
                resolve(json);
              } else {
                resolve(false);
              }
            });
          }
        })
        .catch(error => {
          checkresponse("Wrong", false, error.toString(), 0);
        });
    });
  }

  callnotification = result => {
    let walletdetail = {
      btnname: result.btnname,
      eventtype: result.eventtype,
      fees: parseFloat(result.fees),
      paybalwlt: parseFloat(result.paybalwlt),
      paybnswlt: parseFloat(result.paybnswlt),
      paywinwlt: parseFloat(result.paywinwlt),
      walletbalance: parseFloat(result.wallet.walletbalance),
      wltbns: parseFloat(result.wallet.wltbns),
      wltwin: parseFloat(result.wallet.wltwin),
      entryfees: parseFloat(result.entryfees),
      bnsdeduction: parseFloat(result.bnsdeduction)
    };
    this.setState({
      isNotify: true,
      walletdetail: walletdetail
    });
  };

  render() {
    const formthis = this;
    return (
      <div className="fadeIn">
        <div className="left_logincontent profilepadding0">
          <ToastContainer />
          <div className="">
            <div className="header_bg">
              <div className="hd_left">
                <span onClick={this.goBack} className="hd_back" />
                <span onClick={sendHome} className="hd_home" />
              </div>
              <div className="hd_center">Create Private Contest</div>
            </div>
            <AvForm
              onValidSubmit={this.getWinningPrize}
              className={this.state.stepNo === 1 ? "" : "hidden"}
            >
              <div className="my_profilepage">
                <div className="myprofile_details">
                  <div className="profile_titalhead">
                    {/* <h2>Create Private Contest </h2> */}
                  </div>
                  <div className="profile_fieldsdetails">
                    <div className="form-group">
                      <AvField
                        name="contestName"
                        label="Give your contest name"
                        placeholder="(optional)"
                        onChange={formthis.onChange}
                        type="text"
                      />
                    </div>
                    <div className="form-group">
                      <AvField
                        type="number"
                        label="Total Prize Pool"
                        min={
                          this.state.minWinPrize ? this.state.minWinPrize : "0"
                        }
                        className="form-control"
                        name="totalPrizePool"
                        onKeyUp={this.calculateEntryFees}
                        onChange={formthis.onChange}
                        value={formthis.state.totalPrizePool}
                        placeholder={
                          "min " +
                          this.state.minWinPrize +
                          " & max " +
                          this.state.maxWinPrize
                        }
                        validate={{
                          required: {
                            value: true,
                            errorMessage: "Please enter total prize pool"
                          },
                          // pattern: { value: "^[0-9]\d*$", errorMessage: 'Only positive numbers allowed' },
                          min: {
                            value: this.state.minWinPrize,
                            errorMessage:
                              "Mininmum prize pool should be " +
                              this.state.minWinPrize
                          },
                          max: {
                            value: this.state.maxWinPrize,
                            errorMessage:
                              "Maximum prize pool should be " +
                              this.state.maxWinPrize
                          }
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <AvField
                        type="number"
                        min={this.state.minContestSize}
                        label="Contest Size"
                        className="form-control"
                        name="contestSize"
                        onKeyUp={this.calculateEntryFees}
                        onChange={formthis.onChange}
                        value={formthis.state.contestSize}
                        placeholder={
                          "min " +
                          this.state.minContestSize +
                          " & max " +
                          this.state.maxContestSize
                        }
                        validate={{
                          required: {
                            value: true,
                            errorMessage: "Please enter contest size"
                          },
                          // pattern: { value: "^[0-9]\d*$", errorMessage: 'Only positive numbers allowed' },
                          min: {
                            value: this.state.minContestSize,
                            errorMessage:
                              "Mininmum contest size should be " +
                              this.state.minContestSize
                          },
                          max: {
                            value: this.state.maxContestSize,
                            errorMessage:
                              "Maximum contest size should be " +
                              this.state.maxContestSize
                          }
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        {" "}
                        <input
                          type="checkbox"
                          name="isMultipleTeam"
                          value="1"
                          checked={
                            formthis.state.isMultipleTeam === true
                              ? true
                              : false
                          }
                          onChange={e => formthis.handleCheckBox(e)}
                        />
                        Allow friends to join multiple teams
                      </label>
                    </div>
                    <div className="privateContestFeePerTeam">
                      <div className="privateContestFee">
                        Entry Per Team:
                        <span className="privateContestFeeAmount">
                          {this.state.entryFees ? this.state.entryFees : 0}
                        </span>
                      </div>
                      <div className="privateContestFeeMessage">
                        Entry is calculated based on total prize amount &amp;
                        contest size
                      </div>
                    </div>
                  </div>
                  <button className={"all_transaction up_bt pointer"}>
                    CHOOSE WINNING BREAKUP
                  </button>
                </div>
              </div>
            </AvForm>

            <div
              className={
                this.state.stepNo === 2 ? "recommended-section" : "hidden"
              }
            >
              <div className="myContestDetail_mid">
                <div>
                  <div className="contestDetailItemHeader">CONTEST SIZE</div>
                  <div className="contvalue_pluse">
                    {this.state.contestSize ? this.state.contestSize : "0"}
                  </div>
                </div>
                <div>
                  <div className="contestDetailItemHeader">TOTAL WINNINGS</div>
                  <div>
                    <span className="contvalue_pluse2">
                      ₹{" "}
                      {this.state.totalPrizePool
                        ? this.state.totalPrizePool
                        : "0"}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="contestDetailItemHeader">ENTRY FEE</div>
                  <div className="contvalue_pluse3">
                    ₹ {this.state.entryFees ? this.state.entryFees : "0"}
                  </div>
                </div>
              </div>

              {this.state.winnerSlabs && this.state.winnerSlabs.length > 0 ? (
                <div>
                  <div className="winnerBreakupSelectBoxContainer">
                    <div className="winnerBreakupSelectorLabel">
                      Choose total no. of winners
                    </div>
                    <div
                      className="winnerBreakupSelectBox"
                      onClick={this.changeWinningBrkUp}
                    >
                      <span className="winnerBreakupSelectText">
                        {this.state.selectedPrizeBreakUp &&
                        this.state.selectedPrizeBreakUp.winner
                          ? this.state.selectedPrizeBreakUp.winner
                          : "0"}{" "}
                        Winners{" "}
                        <span className="isRecommended">(Recommended)</span>
                      </span>
                      <span>
                        <i className="fa fa-arrow-down"></i>
                      </span>
                    </div>
                  </div>

                  <div className="private_tabledatamid">
                    <div className="table-responsive">
                      <table className="table">
                        {this.state.selectedPrizeBreakUp &&
                        this.state.selectedPrizeBreakUp.ranks &&
                        this.state.selectedPrizeBreakUp.ranks.length
                          ? formthis.state.selectedPrizeBreakUp.ranks.map(
                              (item, index) => {
                                return (
                                  <tr key={index}>
                                    <td>
                                      {" "}
                                      <strong>
                                        {item.pmin &&
                                        item.pmax &&
                                        item.pmin === item.pmax
                                          ? item.pmin
                                          : item.pmin + "-" + item.pmax}{" "}
                                      </strong>{" "}
                                    </td>
                                    <td>
                                      {" "}
                                      {item.percent
                                        ? item.percent + "%"
                                        : ""}{" "}
                                    </td>
                                    <td>
                                      {" "}
                                      <i className="fa fa-inr"> </i>{" "}
                                      {priceOnPercent(
                                        formthis.state.totalPrizePool,
                                        item.percent
                                      )}{" "}
                                    </td>
                                  </tr>
                                );
                              }
                            )
                          : ""}
                      </table>
                    </div>
                  </div>
                  <button
                    onClick={this.createContest}
                    className={"all_transaction up_bt pointer"}
                  >
                    CREATE CONTEST & INVITE FRIENDS
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>

            <div
              className={this.state.stepNo === 3 ? "prizeBreakUp" : "hidden"}
            >
              {this.state.winnerSlabs && this.state.winnerSlabs.length > 0
                ? this.state.winnerSlabs.map((item, index) => {
                    return (
                      <div
                        className={
                          item._id.$oid &&
                          item._id.$oid === formthis.state.selectedBreakUpId
                            ? "rankprivate_tablenos active"
                            : "rankprivate_tablenos"
                        }
                        key={index}
                      >
                        <table>
                          <tr className="rankinner_privateboxes">
                            <table>
                              <thead>
                                <tr className="privatethead_odsinner">
                                  <th colSpan="3">
                                    <label className="custom_bcheckad">
                                      {item && item.winner ? item.winner : "0"}{" "}
                                      Winners
                                      <input
                                        type="checkbox"
                                        className="prizeBreakUpCheckbox"
                                        value={
                                          item._id.$oid ? item._id.$oid : ""
                                        }
                                        checked={
                                          item._id.$oid ==
                                          formthis.state.selectedBreakUpId
                                            ? "checked"
                                            : ""
                                        }
                                        onChange={formthis.selectPrizeBrkUp}
                                      />
                                      <span class="checkmark"></span>
                                    </label>
                                  </th>
                                </tr>
                              </thead>
                              {item && item.ranks && item.ranks.length
                                ? item.ranks.map((item2, index2) => {
                                    return (
                                      <tr key={index2}>
                                        <td>
                                          {" "}
                                          <strong>
                                            {item2.pmin &&
                                            item2.pmax &&
                                            item2.pmin === item2.pmax
                                              ? item2.pmin
                                              : item2.pmin +
                                                "-" +
                                                item2.pmax}{" "}
                                          </strong>{" "}
                                        </td>
                                        <td>
                                          {" "}
                                          {item2.percent
                                            ? item2.percent + "%"
                                            : ""}{" "}
                                        </td>
                                        <td>
                                          {" "}
                                          <i className="fa fa-inr"> </i>{" "}
                                          {priceOnPercent(
                                            formthis.state.totalPrizePool,
                                            item2.percent
                                          )}{" "}
                                        </td>
                                      </tr>
                                    );
                                  })
                                : ""}
                            </table>
                          </tr>
                        </table>
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
        </div>

        <Modal
          isOpen={this.state.isNotify}
          toggle={this.toggleNotification}
          className={
            "modal-sm verfypop_enter forconfir_md" + this.props.className
          }
        >
          <ModalHeader toggle={this.toggleNotification}>
            CONFIRMATION
          </ModalHeader>
          <ModalBody>
            <div className="iconlogi_call">
              <div className="entr_mdconi">
                <p>
                  <i className="fa  fa-inr giftfs"></i> Entry Fees{" "}
                  <span className="pull-right">
                    {" "}
                    ₹ {formthis.state.walletdetail.entryfees}
                  </span>{" "}
                </p>
              </div>
              <div className="entr_mdconi">
                <p>
                  <i className="fa  fa-money giftfs"></i> Unutilized Balance{" "}
                  <span className="pull-right">
                    {" "}
                    ₹ {formthis.state.walletdetail.walletbalance}
                  </span>{" "}
                </p>
              </div>
              <div className="entr_mdconi">
                <p>
                  <i className="fa fa-trophy giftfs"></i> Winning{" "}
                  <span className="pull-right">
                    {" "}
                    ₹ {formthis.state.walletdetail.wltwin}
                  </span>
                </p>
              </div>
              <div className="entr_mdconi">
                <p>
                  <i className="fa fa-gift giftfs"></i> Cash Bonus{" "}
                  <span className="pull-right">
                    {" "}
                    ₹ {formthis.state.walletdetail.wltbns}{" "}
                  </span>{" "}
                </p>
              </div>
              <div className="entr_mdconi fottopauy">
                {formthis.state.walletdetail.paybalwlt > 0 ? (
                  <p>
                    From balance{" "}
                    <span className="pull-right">
                      {" "}
                      - ₹ {formthis.state.walletdetail.paybalwlt}{" "}
                    </span>{" "}
                  </p>
                ) : null}
                {formthis.state.walletdetail.paybnswlt > 0 ? (
                  <p>
                    From bonus{" "}
                    <span className="pull-right">
                      {" "}
                      - ₹ {formthis.state.walletdetail.paybnswlt}{" "}
                    </span>{" "}
                  </p>
                ) : null}
                {formthis.state.walletdetail.paywinwlt > 0 ? (
                  <p>
                    From winning{" "}
                    <span className="pull-right">
                      {" "}
                      - ₹ {formthis.state.walletdetail.paywinwlt}{" "}
                    </span>{" "}
                  </p>
                ) : null}
                <p className="byjoingebd">
                  {formthis.state.walletdetail.bnsdeduction}% of entry fees will
                  be deducted from Cash Bonus wallet, if available! By joining
                  this contest you accept {config.PRODUCT_SHORT_NAME}'s T&C.
                </p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className="btncustom-md"
              color="primary"
              onClick={this.btnNotification}
            >
              {formthis.state.walletdetail.btnname}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default CreatePrivateContest;
