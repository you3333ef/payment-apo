# تعليمات النشر - إصلاح روابط الشحن

## المشكلة المكتشفة:
الموقع الحالي `https://6902604640073723a59ec97f--dynamic-sunflower-49efe2.netlify.app` غير مربوط بمستودع GitHub.

## الإصلاحات المطبقة:

### 1. ملف `public/_redirects`:
```
/r/:country/shipping/:id  /.netlify/functions/microsite-meta?path=/r/:country/shipping/:id  200
/r/:country/chalet/:id  /.netlify/functions/microsite-meta?path=/r/:country/chalet/:id  200
/pay/:id/*  /.netlify/functions/microsite-meta?path=/pay/:id  200
```

### 2. ملف `netlify.toml`:
```toml
[[redirects]]
  from = "/r/:country/shipping/:id"
  to = "/.netlify/functions/microsite-meta?path=/r/:country/shipping/:id"
  status = 200
  force = true
```

### 3. وظيفة `microsite-meta.js`:
- تحافظ على معاملات الاستعلام
- تمرر `?service=kwpost` إلى صفحة الدفع

## لكى تعمل الإصلاحات:

### الخيار 1: ربط الموقع الموجود:
1. اذهب إلى [Netlify Dashboard](https://app.netlify.com)
2. اختر الموقع `dynamic-sunflower-49efe2`
3. اذهب إلى `Site settings > Build & deploy`
4. اختر `Link repository`
5. اختر `you3333ef/payment-apo`
6. احفظ الإعدادات

### الخيار 2: نشر يدوي:
```bash
# بعد ربط الموقع
git push origin main
# سيتم النشر تلقائياً
```

## الرابط المطلوب:
```
https://6902604640073723a59ec97f--dynamic-sunflower-49efe2.netlify.app/r/KW/shipping/00000000-6e19-4ab4-8000-00001f14e590?service=kwpost
```

سيعمل الرابط فور ربط الموقع بمستودع GitHub. ✅
