"use client";
import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import { AddressData } from "../../lib/type";
import EditAddressPoppup from "../../components/ui/EditAddressPoppup";
import { Sparkles, MapPin, Edit2 } from "lucide-react";
import axios from "axios";
import { BaseUrl, headers } from "../../components/Baseurl";
import SmartNavbar from "@/app/components/ui/Navbar";
const EditLocationPage = () => {
    const [editOpen, setEditOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<AddressData | null>(
        null
    );
    const [address, setAddress] = useState<AddressData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const res = await axios.get(`${BaseUrl}api/address`, {
                    headers,
                });
                if (Array.isArray(res.data?.data?.data)) {
                    setAddress(res.data.data.data);
                    setLoading(false);
                    console.log(res.data.data.data);
                } else {
                    console.error("العناوين غير متوفرة بشكل صحيح");
                }
            } catch (err) {
                console.error("فشل تحميل العناوين:", err);
            }
        };

        fetchAddresses();
    }, []);

    // Add a handler to refresh addresses after edit
    const handleSave = () => {
        setEditOpen(false);
        setLoading(true);
        axios.get(`${BaseUrl}api/address`, { headers })
            .then(res => {
                setAddress(res.data.data.data || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-orange-100 flex items-center justify-center py-10 px-2">
            <SmartNavbar />
            <Container>
                <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-4xl space-y-6 border border-purple-100 mt-20">
                    <div className="flex flex-col items-center space-y-2">
                        <h2 className="text-2xl font-bold text-purple-800 text-center flex items-center gap-1">
                            <Sparkles className="w-5 h-5 text-orange-400 animate-bounce" />
                            تعديل العنوان
                        </h2>
                    </div>
                    {loading ? (
                        <div className="text-center text-gray-600">
                            جاري التحميل...
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-600">{error}</div>
                    ) : address.length === 0 ? (
                        <div className="text-center text-gray-600">
                            لا توجد عناوين محفوظة
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {address.map((addr) => (
                                <div
                                    key={addr.id}
                                    className="bg-purple-50 border border-purple-200 rounded-xl p-4 flex items-center gap-3 shadow-md min-w-0 break-words">
                                    <div className="flex-1 min-w-0">
                                        <div className="font-bold text-purple-700 mb-1 flex items-center gap-1 min-w-0 break-words">
                                            <MapPin
                                                className="inline-block text-purple-600"
                                                size={18}
                                            />
                                            <span className="truncate">
                                                {addr.full_name}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-700 min-w-0 break-words">
                                            {addr.address_details},{" "}
                                            {addr.area.name}, {addr.city.name}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1 min-w-0 break-words">
                                            {addr.phone}
                                        </div>
                                    </div>
                                    <button
                                        className="p-2 rounded-full hover:bg-purple-200 transition"
                                        title="تعديل"
                                        onClick={() => {
                                            setSelectedAddress(addr);
                                            setEditOpen(true);
                                        }}>
                                        <Edit2
                                            className="text-gray-700 hover:text-purple-700 transition"
                                            size={20}
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Container>
            {/* Popup for editing address */}
            <EditAddressPoppup
                open={editOpen}
                address={selectedAddress}
                onClose={() => setEditOpen(false)}
                onSave={handleSave}
            />
        </div>
    );
};

export default EditLocationPage;
