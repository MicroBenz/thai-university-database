# Thai University Database

ฐานข้อมูลรายชื่อมหาวิทยาลัยในประเทศไทย อ้างอิงข้อมูลจาก [Wikipedia](https://th.wikipedia.org/wiki/%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%AA%E0%B8%96%E0%B8%B2%E0%B8%9A%E0%B8%B1%E0%B8%99%E0%B8%AD%E0%B8%B8%E0%B8%94%E0%B8%A1%E0%B8%A8%E0%B8%B6%E0%B8%81%E0%B8%A9%E0%B8%B2%E0%B9%83%E0%B8%99%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%97%E0%B8%A8%E0%B9%84%E0%B8%97%E0%B8%A2)

# ไฟล์ json  
- `universities.json` (~33KB)
- `universities-pretty.json` (~41KB) เป็น version format JSON สวยๆงามๆ

## วิธีใช้ (แบบง่าย)

เพียงแค่โหลดไฟล์ `universities.json` ในโฟลเดอร์ `dist` นำไปใช้ได้เลย!

## วิธีใช้ (แบบยากหน่อย)

ใน repo นี้มี source code ที่ใช้ในการ scrap ข้อมูลจาก wikipedia เขียนโดยใช้ภาษา JavaScript รันบน Node.js v8 โดยใช้ [puppeteer](https://github.com/GoogleChrome/puppeteer) ในการทำ browser automation และใช้ [cheerio](https://github.com/cheeriojs/cheerio) ช่วยในการอ่าน DOM Tree

โดยคุณสามารถนำ source code ไปรันเองได้เลย **โดยต้องการแค่ Node.js เวอร์ชั่นที่รองรับ async/await (v7.7.1 เป็นต้นไป)** เท่านั้น

หลังจากมี Node.js แล้ว ให้ทำการติดตั้ง dependencies
```
npm install
```

รัน script
```
npm run start
```

ผลลัพธ์จะอยู่ในโฟลเดอร์ `dist`

## universities_with_mua.json

บางมหาวิทยาลัยที่ไม่มีข้อมูลใน Wikipedia แต่มีในรายการของ [สกอ.](http://www.mua.go.th/) ข้อมูลเหล่านี้จะไม่ระบุรหัสของมหาวิทยาลัยเป็นภาษาอังกฤษ (field `enCode`)

ท่านสามารถใช้ไฟล์ `universities_with_mua.json` ได้เลย หรือหากท่านต้องการปรับปรุงข้อมูลในไฟล์นั้น ให้ท่าน download ไฟล์ [สถาบันอุดมศึกษาในสังกัด ในเว็บไซต์ สกอ.](http://www.mua.go.th/Department.html) ลงใน directory นี้ แล้วสั่ง

```
node read_mua.js
```

เพื่อสั่งสร้างใหม่ได้

## TODO
- [x] ไฟล์ database แบบ JSON
- [ ] ไฟล์ database แบบ CSV
- [x] ลองใช้ datasource จากที่อื่นนอกจาก wikipedia
