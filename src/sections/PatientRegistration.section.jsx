                                import * as React from "react";
                                import toast from "react-hot-toast";
                                import { useState, useEffect, useContext } from "react";
                                import MUIDataGrid from "../components/DataGridTables/MUIDataGrid";
                                import { Button } from "@mui/material";
                                import CustomButton1 from "../components/CustomButton1.component";
                                import Title from "../components/SectionComponents/Title.component";
                                import Controls4 from "../components/SectionComponents/Controls4.component";
                                import DateTopLabeled from "../components/DialogBoxComponents/DateTopLabeled";
                                import CheckBox from "../components/DialogBoxComponents/CheckBox";
                                import DialogBox from "../components/DialogBoxComponents/DialogBox.compoent";
                                import ButtonDelete from "../components/DataGridTables/ButtonDelete.compoent";
                                import CheckBoxTopLabeled from "../components/DialogBoxComponents/CheckBoxTopLabeled";
                                import TextFieldTopLabeled from "../components/DialogBoxComponents/TextFieldTopLabeled";
                                import FileUploadTopLabeled from "../components/DialogBoxComponents/FileUploadTopLabeled";

                                import { FetchData } from "../functions/FetchData.function";
                                import { GlobalContext } from "../global-context/GlobalContextComponent";

                                function PatientRegistration() {
                                let GC = useContext(GlobalContext);

                                // DilogBox states
                                let [action, setAction] = useState("Add");
                                let [oldDialogBoxTitle, setOldDialogBoxTitle] = useState("");
                                let [newDialogBoxTitle, setNewDialogBoxTitle] = useState("");
                                let [patientMasterDialogBox, setPatientMasterDialogBox] = useState(false);
                                let [patientDetailsDialogBox, setPatientDetailsDialogBox] = useState(false);

                                // FormData states
                                let [pmParentId, setPmParentId] = useState("");
                                let [pmDateOfExpiry, setPmDateOfExpiry] = useState("");
                                let [pmPatientId, setPmPatientId] = useState(
                                    GC?.patientMasterData[GC?.patientMasterData.length]?.RM_PT_ID + 1 || ""
                                );
                                
                                let [pmReferenceNo, setPmReferenceNo] = useState(
                                    
                                    GC?.patientMasterData[GC?.patientMasterData.length]?.RM_UNDER_ID + 1 || ""                                    
                                );
                                
                                let [pmPan, setPmPan] = useState("");
                                let [pmRegCharge, setPmRegCharge] = useState("");
                                let [pmNarration, setPmNarration] = useState("");
                                let [pmAadhar, setPmAadhar] = useState("");

                                let [pmPhone, setPmPhone] = useState("");
                                let [pmMobile, setPmMobile] = useState("");
                                let [pmRelativeMobile, setPmRelativeMobile] = useState("");
                                let [pmAlias, setPmAlias] = useState("");
                                let [pmUnderId, setPmUnderId] = useState("");
                                let [pmUnderName, setPmUnderName] = useState("");
                                let [pmUnderNameField, setPmUnderNameField] = useState("");
                                let [pmLinkId, setPmLinkId] = useState("");
                                let [pmCrLimit, setPmCrLimit] = useState("");
                                let [prmDate, setPrmDate] = useState("");
                                const [date, setDate] = useState("");
                                const [time, setTime] = useState("");
                                let [age, setAge] = useState(''); // State for age in years
                                let [monthDiff, setMonthDiff] = useState(''); // State for difference in months
                                let [dayDiff, setDayDiff] = useState(''); // State for difference in days

                                let [pmOPDType, setPmOPDType] = useState("O");
                                let [pmOldCaseType, setOldCaseType] = useState("");
                                let [pmOldNewType, setOldNewType] = useState("");
                                let [pmGenderType, setGenderType] = useState("M");
                                let [pmMstatusType, setMstatusType] = useState("Married");
                                let [pmTitle, setPmTitle] = useState("");
                                let [pmTPAType, setPmTPAType] = useState("");
                                let [pmRFAType, setRFAType] = useState("");
                                let [pmCdocType, setPmCdocType] = useState("");
                                let [pmImage, setPmImage] = useState("");
                                let [pmIsActive, setPmIsActive] = useState(true);
                                let [pmAddress, setPmAddress] = useState("");
                                let [pmSearch, setPmSearch] = useState("");
                                let [pmCity, setPmCity] = useState("");
                                let [pmArea, setPmArea] = useState("");
                                let [pmPincode, setPmPincode] = useState("");
                                let [pmPhoneNumber, setPmPhoneNumber] = useState("");
                                let [pmMobileNumber, setPmMobileNumber] = useState("");
                                let [pmWebsite, setPmWebsite] = useState("");
                                let [pmAadharNumber, setPmAadharNumber] = useState("");
                                let [pmPanNumber, setPmPanNumber] = useState("");
                                let [pmGstNumber, setPmGstNumber] = useState("");
                                let [pmOpeningBalance, setOpeningBalance] = useState("");
                                let [pmDrCr, setPmDrCr] = useState("Dr");
                                let [pmEmail, setPmEmail] = useState("");
                                let [pmPassword, setPmPassword] = useState("");
                                


                                let [canEdit, setCanEdit] = useState(true);

                                // Datagrid state
                                let [apiRef, setApiRef] = useState();


                                const [isChecked, setIsChecked] = useState(false);
                                const [isCheckedMLC, setIsCheckedMLC] = useState(false);
                                const [dateTime, setDateTime] = useState("");


                                const handleCheckboxChange = () => {
                                setIsChecked(!isChecked);
                                };

                                const handleCheckboxMLC = () => {
                                setIsCheckedMLC(!isCheckedMLC);
                                };

                                const handleTodaysDate = (newDate) => {
                                setDate(newDate);
                                };

                                const handleDateChange = (newDateStr) => {
                                const [day, month, year] = newDateStr.split('/'); // Assuming date format is "dd/mm/yyyy"
                                const newDate = new Date(`${year}-${month}-${day}`); // Create Date object from parsed parts
                                setPrmDate(newDateStr); // Update selected date state
                                
                                const dobDate = new Date(newDate);
                                const today = new Date();
                                
                                // Calculate age difference in years
                                const ageDiff = today.getFullYear() - dobDate.getFullYear();
                                
                                // Calculate month difference
                                let monthDiff = today.getMonth() - dobDate.getMonth() + 12 * (today.getFullYear() - dobDate.getFullYear());
                                if (today.getDate() < dobDate.getDate()) {
                                monthDiff--; // Adjust months if today's date is earlier in the month
                                }
                                
                                // Calculate day difference
                                const oneDay = 1000 * 60 * 60 * 24;
                                const dayDiff = Math.floor((today - dobDate) / oneDay);
                                
                                // Update state with calculated values (convert to string to avoid displaying NaN)
                                setAge(ageDiff.toString());
                                setMonthDiff(monthDiff.toString());
                                setDayDiff(dayDiff.toString());
                                };
                                




                                // Fetch City Data
                                // useEffect(function () {
                                // FetchData("POST", "/api/ledger-master/get-city-data").then((res) => {
                                // if (res?.isSuccess) {
                                // if (res.data?.cityData) {
                                // GC.setCityData(res.data?.cityData);
                                // }
                                // } else {
                                // toast.error("Failed to load city data");
                                // }
                                // });
                                // }, []);

                                useEffect(() => {

                                // Function to update the date and time every second
                                const intervalId = setInterval(() => {
                                const currentDate = new Date();
                                const year = currentDate.getFullYear();
                                const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
                                const day = currentDate.getDate().toString().padStart(2, "0");
                                const hours = currentDate.getHours().toString().padStart(2, "0");
                                const minutes = currentDate.getMinutes().toString().padStart(2, "0");
                                const seconds = currentDate.getSeconds().toString().padStart(2, "0");

                                
                                // Update the state with the current date and time
                                setDateTime(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
                                }, 1000); // Update every second
                                
                                // Clear the interval when the component is unmounted
                                return () => clearInterval(intervalId);

                                
                                }, []); // Run only once after the component is mounted
                                

                                function clearForm() {
                                setPmParentId(() => "");
                                setPmDateOfExpiry(() => "");
                                setPmPan(() => "");
                                setPmAlias(() => "");
                                setPmUnderId(() => "");
                                setPmUnderName(() => "");
                                setPmLinkId(() => "");
                                setPmImage(() => "");
                                setPmIsActive(true);
                                setPmAddress(() => "");
                                setPmCity(() => "");
                                setPmArea(() => "");
                                setPmPincode(() => "");
                                setPmPhoneNumber(() => "");
                                setPmMobileNumber(() => "");
                                setPmWebsite(() => "");
                                setPmAadharNumber(() => "");
                                setPmPanNumber(() => "");
                                setPmGstNumber(() => "");
                                setPmEmail(() => "");
                                setPmPassword(() => "");
                                setPmUnderNameField("");
                                }
                                function validate() {
                                // Validate name
                                

                                // Validate alias
                                // if (!pmAlias) {
                                // toast.error("Please enter alias");

                                // let field = document.querySelector("[data-label='Alias *']");
                                // field?.focus();
                                // field?.scrollIntoView({
                                // behavior: "smooth",
                                // block: "center",
                                // inline: "nearest",
                                // });
                                // return;
                                // }

                                // Validate under id
                                // if (!PmUnderId) {
                                // toast.error("Please select under name");

                                // let field = document.querySelector("[data-label='Under Name']");
                                // field?.focus();
                                // field?.scrollIntoView({
                                // behavior: "smooth",
                                // block: "center",
                                // inline: "nearest",
                                // });
                                // return;
                                // } else {
                                // let valid = false;
                                // {
                                // GC?.accountGroupData?.forEach((element, index) => {
                                // if (element.AG_ID) {
                                // console.log(lmUnderId + "==========>" + lmUnderName)
                                // if (element.AG_ID == lmUnderId && element.AG_NAME == lmUnderName) {
                                // valid = true;
                                // }
                                // }
                                // });
                                // }

                                // if (!valid) {
                                // toast.error("Please select valid under id");

                                // let field = document.querySelector("[data-label='Under Name']");
                                // field?.focus();
                                // field?.scrollIntoView({
                                // behavior: "smooth",
                                // block: "center",
                                // inline: "nearest",
                                // });
                                // return;
                                // }
                                // }

                                

                                // if (lmLogo.name) {
                                // if (lmLogo.size > 1000 * 1000) {
                                // toast.error("Logo size should be less than 1000KB");

                                // let field = document.querySelector("[data-label='Logo']");
                                // field?.focus();
                                // field?.scrollIntoView({
                                // behavior: "smooth",
                                // block: "center",
                                // inline: "nearest",
                                // });
                                // return;
                                // }
                                // }

                                
                                // let city = lmCity.split(",")[0] || "-,-,-";
                                // let state = lmCity.split(",")[1] || "-";
                                // let country = lmCity.split(",")[2] || "-";
                                // if (!city || !state || !country) {
                                // toast.error("Please select the valid city");

                                // let field = document.querySelector("[data-label='City *']");
                                // field?.focus();
                                // field?.scrollIntoView({
                                // behavior: "smooth",
                                // block: "center",
                                // inline: "nearest",
                                // });
                                // return;
                                // }

                                
                                
                                // if (lmPincode) {
                                // if (String(lmPincode).length != 6) {
                                // toast.error("Please enter valid pincode");

                                // let field = document.querySelector("[data-label='Pincode']");
                                // field?.focus();
                                // field?.scrollIntoView({
                                // behavior: "smooth",
                                // block: "center",
                                // inline: "nearest",
                                // });
                                // return;
                                // }
                                // }

                                
                                // if (pmPhoneNumber) {
                                // if (String(pmPhoneNumber).length != 10) {
                                // toast.error("Please enter valid phone number");

                                // let field = document.querySelector("[data-label='Phone Number']");
                                // field?.focus();
                                // field?.scrollIntoView({
                                // behavior: "smooth",
                                // block: "center",
                                // inline: "nearest",
                                // });
                                // return;
                                // }
                                // }

                                
                                // if (pmMobileNumber) {
                                // if (String(pmMobileNumber).length != 10) {
                                // toast.error("Please enter valid mobile number");

                                // let field = document.querySelector("[data-label='Mobile Number']");
                                // field?.focus();
                                // field?.scrollIntoView({
                                // behavior: "smooth",
                                // block: "center",
                                // inline: "nearest",
                                // });
                                // return;
                                // }
                                // }

                                
                                // if (pmAadharNumber) {
                                // if (String(pmAadharNumber).length != 12) {
                                // toast.error("Please enter 12 digit Aadhar number");

                                // let field = document.querySelector("[data-label='Aadhar Number']");
                                // field?.focus();
                                // field?.scrollIntoView({
                                // behavior: "smooth",
                                // block: "center",
                                // inline: "nearest",
                                // });
                                // return;
                                // }
                                // }

                                
                                // if (pmGstNumber) {
                                // if (String(pmGstNumber).length != 15) {
                                // toast.error("Please enter 15 digit GST number");

                                // let field = document.querySelector("[data-label='GST Number *']");
                                // field?.focus();
                                // field?.scrollIntoView({
                                // behavior: "smooth",
                                // block: "center",
                                // inline: "nearest",
                                // });
                                // return;
                                // }
                                // }

                                // if (lmOpeningBalance < 0) {
                                // toast.error("Please enter valid opening balance");

                                // let field = document.querySelector("[data-label='Opening Balance *']");
                                // field?.focus();
                                // field?.scrollIntoView({
                                // behavior: "smooth",
                                // block: "center",
                                // inline: "nearest",
                                // });
                                // return;
                                // }
                                return true;
                                }
                                function handlerAdd() {
                                setPatientMasterDialogBox(true);
                                setAction("Add");
                                setOldDialogBoxTitle("Add Patient Details");
                                setCanEdit(true);
                                clearForm();

                                const now = new Date();
                                setTime(now.toTimeString().split(' ')[0]); // Set current time in HH:MM:SS format

                                setPmPatientId(GC?.patientMasterData[GC?.patientMasterData.length - 1]?.RM_PT_ID + 1);
                                setPmReferenceNo(
                                    GC?.patientMasterData[GC?.patientMasterData.length - 1]?.RM_UNDER_ID + 1
                                );
                                }
                                function handlerEdit(param) {
                                setPatientMasterDialogBox(true);
                                setAction("Edit");
                                setOldDialogBoxTitle("Edit Patient Details");
                                if (param.row.PM_READ_ONLY === 0) {
                                setCanEdit(false);
                                } else {
                                setCanEdit(true);
                                }
                                clearForm();

                                setPmParentId(() => param.row.PM_PARENT_ID || "");
                                setPmDateOfExpiry(() => param.row.PM_DOE || "");
                                setPmPatientId(() => param.row.RM_PT_ID || "");
                                setPmReferenceNo(() => param.row.RD_CASE_NO || "");
                                setPmPan(() => param.row.PM_NAME || "");
                                setPmAlias(() => param.row.PM_ALIAS || "");
                                setPmUnderId(() => param.row.PM_UNDER_ID || "");
                                setPmUnderName(() => param.row.PM_UNDER_NAME || "");
                                setPmUnderId(()=> param.row.PM_UNDER_ID || "")
                                setPmUnderNameField(()=> (param.row.PM_UNDER_ID + ' - ' + param.row.PM_UNDER_NAME));
                                setPmLinkId(() => param.row.LINK_ID || "");
                                setPmImage(() => param.row.PM_LOGO || "");
                                setPmIsActive(() => param.row.IS_ACTIVE || "");
                                setPmAddress(() => param.row.PM_ADDRESS || "");
                                setPmCity(
                                () =>
                                `${param.row.PM_CITY || ""}, ${param.row.PM_STATE || ""}, ${
                                param.row.PM_COUNTRY || ""
                                }`
                                );
                                setPmArea(() => param.row.PM_AREA || "");
                                setPmPincode(() => param.row.PM_PINCODE || "");
                                setPmPhoneNumber(() => param.row.PM_PHONE || "");
                                setPmMobileNumber(() => param.row.PM_MOBILE || "");
                                setPmWebsite(() => param.row.PM_WEBSITE || "");
                                setPmAadharNumber(() => param.row.PM_AADHAR_NO || "");
                                setPmPanNumber(() => param.row.PM_PAN_CARD_NO || "");
                                setPmGstNumber(() => param.row.PM_GST_NO || "");
                                setPmEmail(() => param.row.PM_EMAIL || "");
                                setPmPassword(() => param.row.PM_PASSWORD || "");
                                }
                                function handlerDelete(param) {
                                console.log(param.row.RM_PT_ID);

                                FetchData("POST", "/api/patient-registration/delete-row", {
                                RM_PT_ID: param.row.RM_PT_ID,
                                }).then((res) => {
                                console.log(res);
                                if (!res) return;
                                if (res.isSuccess) {
                                toast.success(res.message || "Row deleted");
                                if (res.data?.patientMasterData) {
                                GC?.setPatientMasterData(res.data?.patientMasterData);
                                }
                                } else {
                                toast.error(res?.message || "Failed to delete row");
                                }
                                });
                                }


                                async function handlerSumit() {
                                let url = "";
                                if (action == "Add") {
                                url = "/api/patient-registration/add-patient-data";
                                } else if (action == "Edit") {
                                url = "/api/patient-registration/edit-patient-data";
                                }

                                // if (!validate()) return;

                                // let fileUrl;
                                // if (pmImage.name) {
                                // let formData = new FormData();
                                // formData.append("file", lmLogo);
                                // formData.append("fileName", "viral.png");
                                // let responce = await fetch(process.env.REACT_APP_BASEURL + "/api/upload", {
                                // method: "POST",
                                // body: formData,
                                // });

                                // let res = await responce.json();
                                // fileUrl = res.data.fileUrl;
                                // if (fileUrl) {
                                // toast.success("Logo uploaded successfully");
                                // } else {
                                // toast.error("Failed to upload logo");
                                // }
                                // }

                                FetchData("POST", url, {
                                // user_email: localStorage.getItem("email") || null,
                                // lmParentId: Number(lmParentId) || null,
                                // lmDateOfExpiry: lmDateOfExpiry || null,

                                // master Fileds    
                                rmPtId: Number(pmPatientId) || 1234,
                                rmUnderId: Number(pmPatientId) || 1234,
                                rmTitle: pmTitle || 1234,
                                rmName: pmPan || 1234,
                                rmGender: pmGenderType || 1234,
                                rmMaritalStatus: pmMstatusType || 1234,
                                rmPhoto: pmImage || 1234,
                                rmAadharCard: pmAadhar || 1234,
                                rmYear: Number(age) || 12,
                                rmCompId: pmAadhar || 1234,
                                rmCreatedBy: pmTPAType || "{name: abc}",
                                rmCreatedDate: pmCdocType || "{name: abc}",
                                rmUpdatedBy: pmRFAType || "{name: abc}",
                                rmUpdatedDate: pmNarration| "{name: abc}",

                                

                                // Details Fields
                                rdCaseNo: Number(pmReferenceNo) || 123,
                                rdPtId: Number(pmPatientId) || 1234,
                                rdIpdNo: pmPan || 12345,
                                rdOpdIpd: pmOPDType || "null",
                                rdDateTime: date || "null",
                                rdNormalEmerg: isChecked || 1,
                                rdOldNew: pmOldCaseType || 1,
                                rdMlc: isCheckedMLC || 1,
                                rdDob: prmDate || "null",
                                rdYear: Number(age) || 12,
                                rdMonth: Number(monthDiff) || 15,
                                rdDays: Number(dayDiff) || 15,
                                rdAddress: pmAddress || "null",
                                rdArea: pmArea || "null",
                                rdCompTpaId: pmTPAType || "{name: abc}",
                                rdConDrId: pmCdocType || "{name: abc}",
                                rdRefDrId: pmRFAType || "{name: abc}",
                                rdPrdNarration: pmNarration| "{name: abc}"

                                
      ,
                            // pmPanNumber: pmPanNumber || null,
                            // pmGstNumber: pmGstNumber || null,
                            // pmOpeningBalance: pmOpeningBalance || null,
                            // pmDrCr: pmDrCr || null,
                            // pmEmail: pmEmail || null,
                            // pmPassword: pmPassword || null,
                            // pmIsView: 1,
                            // pmReadOnly: 1,
                            }).then((res) => {
                            if (!res) {
                                console.log(res);    
                                // return;
                            }
                            if (res.isSuccess) {
                            toast.success(res.message || "Data added successfully");
                            if (res.data?.patientMasterData) {
                                console.log(res.data);
                            GC?.setPatientMasterData(res.data?.patientMasterData);
                            }
                            if (action == "Add") {
                            clearForm();
                            setPmPatientId((old) => old + 1);
                            setPmReferenceNo((old) => old + 1);
                            let firstField = document.getElementById("patient-master-id");
                            firstField.focus();
                            firstField.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                            inline: "nearest",
                            });
                            } else if (action == "Edit") {
                            clearForm();
                            setLedMasterDialogBox(false);
                            }
                            } else {
                            toast.error(res?.message || "Failed to add data");
                            }
                            });
                            }

                            const handleKeyPress = (e) => {
                            if (e.key === "Enter") {
                            const focusedElement = document.activeElement;
                            //console.log("Focused element ", focusedElement);
                            if (focusedElement.classList.contains('submit')) {
                            // Execute the submit handler
                            handlerSumit();
                            } else if (focusedElement.classList.contains('cancel')) {
                            // Click the "Cancel" button
                            setPatientMasterDialogBox(false);
                            } else if (focusedElement.classList.contains('clearForm')) {
                            // Click the "Clear Form" button
                            clearForm();
                            } else {
                            handlerSumit();
                            }
                            }
                            };;
                            
                            return (
                            <div className="flex flex-col h-full overflow-y-auto col-span-2">
                            <Title title1={"Patient Registration"} title2={"Configuration"} />
                            <div className="p-3 mt-2 bg-white rounded grow">
                            <div className="p-2 mt-3 rounded bg-second">
                            <div className="p-1">
                                <Controls4 onClick1={handlerAdd} onClick={handlerAdd} apiRef={apiRef} />
                            </div>
                            </div>

                            <div className="mt-5 w-[100%]">
                            <MUIDataGrid
                            columns={[
                            {
                            field: "RM_PT_ID",
                            width: 50,
                            renderHeader: (param) => {
                            return <div className="pl-2 font-[500]">ID</div>;
                            },
                            renderCell: (param) => {
                                if (param && param.formattedValue) {
                                    return (
                                        <div
                                            className="pl-2 cursor-pointer"
                                            onClick={() => handlerEdit(param)}
                                        >
                                            {param.formattedValue}
                                        </div>
                                    );
                                }
                                return null; // or handle the case where param or param.formattedValue is undefined
                            },
                            },
                            {
                                field: "RM_UNDER_ID",
                                headerName: "PT ID",
                                width: 100,
                            },
                            {
                                field: "RM_TITLE",
                                headerName: "Case NO",
                                width: 80,
                            },
                            {
                                field: "RM_TITLE",
                                headerName: "Date/Time",
                                width: 80,
                            },
                            
                            {
                                field: "RM_NAME",
                                headerName: "Name",
                                flex: 1,
                                minWidth: 150,
                            },
                            {
                                field: "RM_GENDER",
                                headerName: "Gender",
                                width: 80,
                            },
                            {
                                field: "RM_MARITAL_STATUS",
                                headerName: "Marital Status",
                                width: 120,
                            },
                            {
                                field: "RM_Photo",
                                headerName: "Photo",
                                width: 100,
                                renderCell: (param) => (
                                    <img src={param.formattedValue} alt="Photo" width={50} height={50} />
                                ),
                            },
                            {
                                field: "RM_AADHAR_CARD",
                                headerName: "Aadhar Card",
                                width: 150,
                            },
                            {
                                field: "RM_YEAR",
                                headerName: "Year",
                                flex: 1,
                                minWidth: 100,
                            },
                            {
                                field: "RM_COMP_ID",
                                headerName: "Company ID",
                                flex: 1,
                                minWidth: 100,
                            },
                            {
                                field: "RM_CREATED_BY",
                                headerName: "Created By",
                                flex: 1,
                                minWidth: 150,
                            },
                            {
                                field: "RM_CREATED_DATE",
                                headerName: "Created Date",
                                flex: 1,
                                minWidth: 150,
                                renderCell: (param) => param.formattedValue ? String(param.formattedValue).replace("T", " ").substring(0, 16) : "-",
                            },
                            {
                                field: "RM_UPDATED_BY",
                                headerName: "Updated By",
                                flex: 1,
                                minWidth: 150,
                                renderCell: (param) => {
                                    let updatedByArray = JSON.parse(param.formattedValue);
                                    return updatedByArray[updatedByArray.length - 1];
                                },
                            },
                            {
                                field: "RM_UPDATED_DATE",
                                headerName: "Updated Date",
                                flex: 1,
                                minWidth: 150,
                                renderCell: (param) => {
                                    let updatedAtArray = JSON.parse(param.formattedValue);
                                    let timeString = updatedAtArray[updatedAtArray.length - 1];
                                    return timeString ? timeString.replace("T", " ").substring(0, 16) : "-";
                                },
                            },
                            {
                            renderCell: (param) => (
                            <div className="flex gap-3">
                            <ButtonDelete onClick={() => handlerDelete(param)} />
                            </div>
                            ),
                            headerName: "Action",
                            flex: 1,
                            minWidth: 150,
                            },
                            ]}
                            rows={GC.patientMasterData.map((element, index) => {
                            return {
                            id: element.RM_PT_ID,
                            ...element,
                            };
                            })}
                            setApiRef={setApiRef}
                            />
                            </div>

                            <DialogBox
                            state={patientMasterDialogBox}
                            setState={setPatientMasterDialogBox}
                            title1={oldDialogBoxTitle}
                            title2={"Patient Registration"}
                            >
                            <form className="max-w-5xl mx-auto">

                            <div
                            className="grid grid-cols-1 p-2 gap-x-10 gap-y-2 md:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 max-h-screen overflow-y-auto hide-scrollbar"
                            onKeyDown={handleKeyPress}>
                            
                            <DateTopLabeled
                            label="Date"
                            
                            value={date}
                            onChange={(e) => handleTodaysDate(e.target.value)}
                            className="w-[100]"
                            minWidth="5px"
                            />
                            <TextFieldTopLabeled
                            label="Time"
                            placeholder="Enter Time"
                            value={time}
                            className="w-[100]"
                            minWidth="5px"
                            onChange={(e) => setTime(e.target.value)}
                            />
                            
                            <TextFieldTopLabeled
                            label="Patient Id"
                            placeholder="Auto Generated"
                            className="w-[5px]"
                            minWidth='5px'
                            value={pmPatientId}
                            onChange={(e) => setPmPatientId(e.target.value)}
                            disabled={false}
                            ></TextFieldTopLabeled>
                            <TextFieldTopLabeled
                            label="Case No"
                            placeholder="Auto Generated"
                            className="w-[5px]"
                            minWidth='5px'
                            value={pmReferenceNo}
                            onChange={(e) => setPmReferenceNo(e.target.value)}
                            disabled={false}
                            ></TextFieldTopLabeled>
                            
                            <CheckBox
                            label="Emergency"
                            state={isChecked}
                            className="w-[5px]"
                            minWidth='5px'
                            setState={handleCheckboxChange}
                            />
                            <CheckBox
                            label="MlC"
                            state={isCheckedMLC}
                            className="w-[5px]"
                            minWidth='5px'
                            setState={handleCheckboxMLC}
                            />
                            
                            <div className="w-[100]">
                            <label className="text-xs">
                            <div className="">
                            Old Case<span className="text-red-600">*</span>
                            </div>
                            <input
                            type="text"
                            className="w-full p-2 mt-1 border rounded"
                            value={pmOldCaseType}
                            label="OldCase"
                            onChange={(e) => setOldCaseType(e.target.value)}
                            list="pmOldCaseType"
                            />
                            <datalist id="pmOldCaseType">
                            <option value="Mobile No"></option>
                            <option value="IPD"></option>
                            <option value="OPD"></option>
                            
                            </datalist>
                            </label>
                            </div>
                            <TextFieldTopLabeled
                            label="Search"
                            placeholder="Enter"
                            className="w-[5px]"
                            minWidth='5px'
                            value={pmSearch}
                            onChange={(e) => setPmSearch(e.target.value)}
                            ></TextFieldTopLabeled>
                            {/* </div>
                            
                            
                            <div className="grid grid-cols-1 p-2 md:grid-cols-4 lg:grid-cols-5 gap-x-10 gap-y-2 max-h-[100vh]"
                            onKeyDown={handleKeyPress}> */}

                            <div className="max-w-[50]">
                            <label className="text-xs">
                            <div className="">
                            OPD/IPD<span className="text-red-600">*</span>
                            </div>
                            <input
                            type="text"
                            className="w-1/2 p-2 mt-1 border rounded"
                            value={pmOPDType}
                            label="OPD/IPD"
                            onChange={(e) => setPmOPDType(e.target.value)}
                            list="opdTypeList"
                            />
                            <datalist id="opdTypeList">
                            <option value="O"></option>
                            <option value="I"></option>

                            </datalist>
                            </label>
                            </div>
                            <div className="max-w-[50]">
                            <label className="text-xs">
                            <div className="">
                            Title<span className="text-red-600">*</span>
                            </div>
                            <input
                            type="text"
                            className="w-1/2 p-2 mt-1 border rounded"
                            value={pmTitle}
                            label="Title"
                            onChange={(e) => setPmTitle(e.target.value)}
                            list="titleList"
                            />
                            <datalist id="titleList">
                            <option value="Mr"></option>
                            <option value="Miss"></option>

                            </datalist>
                            </label>
                            </div>
                            
                            <TextFieldTopLabeled
                            className="w-full"
                            minWidth={100}
                            label="Name"
                            placeholder="Enter"
                            required={true}
                            value={pmPan}
                            onChange={(e) => setPmPan(e.target.value)}
                            id="patient-master-id"
                            ></TextFieldTopLabeled>
                            <div className="w-[100]">
                            <label className="text-xs">
                            <div className="">
                            Gender<span className="text-red-600">*</span>
                            </div>
                            <input
                            type="text"
                            className="w-full p-2 mt-1 border rounded"
                            value={pmGenderType}
                            label="Gender"
                            onChange={(e) => setGenderType(e.target.value)}
                            list="pmGenderType"
                            />
                            <datalist id="pmGenderType">
                            <option value="M"></option>
                            <option value="F"></option>
                            
                            </datalist>
                            </label>
                            </div>
                            
                            {/* </div>
                            <div
                            className="grid grid-cols-1 p-2 gap-x-10 gap-y-1 md:grid-cols-1 lg:grid-cols-4 xl:lg:grid-cols-5 max-h-[100vh] overflow-y-auto hide-scrollbar"
                            onKeyDown={handleKeyPress}> */}

                            <DateTopLabeled
                            label="DOB"
                            value={prmDate}
                            onChange={(e) => handleDateChange(e.target.value)}
                            className="w-[100]"
                            minWidth="5px"
                            />
                            <div className="w-[100]">
                            <label className="text-xs">
                            <div>Year</div>
                            <input
                            type="text"
                            className="w-full p-2 mt-1 border rounded"
                            value={age}
                            />
                            </label>
                            </div>
                            <div className="w-[100]">
                            <label className="text-xs">
                            <div>Month</div>
                            <input
                            type="text"
                            className="w-full p-2 mt-1 border rounded"
                            value={monthDiff}
                            />
                            </label>
                            </div>
                            <div className="w-[100]">
                            <label className="text-xs">
                            <div>Days</div>
                            <input
                            type="text"
                            className="w-full p-2 mt-1 border rounded"
                            value={dayDiff}
                            />
                            </label>
                            </div> 
                            <div className="w-[100]">
                            <label className="text-xs">
                            <div className="">
                            Marrital Status<span className="text-red-600">*</span>
                            </div>
                            <input
                            type="text"
                            className="w-full p-2 mt-1 border rounded"
                            value={pmMstatusType}
                            label="Marrital Status"
                            onChange={(e) => setMstatusType(e.target.value)}
                            list="pmMarritalType"
                            />
                            <datalist id="pmMarritalType">
                            <option value="Married"></option>
                            <option value="Unmarried"></option>
                            
                            </datalist>
                            </label>
                            </div>
                            <TextFieldTopLabeled
                            className="w-full"
                            minWidth={100}
                            label="Aadhar No"
                            placeholder="Enter"
                            required={true}
                            value={pmAadhar}
                            onChange={(e) => setPmAadhar(e.target.value)}
                            id="patient-master-id"
                            ></TextFieldTopLabeled> 
                            <TextFieldTopLabeled
                            className="w-full"
                            minWidth={100}
                            label="Pan No"
                            placeholder="Enter"
                            required={true}
                            value={pmPan}
                            onChange={(e) => setPmPan(e.target.value)}
                            id="patient-master-id"
                            ></TextFieldTopLabeled> 
                            <FileUploadTopLabeled
                            label="Photo"
                            // value={pmImage}
                            files={pmImage}
                            onChange={(e) => setPmImage(e.target.files[0])}
                            accept="image/*"
                            ></FileUploadTopLabeled>

                            {/* <div
                            className="grid grid-cols-1 p-2 gap-x-4 gap-y-2 md:grid-cols-1 lg:grid-cols-4 xl:lg:grid-cols-3 max-h-[30vh] overflow-y-auto hide-scrollbar"
                            onKeyDown={handleKeyPress}> */}
                            
                            <TextFieldTopLabeled
                            label="Address"
                            className="w-full "
                            minWidth={100}
                            placeholder="Enter"
                            value={pmAddress}
                            onChange={(e) => setPmAddress(e.target.value)}
                            ></TextFieldTopLabeled>
                            <TextFieldTopLabeled
                            label="Area"
                            className="w-full "
                            minWidth={100}
                            placeholder="Enter"
                            value={pmArea}
                            onChange={(e) => setPmArea(e.target.value)}
                            ></TextFieldTopLabeled>
                            <TextFieldTopLabeled
                            label="City"
                            className="w-full "
                            minWidth={100}
                            value={pmCity}
                            onChange={(e) => setPmCity(e.target.value)}
                            list={"cityData"}
                            >
                            <datalist id="cityData" className="bg-white">
                            {GC?.cityData?.map((element, index) => {
                            if (element.CITY) {
                            return (
                            <option
                            key={index}
                            className="text-black"
                            value={
                            element.CITY +
                            ", " +
                            element.STATE +
                            ", " +
                            element.COUNTRY
                            }
                            >
                            {element.CITY +
                            ", " +
                            element.STATE +
                            ", " +
                            element.COUNTRY}
                            </option>
                            );
                            }
                            })}
                            </datalist>
                            
                            </TextFieldTopLabeled>
                            <TextFieldTopLabeled
                            className="w-full "
                            minWidth={100}
                            label="Pincode"
                            placeholder="Enter"
                            required={true}
                            value={pmPincode}
                            onChange={(e) => setPmPincode(e.target.value)}
                            id="patient-master-id"
                            ></TextFieldTopLabeled>

                            <TextFieldTopLabeled
                            className="w-full "
                            minWidth={100}
                            label="Mobile Number"
                            placeholder="Enter"
                            required={true}
                            value={pmMobile}
                            onChange={(e) => setPmMobile(e.target.value)}
                            id="patient-master-id"
                            ></TextFieldTopLabeled>
                             <TextFieldTopLabeled
                            className="w-full "
                            minWidth={100}
                            label="Relative Mobile Number"
                            placeholder="Enter"
                            required={true}
                            value={pmRelativeMobile}
                            onChange={(e) => setPmRelativeMobile(e.target.value)}
                            id="patient-master-id"
                            ></TextFieldTopLabeled>

                            <TextFieldTopLabeled
                            className="w-full "
                            minWidth={100}
                            label="Phone Number"
                            placeholder="Enter"
                            required={true}
                            value={pmPhone}
                            onChange={(e) => setPmPhone(e.target.value)}
                            id="patient-master-id"
                            ></TextFieldTopLabeled>

                            <TextFieldTopLabeled
                            className="w-full "
                            minWidth={100}
                            label="Email Address"
                            placeholder="Enter"
                            required={true}
                            value={pmEmail}
                            onChange={(e) => setPmEmail(e.target.value)}
                            id="patient-master-id"
                            ></TextFieldTopLabeled>
                            {/* </div>
                            
                            <div
                            className="grid grid-cols-1 p-2 gap-x-4 gap-y-2 md:grid-cols-1 lg:grid-cols-3 xl:lg:grid-cols-3 max-h-[30vh] overflow-y-auto hide-scrollbar"
                            onKeyDown={handleKeyPress}> */}

                            <div className="w-[100]">
                            <label className="text-xs">
                            <div className="">
                            Company/TPA<span className="text-red-600">*</span>
                            </div>
                            <input
                            type="text"
                            className="w-full p-2 mt-1 border rounded"
                            value={pmTPAType}
                            label="Company/TPA"
                            onChange={(e) => setPmTPAType(e.target.value)}
                            list="tpaTypeList"
                            />
                            <datalist id="tpaTypeList">
                            <option value="Male"></option>
                            <option value="female"></option>
                            <option value="Import"></option>
                            <option value="NonGST"></option>
                            </datalist>
                            </label>
                            </div>
                            <div className="w-[100]">
                            <label className="text-xs">
                            <div className="">
                            Reference Doctor<span className="text-red-600">*</span>
                            </div>
                            <input
                            type="text"
                            className="w-full p-2 mt-1 border rounded"
                            value={pmRFAType}
                            label="GST Type"
                            onChange={(e) => setRFAType(e.target.value)}
                            list="gstTypeList"
                            />
                            <datalist id="gstTypeList">
                            <option value="Male"></option>
                            <option value="female"></option>
                            <option value="Import"></option>
                            <option value="NonGST"></option>
                            </datalist>
                            </label>
                            </div>
                            <div className="w-[100]">
                            <label className="text-xs">
                            <div className="">
                            Consulting Doctor<span className="text-red-600">*</span>
                            </div>
                            <input
                            type="text"
                            className="w-full p-2 mt-1 border rounded"
                            value={pmCdocType}
                            label="Consulting Doctor"
                            onChange={(e) => setPmCdocType(e.target.value)}
                            list="cDocTypeList"
                            />
                            <datalist id="cDocTypeList">
                            <option value="Male"></option>
                            <option value="female"></option>
                            <option value="Import"></option>
                            <option value="NonGST"></option>
                            </datalist>
                            </label>
                            </div>
                            {/* </div> */}
                            {/* <div
                            className="grid grid-cols-1 p-1 gap-x-4 gap-y-2 md:grid-cols-1 lg:grid-cols-3 xl:lg:grid-cols-3 max-h-[30vh] overflow-y-auto hide-scrollbar"
                            onKeyDown={handleKeyPress}> */}

                            <TextFieldTopLabeled
                            label="Reg Charge"
                            className="w-[100]"
                            minWidth={100}
                            placeholder="Enter"
                            value={pmRegCharge}
                            onChange={(e) => setPmRegCharge(e.target.value)}
                            ></TextFieldTopLabeled>
                            <TextFieldTopLabeled
                            label="Charge"
                            className="w-[100]"
                            minWidth={100}
                            placeholder="Enter"
                            value={pmRegCharge}
                            onChange={(e) => setPmRegCharge(e.target.value)}
                            ></TextFieldTopLabeled>
                            <TextFieldTopLabeled
                            label="Narration"
                            type="text"
                            className="w-[100]"
                            minWidth={100}
                            placeholder="Enter"
                            value={pmNarration}
                            onChange={(e) => setPmNarration(e.target.value)}
                            ></TextFieldTopLabeled>
                             <TextFieldTopLabeled
                            label="Narration"
                            type="text"
                            className="w-[100]"
                            minWidth={100}
                            placeholder="Enter"
                            value={pmNarration}
                            onChange={(e) => setPmNarration(e.target.value)}
                            ></TextFieldTopLabeled>
                             <TextFieldTopLabeled
                            label="Narration"
                            type="text"
                            className="w-[100]"
                            minWidth={100}
                            placeholder="Enter"
                            value={pmNarration}
                            onChange={(e) => setPmNarration(e.target.value)}
                            ></TextFieldTopLabeled>
                                                        </div>

                            {/* </div> */}
                 <div className="flex justify-center items-center gap-5 mt-5 " 
                 onKeyDown={handleKeyPress}>
    {canEdit && (
        <div>
            <CustomButton1
                label="Submit"
                className="submit text-white bg-first"
                onClick={handlerSumit}
            />
        </div>
    )}
    <div>
        <CustomButton1
            label="Cancel"
            variant="outlined"
            className="cancel text-first"
            onClick={() => setPatientMasterDialogBox(false)}
        />
    </div>
    <div>
        <CustomButton1
            label="Clear Form"
            variant="outlined"
            className="clearForm text-gray-400 border-gray-400"
            onClick={clearForm}
        />
    </div>
</div>


                            </form>
                            </DialogBox>
                            </div>
                            </div>
                            
                            );
                            }

                            export default PatientRegistration;