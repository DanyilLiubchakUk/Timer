import { useEffect, useState } from "react";
export default function DiaData({ mainArr }) {
    const [style, setStyle] = useState("");
    useEffect(() => {}, []);
    return (
        <div className="dataDaigram">
            {mainArr.map((v, i) => {
                return (
                    <div key={i} className="dataTime">
                        <h2 style={{ color: v.color }}>{v.title}</h2>
                        <p style={{ color: v.color }}  className="descriptionDia">{ v.description}</p>
                    </div>
                );
            })}
        </div>
    );
}
