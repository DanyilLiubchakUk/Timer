import { useEffect, useState } from "react";
import ClockLabel from "./ClockLabel";
export default function Diagram({ numLabels, mainArr, coutDown, endTask }) {
    const [style, setStyle] = useState("");
    const [styleClock, setStyleClock] = useState("");
    const [degOnZero, setDegOnZero] = useState(0);
    useEffect(() => {
        stylesStr = "";
        mainArr.forEach((obj) => {
            stylesStr +=
                obj.color + " " + obj.startDeg + "deg " + obj.endDeg + "deg, ";
        });
        stylesStr = stylesStr.slice(0, -2);
        setStyle(stylesStr);
    }, [mainArr]);
    useEffect(() => {
        styleClockWise =
            ((numLabels - coutDown) / numLabels) * 360 - 90 + degOnZero;
        if (styleClock - styleClockWise == 360) {
            setDegOnZero(() => degOnZero + 360);
            styleClockWise = styleClockWise + 360;
        }
        setStyleClock(styleClockWise);
    }, [coutDown]);
    let labels = [];
    let i = 0;
    let stylesStr = "";
    let styleClockWise = -90;
    while (i < numLabels) {
        labels.push(null);
        i++;
    }
    return (
        <div 
            style={{
                background: `conic-gradient(
            ${style}
         )`,
            }}
            className="diagram"
        >
            {mainArr.length > 0 && (
                <div
                    style={{ rotate: `${styleClock}deg` }}
                    className="clockWise"
                ></div>
            )}
            <div className="innerDiaText">
                {mainArr.length > 0 && <span>We have: {coutDown} min</span>}
                <br />
                {(coutDown != endTask && endTask != 0) && (
                    <span>End of this task after {endTask} min</span>
                )}
            </div>
            <div className="titleTasks">
                {mainArr.map((val, i, a) => {
                    return (
                        <div
                        key={i}
                            style={{
                                rotate: `${
                                    (val.endDeg - val.startDeg) / 2 +
                                    val.startDeg +
                                    90
                                }deg`,
                            }}
                        >
                            <p
                                style={{
                                    rotate: `${
                                        ((val.endDeg - val.startDeg) / 2 +
                                            val.startDeg +
                                            90 -
                                            180) *
                                        -1
                                    }deg`,
                                    color: val.color,
                                }}
                            >
                                {val.title}
                            </p>
                        </div>
                    );
                })}
            </div>
            {labels.map((e, i) => {
                return <ClockLabel key={i} index={i} numLabels={numLabels} />;
            })}
        </div>
    );
}
