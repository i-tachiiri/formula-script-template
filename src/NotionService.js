class NotionService {
  constructor() {
    const credentials = KeyVault.getNotionCredentials();
    this.apiToken = credentials.token;
    this.apiVersion = credentials.version;
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
  
  updatePageProperty(pageId, propertyName, value) {
    try {
      console.log(`Updating property ${propertyName} on page ${pageId} with value: ${value}`);
      
      const url = `${this.baseUrl}/pages/${pageId}`;
      const payload = {
        properties: {}
      };
      
      // URLプロパティの場合
      if (propertyName === 'QuizScriptUrl') {
        payload.properties[propertyName] = { url: value };
      } else {
        // 他のプロパティタイプにも対応可能
        payload.properties[propertyName] = { url: value };
      }
      
      const options = {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
          'Notion-Version': this.apiVersion,
          'Content-Type': 'application/json'
        },
        payload: JSON.stringify(payload)
      };
      
      const response = UrlFetchApp.fetch(url, options);
      const data = JSON.parse(response.getContentText());
      
      if (response.getResponseCode() !== 200) {
        throw new Error(`Notion API error: ${data.message}`);
      }
      
      console.log(`✅ Successfully updated ${propertyName} on page ${pageId}`);
      return data;
      
    } catch (error) {
      console.error(`❌ Error updating Notion page property: ${error}`);
      throw error;
    }
  }
  
  updateNotionWithScriptUrl(pageId) {
    try {
      const scriptId = ScriptApp.getScriptId();
      const scriptUrl = `https://script.google.com/d/${scriptId}/edit`;
      
      console.log(`🔄 Updating Notion with Script URL: ${scriptUrl}`);
      
      this.updatePageProperty(pageId, 'QuizScriptUrl', scriptUrl);
      
      console.log('✅ Notion QuizScriptUrl updated successfully');
      return scriptUrl;
      
    } catch (error) {
      console.error('❌ Failed to update Notion with script URL:', error);
      throw error;
    }
  }
}