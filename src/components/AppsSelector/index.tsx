import React, { FunctionComponent, useEffect, useState } from 'react'
import styled from 'styled-components'
import shallow from 'zustand/shallow'
import { useStore } from '../../store'
import { AppItem } from '../AppItem'

interface Props {}

export const AppsSelector:FunctionComponent<Props> = () => {

  const {
    apps,
    fetchApp,
    setSelectedApps
  } = useStore((state) => ({
    apps: state.apps,
    fetchApp: state.fetchApp,
    setSelectedApps: state.setSelectedApps
  }), shallow)
  const [selected, handleSelected] = useState([])

  useEffect(() => {
    fetchApp()
  }, [])

  useEffect(() => {
    setSelectedApps(selected)
  }, [selected])

  return (
    <Wrapper>
      { apps.map((a) => (
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