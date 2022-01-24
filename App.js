import "./style.css"

export default function App() {
  return (
    <div>
      <input type = "text" id = "searchBar" placeholder = "Search..."></input>
      <button className = "relocation">Center</button>
      <div className = "bottomBar">
        <li className = "buttonList"><button className = "barButton">Resync</button></li>
        <li className = "buttonList"><button className = "barButton"></button></li>
        <li className = "buttonList"><button className = "barButton">Profile</button></li>
        <li className = "buttonList"><button className = "barButton"></button></li>
        <li className = "buttonList"><button className = "barButton">Settings</button></li>
      </div>
    </div>
  );
}
