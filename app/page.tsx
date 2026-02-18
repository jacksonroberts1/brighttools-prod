'use client'

import DesktopHome from '@/components/DesktopHome'
import MobileHome from '@/components/MobileHome'

export default function Home() {
  return (
    <>
      <div className="hidden md:block">
        <DesktopHome />
      </div>
      <div className="block md:hidden">
        <MobileHome />
      </div>
    </>
  )
}
