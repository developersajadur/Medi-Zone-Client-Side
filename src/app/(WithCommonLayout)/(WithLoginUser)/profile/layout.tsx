import type React from "react"
// import ProfilePage from "./page"
import ProfileComponent from "@/components/modules/profile/ProfileComponent"

export default function AccountSettingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return  <ProfileComponent>{children}</ProfileComponent>
}

