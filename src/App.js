import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import GroupsWindow from "./Groups/GroupsWindow";
import Login from './Login/LoginWindow';
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import Group from './Groups/Group';
import GroupForm from "./Groups/GroupForm";
import IndividualTrainingsWindow from "./IndividualTrainings/IndividualTrainingsWindow";
import IndividualTraining from "./IndividualTrainings/IndividualTraining";
import IndTrainingForm from "./IndividualTrainings/IndTrainingForm";
import MembershipReceiptsWindow from "./MembershipReceipt/MembershipReceiptsWindow";
import MembershipReceipt from "./MembershipReceipt/MembershipReceipt";
import MembershipReceiptForm from "./MembershipReceipt/MembershipReceiptForm";

function App() {
  return (
    <Router>
        <Routes>
            <Route path='/createMembershipReceipt' element={<MembershipReceiptForm />} />
            <Route path='/editMembershipReceipt' element={<MembershipReceiptForm />} />
            <Route path='/membershipReceipt' element={<MembershipReceipt />} />
            <Route path='/membershipReceipts' element={<MembershipReceiptsWindow />} />
            <Route path='/createIndividualTraining' element={<IndTrainingForm />} />
            <Route path='/editIndividualTraining' element={<IndTrainingForm />} />
            <Route path='/individualTraining' element ={<IndividualTraining />} />
            <Route path='/individualTrainings' element={<IndividualTrainingsWindow />} />
            <Route path='/createGroup' element={<GroupForm />} />
            <Route path='/editGroup' element={<GroupForm />} />
            <Route path='/group' element={<Group/>} />
            <Route path='/groups' element={<GroupsWindow/>} />
            <Route path='/personalInfo' element={<PersonalInfo/>} />
            <Route path='/' element={<Login/>} />
        </Routes>
    </Router>
  );
}

export default App;

export const apiPath = 'https://localhost:44395/api/';