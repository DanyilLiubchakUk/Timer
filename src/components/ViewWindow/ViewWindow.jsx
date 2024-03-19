import { useState, useEffect, useRef } from "react";
import CloseButton from "../CloseButton";
export default function ViewWindow({
    isOpenView,
    setIsOpenView,
    mainArr,
    setMainArr,
    setNumLabels,
    numLabels,
    coutDown,
    setCoutDown,
    endTask,
    setEndTask,
    setIsTimerGo,
    isTimerGo,
    setAutoTime,
    autoTime,
    timeNOW,
    colors,
    setTimeTurnOn,
    updateArr,
    setNeedToUpdate,
    needToUpdate,
}) {
    const [idTime, setIdTime] = useState(0);
    const [isOpenTime, setIsOpenTime] = useState(false);
    const dragTask = useRef(0);
    const draggedOverTask = useRef(0);
    useEffect(() => {
        if(needToUpdate === true){
            updateArr([...mainArr])
            setNeedToUpdate(false)
        }
    }, [needToUpdate]);
    let chengeValue = [];
    let wholeTime = 0;
    let timeout;
    let timeTick = 0;
    function addTime() {
        setIdTime(idTime + 1);
        // add to end new time
        setMainArr((mainArr) => [
            ...mainArr,
            {
                title: "",
                time: 0,
                description: "",
                startDeg: 0,
                endDeg: 0,
                id: idTime,
                color: getColor(),
            },
        ]);
    }

    function getColor() {
        return `hsla(${~~(480 * Math.random())}, 60%,  72%, 1)`;
    }

    function updateArr(newArr = null) {
        if (newArr !== null) {
            chengeValue = newArr;
        }
        changeTime();
        timeToDeg();
        setMainArr(chengeValue);
        setNumLabels(wholeTime);
        setCoutDown(wholeTime);
        setNeedToUpdate(false)
    }

    function changeTime() {
        wholeTime = 0;
        for (let i = 0; i < chengeValue.length; i++) {
            wholeTime = wholeTime + chengeValue[i].time;
        }
    }

    function timeToDeg() {
        chengeValue.map((obj, i, a) => {
            if (i == 0) {
                obj.startDeg = 0;
            } else {
                obj.startDeg = a[i - 1].endDeg;
            }
            obj.endDeg = obj.startDeg + 360 / (wholeTime / obj.time);
        });
    }

    function changeIntData(e, link, idificator) {
        chengeValue = mainArr.map((obj) => {
            if (obj.id == idificator) {
                if (link == "time") {
                    obj[link] = Number(e.target.value);
                } else {
                    obj[link] = e.target.value;
                }
                return obj;
            }
            return obj;
        });
        updateArr();
    }

    // Timer

    function startTimer() {
        if (mainArr.length > 0 && numLabels > 0) {
            if (coutDown == 0 || coutDown == numLabels) {
                setIsTimerGo(true);
                timeTick = numLabels;
                findEndOfTask(timeTick);
                setCoutDown(timeTick);
                timeout = setInterval(() => {
                    timeTick--;
                    setCoutDown(timeTick);
                    findEndOfTask(timeTick);
                    if (timeTick <= 0) {
                        clearInterval(timeout);
                        setIsTimerGo(false);
                        setAutoTime({
                            hour: autoTime.hour,
                            minuts: autoTime.minuts,
                            secons: autoTime.secons,
                            on: false,
                        });
                    }
                }, 1000);
            }
        }
    }
    function findEndOfTask(timeTick) {
        let newTaskTime = 0;
        let endOfThisTask = 0;
        newTaskTime = mainArr.find((val) => {
            endOfThisTask = endOfThisTask + val.time;
            if (endOfThisTask > numLabels - timeTick) {
                return val;
            }
        });
        // NOW the newTaskTime is the object which active ----------------------------------
        newTaskTime = timeTick - numLabels + endOfThisTask;
        setEndTask(newTaskTime);
    }

    let lookToTime = [];
    lookToTime.push(autoTime.hour);
    lookToTime.push(autoTime.minuts);
    lookToTime.push(autoTime.secons);

    function handleSort() {
        const taskClone = [...mainArr];
        const temp = taskClone[dragTask.current];
        taskClone[dragTask.current] = taskClone[draggedOverTask.current];
        taskClone[draggedOverTask.current] = temp;
        updateArr(taskClone);
        setMainArr(taskClone);
    }

    if (
        Number(
            timeNOW
                .toLocaleTimeString("en-GB")
                .split(":")
                .map((v, i, a) => {
                    if (Number(v) <= 9) {
                        return "0" + v;
                    }
                    return v.toString();
                })
                .join("")
        ) >=
            Number(
                lookToTime
                    .map((v, i, a) => {
                        if (Number(v) <= 9) {
                            return "0" + v;
                        }
                        return v.toString();
                    })
                    .join("")
            ) &&
        autoTime.on
    ) {
        startTimer();
    }

    if (autoTime.on) {
        setTimeTurnOn(
            Number(
                lookToTime
                    .map((v, i, a) => {
                        if (Number(v) <= 9) {
                            return "0" + v;
                        }
                        return v.toString();
                    })
                    .join("")
            )
        );
    }

    return (
        <div className={`viewWindow${isOpenView ? " open" : ""}`}>
            <CloseButton
                ivs={true}
                buttonClick={() => setIsOpenView(false)}
            ></CloseButton>
            <h2>Times: {numLabels}</h2>
            <div className="counts">
                {mainArr.map((element, i) => {
                    return (
                        <div
                            draggable={isTimerGo === true ? false : true}
                            onDragStart={() => (dragTask.current = i)}
                            onDragEnter={() => (draggedOverTask.current = i)}
                            onDragEnd={handleSort}
                            onDragOver={(e) => e.preventDefault()}
                            key={element.id}
                            className="count"
                        >
                            <input
                                maxLength={18}
                                value={element.title}
                                style={{ color: element.color }}
                                onInput={(e) =>
                                    changeIntData(e, "title", element.id)
                                }
                                type="text"
                                placeholder="Ex. Duolingo"
                            />
                            <span>
                                <input
                                    type="checkbox"
                                    style={{ backgroundColor: element.color }}
                                    className="color"
                                />
                                <div className="opendedColors">
                                    {colors.map((colorSh) => {
                                        return (
                                            <div
                                                key={element.id + colorSh}
                                                style={{ background: colorSh }}
                                                onClick={() =>
                                                    setMainArr((mainArr) =>
                                                        mainArr.map((v) => {
                                                            if (v == element) {
                                                                let copyOfMairForColor =
                                                                    JSON.parse(
                                                                        JSON.stringify(
                                                                            v
                                                                        )
                                                                    );
                                                                copyOfMairForColor.color =
                                                                    colorSh;
                                                                return copyOfMairForColor;
                                                            }
                                                            return v;
                                                        })
                                                    )
                                                }
                                            ></div>
                                        );
                                    })}
                                </div>
                            </span>
                            <span>
                                <input
                                    onInput={(e) => {
                                        if (
                                            e.target.value >= 0 &&
                                            e.target.value < 91
                                        ) {
                                            changeIntData(
                                                e,
                                                "time",
                                                element.id
                                            );
                                        }
                                    }}
                                    value={element.time}
                                    min={1}
                                    max={20}
                                    type="text"
                                    placeholder="15 min."
                                />
                                min.
                            </span>
                            <CloseButton
                                isTimerGo={isTimerGo}
                                buttonClick={() => {
                                    // Romove clicked time button
                                    setMainArr(
                                        mainArr.filter(function (time) {
                                            return time.id !== element.id;
                                        }),
                                        updateArr(
                                            mainArr.filter(function (time) {
                                                return time.id !== element.id;
                                            })
                                        )
                                    );
                                }}
                            />
                            <div className="description">
                                <textarea
                                    onInput={(e) =>
                                        changeIntData(
                                            e,
                                            "description",
                                            element.id
                                        )
                                    }
                                    value={element.description}
                                    placeholder="Ex. Do minimun 1 lession"
                                ></textarea>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="settings">
                <button disabled={isTimerGo} onClick={addTime}>
                    Add
                </button>
                <button onClick={startTimer} className="startTimer">
                    Start
                </button>
                <div className="autoBlockTime">
                    <button
                        onClick={() => setIsOpenTime(!isOpenTime)}
                        className={`autoTimer${isOpenTime ? " open" : ""}`}
                    >
                        Auto timer
                    </button>
                    <time>
                        <span>
                            <input
                                type="text"
                                max={23}
                                min={0}
                                className="timeAutoHour"
                                value={autoTime.hour}
                                onChange={(e) => {
                                    if (
                                        e.target.value >= 0 &&
                                        e.target.value < 24
                                    ) {
                                        setAutoTime({
                                            hour: Number(e.target.value),
                                            minuts: autoTime.minuts,
                                            secons: autoTime.secons,
                                            on: autoTime.on,
                                        });
                                    }
                                }}
                            />
                            h.
                        </span>
                        <span>
                            <input
                                type="text"
                                max={59}
                                min={0}
                                className="timeAutoMinuts"
                                value={autoTime.minuts}
                                onChange={(e) => {
                                    if (
                                        e.target.value >= 0 &&
                                        e.target.value < 60
                                    ) {
                                        setAutoTime({
                                            hour: autoTime.hour,
                                            minuts: Number(e.target.value),
                                            secons: autoTime.secons,
                                            on: autoTime.on,
                                        });
                                    }
                                }}
                            />
                            m.
                        </span>
                        <span>
                            <input
                                type="text"
                                max={59}
                                min={0}
                                className="timeAutoSeconds"
                                value={autoTime.secons}
                                onChange={(e) => {
                                    if (
                                        e.target.value >= 0 &&
                                        e.target.value < 60
                                    ) {
                                        setAutoTime({
                                            hour: autoTime.hour,
                                            minuts: autoTime.minuts,
                                            secons: Number(e.target.value),
                                            on: autoTime.on,
                                        });
                                    }
                                }}
                            />
                            s.
                        </span>
                        <input
                            onClick={(e) => {
                                setAutoTime({
                                    hour: autoTime.hour,
                                    minuts: autoTime.minuts,
                                    secons: autoTime.secons,
                                    on: e.target.checked,
                                });
                            }}
                            checked={autoTime.on}
                            readOnly
                            type="checkbox"
                        />
                    </time>
                </div>
            </div>
        </div>
    );
}
