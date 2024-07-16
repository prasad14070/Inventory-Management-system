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
import SearchFieldTopLabeled from "../components/DialogBoxComponents/SearchFieldTopLabeled";
import FileUploadTopLabeled from "../components/DialogBoxComponents/FileUploadTopLabeled";
import MultipleSelectTopLabeled from "../components/DialogBoxComponents/MultipleSelectTopLabeled";

import { FetchData } from "../functions/FetchData.function";
import { GlobalContext } from "../global-context/GlobalContextComponent";

function PatientRegistration() {
    let GC = useContext(GlobalContext);

    // DilogBox states
    let [actionType, setActionType] = useState("");
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

    let [pmName, setPmName] = useState("");
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
    let [pmGenderType, setGenderType] = useState("");
    let [pmMstatusType, setMstatusType] = useState("Married");
    let [pmTitle, setPmTitle] = useState("");
    let [pmTPAType, setPmTPAType] = useState([]);
    let [pmRFAType, setRFAType] = useState([]);
    let [pmCdocType, setPmCdocType] = useState([]);
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
    let [pmNameNumber, setPmNameNumber] = useState("");
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

    const setTimeNow = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        setTime(`${hours}:${minutes}`);
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

    const tpaOptions = [
        { id: 1, name: "Male" },
        { id: 2, name: "Female" },
        { id: 3, name: "Import" },
        { id: 4, name: "NonGST" }
    ];

    const doctorOptions = [
        { id: 1, name: 'Dr. Smith' },
        { id: 2, name: 'Dr. Johnson' },
        { id: 3, name: 'Dr. Lee' },
        { id: 4, name: 'Dr. Brown' },
    ];
    function populateFormFields(selectedPatient) {
        setDate(() => {
            const [day, month, year] = selectedPatient.RD_DateTime.split('-');
            const newDate = new Date(`${day}-${month}-${year}`);
            if (isNaN(newDate.getTime())) return ""; // Return empty string if date is invalid

            // Convert date to "yyyy-MM-dd" format
            const formattedDate = newDate.toISOString().split('T')[0];

            return formattedDate;
        });

        setPmPatientId(selectedPatient.RM_PT_ID || "");
        setPmReferenceNo(selectedPatient.RD_CASE_NO || "");
        setIsChecked(selectedPatient.RD_NORMAL_EMERG || "");
        setIsCheckedMLC(selectedPatient.RD_MLC || "");
        setOldCaseType(selectedPatient.RD_OLD_NEW || "");
        setPmOPDType(selectedPatient.RD_OPD_IPD || "");
        setPmTitle(selectedPatient.RM_TITLE || "");
        setPmName(selectedPatient.RM_NAME || "");
        setGenderType(selectedPatient.RM_GENDER || "");
        setPrmDate(() => {
            if (!selectedPatient.RD_DOB) return ""; // Return empty string if date is null or empty

            const dateParts = selectedPatient.RD_DOB.split('-');
            if (dateParts.length !== 3) return ""; // Return empty string if date format is incorrect

            const [day, month, year] = selectedPatient.RD_DOB.split('-');
            const newDate = new Date(`${day}-${month}-${year}`);
            if (isNaN(newDate.getTime())) return ""; // Return empty string if date is invalid

            // Convert date to "yyyy-MM-dd" format
            const formattedDate = newDate.toISOString().split('T')[0];

            return formattedDate;
        });

        setMstatusType(selectedPatient.RM_MARITAL_STATUS || "");
        setPmAadhar(selectedPatient.RM_AADHAR_CARD || "");
        setPmImage(selectedPatient.RM_Photo || "");
        setPmAddress(selectedPatient.RD_ADDRESS || "");
        setPmArea(selectedPatient.RD_AREA || "");
        setPmCity(selectedPatient.RD_CITY || "");
        // setPmPincode(selectedPatient.PM_PINCODE || ""); // Uncomment if needed
        setPmMobile(selectedPatient.RM_MOBILE || "");
        setPmPhone(selectedPatient.RD_PHONE || "");
        setPmTPAType(JSON.parse(selectedPatient.RD_COMP_TPA_ID) || "");
        setRFAType(JSON.parse(selectedPatient.RD_REF_DR_ID) || "");
        setPmCdocType(JSON.parse(selectedPatient.RD_CON_DR_ID) || "");
        setPmNarration(JSON.parse(selectedPatient.RD_PRD_NARRATION) || "");
    }


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
        setTimeNow();

        FetchData("POST", "/api/ledger-master/get-city-data").then((res) => {
            if (res?.isSuccess) {
                if (res.data?.cityData) {
                    GC.setCityData(res.data?.cityData);
                }
            } else {
                toast.error("Failed to load city data");
            }
        })

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
        setPmName(() => "");
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
        setPmNameNumber(() => "");
        setPmGstNumber(() => "");
        setPmEmail(() => "");
        setPmPassword(() => "");
        setPmUnderNameField("");
    }
    function validate() {

        let formErrors = {};
        if (!date) formErrors.date = "Date is required";
        if (!time) formErrors.time = "Time is required";
        if (!pmName) formErrors.pmName = "Name is required";
        if (!pmGenderType) formErrors.pmGenderType = "Gender is required";
        if (!prmDate) formErrors.prmDate = "Date of Birth is required";
        if (!pmMstatusType) formErrors.pmMstatusType = "Marital Status is required";
        if (!pmAddress) formErrors.pmAddress = "Address is required";
        if (!pmCity) formErrors.pmCity = "City is required";
        if (!pmPincode) formErrors.pmPincode = "Pincode is required";
        if (!pmMobile) formErrors.pmMobile = "Mobile Number is required";
        if (!pmEmail) formErrors.pmEmail = "Email is required";
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


        const validateAadhar = (value) => {
            if (value.length !== 12) {
                setAadharError('Aadhar number must be 12 digits');
            } else {
                setAadharError('');
            }
        };
    
        const validatePan = (value) => {
            if (value.length !== 10) {
                setPanError('PAN number must be 10 digits');
            } else {
                setPanError('');
            }
        };
    
        const validateMobile = (value) => {
            if (value.length !== 10) {
                setMobileError('Mobile number must be 10 digits');
            } else {
                setMobileError('');
            }
        };
    
        const validateRelativeMobile = (value) => {
            if (value.length !== 10) {
                setRelativeMobileError('Relative mobile number must be 10 digits');
            } else {
                setRelativeMobileError('');
            }
        };
    
        const validatePhone = (value) => {
            if (value.length !== 10) {
                setPhoneError('Phone number must be 10 digits');
            } else {
                setPhoneError('');
            }
        };
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
    function handlerAdd(type) {
        setActionType(type);
        setPatientMasterDialogBox(true);
        setAction("Add");
        setOldDialogBoxTitle("Add Patient Details");
        setCanEdit(true);
        clearForm();

        const now = new Date();
        setTime(now.toTimeString().split(' ')[0]); // Set current time in HH:MM:SS format

        setPmPatientId(GC?.patientMasterData[GC?.patientMasterData.length - 1]?.RM_PT_ID + 1);
        setPmReferenceNo(GC?.patientMasterData[GC?.patientMasterData.length - 1]?.RM_UNDER_ID + 1);

        // Enable or disable fields based on type
        if (type === "new") {
            setPmSearch("");
            setOldCaseType("");
            // Add any other fields that should be disabled for new
        } else if (type === "old") {
            // Enable fields for old
            // No need to clear fields since they should be editable
        }
    }

    function handlerEdit(param) {
        setPatientMasterDialogBox(true);
        setAction("Edit");
        setOldDialogBoxTitle("Edit Patient Details");
        // if (param.row.PM_READ_ONLY === 0) {
        //     setCanEdit(false);
        // } else {
        //     setCanEdit(true);
        // }
        clearForm();

        setDate(() => {
            const [day, month, year] = param.row.RD_DateTime.split('-');
            const newDate = new Date(`${day}-${month}-${year}`);
            if (isNaN(newDate.getTime())) return ""; // Return empty string if date is invalid

            // Convert date to "yyyy-MM-dd" format
            const formattedDate = newDate.toISOString().split('T')[0];

            return formattedDate;
        })//param.row.RD_DateTime || ""
            ;
        setPmPatientId(() => param.row.RM_PT_ID || "");
        setPmReferenceNo(() => param.row.RD_CASE_NO || "");
        setIsChecked(() => param.row.RD_NORMAL_EMERG || "");
        setIsCheckedMLC(() => param.row.RD_MLC || "");
        setOldCaseType(() => param.row.RD_OLD_NEW || "");
        setPmOPDType(() => param.row.RD_OPD_IPD || "");
        setPmTitle(() => param.row.RM_TITLE || "");
        setPmName(() => param.row.RM_NAME || "");
        setGenderType(() => param.row.RM_GENDER || "");
        setPrmDate(() => {
            if (!param.row.RD_DOB) return ""; // Return empty string if date is null or empty


            const dateParts = param.row.RD_DOB.split('-');
            if (dateParts.length !== 3) return ""; // Return empty string if date format is incorrect

            const [day, month, year] = param.row.RD_DOB.split('-');
            const newDate = new Date(`${day}-${month}-${year}`);
            if (isNaN(newDate.getTime())) return ""; // Return empty string if date is invalid

            // Convert date to "yyyy-MM-dd" format
            const formattedDate = newDate.toISOString().split('T')[0];

            return formattedDate;
        });


        setMstatusType(() => param.row.RM_MARITAL_STATUS || "");
        setPmAadhar(() => param.row.RM_AADHAR_CARD || "");
        setPmImage(() => param.row.RM_Photo || "");
        setPmAddress(() => param.row.RD_ADDRESS || "");
        setPmArea(() => param.row.RD_AREA || "");
        setPmCity(() => param.row.RD_CITY || "");

        // setPmPincode(() => param.row.PM_PINCODE || "");
        setPmMobile(() => param.row.RM_MOBILE || "");
        setPmPhone(() => param.row.RD_PHONE || "");
        setPmTPAType(() => JSON.parse(param.row.RD_COMP_TPA_ID) || "");
        setRFAType(() => JSON.parse(param.row.RD_REF_DR_ID) || "");
        setPmCdocType(() => JSON.parse(param.row.RD_CON_DR_ID) || "");
        setPmNarration(() => JSON.parse(param.row.RD_PRD_NARRATION) || "");
    }
    function handlerDelete(param) {
        console.log(param.row.RM_PT_ID);

        FetchData("POST", "/api/patient-registration/delete-row", {
            rdPtId: param.row.RM_PT_ID,
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

    function handlerSearch(param) {
        setPatientMasterDialogBox(true);
        clearForm();
    
        setDate(() => {
            const [day, month, year] = param.RD_DateTime.split('-');
            const newDate = new Date(`${year}-${month}-${day}`); // Adjusted date parsing
            if (isNaN(newDate.getTime())) return ""; // Return empty string if date is invalid
    
            // Convert date to "yyyy-MM-dd" format
            const formattedDate = newDate.toISOString().split('T')[0];
            return formattedDate;
        });
    
        setPmPatientId(param.RM_PT_ID || "");
        setPmReferenceNo(param.RD_CASE_NO || "");
        setIsChecked(param.RD_NORMAL_EMERG || "");
        setIsCheckedMLC(param.RD_MLC || "");
        setOldCaseType(param.RD_OLD_NEW || "");
        setPmOPDType(param.RD_OPD_IPD || "");
        setPmTitle(param.RM_TITLE || "");
        setPmName(param.RM_NAME || "");
        setGenderType(param.RM_GENDER || "");
        setPrmDate(() => {
            if (!param.RD_DOB) return ""; // Return empty string if date is null or empty
    
            const dateParts = param.RD_DOB.split('-');
            if (dateParts.length !== 3) return ""; // Return empty string if date format is incorrect
    
            const [day, month, year] = dateParts;
            const newDate = new Date(`${year}-${month}-${day}`);
            if (isNaN(newDate.getTime())) return ""; // Return empty string if date is invalid
    
            // Convert date to "yyyy-MM-dd" format
            const formattedDate = newDate.toISOString().split('T')[0];
            return formattedDate;
        });
    
        setMstatusType(param.RM_MARITAL_STATUS || "");
        setPmAadhar(param.RM_AADHAR_CARD || "");
        setPmImage(param.RM_Photo || "");
        setPmAddress(param.RD_ADDRESS || "");
        setPmArea(param.RD_AREA || "");
        setPmCity(param.RD_CITY || "");
        setPmMobile(param.RM_MOBILE || "");
        setPmPhone(param.RD_PHONE || "");
    
        setPmTPAType(() => {
            try {
                const data = JSON.parse(param.RM_COMP_ID);
                return Array.isArray(data) ? data : [];
            } catch (e) {
                return [];
            }
        });
    
        setRFAType(() => {
            try {
                const data = JSON.parse(param.RD_REF_DR_ID);
                return Array.isArray(data) ? data : [];
            } catch (e) {
                return [];
            }
        });
    
        setPmCdocType(() => {
            try {
                const data = JSON.parse(param.RD_CON_DR_ID);
                return Array.isArray(data) ? data : [];
            } catch (e) {
                return [];
            }
        });
    
        setPmNarration(param.RD_PRD_NARRATION || "");
    }
    


    async function handlerSumit() {
        let url = action === "Add" ? "/api/patient-registration/add-patient-data" : "/api/patient-registration/edit-patient-data";

        console.log(pmGenderType);

        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        const rdDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        try {
            const res = await FetchData("POST", url, {
                // Master Fields    
                user_email: localStorage.getItem("email") || null,
                rmPtId: Number(pmPatientId) || 1234,
                rmUnderId: Number(pmPatientId) || 1234,
                rmTitle: pmTitle || 1234,
                rmName: pmName || 1234,
                rmMobile: pmMobile || 1,
                rmGender: pmGenderType || 1234,
                rmMaritalStatus: pmMstatusType || 1234,
                rmPhoto: pmImage || 1234,
                rmAadharCard: pmAadhar || 1234,
                rmYear: Number(age) || 12,
                rmCompId: pmTPAType || 1234,
                rmCreatedBy: localStorage.getItem("email") || null,
                rmCreatedDate: rdDateTime || null,
                rmUpdatedBy: localStorage.getItem("email") || null,
                rmUpdatedDate: rdDateTime || null,
                // Details Fields
                rdCaseNo: Number(pmReferenceNo) || 123,
                rdPtId: Number(pmPatientId) || 1234,
                rdIpdNo: null || 12345,
                rdOpdIpd: pmOPDType || "null",
                rdDateTime: rdDateTime,
                rdNormalEmerg: isChecked || 1,
                rdOldNew: pmOldCaseType || 1,
                rdMlc: isCheckedMLC || 1,
                rdDob: prmDate || "null",
                rdYear: Number(age) || 12,
                rdMonth: Number(monthDiff) || 15,
                rdDays: Number(dayDiff) || 15,
                rdAddress: pmAddress || "null",
                rdCity: pmCity || "Not Selected",
                rdPhone: pmPhone || 1,
                rdArea: pmArea || "null",
                rdCompTpaId: pmTPAType || null,
                rdConDrId: pmCdocType || null,
                rdRefDrId: pmRFAType || null,
                rdPrdNarration: pmNarration || null
            });

            if (res && res.isSuccess) {
                toast.success(res.message || "Data added successfully");
                if (res.data?.patientMasterData) {
                    GC?.setPatientMasterData(res.data?.patientMasterData);
                }
                if (action === "Add") {
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
                } else if (action === "Edit") {
                    clearForm();
                    setOldDialogBoxTitle(false);
                }
            } else {
                toast.error(res?.message || "Failed to add data");
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            toast.error("An error occurred while submitting data");
        }
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
    };

    function filterOptionData(e) {
        const searchTerm = e.target.value.toLowerCase();
        setFilteredOptions(() => {
            // Filter based on GC.patientDetailsData and GC.patientMasterData for mobile numbers
            const filteredDetails = GC.patientDetailsData.filter(patient => patient.mobile.toLowerCase().includes(searchTerm));
            const filteredMaster = GC.patientMasterData.filter(patient => patient.mobile.toLowerCase().includes(searchTerm));

            // Combine and map to unique options
            const uniqueOptions = new Set([...filteredDetails.map(patient => patient.mobile), ...filteredMaster.map(patient => patient.mobile)]);

            // Return options as array
            return [...uniqueOptions];
        });
    }


    return (
        <div className="flex flex-col h-full overflow-y-auto col-span-2">
            <Title title1={"Patient Registration"} title2={"Configuration"} />
            <div className="p-3 mt-2 bg-white rounded grow">
                <div className="p-2 mt-3 rounded bg-second">
                    <div className="p-1">
                        <Controls4 onClick1={() => handlerAdd("new")} onClick2={() => handlerAdd("old")} apiRef={apiRef} />

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
                                field: "RD_CASE_NO",
                                headerName: "Case No",
                                width: 100,
                            },
                            {
                                field: "RD_DateTime",
                                headerName: "Date Time",
                                width: 80,
                            },
                            {
                                field: "RD_OLD_NEW",
                                headerName: "OLD/NEW",
                                width: 80,
                            },

                            {
                                field: "RM_NAME",
                                headerName: "Name",
                                flex: 1,
                                minWidth: 150,
                            },
                            {
                                field: "RM_MOBILE",
                                headerName: "Mobile",
                                width: 80,
                            },
                            {
                                field: "RD_ADDRESS",
                                headerName: "Address",
                                width: 80,
                            },
                            {
                                field: "RD_AREA",
                                headerName: "Area",
                                width: 80,
                            },
                            {
                                field: "RD_CITY",
                                headerName: "City",
                                width: 80,
                            },
                            {
                                field: "RD_PHONE",
                                headerName: "Phone",
                                width: 80,
                            },
                            {
                                field: "RD_DOB",
                                headerName: "DOB",
                                width: 80,
                            },
                            {
                                field: "RD_YEAR",
                                headerName: "Age",
                                width: 80,
                            },
                            {
                                field: "RM_GENDER",
                                headerName: "Sex",
                                width: 80,
                            },
                            {
                                field: "RD_COMP_TPA_ID",
                                headerName: "Company Name",
                                width: 120,
                            },
                            {
                                field: "RD_REF_DR_ID",
                                headerName: "Reference Doctor",
                                width: 100,
                            },
                            {
                                field: "RD_CON_DR_ID",
                                headerName: "Consulting Doctor",
                                width: 100,
                            },
                            {
                                field: "RD_PRD_NARRATION",
                                headerName: "Narration",
                                width: 150,
                            },
                            {
                                field: "RM_CREATED_BY",
                                headerName: "Created By",
                                flex: 1,
                                minWidth: 150,
                            },
                            {
                                field: "RM_CREATED_DATE",
                                headerName: "Created Date Time",
                                flex: 1,
                                minWidth: 150,
                                renderCell: (param) => {
                                    if (param.formattedValue) {
                                        return String(param.formattedValue)
                                            .replace("T", " ")
                                            .substring(0, 16);
                                    } else {
                                        return "-";
                                    }
                                },
                            },
                            {
                                field: "RM_UPDATED_BY",
                                headerName: "Updated By",
                                flex: 1,
                                minWidth: 200,
                                // renderCell: (param) => {
                                //     let updatedByArray = JSON.parse(param.formattedValue);
                                //     return updatedByArray[updatedByArray.length - 1];
                                // },
                            },
                            {
                                field: "RM_UPDATED_DATE",
                                headerName: "Updated Date Time",
                                flex: 1,
                                minWidth: 150,
                                // renderCell: (param) => {
                                //     let updatedAtArray = JSON.parse(param.formattedValue);
                                //     let timeString = updatedAtArray[updatedAtArray.length - 1];
                                //     if (timeString) {
                                //         return timeString.replace("T", " ").substring(0, 16);
                                //     } else {
                                //         return "-";
                                //     }
                                // },
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
                        rows={GC.patientMasterData.map((element) => {
                            const details = GC.patientDetailsData.find(detail => detail.RD_PT_ID === element.RM_PT_ID);
                            return {
                                id: element.RM_PT_ID,
                                ...element,
                                ...details,
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
                                disabled={true}
                            ></TextFieldTopLabeled>
                            <TextFieldTopLabeled
                                label="Case No"
                                placeholder="Auto Generated"
                                className="w-[5px]"
                                minWidth='5px'
                                value={pmReferenceNo}
                                onChange={(e) => setPmReferenceNo(e.target.value)}
                                disabled={true}
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
                                        Old Case
                                    </div>
                                    <input
                                        type="text"
                                        className="w-full p-2 mt-1 border rounded"
                                        value={pmOldCaseType}
                                        label="OldCase"
                                        onChange={(e) => setOldCaseType(e.target.value)}
                                        list="pmOldCaseType"
                                        disabled={actionType === "new"}
                                    />
                                    <datalist id="pmOldCaseType">
                                        <option value="Mobile No"></option>
                                        <option value="IPD"></option>
                                        <option value="OPD"></option>
                                    </datalist>
                                </label>
                            </div>

                            <SearchFieldTopLabeled
                                label="Search"
                                placeholder="Enter"
                                className="w-[5px]"
                                minWidth="5px"
                                value={pmSearch}
                                onChange={(e) => setPmSearch(e.target.value)}
                                selectedOption={pmOldCaseType}
                                populateForm={handlerSearch}
                                disabled={actionType === "new"} // This disables the field when actionType is "new"
                            ></SearchFieldTopLabeled>
                            {/* </div>
                            
                            
                            <div className="grid grid-cols-1 p-2 md:grid-cols-4 lg:grid-cols-5 gap-x-10 gap-y-2 max-h-[100vh]"
                            onKeyDown={handleKeyPress}> */}

                            <div className="max-w-[50]">
                                <label className="text-xs">
                                    <div className="">
                                        OPD/IPD
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
                                        Title
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
                                value={pmName}
                                onChange={(e) => setPmName(e.target.value)}
                                id="patient-master-id"
                            ></TextFieldTopLabeled>
                            <div className="w-[100]">
                                <label className="text-xs">
                                    <div className="">
                                        Gender
                                    </div>
                                    <input
                                        type="text"
                                        className="w-full p-2 mt-1 border rounded"
                                        value={pmGenderType}
                                        label="Gender"
                                        onChange={(e) => {
                                            setGenderType(e.target.value);
                                            console.log(pmGenderType);
                                        }}
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
                                required={true}
                                onChange={(e) => handleDateChange(e.target.value)}
                                className="w-full"
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
                                value={pmAadhar}
                                onChange={(e) => setPmAadhar(e.target.value)}
                                id="patient-master-id"
                            ></TextFieldTopLabeled>
                            <TextFieldTopLabeled
                                className="w-full"
                                minWidth={100}
                                label="Pan No"
                                placeholder="Enter"
                                value={pmPanNumber}
                                onChange={(e) => setPmPanNumber(e.target.value)}
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
                                value={pmPincode}
                                onChange={(e) => setPmPincode(e.target.value)}
                                id="patient-master-id"
                            ></TextFieldTopLabeled>

                            <TextFieldTopLabeled
                                className="w-full "
                                minWidth={100}
                                label="Mobile Number"
                                placeholder="Enter"
                                value={pmMobile}
                                onChange={(e) => setPmMobile(e.target.value)}
                                id="patient-master-id"
                            ></TextFieldTopLabeled>
                            <TextFieldTopLabeled
                                className="w-full "
                                minWidth={100}
                                label="Relative Mobile Number"
                                placeholder="Enter"
                                value={pmRelativeMobile}
                                onChange={(e) => setPmRelativeMobile(e.target.value)}
                                id="patient-master-id"
                            ></TextFieldTopLabeled>

                            <TextFieldTopLabeled
                                className="w-full "
                                minWidth={100}
                                label="Phone Number"
                                placeholder="Enter"
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

                            {/* <div className="w-[100]">
                           
                            </div> */}






                            <MultipleSelectTopLabeled
                                label="Company/TPA"
                                className=""

                                placeholder="Company/TPA"
                                // className="w-full p-2 mt-1 border rounded"

                                required={true}
                                state={pmTPAType}
                                setState={setPmTPAType}
                                onChange={(selectedValues) => {
                                    console.log("Selected values:", selectedValues);
                                }}
                                optionData={tpaOptions.map((option) => `${option.id} ${option.name}`)}
                                maxWidth="100px"
                            />





                            {/* <div className="w-[100]">
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
                            </label> */}
                            {/* </div> */}


                            <MultipleSelectTopLabeled
                                label="Reference Doctor"
                                className="w-[100]"

                                placeholder="Reference Doctor"
                                // className="w-full p-2 mt-1 border rounded"

                                required={true}
                                state={pmRFAType}
                                setState={setRFAType}
                                onChange={(selectedValues) => {
                                    console.log("Selected values:", selectedValues);
                                }}
                                optionData={doctorOptions.map((option) => `${option.id} ${option.name}`)}
                                maxWidth="100px"
                            />


                            <MultipleSelectTopLabeled
                                label="Consulting Doctor"
                                className="w-[100]"

                                placeholder="Consulting Doctor"
                                // className="w-full p-2 mt-1 border rounded"

                                required={true}
                                state={pmCdocType}
                                setState={setPmCdocType}
                                onChange={(selectedValues) => {
                                    console.log("Selected values:", selectedValues);
                                }}
                                optionData={doctorOptions.map((option) => `${option.id} ${option.name}`)}
                                maxWidth="100px"
                            />
                            {/* <div className="w-[100]">
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
                            </div> */}
                            {/* </div> */}
                            {/* <div
                            className="grid grid-cols-1 p-1 gap-x-4 gap-y-2 md:grid-cols-1 lg:grid-cols-3 xl:lg:grid-cols-3 max-h-[30vh] overflow-y-auto hide-scrollbar"
                            onKeyDown={handleKeyPress}> */}

                            <TextFieldTopLabeled
                                label="Reg Charge (Debit)"
                                className="w-[100]"
                                minWidth={100}
                                placeholder="Enter"
                                value={pmRegCharge}
                                onChange={(e) => setPmRegCharge(e.target.value)}
                            ></TextFieldTopLabeled>
                            <TextFieldTopLabeled
                                label="Charge (Credit)"
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