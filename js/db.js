const allProfiles = [
    // Females (25)
    { id: "PF-001", name: "Ayesha Malik", gender: "Female", age: 23, city: "Lahore", sect: "Sunni", education: "MBBS", status: "approved", tier: "gold", contact: "+92 300 1112221" },
    { id: "PF-002", name: "Fatima Shah", gender: "Female", age: 25, city: "Karachi", sect: "Sunni", education: "Software Engineer", status: "approved", tier: "gold", contact: "+92 321 3334442" },
    { id: "PF-003", name: "Sara Bukhari", gender: "Female", age: 27, city: "Islamabad", sect: "Sunni", education: "MBA", status: "approved", tier: "gold", contact: "+92 333 5556663" },
    { id: "PF-004", name: "Zainab Ali", gender: "Female", age: 29, city: "Faisalabad", sect: "Sunni", education: "CSS Officer", status: "approved", tier: "diamond", contact: "+92 345 7778884" },
    { id: "PF-005", name: "Mariam Hassan", gender: "Female", age: 31, city: "Sialkot", sect: "Shia", education: "PhD Economics", status: "approved", tier: "gold", contact: "+92 300 9990005" },
    { id: "PF-006", name: "Hina Siddiqui", gender: "Female", age: 33, city: "Multan", sect: "Sunni", education: "M.Phil Education", status: "approved", tier: "gold", contact: "+92 331 1122336" },
    { id: "PF-007", name: "Rabia Khan", gender: "Female", age: 35, city: "Lahore", sect: "Sunni", education: "Chartered Accountant", status: "approved", tier: "gold", contact: "+92 301 4455667" },
    { id: "PF-008", name: "Nida Rehman", gender: "Female", age: 37, city: "Karachi", sect: "Sunni", education: "Dentist (BDS)", status: "approved", tier: "gold", contact: "+92 312 7788998" },
    { id: "PF-009", name: "Zoya Mirza", gender: "Female", age: 39, city: "Islamabad", sect: "Shia", education: "Fashion Designer", status: "approved", tier: "gold", contact: "+92 321 0011229" },
    { id: "PF-010", name: "Amna Ghani", gender: "Female", age: 41, city: "UK", sect: "Sunni", education: "Lawyer (LLM)", status: "approved", tier: "diamond", contact: "+44 771 2233440" },
    { id: "PF-011", name: "Bisma Junaid", gender: "Female", age: 43, city: "USA", sect: "Sunni", education: "Data Scientist", status: "approved", tier: "diamond", contact: "+1 212 5556661" },
    { id: "PF-012", name: "Sana Tariq", gender: "Female", age: 45, city: "UAE", sect: "Sunni", education: "Pharmacist", status: "approved", tier: "gold", contact: "+971 50 1122332" },
    { id: "PF-013", name: "Kiran Waqar", gender: "Female", age: 47, city: "Lahore", sect: "Sunni", education: "Architect", status: "approved", tier: "gold", contact: "+92 302 2233443" },
    { id: "PF-014", name: "Maha Lodhi", gender: "Female", age: 21, city: "Karachi", sect: "Sunni", education: "Bachelors in Arts", status: "approved", tier: "gold", contact: "+92 321 4455664" },
    { id: "PF-015", name: "Noor Fatima", gender: "Female", age: 23, city: "Islamabad", sect: "Sunni", education: "Psychologist", status: "approved", tier: "gold", contact: "+92 333 7788995" },
    { id: "PF-016", name: "Esha Aziz", gender: "Female", age: 25, city: "Multan", sect: "Sunni", education: "Civil Engineer", status: "approved", tier: "gold", contact: "+92 344 1122336" },
    { id: "PF-017", name: "Alizeh Shah", gender: "Female", age: 27, city: "Faisalabad", sect: "Sunni", education: "Journalist", status: "approved", tier: "gold", contact: "+92 305 4455667" },
    { id: "PF-018", name: "Mahira Khan", gender: "Female", age: 29, city: "Lahore", sect: "Sunni", education: "Media Studies", status: "approved", tier: "diamond", contact: "+92 300 7788998" },
    { id: "PF-019", name: "Maya Ali", gender: "Female", age: 31, city: "Karachi", sect: "Sunni", education: "Business Owner", status: "approved", tier: "diamond", contact: "+92 321 1122339" },
    { id: "PF-020", name: "Sajal Aly", gender: "Female", age: 33, city: "Islamabad", sect: "Sunni", education: "Interior Design", status: "approved", tier: "gold", contact: "+92 333 4455660" },
    { id: "PF-021", name: "Yumna Zaidi", gender: "Female", age: 35, city: "Peshawar", sect: "Sunni", education: "MA English", status: "approved", tier: "gold", contact: "+92 345 7788991" },
    { id: "PF-022", name: "Kubra Khan", gender: "Female", age: 37, city: "Quetta", sect: "Sunni", education: "UK Graduate", status: "approved", tier: "gold", contact: "+92 306 1122332" },
    { id: "PF-023", name: "Hania Aamir", gender: "Female", age: 21, city: "Rawalpindi", sect: "Sunni", education: "Digital Marketing", status: "approved", tier: "gold", contact: "+92 331 4455663" },
    { id: "PF-024", name: "Iqra Aziz", gender: "Female", age: 23, city: "Karachi", sect: "Sunni", education: "Bachelors", status: "approved", tier: "gold", contact: "+92 322 7788994" },
    { id: "PF-025", name: "Sarah Khan", gender: "Female", age: 25, city: "Lahore", sect: "Sunni", education: "Fashion Designer", status: "approved", tier: "gold", contact: "+92 300 1122335" },

    // Males (25)
    { id: "PM-001", name: "Ahmed Raza", gender: "Male", age: 25, city: "Lahore", sect: "Sunni", education: "MBBS Doctor", status: "approved", tier: "diamond", contact: "+92 300 4455661" },
    { id: "PM-002", name: "Bilal Sheikh", gender: "Male", age: 27, city: "Karachi", sect: "Sunni", education: "Software Engineer", status: "approved", tier: "diamond", contact: "+92 321 7788992" },
    { id: "PM-003", name: "Hamza Dar", gender: "Male", age: 29, city: "Islamabad", sect: "Sunni", education: "CSS Officer", status: "approved", tier: "gold", contact: "+92 333 1122333" },
    { id: "PM-004", name: "Usman Qureshi", gender: "Male", age: 31, city: "Peshawar", sect: "Sunni", education: "PhD Physics", status: "approved", tier: "gold", contact: "+92 344 4455664" },
    { id: "PM-005", name: "Ali Murtaza", gender: "Male", age: 33, city: "Faisalabad", sect: "Shia", education: "Business Owner", status: "approved", tier: "diamond", contact: "+92 301 8899005" },
    { id: "PM-006", name: "Omer Saeed", gender: "Male", age: 35, city: "Sialkot", sect: "Sunni", education: "Investment Banker", status: "approved", tier: "gold", contact: "+92 302 1122336" },
    { id: "PM-007", name: "Saad Kamal", gender: "Male", age: 37, city: "Rawalpindi", sect: "Sunni", education: "Civil Engineer", status: "approved", tier: "gold", contact: "+92 331 4455667" },
    { id: "PM-008", name: "Hassan Hashmi", gender: "Male", age: 39, city: "Multan", sect: "Shia", education: "Agriculturalist", status: "approved", tier: "gold", contact: "+92 306 7788998" },
    { id: "PM-009", name: "Daniyal Waseem", gender: "Male", age: 41, city: "Sukkur", sect: "Sunni", education: "Chartered Accountant", status: "approved", tier: "gold", contact: "+92 345 1122339" },
    { id: "PM-010", name: "Fawad Khan", gender: "Male", age: 43, city: "UAE", sect: "Sunni", education: "Pilot", status: "approved", tier: "diamond", contact: "+971 50 4455660" },
    { id: "PM-011", name: "Raza Swati", gender: "Male", age: 45, city: "UK", sect: "Sunni", education: "Business Consultant", status: "approved", tier: "gold", contact: "+44 771 7788991" },
    { id: "PM-012", name: "Junaid Mir", gender: "Male", age: 47, city: "USA", sect: "Sunni", education: "Real Estate", status: "approved", tier: "gold", contact: "+1 212 2233442" },
    { id: "PM-013", name: "Zeeshan Khan", gender: "Male", age: 21, city: "Lahore", sect: "Sunni", education: "BS CS", status: "approved", tier: "gold", contact: "+92 303 1122333" },
    { id: "PM-014", name: "Arsalan Shah", gender: "Male", age: 23, city: "Karachi", sect: "Sunni", education: "Mechanical Engineer", status: "approved", tier: "gold", contact: "+92 321 4455664" },
    { id: "PM-015", name: "Farhan Ali", gender: "Male", age: 25, city: "Islamabad", sect: "Sunni", education: "Telecom Engineer", status: "approved", tier: "gold", contact: "+92 333 7788995" },
    { id: "PM-016", name: "Kamran Akmal", gender: "Male", age: 27, city: "Multan", sect: "Sunni", education: "M.Com", status: "approved", tier: "gold", contact: "+92 344 1122336" },
    { id: "PM-017", name: "Salman Butt", gender: "Male", age: 29, city: "Faisalabad", sect: "Sunni", education: "Textile Expert", status: "approved", tier: "gold", contact: "+92 305 4455667" },
    { id: "PM-018", name: "Rizwan Ahmed", gender: "Male", age: 31, city: "Sialkot", sect: "Sunni", education: "Export Business", status: "approved", tier: "diamond", contact: "+92 300 7788998" },
    { id: "PM-019", name: "Imran Khan", gender: "Male", age: 33, city: "Lahore", sect: "Sunni", education: "Political Science", status: "approved", tier: "diamond", contact: "+92 321 1122339" },
    { id: "PM-020", name: "Shahzad Roy", gender: "Male", age: 35, city: "Karachi", sect: "Sunni", education: "Musician / Philanthropist", status: "approved", tier: "gold", contact: "+92 333 4455660" },
    { id: "PM-021", name: "Naveed Altaf", gender: "Male", age: 37, city: "Islamabad", sect: "Sunni", education: "Contractor", status: "approved", tier: "gold", contact: "+92 345 7788991" },
    { id: "PM-022", name: "Faisal Qureshi", gender: "Male", age: 39, city: "Lahore", sect: "Sunni", education: "Media Professional", status: "approved", tier: "gold", contact: "+92 306 1122332" },
    { id: "PM-023", name: "Atif Aslam", gender: "Male", age: 41, city: "Overseas", sect: "Sunni", education: "Vocalist", status: "approved", tier: "diamond", contact: "+971 50 4455663" },
    { id: "PM-024", name: "Shehryar Munawar", gender: "Male", age: 23, city: "Karachi", sect: "Sunni", education: "BBA", status: "approved", tier: "gold", contact: "+92 322 7788994" },
    { id: "PM-025", name: "Haris Rauf", gender: "Male", age: 25, city: "Rawalpindi", sect: "Sunni", education: "Sportsman", status: "approved", tier: "gold", contact: "+92 300 1122335" },
    { id: "PM-026", name: "Muhammad Saqib", gender: "Male", age: 20, city: "Multan", sect: "Sunni", education: "Intermediate", status: "approved", tier: "gold", contact: "+92 301 2345678" }
];

class MarriageBureauDB {
    constructor() {
        this.INIT_DATA_KEY = 'haya_db_initialized_v3_51_profiles';
        this.PROFILES_KEY = 'haya_profiles';
        this.USERS_KEY = 'haya_users';
        this.SESSION_KEY = 'haya_session';
        this.init();
    }

    init() {
        // Force refresh for v3 rewrite (50 profiles)
        if (!localStorage.getItem(this.INIT_DATA_KEY)) {
            localStorage.setItem(this.PROFILES_KEY, JSON.stringify(allProfiles));
            localStorage.setItem(this.INIT_DATA_KEY, 'true');
        }
    }

    getProfiles(approvedOnly = true) {
        const profilesString = localStorage.getItem(this.PROFILES_KEY);
        const profiles = profilesString ? JSON.parse(profilesString) : allProfiles;
        return approvedOnly ? profiles.filter(p => p.status === 'approved') : profiles;
    }

    searchProfiles(filters = {}) {
        let profiles = this.getProfiles(true);
        
        // Helper for case-insensitive robust matching
        const matches = (val, search) => !search || search === 'Any' || 
            (val && val.toString().toLowerCase().includes(search.toLowerCase()));

        if (filters.gender && filters.gender !== 'Any') {
            const g = filters.gender.toLowerCase();
            const targetGender = (g === 'bride' || g === 'female') ? 'female' : 'male';
            profiles = profiles.filter(p => p.gender.toLowerCase() === targetGender);
        }
        
        if (filters.city && filters.city !== 'Any') {
            profiles = profiles.filter(p => matches(p.city, filters.city));
        }

        if (filters.education && filters.education !== 'Any') {
            profiles = profiles.filter(p => matches(p.education, filters.education));
        }

        if (filters.sect && filters.sect !== 'Any') {
            profiles = profiles.filter(p => matches(p.sect, filters.sect));
        }
        
        if (filters.minAge) profiles = profiles.filter(p => p.age >= parseInt(filters.minAge));
        if (filters.maxAge) profiles = profiles.filter(p => p.age <= parseInt(filters.maxAge));

        return profiles;
    }

    getCurrentUser() { return JSON.parse(localStorage.getItem(this.SESSION_KEY)); }

    logout() {
        localStorage.removeItem(this.SESSION_KEY);
        window.location.href = 'index.html';
    }

    maskData(profile) {
        const user = this.getCurrentUser();
        const isPremium = user && ['gold', 'diamond'].includes(user.tier);
        if (!isPremium) {
            return {
                ...profile,
                name: (profile.name && profile.name.split(' ')[0]) + ' (Match)',
                contact: 'Locked',
                isMasked: true
            };
        }
        return { ...profile, isMasked: false };
    }
}

const hayaDB = new MarriageBureauDB();
export default hayaDB;
