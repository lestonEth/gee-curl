import { Product, Transaction, StaffMember } from './types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Amber Glow Elixir',
    sku: 'RQ-20492',
    category: 'Skincare',
    price: 85.00,
    stock: 4,
    supplier: 'Gee Curly Essentials Co.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCs-z2JQVi9v7YUk7TD8-9VNGeafTnFw9WwYFiDnp8buCgfiXuikIoxPioPhridA4xHpOGNLdrsL1ZtTccfGqeDHi-zWzaJcz96VaEA43Jnie0li6rOBI6iyksVgMaOfxT87wmLkQoQTgJsfm46Z0zKiNKvlyJX7yfaprn9OA134gaqzNOI51biNq0H9UOcGwbWc7orm7NSiLnAoitE9z2rAfRdPUEBAm9l-4lls1Tm6IkJNmyHVz66VlV9UidvAIvryD2sTOxDSYHS'
  },
  {
    id: '2',
    name: 'Artisan Brush Set',
    sku: 'AB-11234',
    category: 'Gifts',
    price: 120.00,
    stock: 12,
    supplier: 'Artisan Crafted',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLzYViPbYLEVgW0ytgCh6qoThJWs2oqkC7F2dykaUgMA9v-HP6nNrg7lo1tN_Y89D73VEyyfP0snaX3H0ez-wMsGmHArn43wYKBocU0pI0AnL_YjnCRnLC8u3RwqLNYNKjICM852ivD_JWx1pJXVKKMaMAzPj2zWzzgH1VFRywr7iCUSFgRhIvbO9ninr8bvF10sNQk9SOevLW0lTdihTd7diTnJ_ejpiKBMOp_0jYxeCMEbZ9bNl5fbo22Rhrvd8Hk-w61F59E88v'
  },
  {
    id: '3',
    name: 'Hydra-Silk Cream',
    sku: 'HS-88210',
    category: 'Skincare',
    price: 64.00,
    stock: 2,
    supplier: 'Gee Curly Essentials Co.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmGXy_Sp4Jzut6JJpU3WCyy7EnTUi5M3-wMTXs01527jYUSMTeU8xZMVie4t1EVj7kut3eSdndpVAyPwpzxgjdCf_hCuglh8n9bECmSL2cdDQD4x5GFlEdmlSjDsRzoixPQAiCnAPDTANPTQlZ8XaN13cTiEcQqfomsq0wrj88FVY9war65BX4fgBbNH-wcdBCIPX4Eks5xpSiT25V7_9AQ4D3iyzNx2zst9MXLWWWtOLk2TaG4bWE-G6XxnyuTIn0b_hX8hR8nsnZ'
  },
  {
    id: '4',
    name: 'Noir Rose Parfum',
    sku: 'NR-77219',
    category: 'Fragrance',
    price: 145.00,
    stock: 8,
    supplier: 'Parisian Scents',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3gDg3hZcR2G6zIag-Zoph4yA0iEDMpdMWQSzJYzAU7EO38__D9EDHjFKTM4ep4aVt-_LSskS_IrKusZFXbVoUyKWFYACqMpcG9cNo7LijYRJj8vG6SmvIyyx4oSHmfEzKitqZctdouGZBaBhaW8q4lhmyr0Zssx8V_UDk-R4Hc6O9yZUKb-V2rM5sLmFj61tJLUJe6P2QITKImNG3qup2yz1HwMJdToC3K1DvN4jGBoRy2PyQG3kOBcLbwV_ZQFx86IHK0h-7yaP2'
  },
  {
    id: '5',
    name: 'Botanic Cleanse',
    sku: 'BC-99102',
    category: 'Skincare',
    price: 42.00,
    stock: 15,
    supplier: 'Pure Botanicals Ltd.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_VmXobFBuf4uL9rVclWMCqJfwLiVZ9CimOw2zvwA9GDEVhecwyBWMq6Dy_NyIRrdQS34KneKG9-P6ogWJ6Dk_vJ_25NeSbyhDpgSab49rNYf9Gcf8nqHDAnQvfCV0NY2w82gYbXBudQPsCn6Vafsr3Qyr2X_DkVfd6BeBqA75pu4Ujpz2eeH4eoriYr4N9ycOBGXjDZlTJ9jeaHSbkDXE6MPXI2LD6rwEvr0vlIS3j4gPVJmUaspK5zHDCn_9mlfvLxfGJI_OBka5'
  },
  {
    id: '6',
    name: 'Zen Clay Ritual',
    sku: 'ZC-11002',
    category: 'Skincare',
    price: 55.00,
    stock: 0,
    supplier: 'Gee Curly Essentials Co.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeQdmP-zQ3u7wBmFhwzS4sxL1kthTfwCaH9XqyLYOvaO9ZqAfg28uluFqPQp8Pm8JjOE5C6iehje-WhEskfmK3RWisrdzIMKwK3QMeLFQKsWINYKd-k2hqPejnOW76wE8x2SI5KsoxRomrp0t0BocMptx_j_kDqQ436YS3O3sLTeEISJ70yP6pRS76tzuM7bu4XBmxiZgKi3c6qk47T-F2JjuUBifNGd0f4_tdPuHaL1pJUkKlFZbHJyMhnxG4-TRhJDS8RViPK91Y'
  }
];

export const transactions: Transaction[] = [
  { id: '#9421', date: 'Oct 28, 2023', description: 'Sale: Order #9421', employee: 'Elena M.', method: 'Credit Card', amount: 245.00, type: 'sale', status: 'completed' },
  { id: '#9422', date: 'Oct 27, 2023', description: 'Restock: Vitamin C Serum', employee: 'James A.', method: 'Bank Transfer', amount: 1420.00, type: 'restock', status: 'completed' },
  { id: '#9418', date: 'Oct 27, 2023', description: 'Sale: Order #9418', employee: 'Sarah C.', method: 'Apple Pay', amount: 85.00, type: 'sale', status: 'completed' },
  { id: '#9419', date: 'Oct 25, 2023', description: 'Expense: Utility Bill', employee: 'Office', method: 'Auto-Debit', amount: 342.12, type: 'expense', status: 'completed' },
  { id: '#9399', date: 'Oct 24, 2023', description: 'Sale: Order #9399', employee: 'Elena M.', method: 'Cash', amount: 120.00, type: 'sale', status: 'completed' }
];

export const staff: StaffMember[] = [
  { id: '1', name: 'Elena Vance', email: 'elena.v@geecurly.com', role: 'Senior Stylist', monthlySales: 12450, satisfaction: 4.9, status: 'active', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_R4QQNgFQ8_kMmAIMti-68dv-n7qjrU2amkb5JqCabBx5bCLTDCEOKIydOYORDPyTIFeAYiegJz37nhDV_gcfZsTg5iQLGXpynwp0GcWUUmr3G8Mdf0Mq0O02Rj2eEgW1W-NLYVOooGQ6dF9yWlrd5enKm91sE3gqTac4U5BfGBSlt2Llh6lfpD3rwYNf1jJ31Z5AUs1P7WqBh4X7zRPhel55GhBygTz9iV9evFrhl87vsVWCzl_UFLZhaGjGUphkrFz4-sBuVscn' },
  { id: '2', name: 'Marcus Thorne', email: 'marcus.t@geecurly.com', role: 'Manager', monthlySales: 8200, satisfaction: 4.7, status: 'active', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD52c4BNnjO3L-Fx1bGso_eoelzp8hoVaobvtGUfZgFds1kTt3QuXl9G_B8J6wMBXvyGPYUegmQMPuzeYFSSXK22i_ssRBG994vIFVZYPQ8FsOWZ0TnncKIwnB84t_pE2sccZAPW5YRLPC61FAtRKfSW1trg6WV3Eu1sc-pP1VyoDrR9uy8RB5osSPfMVW272XGEuX9TMeG4toNxeEfKRXSyw6_PZv1E7LY1RWH_GPWmKE15PM48Wl6u32bUI9DRRMPunTRaa2C291K' },
  { id: '3', name: 'Sloane Kim', email: 'sloane.k@geecurly.com', role: 'Junior Associate', monthlySales: 5120, satisfaction: 4.8, status: 'off-duty', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHAqopAhWk5grKrst4MBW77JveyTLI7RU0qTuMYuABHyiuux3f_AMOlKIzQZKmrAGjxVclF_Q7aLSufogOM0rmY9onFi3AwPAZtk1x_fLgzJdhRapY58sa1rHd-gd_9c9NjFIEJ2VDxRkShxwBiOmDNiajsocV0FgioBtsj_C76EJ-7fOdLNHer64coIYahvQi87y1Hwug4bZw7x-DnColYfCVV0CcK1Br__0B6ZVc1kxbIRuZAXyh2KkkRkf5KgpntgQeyJMrs_Kw' }
];

export const salesTrends = [
  { name: 'Mon', value: 3200 },
  { name: 'Tue', value: 4500 },
  { name: 'Wed', value: 2800 },
  { name: 'Thu', value: 5200 },
  { name: 'Fri', value: 4800 },
  { name: 'Sat', value: 6500 },
  { name: 'Sun', value: 3900 },
];

export const categoryDistribution = [
  { name: 'Skincare', value: 45, color: '#7d562d' },
  { name: 'Haircare', value: 35, color: '#f9d8d8' },
  { name: 'Cosmetics', value: 20, color: '#e3e2e0' },
];
