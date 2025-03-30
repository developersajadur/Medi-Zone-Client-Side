/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { FiUpload } from "react-icons/fi"
import { getUserPersonalInfo } from "@/services/UserService"
import { TUserInfo } from "@/types"
import Loader from "@/components/Loaders/Loader"

type FormValues = {
  firstName: string
  email: string
  phoneNumber: string
}

const PersonalInfoComponent = () => {
  const [userData, setUserData] = useState<TUserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [photoUrl, setPhotoUrl] = useState<string>("/placeholder.svg");

  const {
    register,
    handleSubmit,
    reset
  } = useForm<FormValues>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserPersonalInfo();
        if (res.success && res.data) {
          setUserData(res.data as TUserInfo);
          setPhotoUrl(res.data.photo || "/placeholder.svg");
          reset({
            firstName: res.data?.fullName || "Please Provide Your First Name",
            email: res.data?.email || "Please Provide Your Email",
            phoneNumber: res.data?.phoneNumber || "Please Provide Phone Number",
          });
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [reset]);

  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
  };

  if (loading) return <Loader/>;
  if (error) return <p className="text-red-500 text-2xl font-semibold ">{error}</p>;

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold mb-2">Personal Information</h1>
      <p className="text-gray-500 mb-8">Update your photo and personal details here.</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-4 mb-8">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-blue-100 overflow-hidden relative">
              <Image src={photoUrl} alt="Profile" width={64} height={64} className="object-cover" />
            </div>
          </div>
          <button type="button" className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors">
            <FiUpload className="w-4 h-4" />
            <span>Change photo</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="firstName" className="block text-sm mb-2">First Name</label>
            <input {...register("firstName", { required: "First name is required" })} className="w-full px-3 py-2 border rounded-md" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <label htmlFor="email" className="block text-sm mb-2">Email</label>
            <input {...register("email", { required: "Email is required" })} type="email" className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm mb-2">Phone Number</label>
            <input {...register("phoneNumber", { required: "Phone number is required" })} type="tel" className="w-full px-3 py-2 border rounded-md" />
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md transition-colors">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoComponent;