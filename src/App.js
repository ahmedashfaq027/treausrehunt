import { useEffect, useState } from "react";
import "./App.scss";
import Section from "./Components/Section";

function App() {
    const colors = ["#cfb6e2", "#a7b4f1", "#6fb8b5", "#67cade", "#d0cda9"];
    const [winpos, setWinpos] = useState([1, 2, 3]);
    const [teams, setTeams] = useState([]);
    const [cardsData, setCardsData] = useState([]);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        async function fetchTeams() {
            await fetch("./teams.json")
                .then((data) => data.json())
                .then((res) => setTeams(res))
                .catch((err) => console.log(err, "error"));
        }

        async function fetchCards() {
            await fetch("./thunt-cards.json")
                .then((data) => data.json())
                .then((res) => setCardsData(res))
                .catch((err) => console.log(err, "error"));
        }

        fetchTeams();
        fetchCards();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        function randomlyAddCards(res) {
            setCards([]);
            for (let i = 0; i < teams.length; i++) {
                let tmpCards = [];
                Object.keys(res).forEach((key) => {
                    let cardsArray = res[key];
                    const randomIndex = Math.floor(
                        Math.random() * cardsArray.length
                    );
                    tmpCards.push(cardsArray[randomIndex]);
                    cardsArray.splice(randomIndex, 1);
                });

                setCards((prev) => [...prev, tmpCards]);
            }
        }

        if (cardsData) {
            randomlyAddCards(cardsData);
        }
    }, [cardsData, teams.length]);

    return (
        <div className="app">
            <header>
                <h1 className="title">Treasure Hunt</h1>
            </header>
            <div className="card__sections">
                {teams?.map((team, index) => (
                    <Section
                        key={index}
                        index={index + 1}
                        color={colors[index]}
                        members={team}
                        cards={cards && cards[index]}
                        winpos={winpos}
                        setWinpos={setWinpos}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
