'use client'

import {Pages} from '@/constants/Pages'
import {GlobalNavigation, Icon, IGlobalNavigationItem, IGlobalNavigationLogo} from '@mparticle/aquarium'
// import {signOutGoogle} from '@/lib/actions'
import {signOut} from 'next-auth/react'
import {useRouter} from 'next/navigation'

export const AppNavigation = () => {
  const router = useRouter()

  const logo = {
    label: 'Key Change',
    icon: <Icon name="alicorn" size="xxl"/>,
    onSuiteLogoClick: goHome,
  } as IGlobalNavigationLogo


  const management = [
    {
      label: 'Settings',
      hideLabel: true,
      icon: <Icon name="gear" size="xl"/>,
      type: 'menu',
      isActive: false,
      children: [{
        label: 'Account Settings',
        // hrefOptions: { href: `#/account`, },
        // onClick: goToAccount,
      }],
    }
  ] as IGlobalNavigationItem[]

  const tools = [
    {
      label: 'Home',
      icon: <Icon name="grid" size="xl"/>,
      type: 'link',
      isActive: true,
      hrefOptions: { href: `#` },
    }
  ] as IGlobalNavigationItem[]

  return <>
    <GlobalNavigation
      logo={logo}
      tools={tools}
      management={[]/*management*/}
      onMpHomeClick={goHome}
      showSuiteLogo={true}
      navigationButtonItemOptions={{
        withoutContainer: true,
        label: 'Sign Out',
        onClick: signOut
      }}
    />
  </>

  function goHome(): void {
    router.push(`\\${Pages.Studio}`)
  }

}
