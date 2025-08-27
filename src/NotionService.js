class NotionService {
  constructor() {
    const credentials = KeyVault.getNotionCredentials();
    this.apiToken = credentials.token;
    this.apiVersion = credentials.apiVersion;
    this.baseUrl = credentials.baseUrl;
  }
  
  getPageProperty(pageId, propertyName) {
    try {
      console.log(`Getting property ${propertyName} from page ${pageId}`);
      
      const url = `${this.baseUrl}/pages/${pageId}`;
      const options = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
          'Notion-Version': this.apiVersion,
          'Content-Type': 'application/json'
        }
      };
      
      const response = UrlFetchApp.fetch(url, options);
      const data = JSON.parse(response.getContentText());
      
      if (response.getResponseCode() !== 200) {
        throw new Error(`Notion API error: ${data.message}`);
      }
      
      const property = data.properties[propertyName];
      if (!property) {
        throw new Error(`Property ${propertyName} not found on page`);
      }
      
      let value = null;
      switch (property.type) {
        case 'url':
          value = property.url;
          break;
        case 'rich_text':
          value = property.rich_text.map(text => text.plain_text).join('');
          break;
        case 'title':
          value = property.title.map(text => text.plain_text).join('');
          break;
        default:
          console.log(`Unsupported property type: ${property.type}`);
          value = property;
      }
      
      console.log(`Retrieved property value: ${value}`);
      return value;
      
    } catch (error) {
      console.error(`Error getting Notion page property: ${error}`);
      throw error;
    }
  }
  
  getQuestionSheetUrl(pageId) {
    return this.getPageProperty(pageId, 'QuestionSheetUrl');
  }
}