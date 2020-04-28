import React, { Component } from 'react';
import { HashRouter, Route, Switch,Redirect } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import { isLoggedIn } from './utils/AuthService';
import './App.scss';
import './scss/style.css';
import './scss/scustom.css';
import './scss/responsvie.css';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import('./views/Login'),
  loading
});

const Register = Loadable({
  loader: () => import('./views/Register'),
  loading
});

const ForgotPassword = Loadable({
  loader: () => import('./views/ForgotPassword'),
  loading
});

const Verifyotp = Loadable({
  loader: () => import('./views/Verifyotp'),
  loading
});

const ResetPassword = Loadable({
  loader: () => import('./views/ResetPassword'),
  loading
});

const LoginOtp = Loadable({
  loader: () => import('./views/LoginOtp'),
  loading
});

const LoginPassword = Loadable({
  loader: () => import('./views/LoginPassword'),
  loading
});

const FantasyPointSystem = Loadable({
  loader: () => import('./views/FantasyPointSystem'),
  loading
});

const PrivacyPolicy = Loadable({
  loader: () => import('./views/PrivacyPolicy'),
  loading
});


const TermsCondition = Loadable({
  loader: () => import('./views/TermsCondition'),
  loading
});

const Support = Loadable({
  loader: () => import('./views/Support'),
  loading
});

const FantasyScoreCard = Loadable({
  loader: () => import('./views/FantasyScoreCard'),
  loading
});

const AboutUs = Loadable({
  loader: () => import('./views/AboutUs'),
  loading
});

const HowToPlay = Loadable({
  loader: () => import('./views/HowToPlay'),
  loading
});

const Faq = Loadable({
  loader: () => import('./views/Faq'),
  loading
});

const FullScoreCard = Loadable({
  loader: () => import('./views/FullScoreCard'),
  loading
});

const KabaddiFullScoreCard = Loadable({
  loader: () => import('./views/KabaddiFullScoreCard'),
  loading
});

const FootballFullScoreCard = Loadable({
  loader: () => import('./views/FootballFullScoreCard'),
  loading
});



class App extends Component {

  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          isLoggedIn() ? (
      <Component {...props} />
          ) : (
      <Redirect
        to={{
          pathname:"/login",
          state: { from: props.location }
        }}
      />
          )
        }
      />
    );
    return (//
      <HashRouter>
          <Switch>
          <Route exact path="/FantasyPointSystem/mobile" name="FantasyPointSystem" component={FantasyPointSystem} />
            <Route exact path="/prcypoly" name="PrivacyPolicyMobile" component={PrivacyPolicy} />
            <Route exact path="/termscon" name="TermsConditionMobile" component={TermsCondition} />
            <Route path="/suprt" name="SupportMobile" component={Support} />
            <Route path="/fantscorcrd/:gameid/:matchid" name="FantasyScoreCardMobile" component={FantasyScoreCard} />
            <Route path="/aboutus" name="AboutUsMobile" component={AboutUs} />
            <Route path="/hwtoply" name="HowToPlayMobile" component={HowToPlay} />
            <Route path="/faqs" name="FaqMobile" component={Faq} />
            <Route path="/fullscorecardmb/1/:matchid" name="fullscorecardCricket" component={FullScoreCard} />
            <Route path="/fullscorecardmb/2/:matchid" name="fullscorecardFootball" component={FootballFullScoreCard} />
            <Route path="/fullscorecardmb/3/:matchid" name="fullscorecardKabaddi" component={KabaddiFullScoreCard} />
            

            <Route exact path="/login" name="Login Page" component={Login} />
            <Route exact path="/Register" name="Register Page" component={Register} />
            <Route exact path="/ForgotPassword" name="Forgot Password" component={ForgotPassword} />
            <Route exact path="/Verifyotp/:username" name="Verifyotp" component={Verifyotp} />
            <Route exact path="/ResetPassword/:username" name="ResetPassword" component={ResetPassword} />
            <Route exact path="/LoginOtp/:username" name="LoginOtp" component={LoginOtp} />
            <Route exact path="/LoginPassword/:username" name="LoginPassword" component={LoginPassword} />
            <Route exact path="/PrivacyPolicy" name="PrivacyPolicy" component={PrivacyPolicy} />
            <Route exact path="/TermsCondition" name="PrivacyPolicy" component={TermsCondition} />
            
            
            
            
            <PrivateRoute path="/" name="Home" component={DefaultLayout} />

            
          </Switch>
      </HashRouter>
    );
  }
}

export default App;
