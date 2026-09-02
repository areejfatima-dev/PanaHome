export const CONSTANTS = {
  APP_NAME: 'PanaHome',
  APP_VERSION: '1.0.0',
  API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL || 'https://api.pana-home.com',
  SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
  WALKTHROUGH_PHOTO_COUNT: 6,
  MAX_IMAGE_SIZE_MB: 10,
  SUPPORTED_IMAGE_FORMATS: ['jpg', 'jpeg', 'png'],
  AR_MODEL_FORMATS: ['glb', 'gltf'],
  DEFAULT_PAGE_SIZE: 20,
} as const;

export const ROUTES = {
  AUTH: {
    LOGIN: '/(auth)/login',
    SIGNUP: '/(auth)/signup',
    FORGOT_PASSWORD: '/(auth)/forgot-password',
  },
  BUYER: {
    HOME: '/(buyer)/home',
    FAVORITES: '/(buyer)/favorites',
    HISTORY: '/(buyer)/history',
    SCHEDULE_APPOINTMENT: '/(buyer)/schedule-appointment',
    COMPLAINT_CENTRE: '/(buyer)/complaint-centre',
    AR_WALKTHROUGH: '/(buyer)/ar-walkthrough',
    AR_FURNITURE_PLACEMENT: '/(buyer)/ar-furniture-placement',
  },
  SELLER: {
    DASHBOARD: '/(seller)/dashboard',
    EDIT_PROPERTY: '/(seller)/edit-property',
    ANALYTICS: '/(seller)/analytics',
    AVAILABILITY_SETTINGS: '/(seller)/availability-settings',
    CAPTURE_CHECKLIST: '/(seller)/capture-checklist',
    AR_CAPTURE: '/(seller)/ar-capture',
    ADD_PROPERTY: {
      STEP_1: '/(seller)/add-property/step-1-basic',
      STEP_2: '/(seller)/add-property/step-2-rooms',
      STEP_3: '/(seller)/add-property/step-3-capture',
      STEP_4: '/(seller)/add-property/step-4-location',
      STEP_5: '/(seller)/add-property/step-5-review',
    },
  },
  ADMIN: {
    DASHBOARD: '/(admin)/dashboard',
    PROPERTY_APPROVALS: '/(admin)/property-approvals',
    USER_MANAGEMENT: '/(admin)/user-management',
    COMPLAINT_MANAGEMENT: '/(admin)/complaint-management',
  },
} as const;