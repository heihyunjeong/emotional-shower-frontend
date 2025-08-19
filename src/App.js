import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";


import Splash from "./pages/splash";
// pre-login
import Onboarding from "./pages/onboarding";
import Welcome from "./pages/welcome";
import EasyLogIn from "./pages/easyLogIn";
import Terms from "./pages/terms";
import Name from "./pages/name";
import Email from "./pages/email";
import Password from "./pages/password";
import PasswordConfirm from "./pages/passwordConfirm";
import Phone from "./pages/phone";
// user
  //home
import UserHome from "./pages/user/userHome";
import UserEquipmentSelect from "./pages/user/userEquipSel";
import UserLocationSelect from "./pages/user/userLocSel";
import UserPlanSelect from "./pages/user/userPlanSel";
import UserStoringInfo from "./pages/user/userStorInf";
import UserTerms from "./pages/user/userTerms";
import UserPaymentMethod from "./pages/user/userPay";
import UserPaymentComplete from "./pages/user/userPayComp";
  //Equipment
import UserEquipStored from "./pages/user/userEquipStored";
import UserEquipmentDetail from "./pages/user/userEquipDetail";
import UserEquipmentCheckOutWarning from "./pages/user/userEquipCheckOutWarn";
import UserEquipmentCheckOutInput from "./pages/user/userEquipCheckOutInp";
import UserEquipmentCheckOutLocation from "./pages/user/userEquipCheckOutLoc";

  //mypage
import UserMyPage from "./pages/user/userMy";
import UserMyCurrentProgress from "./pages/user/userMyProg";
import UserMyCompletedProgress from "./pages/user/userMyProgComp";
import UserMyStoredProgress from "./pages/user/userMyProgStored";
import UserMyCancelingProgress from "./pages/user/userMyProgCancel";
import UserMyCancelationConfirmationgProgress from "./pages/user/userMyProgCancelCon";
import UserMyPaymentStored from "./pages/user/userMyPaymentStored";
import UserMyPaymentPast from "./pages/user/userMyPaymentPast";
import UserMyFAQ from "./pages/user/userMyFAQ";
import UserMyInfo from "./pages/user/userMyInfo";
import UserMyInfoDeletePrerequisite from "./pages/user/userMyInfoDelPrereq";
import UserMyInfoDelete from "./pages/user/userMyInfoDel";


function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          {/* Welcome screen */}
          <Route path="/splash" element={<Splash />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/easylogin" element={<EasyLogIn />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/name" element={<Name />} />
          <Route path="/email" element={<Email />} />
          <Route path="/password" element={<Password />} />
          <Route path="/passwordconfirm" element={<PasswordConfirm />} />
          <Route path="/phone" element={<Phone />} />

          {/*User*/}
          <Route path="/home" element={<UserHome />} />          
          <Route path="/storing/equipmentselection" element={<UserEquipmentSelect />} />   
          <Route path="/storing/locationselection" element={<UserLocationSelect />} />   
          <Route path="/storing/planselection" element={<UserPlanSelect />} />   
          <Route path="/storing/storinginfo" element={<UserStoringInfo />} />   
          <Route path="/storing/terms" element={<UserTerms />} />   
          <Route path="/storing/paymentmethod" element={<UserPaymentMethod />} />   
          <Route path="/storing/paymentcomplete" element={<UserPaymentComplete />} /> 
          {/*User - StoredEquipment */}
          <Route path="/equipment" element={<UserEquipStored />} /> 
          <Route path="/equipment/detail" element={<UserEquipmentDetail />} /> 
          <Route path="/equipment/checkout/warning" element={<UserEquipmentCheckOutWarning />} /> 
          <Route path="/equipment/checkout/input" element={<UserEquipmentCheckOutInput />} /> 
          <Route path="/equipment/checkout/location" element={<UserEquipmentCheckOutLocation />} /> 
          {/*User - Mypage */}
          <Route path="/mypage" element={<UserMyPage />} />   
          {/*User - Mypage - Progression */}
          <Route path="/mypage/progress/inprogress" element={<UserMyCurrentProgress />} />   
          <Route path="/mypage/progress/completed" element={<UserMyCompletedProgress />} />   
          <Route path="/mypage/progress/stored" element={<UserMyStoredProgress />} />  
          {/*User - Mypage - Payment */}
          <Route path="/mypage/payment/stored" element={<UserMyPaymentStored />} />  
          <Route path="/mypage/payment/past" element={<UserMyPaymentPast />} />  
          <Route path="/mypage/payment/cancel" element={<UserMyCancelingProgress />} />  
          <Route path="/mypage/payment/cancelconfirm" element={<UserMyCancelationConfirmationgProgress />} />  
          {/*User - Mypage - FAQ */}
          <Route path="/mypage/faq" element={<UserMyFAQ />} />  
          {/*User - Mypage - Info */}
          <Route path="/mypage/info" element={<UserMyInfo />} />  
          <Route path="/mypage/info/prerequisite" element={<UserMyInfoDeletePrerequisite />} />  
          <Route path="/mypage/info/delete" element={<UserMyInfoDelete />} />  
          {/* Redirect all other paths to /welcome */}
          <Route path="*" element={<Navigate to="/welcome" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;