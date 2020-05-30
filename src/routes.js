import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Matches = React.lazy(() => import('./views/Matches'));
const Refer = React.lazy(() => import('./views/Refer'));
const Verifyotp = React.lazy(() => import('./views/Verifyotp'));
const Contests = React.lazy(() => import('./views/Contests'));
const CreateTeams= React.lazy(() => import('./views/CreateTeams'));
const MyTeams= React.lazy(() => import('./views/MyTeams'));
const MyProfile= React.lazy(() => import('./views/MyProfile'));
const MyAccount= React.lazy(() => import('./views/MyAccount'));
const TermsCondition= React.lazy(() => import('./views/TermsCondition'));
const Faq= React.lazy(() => import('./views/Faq'));
const Support= React.lazy(() => import('./views/Support'));
const WithdrawlVerify= React.lazy(() => import('./views/WithdrawlVerify'));
const FantasyPointSystem= React.lazy(() => import('./views/FantasyPointSystem'));
const AddCash= React.lazy(() => import('./views/AddCash'));
const PaytmCheckout= React.lazy(() => import('./views/PaytmCheckout'));
const JoinContest= React.lazy(() => import('./views/JoinContest'));
const ChooseTeam= React.lazy(() => import('./views/ChooseTeam'));
const ChoosePrivateTeam= React.lazy(() => import('./views/ChoosePrivateTeam'));
const ContestDetails= React.lazy(() => import('./views/ContestDetails'));
const MyMatches= React.lazy(() => import('./views/MyMatches'));
const SwitchTeam= React.lazy(() => import('./views/SwitchTeam'));
const LiveScore= React.lazy(() => import('./views/LiveScore'));
const FullScoreCard= React.lazy(() => import('./views/FullScoreCard'));
const PaytmRedirect= React.lazy(() => import('./views/PaytmRedirect'));
const PaytmResponse= React.lazy(() => import('./views/PaytmResponse'));
const TransactionHistory= React.lazy(() => import('./views/TransactionHistory'));
const FantasyScoreCard= React.lazy(() => import('./views/FantasyScoreCard'));
const Notification= React.lazy(() => import('./views/Notification'));
const AboutUs= React.lazy(() => import('./views/AboutUs'));
const HowToPlay= React.lazy(() => import('./views/HowToPlay'));
const WithdrawCash= React.lazy(() => import('./views/WithdrawCash'));
const PrintTeam= React.lazy(() => import('./views/PrintTeam'));
const More= React.lazy(() => import('./views/More'));
const PrivacyPolicy = React.lazy(() => import('./views/PrivacyPolicy'));
const KabaddiFullScoreCard = React.lazy(()=> import('./views/KabaddiFullScoreCard'))
const FootballFullScoreCard = React.lazy(()=> import('./views/FootballFullScoreCard'))
const CreatePrivateContest = React.lazy(()=> import('./views/CreatePrivateContest'))
const Checkout = React.lazy(()=> import('./views/Checkout'))


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/matches', name: 'Matches', component: Matches },
  { path: '/refer', name: 'Refer', component: Refer },
  { path: '/Faq', name: 'Faq', component: Faq },
  { path: '/MyProfile', name: 'MyProfile', component: MyProfile },
  { path: "/Verifyotp/:username"  ,name:"Verifyotp",component:Verifyotp},
  { path: "/Contests/:matchid"  ,name:"Contests",component:Contests},
  { path: "/CreateTeams/:matchid"  ,name:"CreateTeams",component:CreateTeams},
  { path: "/UpdateTeams/:matchid/:teamid"  ,name:"CreateTeams",component:CreateTeams},
  { path: "/CloneTeam/:matchid/:teamid"  ,name:"CreateTeams",component:CreateTeams},
  //{ path: "/Home"  ,name:"Home",component:Home},
    { path: "/MyTeams/:matchid"  ,name:"MyTeams",component:MyTeams},
  //{ path: "/MyProfile"  ,name:"MyProfile",component:MyProfile},
  { path: "/MyAccount"  ,name:"MyAccount",component:MyAccount},
  { path: "/Refer"  ,name:"Refer",component:Refer},
  { path: "/TermsCondition"  ,name:"TermsCondition",component:TermsCondition},
  { path: "/Faq"  ,name:"Faq",component:Faq},
  { path: "/Support"  ,name:"Support",component:Support},//
  { path: "/WithdrawlVerify"  ,name:"WithdrawlVerify",component:WithdrawlVerify},
  { path: "/FantasyPointSystem"  ,name:"FantasyPointSystem",component:FantasyPointSystem},
  { path: "/AddCash"  ,name:"AddCash",component:AddCash},
  { path: "/Checkout/:payment_method/:orderid/:amount"  ,name:"Checkout",component:PaytmCheckout},
  { path: "/JoinContest/:matchid/:type"  ,name:"JoinContestType",component:JoinContest},
  { path: "/JoinContest/:matchid"  ,name:"JoinContest",component:JoinContest},
  { path: "/ChooseTeam/:matchid/:poolid/:joincost"  ,name:"ChooseTeam",component:ChooseTeam},
  { path: "/ChoosePrivateTeam/:matchid/:responsejoin"  ,name:"ChoosePrivateTeam",component:ChoosePrivateTeam},
  { path: "/SwitchTeam/:matchid/:poolid"  ,name:"SwitchTeam",component:SwitchTeam},
  { path: "/ContestDetails/:matchid/:poolcontestid/:type"  ,name:"ContestDetailsType",component:ContestDetails},
  { path: "/ContestDetails/:matchid/:poolcontestid"  ,name:"ContestDetails",component:ContestDetails},
  { path: "/ContestDetailsForJoin/:matchid/:poolcontestid"  ,name:"ContestDetailsJoin",component:ContestDetails},
  { path: "/MyMatches"  ,name:"MyMatches",component:MyMatches},
  { path: "/LiveScore"  ,name:"LiveScore",component:LiveScore},
  { path: "/FullScoreCard/1/:matchid"  ,name:"FullScoreCard",component:FullScoreCard},
  { path: "/FullScoreCard/2/:matchid"  ,name:"FootballFullScoreCard",component:FootballFullScoreCard},
  { path: "/FullScoreCard/3/:matchid"  ,name:"KabaddiFullScoreCard",component:KabaddiFullScoreCard},
  { path: "/PaytmRedirect/:orderid/:amount/:promocode"  ,name:"PaytmRedirect",component:PaytmRedirect},
  { path: "/PaytmResponse/:orderid/:txid"  ,name:"PaytmResponse",component:PaytmResponse},
  { path: "/TransactionHistory"  ,name:"TransactionHistory",component:TransactionHistory},
  { path: "/FantasyScoreCard/:gameid/:matchid"  ,name:"FantasyScoreCard",component:FantasyScoreCard},
  { path: "/Notification"  ,name:"Notification",component:Notification},
  { path: "/AboutUs"  ,name:"AboutUs",component:AboutUs},
  { path: "/HowToPlay"  ,name:"HowToPlay",component:HowToPlay},
  { path: "/WithdrawCash"  ,name:"WithdrawCash",component:WithdrawCash},
  { path: "/PrintTeam",name:"PrintTeam",component:PrintTeam},

  { path: "/More",name:"More",component:More},
  { path: "/PrivacyPolicy",name:"Privacy Policy",component:PrivacyPolicy},
  { path: "/CreatePrivateContest/:matchid/",name:"Create Private Contest",component:CreatePrivateContest},
  { path: "/RazorpayCheckout/:type/:amount/:promocode",name:"RazorpayCheckout",component:Checkout}
   
];

export default routes;
