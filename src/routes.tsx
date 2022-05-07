
import { lazy, Suspense, useEffect, useState } from 'react';
import { Switch, Route } from "react-router-dom";
import { NavListener } from './components/nav-listener/index';
import { AlteaLoader } from './components/loading/altea-loading';
// import { LandingPage } from "./pages/index";
// import { ListDoctorPage } from './pages/index';
// import { LoginPage } from './pages/index';
// import { RegisterPage } from './pages/index';
// import { ForgotPassword } from './pages/index';
// import { MobileListDoctorPage } from './pages/index';
// import { DetailPage } from './pages/index'
// import { CreateConsultationPage } from './pages/index';
// import { CallPage } from './pages/index';
// import { MyConsultation } from './pages/index';
// import { DetailConsultation } from './pages/index';
// import { PaymentPage } from './pages/index';
// import { PaymentMethodPage } from './pages/index';
// import { AlteaPaymentWebView } from './pages/index';
// import { PaymentSuccessPage } from './pages/index';
// import { ProfilePage } from './pages/index';
// import { BlocksPage } from './pages/index';
// import { ChangeProfilePage } from './pages/index';
// import { ChangePasswordPage } from './pages/index';
// import { VerifyChangeDataPage } from './pages/index';
// import { OTPPage } from './pages/index';
// import { GeneralSearch } from './pages/index';
// import { SpecialistPage } from './pages/index';

const HomePage = lazy(() => import('./pages/index').then(({ HomePage }) => ({ default: HomePage })));
const LoginPage = lazy(() => import('./pages/index').then(({ LoginPage }) => ({ default: LoginPage })));
const ListDoctorPage = lazy(() => import('./pages/index').then(({ ListDoctorPage }) => ({ default: ListDoctorPage })));
const LandingPage = lazy(() => import('./pages/index').then(({ LandingPage }) => ({ default: LandingPage })));
const RegisterPage = lazy(() => import('./pages/index').then(({ RegisterPage }) => ({ default: RegisterPage })));
const ForgotPassword = lazy(() => import('./pages/index').then(({ ForgotPassword }) => ({ default: ForgotPassword })));
const MobileListDoctorPage = lazy(() => import('./pages/index').then(({ MobileListDoctorPage }) => ({ default: MobileListDoctorPage })));
const DetailPage = lazy(() => import('./pages/index').then(({ DetailPage }) => ({ default: DetailPage })));
const CreateConsultationPage = lazy(() => import('./pages/index').then(({ CreateConsultationPage }) => ({ default: CreateConsultationPage })));
const CallPage = lazy(() => import('./pages/index').then(({ CallPage }) => ({ default: CallPage })));
const MyConsultation = lazy(() => import('./pages/index').then(({ MyConsultation }) => ({ default: MyConsultation })));
const DetailConsultation = lazy(() => import('./pages/index').then(({ DetailConsultation }) => ({ default: DetailConsultation })));
const PaymentPage = lazy(() => import('./pages/index').then(({ PaymentPage }) => ({ default: PaymentPage })));
const PaymentMethodPage = lazy(() => import('./pages/index').then(({ PaymentMethodPage }) => ({ default: PaymentMethodPage })));
const AlteaPaymentWebView = lazy(() => import('./pages/index').then(({ AlteaPaymentWebView }) => ({ default: AlteaPaymentWebView })));
const PaymentSuccessPage = lazy(() => import('./pages/index').then(({ PaymentSuccessPage }) => ({ default: PaymentSuccessPage })));
const ProfilePage = lazy(() => import('./pages/index').then(({ ProfilePage }) => ({ default: ProfilePage })));
const BlocksPage = lazy(() => import('./pages/index').then(({ BlocksPage }) => ({ default: BlocksPage })));
const ChangeProfilePage = lazy(() => import('./pages/index').then(({ ChangeProfilePage }) => ({ default: ChangeProfilePage })));
const ChangePasswordPage = lazy(() => import('./pages/index').then(({ ChangePasswordPage }) => ({ default: ChangePasswordPage })));
const VerifyChangeDataPage = lazy(() => import('./pages/index').then(({ VerifyChangeDataPage }) => ({ default: VerifyChangeDataPage })));
const OTPPage = lazy(() => import('./pages/index').then(({ OTPPage }) => ({ default: OTPPage })));
const GeneralSearch = lazy(() => import('./pages/index').then(({ GeneralSearch }) => ({ default: GeneralSearch })));
const SpecialistPage = lazy(() => import('./pages/index').then(({ SpecialistPage }) => ({ default: SpecialistPage })));

const Main = (props) => {
  return (
    <NavListener {...props}>
      <Suspense fallback={<AlteaLoader />}>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/list" component={ListDoctorPage} />
          <Route exact path="/landing" component={LandingPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/mobile-list" component={MobileListDoctorPage} />
          <Route exact path="/detail" component={DetailPage} />
          <Route exact path="/create-consultation" component={CreateConsultationPage} />
          <Route exact path="/call" component={CallPage} />
          <Route exact path="/my-consultation" component={MyConsultation} />
          <Route exact path="/consultation-detail" component={DetailConsultation} />
          <Route exact path="/payment" component={PaymentPage} />
          <Route exact path="/payment-method" component={PaymentMethodPage} />
          <Route exact path="/altea-payment" component={AlteaPaymentWebView} />
          <Route exact path="/payment-success" component={PaymentSuccessPage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/blocks" component={BlocksPage} />
          <Route exact path="/change-profile" component={ChangeProfilePage} />
          <Route exact path="/change-password" component={ChangePasswordPage} />
          <Route exact path="/verify" component={VerifyChangeDataPage} />
          <Route exact path="/otp" component={OTPPage} />
          <Route exact path="/search" component={GeneralSearch} />
          <Route exact path="/specialist" component={SpecialistPage} />
        </Switch>
      </Suspense>
    </NavListener >
  );
};

export default Main;
