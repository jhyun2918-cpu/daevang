import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { sendAlimtalk } from './services/alimtalk';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const dataFilePath = path.join(__dirname, '../properties.json');

// Ensure the JSON file exists
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, JSON.stringify([]), 'utf8');
}

// POST endpoint for property registration
app.post('/api/properties', (req, res) => {
  try {
    const { name, phone, propertyType, transactionType, address, price, details } = req.body;

    // Read existing data
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    const properties = JSON.parse(fileData);

    // Add new property with timestamp and ID
    const newProperty = {
      id: Date.now().toString(),
      name,
      phone,
      propertyType,
      transactionType,
      address,
      price,
      details,
      createdAt: new Date().toISOString(),
    };

    properties.push(newProperty);

    // Save back to file
    fs.writeFileSync(dataFilePath, JSON.stringify(properties, null, 2), 'utf8');

    console.log(`[접수 완료] ${name} (${phone}) - ${propertyType} / ${transactionType}`);
    
    // 카카오 알림톡(Solapi) 발송 호출 - 비동기로 호출되어 메인 로직 속도를 늦추지 않습니다.
    sendAlimtalk({
      name,
      phone,
      propertyType,
      transactionType,
      address,
      price,
      details
    });

    res.status(201).json({ message: '매물 접수가 완료되었습니다.', property: newProperty });
  } catch (error) {
    console.error('Error saving property:', error);
    res.status(500).json({ message: '서버 에러가 발생했습니다.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
