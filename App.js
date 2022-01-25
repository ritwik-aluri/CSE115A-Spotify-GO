import "./style.css"
import SwipeUpDown from 'react-native-swipe-up-down'


function App() {
  
  return (

    <div>
      <input type = "text" id = "searchBar" placeholder = "Search..."></input>
      <button className = "relocation ">Center</button>
      <div className = "bottomBar">
        <li className = "buttonList"><button className = "barButton">Resync</button></li>
        <li className = "buttonList"><button className = "barButton" id = "songListButton">List</button></li>
        <li className = "buttonList"><button className = "barButton">Profile</button></li>
        <li className = "buttonList"><button className = "barButton"></button></li>
        <li className = "buttonList"><button className = "barButton">Settings</button></li>
      </div>
      <SwipeUpDown		
	    itemMini={<li className = "buttonList"><button className = "barButton" id = "songListButton">List</button></li>} // Pass props component when collapsed
	    itemFull={<div className = "songListDown" id = "songList">
      <a href = "#">1</a>
      <a href = "#">2</a>
      <a href = "#">3</a>
      <a href = "#">4</a>
      <a href = "#">5</a>
      <a href = "#">6</a>
    </div>} // Pass props component when show full
    	onShowMini={() => console.log('mini')}
	    onShowFull={() => console.log('full')}
	    onMoveDown={() => console.log('down')}
	    onMoveUp={() => console.log('up')}
	    disablePressToShow={false} // Press item mini to show full
	    style={{ backgroundColor: 'green' }} // style for swipe
/>

    </div>


  );
}


export default App;