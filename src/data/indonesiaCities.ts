// List of Indonesian cities with their coordinates
export interface City {
  name: string;
  province: string;
  coordinates: [number, number];
  tier: 'primary' | 'secondary' | 'tertiary';
}

export const indonesianCities: City[] = [
  // === SUMATRA ===
  // North Sumatra
  { name: "Medan", province: "North Sumatra", coordinates: [3.5952, 98.6722], tier: "primary" },
  { name: "Binjai", province: "North Sumatra", coordinates: [3.5987, 98.4851], tier: "secondary" },
  { name: "Pematangsiantar", province: "North Sumatra", coordinates: [2.9570, 99.0681], tier: "secondary" },
  { name: "Tebing Tinggi", province: "North Sumatra", coordinates: [3.3271, 99.1567], tier: "tertiary" },
  { name: "Tanjung Balai", province: "North Sumatra", coordinates: [2.9668, 99.7995], tier: "tertiary" },
  
  // West Sumatra
  { name: "Padang", province: "West Sumatra", coordinates: [-0.9471, 100.4172], tier: "primary" },
  { name: "Bukittinggi", province: "West Sumatra", coordinates: [-0.3055, 100.3693], tier: "secondary" },
  { name: "Payakumbuh", province: "West Sumatra", coordinates: [-0.2298, 100.6309], tier: "tertiary" },
  { name: "Padang Panjang", province: "West Sumatra", coordinates: [-0.4661, 100.3996], tier: "tertiary" },
  
  // South Sumatra
  { name: "Palembang", province: "South Sumatra", coordinates: [-2.9761, 104.7754], tier: "primary" },
  { name: "Lubuklinggau", province: "South Sumatra", coordinates: [-3.2967, 102.8617], tier: "secondary" },
  { name: "Prabumulih", province: "South Sumatra", coordinates: [-3.4213, 104.2350], tier: "tertiary" },
  
  // Riau
  { name: "Pekanbaru", province: "Riau", coordinates: [0.5103, 101.4478], tier: "primary" },
  { name: "Dumai", province: "Riau", coordinates: [1.6666, 101.4001], tier: "secondary" },
  
  // Lampung
  { name: "Bandar Lampung", province: "Lampung", coordinates: [-5.3971, 105.2668], tier: "primary" },
  { name: "Metro", province: "Lampung", coordinates: [-5.1178, 105.3072], tier: "secondary" },

  // === JAVA ===
  // DKI Jakarta
  { name: "Jakarta", province: "DKI Jakarta", coordinates: [-6.2088, 106.8456], tier: "primary" },
  
  // West Java
  { name: "Bandung", province: "West Java", coordinates: [-6.9175, 107.6191], tier: "primary" },
  { name: "Bekasi", province: "West Java", coordinates: [-6.2349, 106.9896], tier: "primary" },
  { name: "Bogor", province: "West Java", coordinates: [-6.5971, 106.8060], tier: "primary" },
  { name: "Depok", province: "West Java", coordinates: [-6.4025, 106.7942], tier: "primary" },
  { name: "Cirebon", province: "West Java", coordinates: [-6.7320, 108.5523], tier: "secondary" },
  { name: "Sukabumi", province: "West Java", coordinates: [-6.9277, 106.9300], tier: "secondary" },
  { name: "Tasikmalaya", province: "West Java", coordinates: [-7.3274, 108.2207], tier: "secondary" },
  { name: "Garut", province: "West Java", coordinates: [-7.2161, 107.9090], tier: "tertiary" },
  { name: "Cianjur", province: "West Java", coordinates: [-6.8182, 107.1450], tier: "tertiary" },
  
  // Central Java
  { name: "Semarang", province: "Central Java", coordinates: [-6.9932, 110.4203], tier: "primary" },
  { name: "Surakarta", province: "Central Java", coordinates: [-7.5755, 110.8243], tier: "secondary" },
  { name: "Pekalongan", province: "Central Java", coordinates: [-6.8886, 109.6753], tier: "secondary" },
  { name: "Tegal", province: "Central Java", coordinates: [-6.8797, 109.1256], tier: "secondary" },
  { name: "Magelang", province: "Central Java", coordinates: [-7.4797, 110.2177], tier: "tertiary" },
  { name: "Salatiga", province: "Central Java", coordinates: [-7.3305, 110.5084], tier: "tertiary" },
  
  // East Java
  { name: "Surabaya", province: "East Java", coordinates: [-7.2575, 112.7521], tier: "primary" },
  { name: "Malang", province: "East Java", coordinates: [-7.9797, 112.6304], tier: "primary" },
  { name: "Kediri", province: "East Java", coordinates: [-7.8480, 112.0178], tier: "secondary" },
  { name: "Madiun", province: "East Java", coordinates: [-7.6298, 111.5300], tier: "secondary" },
  { name: "Probolinggo", province: "East Java", coordinates: [-7.7543, 113.2159], tier: "secondary" },
  { name: "Pasuruan", province: "East Java", coordinates: [-7.6469, 112.9063], tier: "tertiary" },
  { name: "Mojokerto", province: "East Java", coordinates: [-7.4704, 112.4401], tier: "tertiary" },
  
  // Yogyakarta
  { name: "Yogyakarta", province: "DI Yogyakarta", coordinates: [-7.7956, 110.3695], tier: "primary" },
  
  // === SULAWESI ===
  // South Sulawesi
  { name: "Makassar", province: "South Sulawesi", coordinates: [-5.1477, 119.4327], tier: "primary" },
  { name: "Pare-Pare", province: "South Sulawesi", coordinates: [-4.0135, 119.6269], tier: "secondary" },
  { name: "Palopo", province: "South Sulawesi", coordinates: [-2.9925, 120.1972], tier: "tertiary" },
  
  // North Sulawesi
  { name: "Manado", province: "North Sulawesi", coordinates: [1.4748, 124.8421], tier: "primary" },
  { name: "Bitung", province: "North Sulawesi", coordinates: [1.4404, 125.1217], tier: "secondary" },
  { name: "Tomohon", province: "North Sulawesi", coordinates: [1.3230, 124.8405], tier: "tertiary" },
  
  // Central Sulawesi
  { name: "Palu", province: "Central Sulawesi", coordinates: [-0.9003, 119.8779], tier: "primary" },
  { name: "Luwuk", province: "Central Sulawesi", coordinates: [-0.9391, 122.7886], tier: "secondary" },
  
  // Southeast Sulawesi
  { name: "Kendari", province: "Southeast Sulawesi", coordinates: [-3.9985, 122.5127], tier: "primary" },
  { name: "Baubau", province: "Southeast Sulawesi", coordinates: [-5.4718, 122.6163], tier: "secondary" }
];