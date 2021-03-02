import initFakePartnerServerProxy from '@proxy/fakePartnerServerProxy'
const config = {
  // Since config-local-https is a special case for config-local,
  // so we have a getLocalConfig.js for easier config share
  BUGSNAG_API_KEY: 'b5c388a823d04c7c4ed0883973afbf9b',
  AUTH: {
    SUPPORTED_APP_VERSION: '>=3.15.0',
  },
  UPDATE_APP_LINK: {
    android: 'https://play.google.com/store/apps/details?id=com.hk01.news_app',
    ios: 'https://itunes.apple.com/us/app/香港01/id1084662006',
  },
  PUSHER: {
    KEY: '2d9fd43a98adadfc59d9',
    CLUSTER: 'ap1',
  },
  FAKE_PARTNER_SERVER_FE: {
    PROXY_URL: 'http://localhost:8080',
    APP_ID: 'e16f95856e310a634c33048fd80813d7',
    TIMEOUT: 20000,
  },
  DEFAULT_FAKE_PARTNERS: [
    {
      CLIENT_ID: 'ef1520f5-6ebf-4baa-ace7-8e0553023b56',
      DEFAULT_MERCHANT_ACCOUNT_ID: 'emmashop1',
    },
    {
      CLIENT_ID: 'c056a34c-adb3-42f0-a4a9-9cc80e1e45fb',
      DEFAULT_MERCHANT_ACCOUNT_ID: 'walletTestMerchant2',
    },
    {
      CLIENT_ID: '92644bb8-5e98-40ae-bfe0-19e01d258809',
      DEFAULT_MERCHANT_ACCOUNT_ID: 'walletTestMerchant3',
    },
  ],
  PROXY_URL: 'http://localhost:3001',
  TIMEOUT: 20000,
  WALLET_API: {
    // TODO: move this away from public
    SERVER_URL: 'https://wallet.hktester.com',
    TIMEOUT: 20000,
  },
  SSO: {
    APP_ID: '0f7890ecc1cb0b7f23336a3430df7127',
    BASE_API_URI: 'https://staging-sso.hk01pay.com/api/v1.0',
    REDIRECT_URL: `http://localhost:3001/login`,
    HOME_REDIRECT_URL: `http://localhost:3001/wallet/onboard`,
    USER_TRANSACTION: `http://localhost:3001/payment/transactions`,
  },
  TRACK: {
    PIWIK_ENDPOINT: 'https://track.hktester.com/v2/piwik.php',
    GA_ID: 'UA-70981149-42',
    SITE_ID: '5',
  },
  STRIPE: {
    PUBLIC_KEY: 'pk_test_sEEqhJZomQdurS6GzIOKDif2',
  },
  featureConfig: {
    enterPin: {
      featureToggle: true,
      toggleFeatureA: true,
      toggleFeatureB: false,
    },
    setPin: {
      featureToggle: true,
    },
    backNavigation: {
      featureToggle: false,
    },
  },
  payment: {
    minAmount: 4 * 100,
    maxAmount: 300000 * 100,
  },
  BindCard3DSVerifyReturnURL: `http://localhost:3001/payment/transition3DS`,
  BindCard3DSVerifyReturnURLWalletHome: `http://localhost:3001/wallet/transition3DS`,
}

export const fakePartnerServerProxy = initFakePartnerServerProxy(config)
