import React, { FunctionComponent, useEffect, useState } from 'react'
import styled from 'styled-components'
import shallow from 'zustand/shallow'
import { useStore } from '../../store'
import { AppItem } from '../AppItem'
import { App } from '../../fetch/app'

interface Props {
  type: string
  savedSelectedApps?: App[]
}

export const AppsSelector:FunctionComponent<Props> = ({ type, savedSelectedApps }) => {

  const {
    apps,
    fetchApp,
    setSelectedApps,
    selectedApps
  } = useStore((state) => ({
    apps: state.apps,
    fetchApp: state.fetchApp,
    setSelectedApps: state.setSelectedApps,
    selectedApps: state.selectedApps
  }), shallow)
  const [selected, handleSelected] = useState([])

  useEffect(() => {
    if(savedSelectedApps) {
      const apps = savedSelectedApps.map((app: App) => app.id)
      setSelectedApps(apps)
      handleSelected(apps)
    }
    fetchApp()
  }, [])

  useEffect(() => {
    setSelectedApps(selected)
  }, [selected])

  useEffect(() => {
    if (JSON.stringify(selected) !== JSON.stringify(selectedApps)) {
      handleSelected([...selectedApps])
    }
  }, [selectedApps])

  return (
    <Wrapper>
      { apps.filter(a => a.type === type ).map((a) => (
        <AppsWrapper key={a.id}>
          <AppItem           
            label={a.name}
            onClick={() => {
              if (selected.includes(a.id)) {
                handleSelected(
                  selected.filter(ai => ai !== a.id)
                )
              } else {
                handleSelected([
                  ...selected,
                  a.id
                ])
              }
            }}
            selected={selected.includes(a.id)}
          />
        </AppsWrapper>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
`

const AppsWrapper = styled.div`
  padding-right: 12px;
`