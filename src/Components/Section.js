import React, { useEffect, useRef, useState } from "react";
import "../App.scss";
import QRCode from "react-qr-code";
import Notes from "./Notes";

function Section({
    index,
    members,
    color,
    cards = [],
    winpos,
    setWinpos,
    treasurepos,
    setTreasurepos,
}) {
    const [code, setCode] = useState("");
    const [cardIndex, setCardIndex] = useState(0);
    const [win, setWin] = useState(-1);
    const [treasure, setTreasure] = useState(-1);
    const progressRef = useRef();

    useEffect(() => {
        let children = progressRef.current.children;
        if (children && children.length > 1) {
            for (let i = 0; i < cardIndex; i++) {
                children[i].style.backgroundColor = "green";
            }
            for (let i = cardIndex; i < children.length; i++) {
                children[i].style.backgroundColor = "#d20909";
            }
        }

        if (cards.length > 0 && cardIndex === cards.length) {
            if (winpos.length > 0) {
                setWin(winpos[0]);
                // let tmpWin = winpos;
                // tmpWin.splice(0, 1);
                setWinpos((prev) => prev.filter((_, i) => i !== 0));
            }

            if (treasurepos.length > 0) {
                let randIdx = Math.floor(Math.random() * treasurepos.length);
                setTreasure(treasurepos[randIdx]);
                // let trepos = treasurepos;
                // trepos.splice(randIdx, 1);
                setTreasurepos((prev) => prev.filter((_, i) => i !== randIdx));
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cardIndex]);

    useEffect(() => {
        if (cards.length > 0) {
            let tmpstr =
                cards[Math.min(cardIndex, cards.length - 1)].split("/");
            tmpstr = tmpstr[tmpstr.length - 1];
            tmpstr = tmpstr.split(".")[0];
            setCode(tmpstr);
        }
    }, [cards, cardIndex]);

    const prevHandler = (e) => {
        if (cardIndex > 0) {
            setCardIndex(cardIndex - 1);
        }

        if (treasure !== -1) {
            setTreasurepos((prev) => [...prev, treasure]);
            setTreasure(-1);
        }

        if (win !== -1) {
            setWinpos((prev) => [...prev, win].sort());
            setWin(-1);
        }
    };

    const nextHandler = (e) => {
        if (cardIndex < cards.length) {
            setCardIndex(cardIndex + 1);
        }
    };

    return (
        <div className="section">
            <div className="card__section" style={{ background: color }}>
                <div className="section__top">
                    <h1 className="team__name">Team #{index}</h1>
                    <div className="progress" ref={progressRef}>
                        {cards?.map((card, index) => (
                            <p className="progress__indi" key={`prog_${index}`}>
                                {index + 1}
                            </p>
                        ))}
                    </div>
                    {cards?.length > 0 && cardIndex < cards.length && (
                        <>
                            <QRCode
                                size={200}
                                value={cards[cardIndex]}
                                level="H"
                                className="qrcode"
                            />
                            <p className="card__code">code: {code}</p>
                        </>
                    )}
                    {cardIndex === cards.length && (
                        <>
                            <img
                                className="medal"
                                src={win !== -1 && `./winpos/${win}.png`}
                                alt=""
                            />
                            <img
                                className="treasure"
                                src={
                                    treasure !== -1 &&
                                    `./winpos/${treasure}.png`
                                }
                                alt=""
                            />
                        </>
                    )}
                </div>

                <div className="section__bottom">
                    <div className="toggle">
                        <button
                            className="previous__toggle"
                            onClick={(e) => prevHandler(e)}
                        >
                            « <span className="prev">Prev</span>
                        </button>
                        <button
                            className="next__toggle"
                            onClick={(e) => nextHandler(e)}
                        >
                            <span className="next">Next</span> »
                        </button>
                    </div>
                    <h3 className="team__members">
                        {members && members.join(", ")}
                    </h3>
                </div>
            </div>
            <Notes />
        </div>
    );
}

export default Section;
