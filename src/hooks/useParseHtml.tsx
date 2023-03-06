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
  
    const parseDynamicContent = () => html.getElementById('dynamic-content')
  
    return {
      parseCustomElement,
      parseContent,
      parseDynamicContent
    }
  }
  
  export default useParseHTML