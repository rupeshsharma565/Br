import React, { Component } from 'react';
import config from './../../config';
import { goBack,sendHome,checkresponse ,sessioncheck,HBRout} from './../../Comman';

class PrintTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getReferCodeDetail:{}
    };    
    sessioncheck();
  }


  componentDidMount() {    
    sessioncheck();

  }

  render() {
    const formthis = this;
    return (
      <div className="main-tablepdf">
        <div className="table-responsive">
          <table>
          </table><table className="table table-striped table-bordered">
            <thead>
              <tr style={{background: '#3568b2', color: '#fff'}}>
                <th colSpan={2} style={{textAlign: 'center'}}>BR FANTASY &nbsp; &nbsp; <small> Fair Play</small></th>
                <th colSpan={2} style={{textAlign: 'center'}}>DHDvsKT</th>
                <th colSpan={2} style={{textAlign: 'center'}}>Contest: Win Rs. 0</th>
                <th colSpan={2} style={{textAlign: 'center'}}>Entry Fee Rs. 0.0</th>
                <th colSpan={2} style={{textAlign: 'center'}}>Members: 1000</th>
                <th colSpan={2} style={{textAlign: 'center'}}>Invite code: 1QYDXLR1FNNSR</th>
              </tr>
              <tr>
                <th>User (Team)</th>
                <th>Player 1 (Captain)</th>
                <th>Player 2 (Vice Captain)</th>
                <th>Player 3</th>
                <th>Player 4</th>
                <th>Player 5</th>
                <th>Player 6</th>
                <th>Player 7</th>
                <th>Player 8</th>
                <th>Player 9</th>
                <th>Player 10</th>
                <th>Player 11</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong> 02082018 (1) </strong></td>
                <td>Sunil Narine</td>
                <td>Sunil Narine</td>
                <td>Mahmudullah</td>
                <td>Andre Russell</td>
                <td>Brendan Taylor</td>
                <td>Junaid Siddique</td>
                <td>Kieron Pollard</td>
                <td>Nazmul Hossain-Shanto</td>
                <td>Rony Talukdar</td>
                <td>Rubel Hossain</td>
                <td>Shariful-Islam</td>
              </tr>
              <tr>
                <td><strong> 02082018 (1) </strong></td>
                <td>Sunil Narine</td>
                <td>Sunil Narine</td>
                <td>Mahmudullah</td>
                <td>Andre Russell</td>
                <td>Brendan Taylor</td>
                <td>Junaid Siddique</td>
                <td>Kieron Pollard</td>
                <td>Nazmul Hossain-Shanto</td>
                <td>Rony Talukdar</td>
                <td>Rubel Hossain</td>
                <td>Shariful-Islam</td>
              </tr><tr>
                <td><strong> 02082018 (1) </strong></td>
                <td>Sunil Narine</td>
                <td>Sunil Narine</td>
                <td>Mahmudullah</td>
                <td>Andre Russell</td>
                <td>Brendan Taylor</td>
                <td>Junaid Siddique</td>
                <td>Kieron Pollard</td>
                <td>Nazmul Hossain-Shanto</td>
                <td>Rony Talukdar</td>
                <td>Rubel Hossain</td>
                <td>Shariful-Islam</td>
              </tr><tr>
                <td><strong> 02082018 (1) </strong></td>
                <td>Sunil Narine</td>
                <td>Sunil Narine</td>
                <td>Mahmudullah</td>
                <td>Andre Russell</td>
                <td>Brendan Taylor</td>
                <td>Junaid Siddique</td>
                <td>Kieron Pollard</td>
                <td>Nazmul Hossain-Shanto</td>
                <td>Rony Talukdar</td>
                <td>Rubel Hossain</td>
                <td>Shariful-Islam</td>
              </tr><tr>
                <td><strong> 02082018 (1) </strong></td>
                <td>Sunil Narine</td>
                <td>Sunil Narine</td>
                <td>Mahmudullah</td>
                <td>Andre Russell</td>
                <td>Brendan Taylor</td>
                <td>Junaid Siddique</td>
                <td>Kieron Pollard</td>
                <td>Nazmul Hossain-Shanto</td>
                <td>Rony Talukdar</td>
                <td>Rubel Hossain</td>
                <td>Shariful-Islam</td>
              </tr><tr>
                <td><strong> 02082018 (1) </strong></td>
                <td>Sunil Narine</td>
                <td>Sunil Narine</td>
                <td>Mahmudullah</td>
                <td>Andre Russell</td>
                <td>Brendan Taylor</td>
                <td>Junaid Siddique</td>
                <td>Kieron Pollard</td>
                <td>Nazmul Hossain-Shanto</td>
                <td>Rony Talukdar</td>
                <td>Rubel Hossain</td>
                <td>Shariful-Islam</td>
              </tr><tr>
                <td><strong> 02082018 (1) </strong></td>
                <td>Sunil Narine</td>
                <td>Sunil Narine</td>
                <td>Mahmudullah</td>
                <td>Andre Russell</td>
                <td>Brendan Taylor</td>
                <td>Junaid Siddique</td>
                <td>Kieron Pollard</td>
                <td>Nazmul Hossain-Shanto</td>
                <td>Rony Talukdar</td>
                <td>Rubel Hossain</td>
                <td>Shariful-Islam</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default PrintTeam;
