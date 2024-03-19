export default function ClockLabel({index, numLabels}) {
    return (
        <div style={{rotate: `${(index + 1) * (360 / numLabels) - 90}deg`}} className="clockLabel">
        </div>
    );
}
