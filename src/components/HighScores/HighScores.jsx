import { getFirestore } from "../../firebase";
import React, { useEffect, useState } from "react";

const HighScores = ({ score, gameOver }) => {
  const [highScores, setHighScores] = useState([]);
  const [name, setName] = useState()
  const [disabled, setDisabled] = useState(false)
  const db = getFirestore();
  const scores = db.collection("scores");

  const getHighScores = () => {
    let aux = [];
    let scoresFiltered = scores.orderBy("score", "desc").limit(5);
    scoresFiltered.get().then((querySnapshot) => {
      querySnapshot.docs.map((doc) => aux.push({ ...doc.data() }));
      setHighScores(aux);
    });
  }

  const writeUserData = (score) => {
    if (name && name.length < 6) {
      setDisabled(true);
      db.collection("scores")
        .add({
          name,
          score,
        })
        .then(() => {
          console.log("Hecho");
          getHighScores();
        })
        .catch((err) => {
          console.log(err);
        });
    }else if(name.length >= 6){
      alert("Name must have 5 letters max!")
    }else alert("Please, set your name and try again!");
    
  }

  useEffect(() => {
    getHighScores()
  }, []);

  return (
    <div className="high-scores-container">
      <div className="table">
        <div className="table-title">
          <p>TOP 5</p>
        </div>
        {highScores.map((score, i) => {
          return (
            <div key={i} className="table-title">
              <p className="score">{score.name}</p>
              <p>{score.score}</p>
            </div>
          );
        })}
      </div>
      <div className="user-info">
        <label htmlFor="name">What's your name?</label>
        <input placeholder="Name" id="name" type="text" onChange={(e) => {setName(e.target.value)}}/>
        <button {...{disabled}} onClick={() =>  writeUserData(score)}>Save name & score</button>
      </div>
    </div>
  );
};

export default HighScores;
