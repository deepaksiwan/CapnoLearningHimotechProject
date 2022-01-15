import Reac from 'react';
import {BrowserRouter, Routes ,Route,Switch} from 'react-router-dom';
import './components/css/style.css';
import './App.css';
import Home from './components/pages/home/home.js';
import Login from './components/pages/login/Login.js';
import Signup from './components/pages/signup/Signup.js';
import Configure from './components/pages//configure/Configure.js';
import Dashboard from './components/pages/dashboard/Dashboard.js';
import Demodatareport from './components/pages/demodatareport/Demodatareport.js';
import Uploadclientform from './components/pages/Uploadclientform/Uploadclientform.js';
import Bankform from './components/pages/bankform/Bankform.js';
import Editprofile from './components/pages/editprofile/Editprofile.js';
import Hardwareprofile from './components/pages/hardwareprofile/Hardwareprofile.js';
import Clientinformation from './components/pages/clientinformation/Clientinformation.js';
import Trainerinformation from './components/pages/trainerinformation/Trainerinformation.js';
import Createdata from './components/pages/createdata/Createdata';
import Privateroute from './components/component/Privateroute.js';
import CreatesaveDatasession from './components/pages/createdata/CreatesaveDatasession';
import Viewpdfreport from './components/pages/viewpdfreport/Viewpdfreport';
import Viewdatareport from './components/pages/viewdatareport/Viewdatareport';
import Viewlive from './components/pages/viewlive/Viewlive';
import Viewmanageform from './components/pages/viewmanageform/Viewmanageform';
import Viewcreate from './components/pages/viewcreate/Viewcreate';
import Sectionreportassembly from './components/pages/sectionreportassembly/Sectionreportassembly';
import Subscriptionmanagement from './components/pages/subscriptionmanagement/Subscriptionmanagement';
import Recording from './components/pages/recording/Recording';
import Uploadtrainnerform from './components/pages/uploadtrainnerform/Uploadtrainnerform';
import Dropdown from './components/pages/Dropdown';
import Viewuploadedclientform from './components/pages/Uploadclientform/Viewuploadedclientform';
import Viewuploadedtrainerform from './components/pages/uploadtrainnerform/Viewuploadedtrainerform';
import Viewcompletedclientwork from './components/pages/viewcompletedclientwork/Viewcompletedclientwork';
import Editclient from './components/pages/clientinformation/Editclient';
import Edittrainer from './components/pages/trainerinformation/Edittrainer';
import Groupinformation from './components/pages/groupinformation/Groupinformation';
import Editgroup from './components/pages/groupinformation/Editgroup';
import Creategroupsessetionreport from './components/pages/viewdatareport/Creategroupsessetionreport.js';
import Createmultisession from './components/pages/viewdatareport/Createmultisession';
import Groupsessiondatareport from './components/pages/createdata/Groupsessiondatareport.js';
import Chart from './components/pages/chart/Chart';
import ChartTable from './components/pages/chartTable/ChartTable';
import SessiondataReport from './components/pages/viewdatareport/SessiondataReport';
import MultidataReport from './components/pages/viewdatareport/MultidataReport';
import Clienthomeworkdatareport from './components/pages/viewdatareport/Clienthomeworkdatareport';
import PdfsessionReport from './components/pages/viewpdfreport/PdfsessionReport';
import PdfmultisessionReport from './components/pages/viewpdfreport/PdfmultisessionReport';
import GroupsesstionReport from './components/pages/viewpdfreport/GroupsesstionReport';
import PdfclienthomeworkReport from './components/pages/viewpdfreport/PdfclienthomeworkReport';
import PdfsessetionreportNotes from './components/pages/viewpdfreport/PdfsessetionreportNotes';
import Assemblyreport from './components/pages/sectionreportassembly/Assemblyreport';
import Privateroutelogin from './components/component/Privateroutelogin';

function App(){
	return(
		<BrowserRouter>			
			<Routes>
				<Route path="" element={<Privateroute />}>
				<Route  path="/signup" element={<Signup />} />
				<Route  path="/configure" element={<Configure />} />
				<Route  path="/dashboard" element={<Dashboard />} />
				<Route  path="/demodatareport" element={<Demodatareport />} />
				<Route  path="/uploadclientform" element={<Uploadclientform />} />
				<Route  path="/bankform" element={<Bankform />} />
				<Route  path="/editprofile" element={<Editprofile />} />
				<Route  path="/hardwareprofile" element={<Hardwareprofile />} />
				<Route  path="/clientinformation" element={<Clientinformation />} />
				<Route  path="/trainerinformation" element={<Trainerinformation />} />
				<Route  path="/" element={<Createdata />} />
				<Route path="/choose/report/config" element={<CreatesaveDatasession />} />
				<Route  path="/viewpdfreport" element={<Viewpdfreport />} />
				<Route  path="/viewdatareport" element={<Viewdatareport />} />
				<Route  path="/viewlive" element={<Viewlive />} />
				<Route  path="/viewmanageform" element={<Viewmanageform />} />
				<Route  path="/viewcreate" element={<Viewcreate />} />
				<Route  path="/sectionreportassembly" element={<Sectionreportassembly />} />
				<Route  path="/subscriptionmanagement" element={<Subscriptionmanagement />} />
				<Route  path="/dropdown" element={<Dropdown />} />
				<Route  path="/recording" element={<Recording />} />
				<Route  path="/uploadtrainnerform" element={<Uploadtrainnerform />} />
				<Route  path="/viewuploadedclientform" element={<Viewuploadedclientform />} />
				<Route  path="/viewcompletedclientwork" element={<Viewcompletedclientwork />} />
				<Route  path="/viewuploadedtrainerform" element={<Viewuploadedtrainerform />} />
				<Route  path="/editclient" element={<Editclient />} />
				<Route  path="/edittrainer" element={<Edittrainer />} />
				<Route  path="/groupinformation" element={<Groupinformation />} />
				<Route  path="/editgroup" element={<Editgroup />} />
				<Route  path="/createmultisession" element={<Createmultisession />} />
				<Route  path="/creategroupsessetionreport" element={<Creategroupsessetionreport />} />
				<Route  path="/groupsessiondatareport" element={<Groupsessiondatareport />} />
				<Route  path="/chart" element={<Chart />} />
				<Route  path="/create/report/:config" element={<ChartTable />} />
				<Route  path="/sessiondatareport" element={<SessiondataReport />} />
				<Route path="/multidataReport" element={<MultidataReport />} />
				<Route path="/clienthomeworkdatareport" element={<Clienthomeworkdatareport />} />
				<Route path="/pdfsessionreport" element={<PdfsessionReport />} />
				<Route path="/pdfmultisessionreport" element={<PdfmultisessionReport />} />
				<Route path="/groupsesstionreport" element={<GroupsesstionReport />} />
				<Route path="/pdfclienthomeworkreport" element={<PdfclienthomeworkReport />} />
				<Route path="/pdfsessetionreportNotes" element={<PdfsessetionreportNotes />} />
				<Route path="/assemblyreport" element={<Assemblyreport />} />
				
				</Route>
				

				<Route path="" element={<Privateroutelogin />}>
				<Route path="/login" element={<Login />} />
				</Route>
				
			</Routes>
	</BrowserRouter>
	)
}

export default App;
