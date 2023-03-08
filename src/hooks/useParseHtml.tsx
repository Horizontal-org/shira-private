const useParseHTML = (
    content: any
  ) => {
    const html = new DOMParser().parseFromString(content, 'text/html')
  
    const parseCustomElement = (customElement: string) => {
      const element = html.getElementById(customElement)
  
      return {
        textContent: element?.textContent || '',
        explanationPosition: element?.getAttribute('data-explanation') || null
      }
    }
  
    const parseContent = (): HTMLElement => html.querySelector('[id*="component-text"]')
  
    const parseDynamicContent = () => {
      const dynamicContent = html.getElementById("dynamic-content")

      const childNodes = Array.from(dynamicContent.childNodes).map((node: Element) =>{
        const type = node.getAttribute('id').includes('component-text')
        ? 'text' 
        :  'attachment'
        
        return {
          position: parseInt(node.getAttribute('id').split('-')[2]),
          type,
          content: type === 'text' ? node.innerHTML: node.outerHTML

        }
      });

      return childNodes
      
    }
  
    return {
      parseCustomElement,
      parseContent,
      parseDynamicContent
    }
  }
  
  export default useParseHTML