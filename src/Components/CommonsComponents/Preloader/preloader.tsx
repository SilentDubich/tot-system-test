import React, {FC} from "react";
import Preload from "./Spinner-1.4s-3a356a.svg"
import SPreloader from "./preloaderStyles.module.css"



export const Preloader: FC<any> = (props) => {
    return (
        <div>
            <img className={`${SPreloader.preloader__position}`} src={Preload}/>
        </div>
    )
}
