import React, { useEffect, useRef, useState } from "react";
import "../App.scss";
import QRCode from "react-qr-code";

function Section({ index, members, color, cards = [], winpos, setWinpos }) {
    const [cardIndex, setCardIndex] = useState(0);
    const [win, setWin] = useState(-1);
    const progressRef = useRef();

    console.log(cards);

    useEffect(() => {
        let children = progressRef.current.children;
        if (children.length > 0) {
            for (let i = 0; i < cardIndex; i++) {
                children[i].style.backgroundColor = "green";
            }
        }

        if (cards.length > 0 && cardIndex === cards.length) {
            if (winpos.length > 0) {
                setWin(winpos[0]);
                let tmpWin = winpos;
                tmpWin.splice(0, 1);
                setWinpos(tmpWin);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cardIndex]);

    const prevHandler = (e) => {
        if (cardIndex > 0) {
            setCardIndex(cardIndex - 1);
        }
    };

    const nextHandler = (e) => {
        if (cardIndex < cards.length) {
            setCardIndex(cardIndex + 1);
        }
    };

    return (
        <div className="section" style={{ background: color }}>
            <div className="section__top">
                <h1 className="team__name">Team #{index}</h1>
                <div className="progress" ref={progressRef}>
                    {cards?.map((card, index) => (
                        <p className="progress__indi">{index + 1}</p>
                    ))}
                </div>
                {cards?.length > 0 && cardIndex < cards.length && (
                    <QRCode
                        size={200}
                        value={cards[cardIndex]}
                        level="H"
                        className="qrcode"
                    />
                )}
                {cardIndex === cards.length && (
                    <img
                        className="medal"
                        src={win !== -1 && `/winpos/${win}.png`}
                        alt=""
                    />
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
    );
}

export default Section;
