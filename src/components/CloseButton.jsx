export default function CloseButton({buttonClick ,isTimerGo = false, ivs = false}) {
    return (
        <button style={{filter: ivs ? "hue-rotate(140deg) " : "invert(0)"}} disabled={isTimerGo} onClick={buttonClick} type="button" className="hamburger">
            <span className="hamburger-box">
                <span className="hamburger-inner"></span>
            </span>
        </button>
    );
}
