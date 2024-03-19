import { useState, useEffect } from "react";
export default function Navigation({ setIsLibOpen, isLibOpen, setIsOpenView }) {
    return (
        <nav
            className="library"
            onClick={() => {
                setIsLibOpen(!isLibOpen);
                setIsOpenView(false);
            }}
        >
            Lib
        </nav>
    );
}
