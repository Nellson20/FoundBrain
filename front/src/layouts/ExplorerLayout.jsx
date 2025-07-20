import { Outlet } from 'react-router-dom'
import ExplorerNavBar from '../pages/Explorer/ExplorerNavBar';
const ExplorerLayout =()=>{
    return(
        <div id='Explorer-layout'> 
            <ExplorerNavBar />
            <Outlet/>
        </div>
    )
}
export default ExplorerLayout;