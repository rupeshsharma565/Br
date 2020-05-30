import React, { Component} from 'react';
import { Progress } from 'reactstrap';
import config from './../../config';
import { dashboardpage,getCurrentTime,converttosecondnew,goBack, sendHome, checkresponse, sessioncheck, converttosecond, secondsToTime,endtimeinsecond ,HBRout,timestampToDateTime,securityCall} from './../../Comman';

import swal from 'sweetalert';
let scurrenttimestamp=0;
let swindow=window;
securityCall(swindow);

class Notification extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      notificationdetail:[],
      descShow:-1,
      totalpage: 0,
      selectedPage:0,
      error: false,
      hasMore: true,
      isLoading: false,
      page:1,
      totallength:0
    };
    sessioncheck(); 
    this.toggleMsgDesc = this.toggleMsgDesc.bind(this);
  }

  
  componentDidMount() {
    this._isMounted = true;
    if(this._isMounted){
      sessioncheck();
      this.notificationDetail(1);
      window.addEventListener('scroll', this.scrollMore, true);
    }

  }
  // Binds our scroll event handler
  scrollMore = () => {
    this._isMounted = true;
    const {
      notificationDetail,
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
      if(this._isMounted){
        this.notificationDetail(page_no);
        this.setState({
          page:page_no
        })
      }
      
    }
  }

  notificationDetail = (page_no) => {
    this._isMounted = true;
    var formthis = this;
    var args1 = {};
    var args1 = {
      page: page_no,
      limit:10

    };
    
    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      },
      body: JSON.stringify(args1)
    }

    var parameter = this.props.match.params.ids;
    var user_ids = (parameter) ? parameter : 0;
    var apiUrl = "";
    var api_url = `${config.API_URL}`;

    apiUrl = api_url + "/frontapi/getnotification";
    fetch(apiUrl, object)
      .then(function (response) {
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            if (json.error===false) {


              // formthis.setState({
              //   notificationdetail: json.data.list,
              //   totalpage: json.data.total?json.data.total:0,
              // })
              
              // Creates a massaged array of user data
              const nextPageRecord = json.data.list;

              // Merges the next record into our existing record
              if(formthis._isMounted){
                formthis.setState({
                  totallength:json.data.total,
                  // Note: Depending on the API you're using, this value may be
                  // returned as part of the payload to indicate that there is no
                  // additional data to be loaded
                  hasMore: (formthis.state.notificationdetail.length < json.data.total),
                  isLoading: false,
                  notificationdetail: [
                    ...formthis.state.notificationdetail,
                    ...nextPageRecord,
                  ],
                });
              }
            }
          })
        }
      }).catch(error => {
        checkresponse("Wrong", false, error.toString(), 0);
      });
  }

  toggleMsgDesc (e,item,type) { 
    
    //if(this.state.descShow==e)
    
       //this.setState({descShow:-1});  
    //else
      this.setState({descShow:e});
    if(item.userid==0 || type ==='delete'){
      this.readStatusUpdate(e,item,type);
    }else{
      if(type ==='deleteAll'){
        this.readStatusUpdate(-1,[],type);
      }
    }
}

 readStatusUpdate = (e,item,type) => {
   this._isMounted = true;
    var formthis = this;
    var atype = '';
    let notificationdetail=this.state.notificationdetail;
    if(type==='read'){
      atype = 'statusUpdate';
    }else if(type==='delete'){
      atype = 'delete';
    }else if(type==='deleteAll'){
      atype = 'deleteAll';
    }
    if(Object.getOwnPropertyNames(item).length > 0 && atype != 'deleteAll'){
      notificationdetail[e]["userid"]=1;
      var args1 = {
        sendAll:item.sendAll,
        id:item._id['$oid'],
        atype:atype
      };
    }else{
      var args1 = {
        atype:atype
      };
    }
    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      },
      body: JSON.stringify(args1)
    }

    var parameter = this.props.match.params.ids;
    var user_ids = (parameter) ? parameter : 0;
    var apiUrl = "";
    var api_url = `${config.API_URL}`;

    apiUrl = api_url + "/frontapi/notificationupdate";
    if(atype === 'statusUpdate'){
      fetch(apiUrl, object)
      .then(function (response) {
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            if (json.error===false) {
              if(type==='delete'){
                notificationdetail = notificationdetail.filter(itemdata=>itemdata._id !== item._id);                
              }
              if(formthis._isMounted){
                formthis.setState({notificationdetail:notificationdetail,
                })
              }
            } 
            else {
              if(formthis._isMounted){
                formthis.setState({
                  notificationdetail: []
                })
              }
            }
          })
        }
      }).catch(error => {
        checkresponse("Wrong", false, error.toString(), 0);
      });
    }else{
      swal({
        html:true,
        title: "Are you sure?",
        text: "You want to delete",
        icon: "warning",
        buttons: [
          'No, cancel it!',
          'Yes, Delete!'
        ],
        dangerMode: true,
      }).then(function (isConfirm) {
        if (isConfirm) {
          fetch(apiUrl, object)
          .then(function (response) {
            var chkresp = checkresponse("Wrong", response.status, response.message, 2);
            if (chkresp === true) {
              response.json().then(json => {
                if (json.error===false) {
                  if(type==='delete'){
                    notificationdetail = notificationdetail.filter(itemdata=>itemdata._id !== item._id);                
                  }
                  if(formthis._isMounted){
                    formthis.setState({notificationdetail:notificationdetail,
                    })
                  }
                  if(type==='deleteAll'){
                    formthis.setState({
                      notificationdetail: [],
                      totallength:0
                    })
                  }
                  swal({
                      title: "Deleted",
                      text: "Notification deleted successfully",
                      icon: "success",
                  });
                } 
                else {
                  if(formthis._isMounted){
                    formthis.setState({
                      notificationdetail: []
                    })
                  }
                }
              })
            }
          }).catch(error => {
            checkresponse("Wrong", false, error.toString(), 0);
          });
        }
      })
    }
  }
  componentWillUnmount(){
    this._isMounted = false;
  }
  render() {
    const formthis = this;
    const {
      error,
      hasMore,
      isLoading,
      notificationdetail
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
              {/* <div className="hd_right"><a className="hd_wallet" /></div> */}
              <div className="hd_center">Notification</div>
              <span className={"delete-all-notification "+(this.state.totallength > 0 ? "":"hidden")}><i title="Delete All" onClick={()=>formthis.toggleMsgDesc(-1,[],'deleteAll')} className="fa fa-trash"></i></span>
            </div>
            <div id="contest1" className="panel-collapse in noadject_main">
              <div className="panel-body contesttab_panelbody">

                {((this.state.notificationdetail && this.state.totallength > 0)?this.state.notificationdetail.map(function(itemNotiy,indexNotify){
                  return(
                  <div className="ntifi_detialsa"  key={indexNotify} >
                    <h3 className={((itemNotiy.userid==0)?" unread":"" + "notify_title_head") } onClick={()=>formthis.toggleMsgDesc(indexNotify,itemNotiy,'read')} >{itemNotiy.title} <br></br><span className="notify-date">{(itemNotiy.created) ? timestampToDateTime(itemNotiy.created) : ""}</span></h3>
                    <div id={"desc_"+indexNotify} className={"messcontent msg-content"+ ((indexNotify==formthis.state.descShow)?"":" hidden")}>
                    <p>{itemNotiy.message} </p>
                    <span className="notify_trash"> <i title="Delete" onClick={()=>formthis.toggleMsgDesc(indexNotify,itemNotiy,'delete')} className="fa fa-trash"></i> </span>
                    {(itemNotiy.img)?<img src={itemNotiy.img} />:''}
                    </div>
                  </div>)}):
                    (<div className="notification_nofounde">
                    <p>NO NOTIFICATION AVAILABLE CURRENTLY.</p>	
                      </div>)
                )} 
              
                <hr />
                {error &&
                  <p style={{ color: '#900' }}>
                    {error}
                  </p>
                }
                {isLoading &&
                  <p>Loading...</p>
                }
                {!hasMore && 
                  <p></p>
                }
              
              </div>
              
            </div>

          </div>
        </div>
        
      </div>
    );
  }
}

export default Notification;
