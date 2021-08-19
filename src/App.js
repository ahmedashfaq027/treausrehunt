import { useEffect, useState } from "react";
import "./App.scss";
import Section from "./Components/Section";

function App() {
    const colors = ["#cfb6e2", "#a7b4f1", "#6fb8b5", "#67cade", "#d0cda9"];
    const [winpos, setWinpos] = useState([1, 2, 3]);
    const [treasurepos, setTreasurepos] = useState([
        "c1",
        "c2",
        "c3",
        "c4",
        "c5",
    ]);
    const [teams, setTeams] = useState([]);
    const [cardsData, setCardsData] = useState([]);
    const [cards, setCards] = useState([]);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        async function fetchData() {
            await fetch("./thunt-cards.json")
                .then((data) => data.json())
                .then((res) => {
                    setTeams(res.teams);
                    setCardsData(res.cards);
                    setOrder(res.order);
                })
                .catch((err) => console.log(err, "error"));
        }

        fetchData();
    }, []);

    useEffect(() => {
        function randomlyAddCards() {
            setCards([]);
            for (let i = 0; i < teams.length; i++) {
                let tmpCards = [];
                Object.keys(order).forEach((key, index) => {
                    const idx = order[key][i] - 1;
                    let card = cardsData[key][idx];
                    tmpCards.push(card);
                });

                setCards((prev) => [...prev, tmpCards]);
            }
        }

        if (cardsData) {
            randomlyAddCards();
        }
    }, [cardsData, order, teams.length]);

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
                        treasurepos={treasurepos}
                        setTreasurepos={setTreasurepos}
                        setWinpos={setWinpos}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
