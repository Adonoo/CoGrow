import { Link, NavLink, useNavigate } from "react-router";
import { useAppState } from "../../state/AppStateContext";
import './Navbar.css';

import backIcon from '../../assets/Icons/back.svg'
import homeIcon from '../../assets/Icons/home.svg'
import calendarIcon from '../../assets/Icons/calendar.svg'
import checkIcon from '../../assets/Icons/check.svg'
import cgLogo from '../../assets/Icons/cglogo.svg'

export function Navbar() {
  const navigate = useNavigate();
  const { state } = useAppState();

  const selectedEventId = state.selectedEventId; // dynamic

  return (
    <>
    <div className="navbar-container">
        <nav className="navbar">
            <button type="button" onClick={() => navigate(-1)} className="nav-icon">
                <img src={backIcon} alt="Back" />
            </button>

            <NavLink to="/" className="nav-icon">
                <img src={homeIcon} alt="Home" />
            </NavLink>

            <NavLink to="/calendar" className="nav-icon">
                <img src={calendarIcon} alt="Calendar" />
            </NavLink>

            <NavLink to="/control" className="nav-icon">
                <img src={checkIcon} alt="Todos" />
            </NavLink>
            <NavLink to="/" className="cg-logo-link">
                <img src={cgLogo} className="cg-logo" />
            </NavLink>
        </nav>

    </div>
    </>
  );
}
