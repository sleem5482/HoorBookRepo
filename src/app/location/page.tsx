"use client";
import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import { Sparkles } from "lucide-react";
import { BaseUrl, headers } from "../components/Baseurl";
import Cookies from "js-cookie";
import BottomSelectField from "../components/ui/checkbox";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import { getCoordinates } from "../lib/mapApi";
import {
    Building2,
    Landmark,
    MapPin,
    Map,
    User,
    Phone,
    LandmarkIcon,
} from "lucide-react";
import axios from "axios";
import { cookies } from "next/headers";

const API_BASE = `${BaseUrl}api`;
// console.log(API_BASE);
const Location = () => {
    // Unified state for all fields
    const [address, setAddress] = useState({
        name: "",
        phone: "",
        governorate: "", // will store name
        city: "", // will store name
        area: "", // will store name
        details: "",
    });

    // State for IDs
    const [selectedIds, setSelectedIds] = useState<{
        governorateId: string;
        cityId: string;
        areaId: string;
    }>({
        governorateId: "",
        cityId: "",
        areaId: "",
    });
    // console.log(selectedIds);
    // Options state
    const [governorates, setGovernorates] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);
    const [areas, setAreas] = useState<any[]>([]);
    // Error modal
    const [modal, setModal] = useState({ show: false, message: "" });
    const [success, setSuccess] = useState("");

    // Fetch governorates on mount
    useEffect(() => {
        axios
            .get(`${API_BASE}/governorates`)
            .then((res) => {
                setGovernorates(res.data.data);
            })
            .catch(() =>
                setModal({ show: true, message: "فشل تحميل المحافظات" })
            );
    }, []);

    // Fetch cities when governorate changes
    useEffect(() => {
        if (address.governorate === "") {
            setCities([]);
            setAreas([]);
        }
        const id_governorate = governorates.find(
            (g) => g.name_ar === address.governorate
        )?.id;
        axios
            .get(`${API_BASE}/cities?governorate_id=${id_governorate}`)
            .then((res) => setCities(res.data.data))
            .catch(() => setModal({ show: true, message: "فشل تحميل المدن" }));
    }, [address.governorate]);
    // Fetch areas when city changes
    useEffect(() => {
        if (!address.city) {
            setAreas([]);
            setAddress((prev) => ({ ...prev, area: "" }));
            return;
        }

        axios
            .get(
                `${API_BASE}/areas?city_id=${
                    cities.find((c) => c.name_ar === address.city)?.id
                }`
            )
            .then((res) => setAreas(res.data.data))
            .catch(() =>
                setModal({ show: true, message: "فشل تحميل المناطق" })
            );
    }, [address.city, cities]);

    // Fetch coordinates when address details change
    // useEffect(() => {
    //     if ( address.area && address.city && address.governorate) {
    //         getCoordinates(
    //             `${address.area}, ${address.city}, ${address.governorate}`
    //         )
    //             .then((coords) => {
    //                 console.log("Coordinates:", coords);
    //                 // You can store or use coordinates as needed
    //             })
    //             .catch((error) => {
    //                 console.error("Error fetching coordinates:", error);
    //                 setModal({
    //                     show: true,
    //                     message: "فشل الحصول على الإحداثيات",
    //                 });
    //             });
    //     }
    // }, [
    //     address.area,
    //     address.city,
    //     address.governorate
    // ]);

    // Handle select logic with error modal
    console.log(address)
    const handleGovSelect = (value: string) => {
        const selected = governorates.find((g) => g.name_ar === value);
        setAddress((prev) => ({
            ...prev,
            governorate: value,
            city: "",
            area: "",
        }));
        setSelectedIds((prev) => ({
            ...prev,
            governorateId: selected ? selected.id : "",
            cityId: "",
            areaId: "",
        }));
    };
    const handleCitySelect = (value: string) => {
        if (!selectedIds.governorateId) {
            setModal({ show: true, message: "اختر المحافظة أولاً" });
            return;
        }
        const selected = cities.find((c) => c.name_ar === value);
        setAddress((prev) => ({ ...prev, city: value, area: "" }));
        setSelectedIds((prev) => ({
            ...prev,
            cityId: selected ? selected.id : "",
            areaId: "",
        }));
    };
    const handleAreaSelect = (value: string) => {
        if (!selectedIds.cityId) {
            setModal({ show: true, message: "اختر المدينة أولاً" });
            return;
        }
        const selected = areas.find((a) => a.name_ar === value);
        setAddress((prev) => ({ ...prev, area: value }));
        setSelectedIds((prev) => ({
            ...prev,
            areaId: selected ? selected.id : "",
        }));
    };
    const tokent = Cookies.get("access_token_login");
    // Handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (
            !address.name ||
            !address.phone ||
            !address.governorate ||
            !address.city ||
            !address.area ||
            !address.details
        ) {
            setModal({ show: true, message: "يرجى ملء جميع الحقول المطلوبة" });
            return;
        }
        try {
            const res = await axios.post(
                "https://hoorbookapp.com/api/address",
                {
                    full_name: address.name,
                    phone: address.phone,
                    governorate_id: selectedIds.governorateId,
                    city_id: selectedIds.cityId,
                    area_id: selectedIds.areaId,
                    address_details: address.details,
                    latitude: "9.933468557950285",
                    longitude: "31.8412072956562",
                },
                {
                    headers: {
                        Authorization: `Bearer ${tokent}`,
                        userType: '2',
                        fcmToken: 'fGS7RgUcR66lms505IQllc:APA91bF-AdXcn94TKHQ2eKEqTX22eQTxr6LRSwpHyzwWXjvwBFfLQ_yYWO0ZNfd9ScbxHjKBZaGLosJK2G1wfrKp6G4h3FeDfdNovPZD3PX8iV-ckfYf3ig',
                        lang: 'ar',
                        'Content-Type': 'application/json',
  
                    },
                }
            );
            if (res.data && res.status === 200) {
                setSuccess("تم حفظ العنوان بنجاح!");

                Cookies.set("login_governorate", address.governorate);
                Cookies.set("login_city", address.city);
                Cookies.set("login_area", address.area);
                Cookies.set("login_address_details", address.details);
                console.log (address)
                setAddress({
        name: "",
        phone: "",
        governorate: "", 
        city: "", 
        area: "", 
        details: "",
    })
            
            } else {
                setModal({ show: true, message: "حدث خطأ أثناء حفظ العنوان" });
            }
        } catch {
            setModal({ show: true, message: "حدث خطأ أثناء حفظ العنوان" });
        }
    };
    // console.log("Governorate:", Cookies.get("login_governorate"));

    return (
        <>
           
            <div className="min-h-screen bg-gradient-to-br from-purple-100 to-orange-100 flex items-center justify-center py-10 px-4 ">
                <Container>
                    <form
                        className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md space-y-6 border border-purple-100 mt-5"
                        onSubmit={handleSubmit}>
                        {/* شعار */}
                        <div className="flex flex-col items-center space-y-2">
                           
                            <h2 className="text-2xl font-bold text-purple-800 text-center flex items-center gap-1">
                                <Sparkles className="w-5 h-5 text-orange-400 animate-bounce" />
                                أضف عنوان جديد
                            </h2>
                        </div>
                        {/* الاسم */}
                        <div>
                            <label className="block font-bold mb-1 text-black">
                                الاسم كاملًا
                            </label>
                            <div className="relative">
                                <User
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={20}
                                />
                                <input
                                    type="text"
                                    className="outline-none w-full border rounded-md p-3 pr-12 text-right text-black placeholder:text-gray-400 bg-white border-gray-400 shadow-md"
                                    placeholder="أدخل اسمك كاملًا"
                                    value={address.name}
                                    onChange={(e) =>
                                        setAddress((prev) => ({
                                            ...prev,
                                            name: e.target.value,
                                        }))
                                    }
                                    required
                                />
                                
                            </div>
                        </div>
                        {/* رقم الهاتف */}
                        <div>
                            <label className="block font-bold mb-1 text-black ">
                                رقم الهاتف
                            </label>
                            <div
                                className="w-full border rounded-md p-3 flex items-center bg-white border-gray-400 shadow-md"
                                style={{ direction: "rtl" }}>
                                <PhoneInput
                                    countryCodeEditable={false}
                                    country={"eg"}
                                    value={address.phone}
                                    onChange={(value) =>
                                        setAddress((prev) => ({
                                            ...prev,
                                            phone: value,
                                        }))
                                    }
                                    placeholder="رقم الهاتف"
                                    enableSearch
                                    specialLabel=""
                                    inputStyle={{
                                        direction: "ltr",
                                        textAlign: "left",
                                        color: "#000",
                                        background: "transparent",
                                        border: "none",
                                        outline: "none",
                                        padding: "0.5rem 1rem",
                                        paddingLeft: "2.5rem",
                                        
                                    }}
                                    buttonStyle={{
                                        border: "none",
                                        background: "transparent",
                                        
                                    }}
                                    containerStyle={{
                                        direction: "ltr",
                                        display: "flex",
                                        alignItems: "center",
                                        color: "#000",
                                    }}
                                />
                            </div>
                        </div>
                        {/* المحافظة */}
                        <h1 className="text-gray-800 font-bold"> تفاصيل العنوان</h1>
                        <div className="text-black">
                            <label className="block font-bold mb-1">
                               المحافظة
                            </label>
                            <BottomSelectField
                                title="المحافظة"
                                placeholder="اختر المحافظة"
                                selectedValue={address.governorate}
                                options={governorates.map((g) => g.name_ar)}
                                onSelect={handleGovSelect}
                                icon={<LandmarkIcon size={20} />}
                            />
                        </div>
                        {/* المدينة */}
                        <div className="text-black">
                            <label className="block font-bold mb-1">
                               المدينة
                            </label>
                            <BottomSelectField
                                title="المدينة"
                                placeholder="اختر المدينة"
                                selectedValue={address.city}
                                options={
                                    cities ? cities.map((c) => c.name_ar) : [""]
                                }
                                onSelect={handleCitySelect}
                                icon={<Building2 size={20} />}
                                canOpen={!!selectedIds.governorateId}
                                onBlockedOpen={() => setModal({ show: true, message: "اختر المحافظة أولاً" })}
                            />
                        </div>
                        {/* المنطقة */}
                        <div className="text-black">
                            <label className="block font-bold mb-1">
                               المنطقة
                            </label>
                            <BottomSelectField
                                title="المنطقة"
                                placeholder="اختر منطقتك او أقرب منطقة لك"
                                selectedValue={address.area}
                                options={
                                    areas ? areas.map((a) => a.name_ar) : [""]
                                }
                                onSelect={handleAreaSelect}
                                icon={<MapPin size={20} />}
                                canOpen={!!selectedIds.cityId}
                                onBlockedOpen={() => setModal({ show: true, message: "اختر المدينة أولاً" })}
                            />
                        </div>
                        <div className="text-black">
                            <label className="block font-bold mb-1">
                                تفاصيل العنوان
                            </label>
                            <div className="relative">
                                <MapPin
                                    className="absolute right-3 top-3 text-gray-400"
                                    size={20}
                                />
                                <textarea
                                    className="w-full border rounded-md p-3 pr-12 text-right border-gray-400 shadow-md resize-none outline-none"
                                    placeholder="ادخل تفاصيل العنوان ( الشارع رقم المنزل ) وعلامة محددة"
                                    value={address.details}
                                    onChange={(e) =>
                                        setAddress((prev) => ({
                                            ...prev,
                                            details: e.target.value,
                                        }))
                                    }
                                    required
                                />
                            </div>
                        </div>
                        {/* Summary */}
                        <div className="flex items-center gap-2 border-t border-b border-gray-500 pt-4 py-4">
                            <Map className="text-purple-600" size={22} />
                            <div className="flex-1 text-right">
                                <span className="font-bold text-purple-700">
                                    الموقع
                                </span>
                                {/* <div className="text-sm  text-black">
                                    {address.details &&
                                    address.area &&
                                    address.city &&
                                    address.governorate
                                        ? `${address.details}, ${address.area}, ${address.city}, ${address.governorate}`
                                        : "لم يتم تحديد الموقع بعد"}
                                </div> */}
                            </div>
                        </div>
                        {success && (
                            <div className="text-green-600 text-center">
                                {success}
                            </div>
                        )}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-700 to-orange-400 text-white font-bold py-2 rounded-lg shadow-lg hover:scale-[1.02] transition-all duration-300 mt-2">
                            حفظ
                        </button>
                    </form>
                </Container>
            </div>
            {/* Error Modal */}
            {modal.show && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-8 min-w-[300px] text-center">
                        <div className="mb-4 text-lg text-black">{modal.message}</div>
                        <button
                            className="text-purple-700 font-bold mt-2"
                            onClick={() =>
                                setModal({ show: false, message: "" })
                            }>
                            تأكيد
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Location;
