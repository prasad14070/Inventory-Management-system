import * as React from "react";
import toast from "react-hot-toast";
import { useContext, useState, useEffect } from "react";
import MUIDataGrid from "../components/DataGridTables/MUIDataGrid";

import { FetchData } from "../functions/FetchData.function";
import { GlobalContext } from "../global-context/GlobalContextComponent";

import CustomButton1 from "../components/CustomButton1.component";
import Title from "../components/SectionComponents/Title.component";
import Controls2 from "../components/SectionComponents/Controls2.component";
import DialogBox from "../components/DialogBoxComponents/DialogBox.compoent";
import DateTopLabeled from "../components/DialogBoxComponents/DateTopLabeled";
import TextFieldTopLabeled from "../components/DialogBoxComponents/TextFieldTopLabeled";
import { formattedDate } from "../utils/formateddate";

function ReceiptMaster() {
    // Global Context
    let GC = useContext(GlobalContext);

    let date = new Date();
    let dateFiledFormat = `${date.getFullYear()}-${date.getMonth() + 1}-${date
        .getUTCDate()
        .toLocaleString("US", {
            minimumIntegerDigits: 2,
        })}`;

    // Dialog box states
    let [action, setAction] = useState("Add");
    let [dialogBoxTitle, setDialogBoxTitle] = useState("");
    let [dialogBox, setDialogBox] = useState(false);

    // Form States: PR-Master
    let [prmId, setPrmId] = useState(
        GC?.receiptMasterData[GC?.receiptMasterData?.length - 1]?.PRM_ID + 1 || 1
    );
    let [prmType, setPrmType] = useState("");
    let [prmMode, setprmMode] = useState(null);
    let [prmModeName, setprmModeName] = useState("");
    let [prmDate, setPrmDate] = useState(formattedDate);
    let [prmAcName, setPrmAcName] = useState("");
    let [prmAcId, setPrmAcId] = useState("");
    let [prmAmount, setPrmAmount] = useState(0);
    let [prmNarration, setPrmNarration] = useState("");

    let [maxId, setMaxId] = useState(1);

    // Datagrid state
    let [apiRef, setApiRef] = useState();

    useEffect(function () {
        FetchData("POST", "/api/receipt/get-details/" + localStorage.getItem("lmId")).then(
            (res) => {
                setMaxId(res?.data?.max_id);
                setPrmId(res?.data?.max_id + 1);
                console.log(res);
                if (res?.isSuccess) {
                    if (res?.data) {
                        GC?.setReceiptMasterData(res?.data?.receiptMasterData);

                        console.log(res?.data?.receiptMasterData);
                    }
                } else {
                    GC?.setReceiptMasterData([]);
                    toast.error(res?.message || "Failed to purchase data");
                }
            }
        );
    }, []);

    function clearPrm() {
        setPrmType("");
        setprmMode(null);
        setprmModeName("")
        setPrmDate(formattedDate);
        setPrmNarration("");
        setPrmAcName("");
        setPrmAcId(null);
        setPrmAmount(0);
    }

    // Add Button -> Opens Dialog Box
    function handlerAdd() {
        setAction("Add");
        setDialogBox(true);
        setDialogBoxTitle("Add Receipt");
        clearPrm();
        setPrmId(maxId + 1);
    }

    // Edit -> Opens Dialog Box
    function handlerEdit(param) {
        setAction("Edit");
        setDialogBox(true);
        setDialogBoxTitle("Edit Receipt");

        clearPrm();

        console.log(param.row);

        setPrmId(() => param.row.RECM_ID || "0");
        setPrmType(() => param.row.RECM_TYPE || "");
        setprmMode(() => param.row.RECM_MODE_CR || "");
        setPrmDate(() => param.row.RECM_DATE.slice(0, 10));
        setPrmNarration(() => param.row.RECM_NARRATION || "");
        setPrmAcId(() => param.row.RECM_AC_NAME_DB || "");
        setPrmAmount(() => param.row.RECM_AMOUNT || 0);

        GC?.ledgerMasterData.map((e, index)=>{
            if(e.LM_ID === param.row.RECM_MODE_CR){
                setprmModeName(e.LM_ID + ' - ' + e.LM_NAME);
            };

            if(e.LM_ID === param.row.RECM_AC_NAME_DB){
                setPrmAcName(e.LM_ID + ' - ' + e.LM_NAME);
            }
        })
    }

    // validations

    function validate() {
        // if (prmType === "") {
        //     toast.error("Please select type");
        //     return false;
        // }
        if (prmMode === "") {
            toast.error("Please select mode");
            return false;
        }
        if (prmDate === "") {
            toast.error("Please select date");
            return false;
        }
        if (prmAcName === "") {
            toast.error("Please select ac/name");
            return false;
        }
        if (prmAmount === "") {
            toast.error("Please select amount");
            return false;
        }
        return true;
    }

    function handlerSumit() {
        let url = "";
        if (action == "Add") {
            url = "/api/receipt/add-details";
        } else if (action == "Edit") {
            url = "/api/receipt/edit-details";
        }

        if (!validate()) return;

        FetchData("POST", url, {
            comp_id: parseInt(localStorage.getItem("lmId")) || null,
            prmId: prmId || 0,
            user_email: localStorage.getItem("email") || null,
            // prmType: prmType || null,
            prmMode: prmMode || null,
            prmDate: prmDate || null,
            prmNarration: prmNarration || null,
            prmAcName: prmAcId || null,
            prmAmount: prmAmount || null,
            year: new Date().getFullYear(),
        }).then((res) => {
            console.log(res);
            if (!res) return;
            if (res.isSuccess) {
                toast.success(res.message || "Data added successfully");
                GC?.setReceiptMasterData(res?.data?.receiptMasterData);

                clearPrm();
                setMaxId(res?.data?.max_id);

                setPrmId(res?.data?.max_id + 1);

                setAction("Add");
            } else {
                setMaxId(res?.data?.max_id);

                setPrmId(res?.data?.max_id + 1);
                toast.error(res?.message || "Failed to add data");
            }
        });
    }

    

    // const handlekeySubmit = (e) => {
    //     if (e.key === "Enter") {
    //         handlerSumit();
    //     }
    // };

    return (
        <div
            onKeyDown={(event) => {
                if (event.key === 'Enter') {
                    const focusedElement = document.activeElement;
                    if (focusedElement.classList.contains('submit')) {
                        // Execute the submit handler
                        handlerSumit();
                    } else if (focusedElement.classList.contains('cancel')) {
                        // Click the "Cancel" button
                        setDialogBox(false);
                    } else if (focusedElement.classList.contains('clearForm')) {
                        // Click the "Clear Form" button
                        clearPrm();
                    } else {
                        handlerSumit();
                    }
                  }
            }}
            className="flex flex-col h-full overflow-y-auto"
        >
            <Title title1={"Receipt Master"} title2={"Transaction"} />
            <div className="p-3 mt-2 bg-white rounded grow">
                <div className="p-2 mt-3 rounded bg-second">
                    <div className="p-1">
                        <Controls2 onClick1={handlerAdd} apiRef={apiRef} />
                    </div>
                </div>

                <div className="w-[100%] mt-5">
                    <MUIDataGrid
                        columns={[
                            {
                                field: "id",
                                headerName: "Id",
                                width: 50,
                                renderHeader: (param) => {
                                    return <div className="pl-2 font-[500]">Id</div>;
                                },
                                renderCell: (param) => {
                                    return (
                                        <div
                                            className="pl-2 cursor-pointer"
                                            onClick={() => handlerEdit(param)}
                                        >
                                            {param.formattedValue}
                                        </div>
                                    );
                                },
                            },
                            // {
                            //     field: "RECM_TYPE",
                            //     headerName: "Type",
                            //     width: 100,
                            // },
                            {
                                field: "RECM_MODE_CR",
                                headerName: "Mode",
                                width: 100,
                            },
                            {
                                field: "RECM_DATE",
                                headerName: "Date",
                                width: 100,
                            },
                            {
                                field: "RECM_AMOUNT",
                                headerName: "Amount",
                                width: 180,
                            },
                            {
                                field: "CREATED_BY",
                                headerName: "Created By",
                                width: 150,
                            },
                            {
                                field: "CREATED_AT",
                                headerName: "Created At",
                                width: 150,
                            },
                            {
                                field: "UPDATED_BY",
                                headerName: "Updated By",
                                width: 150,
                            },
                            {
                                field: "UPDATED_AT",
                                headerName: "Updated At",
                                width: 150,
                            },
                        ]}
                        rows={GC?.receiptMasterData?.map((element, index) => {
                            return {
                                id: element.RECM_ID,
                                ...element,
                            };
                        })}
                    />
                </div>

                <DialogBox
                    state={dialogBox}
                    setState={setDialogBox}
                    title1={dialogBoxTitle}
                    title2={"Receipt Master"}
                >
                    {/* Input Fields */}
                    <div className="max-h-[70vh] mt-3 overflow-auto hide-scrollbar">
                        {/* Fields */}
                        <div className="grid grid-cols-1 p-5 gap-x-4 gap-y-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 max-h-[70vh] overflow-y-auto hide-scrollbar">
                            <TextFieldTopLabeled
                                label="Id"
                                placeholder="Auto"
                                value={prmId}
                                disabled={true}
                            ></TextFieldTopLabeled>
                            <TextFieldTopLabeled
                                label="Mode"
                                placeholder="Select"
                                value={prmModeName}
                                required={true}
                                list={"receipt-payment-mode"}
                                onChange={(e) => {
                                    let element = document.querySelector(
                                        `#receipt-payment-mode [value="${e.target.value}"]`
                                    );
                                    let lmid = element?.getAttribute("data-lmid");
                                    setprmMode(lmid);
                                    setprmModeName(e.target.value);
                                }}
                            >
                                <datalist id="receipt-payment-mode" className="bg-white">
                                    {GC?.ledgerMasterData?.map((element, index) => {
                                        if (
                                            element.LM_UNDER_ID === 39 ||
                                            element.LM_UNDER_ID === 44
                                        ) {
                                            if (element.LM_NAME) {
                                                return (
                                                    <option
                                                        key={index}
                                                        className="text-black"
                                                        value={element.LM_ID+' - '+element.LM_NAME}
                                                        data-lmid={element.LM_ID}
                                                        data-lmname={element.LM_NAME}
                                                    ></option>
                                                );
                                            }
                                        }
                                    })}
                                </datalist>
                            </TextFieldTopLabeled>

                            <DateTopLabeled
                                label="Date"
                                value={prmDate}
                                required={true}
                                onChange={(e) => setPrmDate(e.target.value)}
                            ></DateTopLabeled>
                        </div>

                        <div className="grid grid-cols-1 p-5 gap-x-4 gap-y-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 max-h-[70vh] overflow-y-auto hide-scrollbar">

                            <TextFieldTopLabeled
                                label="AC/Name"
                                placeholder="Enter"
                                value={prmAcName}
                                required={true}
                                list={"receipt-payment-ac"}
                                onChange={(e) => {
                                    let element = document.querySelector(
                                        `#receipt-payment-ac [value="${e.target.value}"]`
                                    );
                                    let lmid = element?.getAttribute("data-lmid");
                                    setPrmAcId(lmid);
                                    setPrmAcName(e.target.value);
                                }}
                            >
                                <datalist id="receipt-payment-ac" className="bg-white">
                                    {GC?.ledgerMasterData?.map((element, index) => {
                                        if (element.LM_NAME) {
                                            return (
                                                <option
                                                    key={index}
                                                    className="text-black"
                                                    value={element.LM_ID + "- " +element.LM_NAME}
                                                    data-lmid={element.LM_ID}
                                                    data-lmname={element.LM_NAME}
                                                ></option>
                                            );
                                        }
                                    })}
                                </datalist>
                            </TextFieldTopLabeled>

                            <TextFieldTopLabeled
                                label="Amount"
                                placeholder="Amount"
                                value={prmAmount}
                                required={true}
                                onChange={(e) => setPrmAmount(e.target.value)}
                            ></TextFieldTopLabeled>
                            <TextFieldTopLabeled
                                label="Narration"
                                placeholder="Enter"
                                value={prmNarration}
                                onChange={(e) => setPrmNarration(e.target.value)}
                            ></TextFieldTopLabeled>
                        </div>
                    </div>

                    <div className="flex justify-center gap-5 mt-5" >
                        <div> 
                            <CustomButton1
                            id="submit"
                            label={"Submit"}
                            className="submit text-white bg-first"
                            onClick={handlerSumit}
                            />
                        </div>
                        <div>
                            <CustomButton1
                            label={"Cancel"}
                            variant="outlined"
                            className="cancel text-first"
                            onClick={() => setDialogBox(false)}
                            />
                        </div>
                        <div>
                            <CustomButton1
                            label={"Clear Form"}
                            variant="outlined"
                            className="clearForm text-gray-400 border-gray-400"
                            onClick={clearPrm}
                            />
                        </div>
                    </div>
                </DialogBox>
            </div>
        </div>
    );
}
function handlerDelete(param) {
    // Assuming you have a unique identifier in your data, for example, PAYM_ID
    const RECM_IDToDelete = param.row.RECM_ID;

    // Confirm deletion with the user
    const isConfirmed = window.confirm("Are you sure you want to delete this record?");

    if (isConfirmed) {
        FetchData("POST", "/api/receipt-master/delete-row", {
            PAYM_ID: param.row.PAYM_ID,
        }).then((res) => {
            console.log(res);
            if (!res) return;
            if (res.isSuccess) {
                toast.success(res.message || "Row deleted");
                if (res.data?.receiptMasterData) {
                    GC?.setReceiptMasterData(res.data?.receiptMasterData); // Corrected typo here
                }
            } else {
                toast.error(res?.message || "Failed to delete row");
            }
        });
        // Perform the delete operation here
        // You might want to make an API call to delete the record on the server
        // After successful deletion, update your local state or refetch data

        // Example:
        // Your API call or logic to delete the record
        // deleteRecord(PAYM_IDToDelete)
        //   .then(() => {
        //     // Update local state or refetch data after successful deletion
        //     fetchPaymentMasterData();
        //   })
        //   .catch((error) => {
        //     console.error("Error deleting record:", error);
        //   });

        // For now, let's simulate the update locally
        const updatedReceiptMasterData = GC?.receiptMasterData?.filter(
            (element) => element.RECM_ID !== RECM_IDToDelete
        );

        // Update the local state
        GC?.setReceiptMasterData(updatedReceiptMasterData);

        // Optionally, you can show a success message
        toast.success("Record deleted successfully");
    }
}

export default ReceiptMaster;
