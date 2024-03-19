import { useState, useEffect } from "react";
import Diagram from "./components/DiagramsApps/Diagram";
import Navigation from "./components/Navigation";
import Library from "./components/Library";
import ViewWindow from "./components/ViewWindow/ViewWindow";
import DiaData from "./components/DiagramsApps/DiaData";
import LibraryWindow from "./components/LibraryWindow";

function App() {
    const [mainArr, setMainArr] = useState([]);
    const [numLabels, setNumLabels] = useState(0);
    const [coutDown, setCoutDown] = useState(0);
    const [endTask, setEndTask] = useState(0);
    const [isOpenView, setIsOpenView] = useState(false);
    const [isTimerGo, setIsTimerGo] = useState(false);
    const [autoTime, setAutoTime] = useState({
        hour: 13,
        minuts: 55,
        secons: 0,
        on: false,
    });
    const [timeNOW, setTimeNOW] = useState(new Date());
    const [isLibOpen, setIsLibOpen] = useState(false);
    const [timeTurnOn, setTimeTurnOn] = useState(0);
    const [needToUpdate, setNeedToUpdate] = useState(false);
    useEffect(() => {
        let intercalForNOW = setInterval(() => {
            setTimeNOW(new Date());
        }, 1000);
        return () => {
            clearInterval(intercalForNOW);
        };
    }, [timeNOW]);
    let colors = [
        "#8dd8e9",
        "#e28d8d",
        "#d7e368",
        "#e0983a",
        "#da8de2",
        "#23c4b7",
        "#8d8ee2",
        "#ed345f",
        "#91e28d",
    ];
    function updateArr(newArr = null) {
        if (newArr !== null) {
            chengeValue = newArr;
        }
        changeTime();
        timeToDeg();
        setMainArr(chengeValue);
        setNumLabels(wholeTime);
        setCoutDown(wholeTime);
    }
    return (
        <div className="content">
            <Navigation
                setIsLibOpen={setIsLibOpen}
                isOpenView={isOpenView}
                setIsOpenView={setIsOpenView}
            />
            <Library
                setIsOpenView={setIsOpenView}
                isLibOpen={isLibOpen}
                setIsLibOpen={setIsLibOpen}
            />

            <LibraryWindow
                isLibOpen={isLibOpen}
                setIsLibOpen={setIsLibOpen}
                mainArr={mainArr}
                setMainArr={setMainArr}
                timeTurnOn={timeTurnOn}
                autoTime={autoTime}
                setNeedToUpdate={setNeedToUpdate}
                needToUpdate={needToUpdate}
                setAutoTime={setAutoTime}
                isTimerGo={isTimerGo}
            />
            <main>
                <Diagram
                    mainArr={mainArr}
                    numLabels={numLabels}
                    coutDown={coutDown}
                    endTask={endTask}
                />
                {mainArr.length > 0 && <DiaData mainArr={mainArr} />}
                <ViewWindow
                    isOpenView={isOpenView}
                    setIsOpenView={setIsOpenView}
                    mainArr={mainArr}
                    setMainArr={setMainArr}
                    numLabels={numLabels}
                    setNumLabels={setNumLabels}
                    coutDown={coutDown}
                    setCoutDown={setCoutDown}
                    endTask={endTask}
                    setEndTask={setEndTask}
                    setIsTimerGo={setIsTimerGo}
                    isTimerGo={isTimerGo}
                    autoTime={autoTime}
                    setAutoTime={setAutoTime}
                    timeNOW={timeNOW}
                    colors={colors}
                    setTimeTurnOn={setTimeTurnOn}
                    updateArr={updateArr}
                    setNeedToUpdate={setNeedToUpdate}
                    needToUpdate={needToUpdate}
                />
            </main>
        </div>
    );
}

export default App;
