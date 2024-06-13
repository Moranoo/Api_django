import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleArrowLeft, faCircleArrowRight} from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default function PageIndicator({ prevPage, nextPage, fetchPage, getPageNumber}) {
    return (
        <>
            <div className="pagination flex flex-col items-center gap-4 my-7">
                <div className="flex justify-center gap-4">
                    {prevPage &&
                        <button onClick={() => fetchPage(prevPage)}><FontAwesomeIcon icon={faCircleArrowLeft}
                                                                                        size={"3x"}/></button>}
                    {nextPage &&
                        <button onClick={() => fetchPage(nextPage)}><FontAwesomeIcon icon={faCircleArrowRight}
                                                                                        size={"3x"}/></button>}
                </div>
                {nextPage ? <p className={"text-center"}>Vous êtes sur la page {getPageNumber(nextPage) - 1}</p> :
                    <p className={"text-center"}>Vous êtes sur la dernière page</p>}
            </div>
        </>
);
}