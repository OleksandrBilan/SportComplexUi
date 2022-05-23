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
import MembershipReceiptsWindow from "./MembershipReceipts/MembershipReceiptsWindow";
import MembershipReceipt from "./MembershipReceipts/MembershipReceipt";
import MembershipReceiptForm from "./MembershipReceipts/MembershipReceiptForm";
import SubscriptionReceiptsWindow from "./SubscriptionReceipts/SubscriptionReceiptsWindow";
import SubscriptionReceipt from "./SubscriptionReceipts/SubscriptionReceipt";
import SubscriptionReceiptForm from "./SubscriptionReceipts/SubscriptionReceiptForm";
import CustomersWindow from "./Customers/CustomersWindow";
import Customer from "./Customers/Customer";
import CustomerForm from "./Customers/CustomerForm";
import EmployeesWindow from "./Employees/EmployeesWindow";
import EmployeeForm from "./Employees/EmployeeForm";
import MembershipTypesWindow from "./MembershipTypes/MembershipTypesWindow";
import MembershipType from "./MembershipTypes/MembershipType";
import MembershipTypeForm from "./MembershipTypes/MembershipTypeForm";
import SubscriptionTypesWindow from "./SubscriptionTypes/SubscriptionTypesWindow";
import SubscriptionType from "./SubscriptionTypes/SubscriptionType";
import SubscriptionTypeForm from "./SubscriptionTypes/SubscriptionTypeForm";
import SportSectionsWindow from "./SportSections/SportSectionsWindow";
import SportSection from "./SportSections/SportSection";
import SportSectionForm from "./SportSections/SportSectionForm";
import SportTypesWindow from "./SportTypes/SportTypesWindow";
import SportTypeForm from "./SportTypes/SportTypeForm";
import GroupTrainingsWindow from "./GroupTrainings/GroupTrainingsWindow";
import GroupTraining from "./GroupTrainings/GroupTraining";
import GroupTrainingForm from "./GroupTrainings/GroupTrainingForm";
import CitiesWindow from "./Cities/CitiesWindow";
import CityForm from "./Cities/CityForm";
import GymsWindow from "./Gyms/GymsWindow";
import Gym from "./Gyms/Gym";
import GymForm from "./Gyms/GymForm";
import EmployeeEducationForm from "./Employees/EducationForm";
import PreviousJobForm from "./Employees/PreviousJobForm";

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/addEmployeePreviousJob' element={<PreviousJobForm />} />
                <Route path='/editEmployeePreviousJob' element={<PreviousJobForm />} />
                <Route path='/addEmployeeEducation' element={<EmployeeEducationForm />} />
                <Route path='/editEmployeeEducation' element={<EmployeeEducationForm />} />
                <Route path='/createGym' element={<GymForm />} />
                <Route path='/editGym' element={<GymForm />} />
                <Route path='/gym' element={<Gym />} />
                <Route path='/gyms' element={<GymsWindow />} />
                <Route path='/createCity' element={<CityForm />} />
                <Route path='/editCity' element={<CityForm />} />
                <Route path='/cities' element={<CitiesWindow />} />
                <Route path='/createGroupTraining' element={<GroupTrainingForm />} />
                <Route path='/editGroupTraining' element={<GroupTrainingForm />} />
                <Route path='/groupTraining' element={<GroupTraining />} />
                <Route path='/groupTrainings' element={<GroupTrainingsWindow />} />
                <Route path='/createSportType' element={<SportTypeForm />} />
                <Route path='/editSportType' element={<SportTypeForm />} />
                <Route path='/sportTypes' element={<SportTypesWindow />} />
                <Route path='/createSportSection' element={<SportSectionForm />} />
                <Route path='/editSportSection' element={<SportSectionForm />} />
                <Route path='/sportSection' element={<SportSection />} />
                <Route path='/sportSections' element={<SportSectionsWindow />} />
                <Route path='/createSubscriptionType' element={<SubscriptionTypeForm />} />
                <Route path='/editSubscriptionType' element={<SubscriptionTypeForm />} />
                <Route path='/subscriptionType' element={<SubscriptionType />} />
                <Route path='/subscriptionTypes' element={<SubscriptionTypesWindow />} />
                <Route path='/createMembershipType' element={<MembershipTypeForm />} />
                <Route path='/editMembershipType' element={<MembershipTypeForm />} />
                <Route path='/membershipType' element={<MembershipType />} />
                <Route path='/membershipTypes' element={<MembershipTypesWindow />} />
                <Route path='/createEmployee' element={<EmployeeForm />} />
                <Route path='/editEmployee' element={<EmployeeForm />} />
                <Route path='/employee' element={<PersonalInfo />} />
                <Route path='/employees' element={<EmployeesWindow />} />
                <Route path='/createCustomer' element={<CustomerForm />} />
                <Route path='/editCustomer' element={<CustomerForm />} />
                <Route path='/customer' element={<Customer />} />
                <Route path='/customers' element={<CustomersWindow />} />
                <Route path='/createSubscriptionReceipt' element={<SubscriptionReceiptForm />} />
                <Route path='/editSubscriptionReceipt' element={<SubscriptionReceiptForm />} />
                <Route path='/subscriptionReceipt' element={<SubscriptionReceipt />} />
                <Route path='/subscriptionReceipts' element={<SubscriptionReceiptsWindow />} />
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
export const coachPostionId = 2;
export const managerPositionId = 1;
export const adminPositionId = 3;