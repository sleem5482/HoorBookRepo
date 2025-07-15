"use client";
import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import { Sparkles } from "lucide-react";
import { BaseUrl, headers } from "../components/Baseurl";
import Cookies from "js-cookie";
import BottomSelectField from "../components/ui/checkbox";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
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
import { address,addressNames } from "../lib/type";
import { buildPayload } from "../lib/methodes";

const API_BASE = `${BaseUrl}api`;
// console.log(API_BASE);
const Location = () => {
    // Unified state for all fields (IDs only)
    const [address, setAddress] = useState<address>({
        name: "",
        phone: "",
        governorateId: "",
        cityId: "",
        areaId: "",
        details: "",
    });
    // Names state
    const [addressNames, setAddressNames] = useState<addressNames>({
        governorate: "",
        city: "",
        area: "",
    });

    // Options state
    const [governorates, setGovernorates] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);
    const [areas, setAreas] = useState<any[]>([]);
    // Error modal
    const [modal, setModal] = useState({ show: false, message: "" });
    const [success, setSuccess] = useState("");

        // Unified address change handler (for IDs)
    const handleAddressChange = (field: keyof address, value: string) => {
        setAddress((prev) => ({
            ...prev,
            [field]: value,
        }));
    };
    // Unified addressNames change handler (for names)
    const handleAddressNamesChange = (field: keyof addressNames, value: string) => {
        setAddressNames((prev) => ({
            ...prev,
            [field]: value,
        }));
    };


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
        if (addressNames.governorate === "") {
            setCities([]);
            setAreas([]);
        }
        const id_governorate = governorates.find(
            (g) => g.name_ar === addressNames.governorate
        )?.id;
        axios
            .get(`${API_BASE}/cities?governorate_id=${id_governorate}`)
            .then((res) => setCities(res.data.data))
            .catch(() => setModal({ show: true, message: "فشل تحميل المدن" }));
    }, [addressNames.governorate]);
    // Fetch areas when city changes
    useEffect(() => {
        if (!addressNames.city) {
            setAreas([]);
            handleAddressNamesChange("area", "");
            return;
        }

        axios
            .get(
                `${API_BASE}/areas?city_id=${
                    cities.find((c) => c.name_ar === addressNames.city)?.id
                }`
            )
            .then((res) => setAreas(res.data.data))
            .catch(() =>
                setModal({ show: true, message: "فشل تحميل المناطق" })
            );
    }, [addressNames.city, cities]);



    // Governorate select
    const handleGovSelect = (value: string) => {
        const selected = governorates.find((g) => g.name_ar === value);
        handleAddressNamesChange("governorate", value);
        handleAddressNamesChange("city", "");
        handleAddressNamesChange("area", "");
        handleAddressChange("governorateId", selected ? selected.id : "");
        handleAddressChange("cityId", "");
        handleAddressChange("areaId", "");
    };
    // City select
    const handleCitySelect = (value: string) => {
        if (!address.governorateId) {
            setModal({ show: true, message: "اختر المحافظة أولاً" });
            return;
        }
        const selected = cities.find((c) => c.name_ar === value);
        handleAddressNamesChange("city", value);
        handleAddressNamesChange("area", "");
        handleAddressChange("cityId", selected ? selected.id : "");
        handleAddressChange("areaId", "");
    };
    // Area select
    const handleAreaSelect = (value: string) => {
        if (!address.cityId) {
            setModal({ show: true, message: "اختر المدينة أولاً" });
            return;
        }
        const selected = areas.find((a) => a.name_ar === value);
        handleAddressNamesChange("area", value);
        handleAddressChange("areaId", selected ? selected.id : "");
    };

    // Handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (
            !address.name ||
            !address.phone ||
            !address.governorateId ||
            !address.cityId ||
            !address.areaId ||
            !address.details
        ) {
            setModal({ show: true, message: "يرجى ملء جميع الحقول المطلوبة" });
            return;
        }
        try {
            const res = await axios.post(
                "https://hoorbookapp.com/api/address",
                {
                    ...buildPayload(address),
                },
                {
                    headers: headers
                }
            );
            if (res.data && res.status === 200) {
                setSuccess("تم حفظ العنوان بنجاح!");

                Cookies.set("login_governorate", addressNames.governorate);
                Cookies.set("login_city", addressNames.city);
                Cookies.set("login_area", addressNames.area);
                Cookies.set("login_address_details", address.details);
                setAddress({
                    name: "",
                    phone: "",
                    governorateId: "",
                    cityId: "",
                    areaId: "",
                    details: "",
                });
                setAddressNames({
                    governorate: "",
                    city: "",
                    area: "",
                });
            } else {
                setModal({ show: true, message: "حدث خطأ أثناء حفظ العنوان" });
            }
        } catch {
            setModal({ show: true, message: "حدث خطأ أثناء حفظ العنوان" });
        }
    };

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
                                    onChange={(e) => handleAddressChange("name", e.target.value)}
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
                                    onChange={(value) => handleAddressChange("phone", value)}
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
                                selectedValue={addressNames.governorate}
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
                                selectedValue={addressNames.city}
                                options={
                                    cities ? cities.map((c) => c.name_ar) : [""]
                                }
                                onSelect={handleCitySelect}
                                icon={<Building2 size={20} />}
                                canOpen={!!address.governorateId}
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
                                selectedValue={addressNames.area}
                                options={
                                    areas ? areas.map((a) => a.name_ar) : [""]
                                }
                                onSelect={handleAreaSelect}
                                icon={<MapPin size={20} />}
                                canOpen={!!address.cityId}
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
                                    onChange={(e) => handleAddressChange("details", e.target.value)}
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
