"use client";
import { useState, useEffect } from "react";

interface Tournament {
  store?: string;
  format?: string;
  deck?: string;
  rounds?: number;
  roundsOpponents?: Array<RoundInformation>;
}

interface RoundInformation {
  name: string;
  deck: string;
  result: string;
}

export default function BackOffice() {
  const tournamentInfoinitialState: Tournament = {
    store: "",
    format: "",
    deck: "",
    rounds: 0,
    roundsOpponents: [],
  };
  const [tournamentInfo, setTournamentInfoState] = useState(
    tournamentInfoinitialState
  );

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    console.log(name, value);

    setTournamentInfoState((prevTournamentInfoData) => ({
      ...prevTournamentInfoData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (tournamentInfo.rounds && tournamentInfo.rounds > 0) {
      const tempArray = Array.from({ length: tournamentInfo.rounds }, () => ({
        name: "",
        deck: "",
        result: "",
      }));
      console.log(tournamentInfo.rounds, tempArray);

      setTournamentInfoState((prevTournamentInfoData) => ({
        ...prevTournamentInfoData,
        roundsOpponents: tempArray,
      }));
    }
  }, [tournamentInfo.rounds]);

  useEffect(() => {
    console.log(tournamentInfo.rounds);
  }, [tournamentInfo]);

  return (
    <div>
      <h1 className="text-6xl">this is the back office with form</h1>

      <form onSubmit={handleChange}>
        <div>
          <label className="me-4" htmlFor="store">
            Store
          </label>
          <input
            type="text"
            id="store"
            name="store"
            value={tournamentInfo.store}
            onChange={handleChange}
            className="border-black"
          ></input>
        </div>
        <div>
          <label htmlFor="format">Format</label>
          <input
            type="text"
            id="format"
            name="format"
            value={tournamentInfo.format}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label htmlFor="deck">Deck</label>
          <input
            type="text"
            id="deck"
            name="deck"
            value={tournamentInfo.deck}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label htmlFor="rounds">Number of rounds</label>
          <input
            type="number"
            id="rounds"
            name="rounds"
            value={tournamentInfo.rounds}
            onChange={handleChange}
          ></input>
        </div>
        {tournamentInfo.roundsOpponents?.map((opp, index) => (
          <div key={`${opp.name}${index}`}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name={opp.name}
                value={opp.name}
                onChange={handleChange}
              ></input>
            </div>
            <div>
              <label htmlFor="deck">Deck</label>
              <input
                type="text"
                id="deck"
                value={opp.deck}
                onChange={handleChange}
              ></input>
            </div>
            <div>
              <label htmlFor="result">Result</label>
              <input
                type="number"
                id="result"
                value={opp.result}
                onChange={handleChange}
              ></input>
            </div>
          </div>
        ))}
      </form>
      <button>Clear</button>
      <button>Save</button>
    </div>
  );
}
