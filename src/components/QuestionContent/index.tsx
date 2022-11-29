import { cp } from 'fs';
import { cloneElement, FunctionComponent, ReactElement, ReactNode, SetStateAction, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from 'styled-components'
import shallow from 'zustand/shallow';
import { useStore } from '../../store';

import { AddComponent } from '../AddComponent'
import { Attachment } from '../DynamicComponents/Attachment';
import { TextEditor } from '../DynamicComponents/TextEditor'
import { DragItem } from './components/DragItem';

interface Props {
  appType: string;
}

interface Component {
  node: ReactElement
  type: string
  position: number
}

const componentsList = [
  {
    type: 'text',
    node: (<TextEditor />),
    position: 0
  },
  {
    type: 'attachment',
    node: (<Attachment />),
    position: 0
  }
]

const componentOptions = (type) => {  
  if (type === 'email') {
    return [
      {
        id: 'text',
        label: 'Body (max 1)',
        limit: 1
      },
      {
        id: 'attachment',
        label: 'Attachment (max 5)',
        limit: 5
      }
    ]
  }

  if (type === 'messaging') {
    return [
      {
        id: 'text',
        label: 'Message (max 5)',
        limit: 5
      },
      {
        id: 'attachment',
        label: 'Attachment (max 5)',
        limit: 5
      }
    ]
  }

  return []
}

const reorder = (list, startIndex, endIndex) => {
  const result: Component[] = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const validate = (appType, componentType, comps) => {
  const appLimits = componentOptions(appType)
  const componentLimits = appLimits.find((appL) => appL.id === componentType)

  return comps.filter((c) => c.type === componentLimits.id).length < componentLimits.limit
}

export const QuestionContent: FunctionComponent<Props> = ({
  appType
}) => {

  const {
    lastIndex, 
    setLastIndex ,
    deleteExplanations,
    deleteContent
  } = useStore((state) => ({
    lastIndex: state.lastIndex,
    setLastIndex: state.setLastIndex,
    deleteExplanations: state.deleteExplanations,
    deleteContent: state.deleteContent
  }), shallow)

  const [components, handleComponents] = useState<Component[]>([
    {
      node: (<TextEditor/>),
      type: 'text',
      position: lastIndex
    },
  ]) 


  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items: Component[] = reorder(
      components,
      result.source.index,
      result.destination.index
    );

    handleComponents(items)
  }

  
  return (
    <>
      <DynamicContent>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='droppable'>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
              >          
                { components.map(((c, i) => (
                  <DragItem 
                    key={c.position + ''} 
                    id={c.position + ''}   
                    index={i}  
                    component={cloneElement(c.node, { componentId: c.position, componentPosition: i })}
                    onDelete={() => {                       
                      deleteExplanations(c.position, c.type)
                      deleteContent(`component-${c.type}-${c.position}`)
                      const newComponents = components.filter(cf => cf.position !== c.position)
                      handleComponents([...newComponents])
                    }}
                  />
                ))) }
                { provided.placeholder }
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </DynamicContent>
      <AddComponent
        type={appType}        
        componentOptions={componentOptions}
        addComponent={(componentType) => {
          if (validate(appType, componentType, components)) {
            const newComponents = [...components]
            const newIndex = lastIndex + 1
  
            let findComponent = {
              ...componentsList.find((c) => c.type === componentType),
              position: newIndex,
            }
  
            setLastIndex(newIndex)
            newComponents.push(findComponent)
            handleComponents(newComponents)
          }          
        }} 
      />
    </>
  )
}

const DynamicContent = styled.div`
  padding-bottom: 8px;
`

const Content = styled.div``
