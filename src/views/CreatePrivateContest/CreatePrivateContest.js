import React, { Component } from 'react';
import { AvForm, AvField,AvCheckboxGroup,AvCheckbox } from 'availity-reactstrap-validation';
import config from './../../config';
import { goBack, sendHome, checkresponse, validation, sessioncheck,HBRout } from './../../Comman';
import axios from 'axios';

class CreatePrivateContest extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      contestName: "",
      contestSize: "",
      totalPrizePool: "",
      privateContestInfo:{},
      minWinPrize:0,
      maxWinPrize:1000,
      minContestSize:2,
      maxContestSize:100,
      admincommission:0,
      entryFees:0,
      isPrizeBreakUp:false,
      isMultipleTeam:false,
      winPrizeBrkUpData:{},
      winnerSlabs:[]
    };
    sessioncheck();
    this.onChange = this.onChange.bind(this)
    this.handleCheckBox = this.handleCheckBox.bind(this);

  }


  componentDidMount() {
    sessioncheck();
    this.getPrivateContestInfo();
  }

  getPrivateContestInfo = () => {
    this._isMounted = true;
    var formthis = this;
    let args = {atype:"pvtcontest"};
    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      },
      body:JSON.stringify(args)
    }
    var api_url = `${config.API_URL}`;

    var apiUrl = "";
    apiUrl = api_url + "/frontapi/appsettings";

    formthis.setState({
      privateContestInfo: {}
    })

    fetch(apiUrl, object)
      .then(function (response) {
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            if (json.error === false) {
              if(formthis._isMounted){
                formthis.setState({
                  privateContestInfo: json.data,
                  minWinPrize:(json.data.pvtcontest) ? json.data.pvtcontest.winprize.min :0,
                  maxWinPrize:(json.data.pvtcontest) ? json.data.pvtcontest.winprize.max :1000,
                  minContestSize:(json.data.pvtcontest) ? json.data.pvtcontest.cnstsize.min :2,
                  maxContestSize:(json.data.pvtcontest) ? json.data.pvtcontest.cnstsize.max :100,
                  admincommission:(json.data.pvtcontest) ? json.data.pvtcontest.adminchrg :0
                })
              }

            }
            else {
              if(formthis._isMounted){
                formthis.setState({
                  privateContestInfo: {}
                })
              }
            }
          })
        }
      }).catch(error => {
        checkresponse("Wrong", false, error.toString(), 0);
      });
  }

  chooseWinningPrize = () => {
    var formthis = this;
    let matchid = this.props.match.params.matchid;
    let contestName = (formthis.state.contestName) ? formthis.state.contestName : "";
    const formData = new FormData();
      formData.append('name', contestName);
      formData.append('contestsize', formthis.state.contestSize);
      formData.append('tolwinprize', formthis.state.totalPrizePool);
      formData.append('type', formthis.state.isMultipleTeam);

      var api_url = `${config.API_URL}`;
      var apiUrl = "";
      apiUrl = api_url + "/frontapi/pvtcnstprzbrk";

      const configdata = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: 'Bearer ' + sessionStorage.getItem('jwt') + ''
        }
      };
      axios
        .post(apiUrl, formData, configdata)
        .then(response => {
          
          if (response.data.error === false) {
            //console.log("response.data---",response.data.data);
            if(response.data.data){
              formthis.setState({
                winPrizeBrkUpData:response.data.data,
                winnerSlabs:response.data.data.winnerslabs
              })
            }
            checkresponse("Save", 200, response.data.msg, 1);
          }
          else{
            checkresponse("Warning", false, response.data.msg, 3);
          }
        })
        .catch(error => {});
  }

  onChange= (e)=>{
    const formthis = this;
    let {name, value} = e.target;
    
    formthis.setState({
      [name]: value
    });
  }
  handleCheckBox= (e) =>{
    let isMultipleTeam;
    if(e.target.checked===true)
    {  
      isMultipleTeam=true
    }
    else
    {
      isMultipleTeam=false
    }
    this.setState({
      isMultipleTeam:isMultipleTeam
    })
  }

  calculateEntryFees= () =>{
    let entryFees = 0;
    let contestSize = (this.state.contestSize > 0) ? parseInt(this.state.contestSize) : 0;
    let totalPrizePool = (this.state.totalPrizePool > 0) ? parseInt(this.state.totalPrizePool) : 0;
    let admincommission = (this.state.admincommission > 0) ? parseFloat(this.state.admincommission) : 0;
    if(totalPrizePool>0 && contestSize>0){
      var perTeam =0;
      perTeam = (totalPrizePool/contestSize);
      entryFees = parseFloat(perTeam) +parseFloat((perTeam*admincommission)/100);
      if(entryFees>1){
       entryFees = Math.ceil(entryFees);
      }else{
        entryFees=0
      }
      this.setState({
        entryFees:entryFees
      })
    }else{
      this.setState({
        entryFees:0
      })
    }
  }

  render() {
    const formthis = this;
    return (
      <div className="fadeIn">
        <div className="left_logincontent profilepadding0">
          <div className="background-cover ng-scope">
            <div className="header_bg">
              <div className="hd_left">
                <span onClick={goBack} className="hd_back" />
                <span onClick={sendHome} className="hd_home" />
              </div>
              <div className="hd_center">Create Private Contest</div>
            </div>
            <AvForm onValidSubmit={this.chooseWinningPrize}>
              <div className="my_profilepage">
                <div className="myprofile_details">
                  <div className="profile_titalhead">
                    {/* <h2>Create Private Contest </h2> */}
                  </div>
                  <div className="profile_fieldsdetails">
                    <div className="form-group">
                      <AvField name="contestName" label="Give your contest name" placeholder="(optional)" type="text"/>
                    </div>
                    <div className="form-group">
                      <AvField type="number" label="Total Prize Pool" className="form-control" name="totalPrizePool" onKeyUp={this.calculateEntryFees} onChange={formthis.onChange} value={formthis.state.totalPrizePool} placeholder={"min "+this.state.minWinPrize+" & max "+this.state.maxWinPrize}
                      validate={{
                        required: { value: true, errorMessage: "Please enter total prize pool" },
                        // pattern: { value: "^[0-9]\d*$", errorMessage: 'Only positive numbers allowed' },
                        min: { value: this.state.minWinPrize, errorMessage: 'Mininmum prize pool should be '+this.state.minWinPrize },
                        max: { value: this.state.maxWinPrize, errorMessage: 'Maximum prize pool should be '+this.state.maxWinPrize }
                      }} />
                    </div>
                    <div className="form-group">
                      <AvField type="number" label="Contest Size" className="form-control" name="contestSize" onKeyUp={this.calculateEntryFees} onChange={formthis.onChange} value={formthis.state.contestSize} placeholder={"min "+this.state.minContestSize+" & max "+this.state.maxContestSize}
                        validate={{
                          required: { value: true, errorMessage: "Please enter contest size" },
                          // pattern: { value: "^[0-9]\d*$", errorMessage: 'Only positive numbers allowed' },
                          min: { value: this.state.minContestSize, errorMessage: 'Mininmum contest size should be '+this.state.minContestSize },
                          max: { value: this.state.maxContestSize, errorMessage: 'Maximum contest size should be '+this.state.maxContestSize }
                        }} />
                    </div>
                    <div className="form-group">
                      <label> <input type="checkbox" name="isMultipleTeam" value="1" checked={(formthis.state.isMultipleTeam===true)?true:false} onChange={(e)=>formthis.handleCheckBox(e)} />
                      Allow friends to join multiple teams</label>
                    </div>
                    <div className="privateContestFeePerTeam">
                      <div className="privateContestFee">
                        Entry Per Team:<span className="privateContestFeeAmount">{(this.state.entryFees) ? this.state.entryFees : 0}</span>
                        </div>
                        <div className="privateContestFeeMessage">Entry is calculated based on total prize amount &amp; contest size</div>
                    </div>
                  </div>
                  <button className={"all_transaction up_bt pointer"}>CHOOSE WINNING BREAKUP</button>
                </div>
              </div>
            </AvForm>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePrivateContest;
