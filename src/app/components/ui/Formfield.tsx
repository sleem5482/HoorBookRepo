"use client"
import { useEffect, useState } from "react";
import Container from "../Container";
import {ApiResponse, type  FieldForm } from "@/app/lib/type";
import { fetchData } from "@/app/lib/methodes";
import InputField from "./Input";

type Props = {
fields: FieldForm[];
data: Record<string, any>;
onChange: (updatedData: Record<string, any>) => void;
};
export default function FormField({ fields, data, onChange }: Props){
  const [formData, setFormData] = useState(data);
  const [dynamicOptions, setDynamicOptions] = useState<Record<string, string[]>>({});
useEffect(()=>{
    fields.forEach(async(field)=>{
        if(field.type==="select"&&field.fetchUrl){
            const res:ApiResponse<any>=await fetchData(field.fetchUrl);
            const optons= res.data;
            setDynamicOptions((prev)=>({...prev,[field.name]:optons}));

        }
    })
},[fields])
const handelchange=(field:string,value:any)=>{
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onChange(updatedData);
}
    return (
        <Container>
            <div className="space-y-4 text-black">
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col gap-1">
          <label>{field.label}</label>
          {field.type === "select" ? (
            <select
            name={field.name}
            title={field.label}
              value={formData[field.name] || ""}
              onChange={(e) => handelchange(field.name, e.target.value)}
            >
              <option value="">اختر...</option>
              {(field.options || dynamicOptions[field.name] || []).map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <InputField
            name={field.name}
              type={field.type}
              value={formData[field.name] || ""}
              onChange={(e) => handelchange(field.name, (e.target.value))}
            />
          )}
        </div>
      ))}
    </div>
        </Container>
    )
}