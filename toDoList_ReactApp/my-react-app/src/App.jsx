import React, {useState} from "react";

function App() {

  const [mode, setMode] = useState(true); // toggle edit mode on/off
  const [passMode, setPassMode] = useState(true); // reveal and hide password
  const [i, setIndex] = useState(0);

  const [accountName, setAccName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [revealStatus, setRevealStatus] = useState(false);

  const fillerAccount = {name: "No Accounts", user: "", pass: "", reveal: false};
  const [rows, setRows] = useState([fillerAccount]);
  
  function handleAccountNameChange(event) {
    setAccName(event.target.value);
  }

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function addAccount() {
    const newAccount = {name: accountName, user: username, pass: password, reveal: revealStatus};
    if (accountName === "" || username === "" || password === "") {
      window.alert("Please fill in all fields");
    }
    if (accountName !== "" && username !== "" && password !== "") {
      const newRows = rows.filter((row, index) => row.user !== "");
      setRows([...newRows, newAccount]);
      setAccName("");
      setUsername("");
      setPassword("");
      setRevealStatus(false);
    }
    
  }

  function handleEdit() {
    
    const newRows = [...rows];
    newRows[i] = {name: accountName, user: username, pass: password, reveal: revealStatus};
    if (accountName !== "" && username !== "" && password !== "") {
      setRows(newRows);
      setMode(true);
      setAccName("");
      setUsername("");
      setPassword("");
      setRevealStatus(false)
    } else {
      window.alert("Please fill in all fields");
    }
   
  }

  function handleDelete(index) {
    const newRows = rows.filter((row, ind) => ind !== index);
    if (newRows.length === 0) {
      setRows([fillerAccount]);
    } else {
      setRows(newRows);
    }
    
  }

  function handlePassReveal(ind) {
    const newRows = [...rows];
    newRows[ind] = { ...newRows[ind], reveal: !newRows[ind].reveal }; 
    setRows(newRows);
  }

  return (
    <>
      <div className="container">
        <h1>Password Manager</h1>
        
        <div className="addInfoAndDisplayInfo">
          <div className="addAcc">
            {mode && <h3>Add Account</h3>}
            {!(mode) && <h3>Edit Account Info</h3>}
            <div>
                <label htmlFor="account">Account</label>
                <input 
                  id="account" 
                  type="text" 
                  placeholder="e.g. Facebook"
                  value={accountName}
                  name="accountName"
                  onChange={handleAccountNameChange}
                />
                
                
                <label htmlFor="username">Username/Email</label>
                <input id="username" 
                type="text" 
                placeholder="Enter a username or email"
                value={username}
                name="username"
                onChange={handleUsernameChange}
                />
                

                <label htmlFor="password">Password</label>
                <input id="password" 
                type="text"
                placeholder="Enter a password"
                value={password}
                name="password"
                onChange={handlePasswordChange}
                />
                <br/>

                { mode && <button className="editAndDel" id="updateButton" onClick={addAccount}>Add</button> }
                { !(mode) && 
                <>
                  <button className="editAndDel" id="updateButton" onClick={handleEdit}>Update Info</button>
                  <button className="editAndDel" id="cancelAndDel" onClick={() => {setMode(true); setAccName(""); setUsername(""); setPassword("") }}>Cancel</button>
                </>
                }
            </div>
            

          </div>
          
          <div className="accounts">
            <h3>Accounts</h3>
            <table>
              <thead>
                <tr>
                  <th id="nameHeaderLength" align="left">Account</th>
                  <th id="userLength" align="left">Username</th>
                  <th id="passHeaderLength" align="left">Password</th>
                  <th id="actionsLength" align="left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  rows.map( (row, index) => (  
                  <tr id="userData" key={index}>
                    <td id="nameLength">{row.name}</td>
                    <td id="userLength">{row.user}</td>
                    <td id="passLength">{row.reveal ? row.pass : "*".repeat(row.pass.length)}</td>
                    {
                      rows.length >= 1 && rows[0].user !== "" && (
                        <td id="actionsLength">
                          <button className="editAndDel" id="editButton" onClick={() => { setMode(false); setIndex(index); setAccName(rows[index].name); setUsername(rows[index].user); setPassword(rows[index].pass); } }>Edit</button>
                          <button className="editAndDel" id="cancelAndDel" onClick={ () => {handleDelete(index)} }>Delete</button>
                          <button className="editAndDel" id="revealButton" onClick={() => handlePassReveal(index)}>{row.reveal ? "Hide Password" : "Show Password"}</button>
                        </td>
                      )
                    }
                  </tr>
                ))}
                
              </tbody>
              
            </table>
          </div>
          
          
        </div>
        </div>
        
      
    </>
  )
}

export default App
