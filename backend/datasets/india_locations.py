"""
Comprehensive Database of Indian States, Union Territories, and Constituencies/Districts.
Enables Pan-India location-based meteorological forecasting.
"""

INDIA_LOCATIONS = {
    "Telangana": [
        "Hyderabad", "Secunderabad", "Malkajgiri", "Chevella", "Medak",
        "Rangareddy", "Warangal", "Nizamabad", "Karimnagar", "Khammam",
        "Mahbubnagar", "Nalgonda", "Adilabad", "Zahirabad", "Peddapalle",
        "Bhongir", "Mahabubabad", "Nagarkurnool"
    ],
    "Andhra Pradesh": [
        "Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Kurnool",
        "Nellore", "Kadapa", "Kakinada", "Rajahmundry", "Anantapur",
        "Chittoor", "Srikakulam", "Vizianagaram", "Eluru", "Machilipatnam",
        "Ongole", "Nandyal", "Hindupur", "Amalapuram", "Narasaraopet", "Bapatla"
    ],
    "Maharashtra": [
        "Mumbai City", "Mumbai Suburban", "Pune", "Nagpur", "Thane",
        "Nashik", "Aurangabad", "Kolhapur", "Solapur", "Amravati",
        "Nanded", "Jalgaon", "Akola", "Latur", "Dhule", "Ahmednagar",
        "Chandrapur", "Raigad", "Satara", "Ratnagiri", "Sindhudurg",
        "Bhandara", "Gondia", "Yavatmal", "Washim", "Jalna", "Beed", "Sangli"
    ],
    "Karnataka": [
        "Bengaluru Urban", "Bengaluru Rural", "Bengaluru South", "Bengaluru Central",
        "Bengaluru North", "Mysuru", "Mangaluru (Dakshina Kannada)", "Hubballi-Dharwad",
        "Belagavi", "Kalaburagi", "Ballari", "Shivamogga", "Tumakuru", "Davanagere",
        "Udupi Chikmagalur", "Hassan", "Mandya", "Chikkaballapur", "Kolar",
        "Uttara Kannada", "Bagalkot", "Vijayapura", "Raichur", "Bidar"
    ],
    "Tamil Nadu": [
        "Chennai North", "Chennai South", "Chennai Central", "Coimbatore",
        "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Tiruppur",
        "Erode", "Vellore", "Thoothukkudi", "Dindigul", "Thanjavur",
        "Kanyakumari", "Kanchipuram", "Sriperumbudur", "Dharmapuri", "Krishnagiri",
        "Viluppuram", "Namakkal", "Cuddalore", "Sivaganga", "Ramanathapuram", "Tenkasi"
    ],
    "Delhi (NCT)": [
        "New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi",
        "North East Delhi", "North West Delhi", "Chandni Chowk"
    ],
    "Gujarat": [
        "Ahmedabad East", "Ahmedabad West", "Surat", "Vadodara", "Rajkot",
        "Bhavnagar", "Jamnagar", "Gandhinagar", "Junagadh", "Anand",
        "Bharuch", "Mehsana", "Kutch", "Banaskantha", "Patan", "Dahod", "Kheda", "Navsari", "Valsad"
    ],
    "Rajasthan": [
        "Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur",
        "Bhilwara", "Alwar", "Sikar", "Bharatpur", "Pali", "Sri Ganganagar",
        "Barmer", "Jaisalmer", "Nagaur", "Jhunjhunu", "Churu", "Dausa", "Chittorgarh"
    ],
    "Uttar Pradesh": [
        "Lucknow", "Varanasi", "Kanpur", "Agra", "Prayagraj", "Noida (GB Nagar)",
        "Ghaziabad", "Meerut", "Bareilly", "Aligarh", "Moradabad", "Saharanpur",
        "Gorakhpur", "Ayodhya", "Jhansi", "Mathura", "Muzaffarnagar", "Rampur",
        "Rae Bareli", "Amethi", "Sultanpur", "Gonda", "Basti", "Azamgarh", "Mirzapur"
    ],
    "West Bengal": [
        "Kolkata North", "Kolkata South", "Howrah", "Darjeeling", "Siliguri",
        "Asansol", "Durgapur", "Burdwan", "Jalpaiguri", "Malda", "Murshidabad",
        "Hooghly", "North 24 Parganas", "South 24 Parganas", "Bankura", "Midnapore"
    ],
    "Kerala": [
        "Thiruvananthapuram", "Kochi (Ernakulam)", "Kozhikode", "Thrissur",
        "Kollam", "Palakkad", "Alappuzha", "Kannur", "Kottayam", "Malappuram",
        "Wayanad", "Idukki", "Pathanamthitta", "Kasaragod"
    ],
    "Punjab": [
        "Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Bathinda",
        "Hoshiarpur", "Gurdaspur", "Firozpur", "Faridkot", "Sangrur"
    ],
    "Haryana": [
        "Gurugram", "Faridabad", "Panipat", "Ambala", "Karnal", "Hisar",
        "Rohtak", "Sonipat", "Kurukshetra", "Sirsa"
    ],
    "Madhya Pradesh": [
        "Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar",
        "Dewas", "Satna", "Ratlam", "Rewa", "Chhindwara", "Balaghat"
    ],
    "Bihar": [
        "Patna Sahib", "Pataliputra", "Gaya", "Muzaffarpur", "Bhagalpur",
        "Darbhanga", "Purnia", "Begusarai", "Munger", "Nalanda", "Saran (Chhapra)"
    ],
    "Odisha": [
        "Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur",
        "Puri", "Balasore", "Bhadrak", "Baripada", "Koraput"
    ],
    "Assam": [
        "Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Nagaon", "Tezpur", "Barpeta"
    ],
    "Jammu & Kashmir": [
        "Srinagar", "Jammu", "Anantnag", "Baramulla", "Udhampur"
    ],
    "Uttarakhand": [
        "Dehradun", "Haridwar", "Nainital", "Garhwal (Pauri)", "Almora"
    ],
    "Himachal Pradesh": [
        "Shimla", "Mandi", "Kangra", "Hamirpur"
    ],
    "Jharkhand": [
        "Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh", "Deoghar"
    ],
    "Chhattisgarh": [
        "Raipur", "Bilaspur", "Durg", "Bhilai", "Korba", "Rajnandgaon", "Bastar"
    ],
    "Goa": [
        "North Goa", "South Goa"
    ],
    "Chandigarh": [
        "Chandigarh"
    ],
    "Puducherry": [
        "Puducherry"
    ]
}

# Regional climate adjustment offsets relative to national base
# (Used by Stage 1 to incorporate microclimate biases for coastal, inland, or northern states)
REGIONAL_CLIMATE_BIAS = {
    "Telangana": {"temp_bias": +0.8, "humidity_bias": -2.0, "rain_factor": 1.05},
    "Andhra Pradesh": {"temp_bias": +0.9, "humidity_bias": +4.0, "rain_factor": 1.15},
    "Maharashtra": {"temp_bias": +0.2, "humidity_bias": +5.0, "rain_factor": 1.25},
    "Karnataka": {"temp_bias": -0.4, "humidity_bias": +3.0, "rain_factor": 1.10},
    "Tamil Nadu": {"temp_bias": +0.6, "humidity_bias": +6.0, "rain_factor": 1.18},
    "Delhi (NCT)": {"temp_bias": +0.5, "humidity_bias": -5.0, "rain_factor": 0.85},
    "Gujarat": {"temp_bias": +1.1, "humidity_bias": -3.0, "rain_factor": 0.90},
    "Rajasthan": {"temp_bias": +1.8, "humidity_bias": -10.0, "rain_factor": 0.65},
    "Uttar Pradesh": {"temp_bias": +0.4, "humidity_bias": +1.0, "rain_factor": 0.95},
    "West Bengal": {"temp_bias": +0.3, "humidity_bias": +8.0, "rain_factor": 1.35},
    "Kerala": {"temp_bias": -0.5, "humidity_bias": +12.0, "rain_factor": 1.65},
    "Punjab": {"temp_bias": +0.2, "humidity_bias": -2.0, "rain_factor": 0.88},
    "Haryana": {"temp_bias": +0.3, "humidity_bias": -3.0, "rain_factor": 0.85},
    "Madhya Pradesh": {"temp_bias": +0.6, "humidity_bias": -4.0, "rain_factor": 0.98},
    "Bihar": {"temp_bias": +0.4, "humidity_bias": +3.0, "rain_factor": 1.08},
    "Odisha": {"temp_bias": +0.5, "humidity_bias": +7.0, "rain_factor": 1.30},
    "Assam": {"temp_bias": -1.2, "humidity_bias": +14.0, "rain_factor": 1.70},
    "Jammu & Kashmir": {"temp_bias": -3.5, "humidity_bias": +2.0, "rain_factor": 0.90},
    "Uttarakhand": {"temp_bias": -2.2, "humidity_bias": +1.0, "rain_factor": 1.10},
    "Himachal Pradesh": {"temp_bias": -3.0, "humidity_bias": +1.0, "rain_factor": 1.05},
    "Jharkhand": {"temp_bias": +0.4, "humidity_bias": +2.0, "rain_factor": 1.12},
    "Chhattisgarh": {"temp_bias": +0.5, "humidity_bias": +1.0, "rain_factor": 1.15},
    "Goa": {"temp_bias": +0.1, "humidity_bias": +10.0, "rain_factor": 1.50},
    "Chandigarh": {"temp_bias": +0.1, "humidity_bias": -2.0, "rain_factor": 0.88},
    "Puducherry": {"temp_bias": +0.6, "humidity_bias": +8.0, "rain_factor": 1.20}
}

