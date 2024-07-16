import { useState, useEffect, useRef } from "react";
import { GrClose } from "react-icons/gr";

function MultipleSelectTopLabeled(props) {
    const [optionVisible, setOptionVisible] = useState(false);
    const [optionData, setOptionData] = useState(props.optionData);
    const inputRef = useRef(null);

    useEffect(() => {
        setOptionData(props.optionData);
    }, [props.optionData]);

    function handlerRemoveFromSelection(element) {
        props.setState((old) => {
            const index = old.indexOf(element);
            if (index > -1) {
                const newState = [...old.slice(0, index), ...old.slice(index + 1)];
                props.onChange && props.onChange(newState);
                return newState;
            }
            return old;
        });
    }

    function handlerAddToSelection(element) {
        props.setState((old = []) => {
            if (!old.includes(element)) {
                const newState = [...old, element];
                props.onChange && props.onChange(newState);
                return newState;
            }
            return old;
        });
    }

    function filterOptionData(e) {
        const value = e.target.value.toLowerCase();
        setOptionData(props.optionData.filter((element) => element.toLowerCase().includes(value)));
    }

    // Handle click outside to close dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setOptionVisible(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [inputRef]);

    return (
        <div className="flex flex-col gap-1 grow-0 relative" ref={inputRef}>
            {/* Label */}
            <label htmlFor="id" className="text-xs">
                {props.label}
                {props.required && <span className="ml-1 text-red-500 ">*</span>}
            </label>

            {/* Input element */}
            <input
                type={props.type || "text"}
                className="p-2 border rounded grow min-w-[100px] max-h-[35px] text-xs placeholder:text-xs"
                placeholder={props.placeholder}
                disabled={props.disabled}
                onChange={filterOptionData}
                onFocus={() => setOptionVisible(true)}
            />

            {/* Select & Option */}
            {optionVisible && (
                <div className="absolute bg-white z-10 w-full">
                    <div className="absolute w-full z-[100] py-1 bg-white border border-gray-400 rounded">
                        {optionData?.map((element, index) => (
                            <div
                                key={index}
                                className="px-2 text-sm text-black cursor-pointer hover:bg-first hover:text-white"
                                onClick={() => handlerAddToSelection(element)}
                            >
                                {element}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Selected Values */}
            <div className="flex flex-wrap rounded" style={{ maxWidth: props.maxWidth }}>
                {props.state?.map((element, index) => (
                    <div
                        className="flex items-center justify-between gap-2 px-2 py-1 m-1 text-xs bg-gray-300 rounded grow"
                        key={index}
                    >
                        <div>{element}</div>
                        <div className="cursor-pointer" onClick={() => handlerRemoveFromSelection(element)}>
                            <GrClose />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MultipleSelectTopLabeled;
