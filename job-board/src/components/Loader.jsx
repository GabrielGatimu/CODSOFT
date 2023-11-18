import {ColorRing} from "react-loader-spinner";

export default function Loader() {
    return (
        <div>
            <ColorRing
            visible={true}
            height={100}
            width={100}
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#FF6701", "#FF8D45", "#FF7B28", "#D85100", "#E95500"]}
            />
        </div>
    );
}
