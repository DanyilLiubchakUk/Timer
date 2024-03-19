import { useState, useEffect } from "react";
export default function Navigation({ setIsOpenView, isOpenView, setIsLibOpen }) {
    return (
        <nav
            onClick={() => {
                setIsOpenView(!isOpenView);
                setIsLibOpen(false);
            }}
        >
            {isOpenView}
            Nav
        </nav>
    );
}
