import type React from "react"
import ProfileMainLayout from "@/components/modules/profile/ProfileMainLayout"

export default function AccountSettingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return  <ProfileMainLayout>{children}</ProfileMainLayout>
}

