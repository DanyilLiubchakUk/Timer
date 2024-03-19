import { useState, useEffect } from "react";
import CloseButton from "./CloseButton";

import time from "../icons/time.svg";

export default function LibraryWindow({
    setIsLibOpen,
    isLibOpen,
    mainArr,
    setMainArr,
    timeTurnOn,
    autoTime,
    setNeedToUpdate,
    needToUpdate,
    setAutoTime,
    isTimerGo,
}) {
    const [taskSets, setTaskSets] = useState([]);
    useEffect(() => {
        cloneAddedClone = [...taskSets];
        fetchTasks();
    }, []);
    let cloneAddedClone = [...taskSets];
    let baseURL = "https://65f7a7ccb4f842e80885c9c8.mockapi.io/api/v1/tasks/5";

    function addDataBase(type = "add") {
        class EasyHTTP {
            async put(url, data) {
                const response = await fetch(url, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
                const resData = await response.json();
                return resData;
            }
        }
        const http = new EasyHTTP();
        if (type == "add") {
            addFetch(http);
        }
        if (type == "update") {
            updateFetch(http);
        }
    }
    function fetchTasks() {
        let tasksArr = fetch(baseURL)
            .then((response) => response.json())
            .then((data) => data);

        tasksArr.then((data) => {
            cloneAddedClone = data.mainRoot;
            setTaskSets(cloneAddedClone);
        });
    }
    function addTaskSet() {
        cloneAddedClone = [...taskSets];
        addDataBase("add");
        fetchTasks();
    }
    function removeSets(index) {
        cloneAddedClone = [...taskSets];
        cloneAddedClone = cloneAddedClone.filter((v, i) => index != i);
        addDataBase("update");
        fetchTasks();
    }
    function addFetch(http) {
        return http
            .put(baseURL, {
                mainRoot: [
                    ...cloneAddedClone,
                    {
                        arr: mainArr,
                        title: "",
                        isAuto: autoTime.on,
                        time: timeTurnOn,
                    },
                ],
            })
            .then((data) => setTaskSets(data.mainRoot))
            .catch((err) => console.log(err));
    }
    function updateFetch(http) {
        return http
            .put(baseURL, {
                mainRoot: [...cloneAddedClone],
            })
            .then((data) => setTaskSets(data.mainRoot))
            .catch((err) => console.log(err));
    }

    return (
        <div className={`libraryWin${isLibOpen ? " open" : ""}`}>
            <div className="header">
                <span>Sets:</span>
                <CloseButton
                    ivs={true}
                    buttonClick={() => setIsLibOpen(false)}
                ></CloseButton>
            </div>
            <div className="libContent">
                {taskSets.map((v, i) => {
                    return (
                        <div key={i} className="taskSet">
                            <textarea
                                type="text"
                                value={v.title}
                                onChange={(e) => {
                                    v.title = e.target.value;
                                    cloneAddedClone = [...taskSets];
                                    addDataBase("update");
                                }}
                                placeholder="Ex. ReadTheory"
                            />
                            <div className="titlesTask">
                                {v.arr.map((v, i) => (
                                    <div key={i * Math.random()}>{v.title}</div>
                                ))}
                            </div>
                            <div className="data-task">
                                <button
                                    onClick={() => removeSets(i)}
                                    className="deledeSet"
                                >
                                    Delede
                                </button>
                                <button
                                    disabled={isTimerGo}
                                    onClick={(e) => {
                                        setIsLibOpen(false);
                                        setMainArr(v.arr);
                                        setNeedToUpdate(true);
                                        if (v.isAuto) {
                                            setAutoTime({
                                                hour:
                                                    v.time.toString().length ==
                                                    6
                                                        ? Number(
                                                              v.time
                                                                  .toString()
                                                                  .slice(0, 2)
                                                          )
                                                        : v.time.toString()
                                                              .length == 5
                                                        ? Number(
                                                              v.time
                                                                  .toString()
                                                                  .slice(0, 1)
                                                          )
                                                        : 0,
                                                minuts:
                                                    v.time.toString().length ==
                                                    6
                                                        ? Number(
                                                              v.time
                                                                  .toString()
                                                                  .slice(2, 4)
                                                          )
                                                        : v.time.toString()
                                                              .length == 5
                                                        ? Number(
                                                              v.time
                                                                  .toString()
                                                                  .slice(1, 3)
                                                          )
                                                        : 0,
                                                secons:
                                                    v.time.toString().length ==
                                                    6
                                                        ? Number(
                                                              v.time
                                                                  .toString()
                                                                  .slice(4, 6)
                                                          )
                                                        : v.time.toString()
                                                              .length == 5
                                                        ? Number(
                                                              v.time
                                                                  .toString()
                                                                  .slice(3, 5)
                                                          )
                                                        : 0,
                                                on: true,
                                            });
                                        }
                                    }}
                                >
                                    Open
                                </button>
                                {v.isAuto && (
                                    <i>
                                        <img src={time} alt="time" />
                                        <span>
                                            {v.time
                                                .toString()
                                                .split("")
                                                .reverse()
                                                .map((v, i, a) => {
                                                    if (
                                                        (i + 1) % 2 == 0 &&
                                                        a.length - 1 !== i
                                                    ) {
                                                        return ":" + v;
                                                    }
                                                    return v;
                                                })
                                                .reverse()
                                                .join("")}
                                        </span>
                                    </i>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="buttons">
                <button onClick={() => addTaskSet()}>Add</button>
            </div>
        </div>
    );
}
