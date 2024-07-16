import { useState, useEffect, useContext } from "react";
import { GrClose } from "react-icons/gr";
import { GlobalContext } from "../../global-context/GlobalContextComponent.jsx";


function SearchFieldTopLabeled(props) {
    const GC = useContext(GlobalContext);
    const [optionVisible, setOptionVisible] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState([]);

    function filterOptionData(e) {
        const searchTerm = e.target.value;
        let filteredData = [];

        switch (props.selectedOption) {
            case "Mobile No":
                const regex = new RegExp(searchTerm, 'i');
                filteredData = GC.patientMasterData.filter(patient => patient.RM_MOBILE && regex.test(patient.RM_MOBILE));
                break;
            case "IPD":
            case "OPD":
                // Add logic for IPD or OPD filtering
                break;
            default:
                filteredData = [...GC.patientDetailsData, ...GC.patientMasterData].filter(patient =>
                    patient.RM_MOBILE.includes(searchTerm)
                );
                break;
        }

        const uniqueOptions = new Set(filteredData.map(patient => patient.RM_MOBILE));
        setFilteredOptions([...uniqueOptions]);
    }

    function handleOptionClick(option) {
        props.onChange({ target: { value: option } });
        setOptionVisible(false);

        const masterData = GC.patientMasterData.find(element => element.RM_MOBILE === option);
        if (!masterData) return;

        const detailsData = GC.patientDetailsData.find(detail => detail.RD_PT_ID === masterData.RM_PT_ID);
        const combinedData = { ...masterData, ...detailsData };

        props.populateForm(combinedData);
    }

    return (
        <div className="flex flex-col gap-1 grow-0">
            <label htmlFor="search" className="text-xs">
                {props.label}
            </label>

            <input
                type="text"
                id="search"
                className="p-2 border rounded grow min-w-[250px] text-xs placeholder:text-xs"
                placeholder={props.placeholder}
                value={props.value}
                onChange={(e) => {
                    props.onChange(e);
                    filterOptionData(e);
                    setOptionVisible(true);
                }}
                onFocus={() => setOptionVisible(true)}
                onBlur={() => {
                    setTimeout(() => {
                        setOptionVisible(false);
                    }, 150);
                }}
                disabled={props.disabled}
            />

            {optionVisible && (
                <div className="absolute bg-white">
                    <div className="w-[270px] top-[57px] absolute z-[100] py-1 bg-white border border-gray-400 rounded">
                        {filteredOptions.map((option, index) => (
                            <div
                                key={index}
                                className="px-2 text-sm text-black cursor-pointer min-w-[200px] hover:bg-first hover:text-white"
                                onClick={() => handleOptionClick(option)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchFieldTopLabeled;